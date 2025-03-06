
import { useRef, useState, useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';
import { 
  calculateMarkerOffset, 
  buildCoordinatesMap, 
  createFacilityMarker,
  hasValidCoordinates
} from '../../utils/markerUtils';
import { toast } from "sonner";
import { MarkerStatistics, UseMarkerCreationProps } from './types';
import { useMarkerVisibility } from './useMarkerVisibility';

export const useMarkerCreation = ({ 
  map, 
  facilities, 
  highlightedFacility, 
  onMarkerClick 
}: UseMarkerCreationProps) => {
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [stats, setStats] = useState<MarkerStatistics>({
    markersCreated: 0,
    skippedFacilities: 0,
    processedNYFacilities: 0,
    totalFacilities: 0,
    totalNYFacilities: 0
  });

  // Use a reference to track if the component is mounted
  const isMounted = useRef(true);
  
  // Track facilities that have already been processed
  const processedFacilityIds = useRef<Set<string>>(new Set());

  // Import forceMarkerVisibility from useMarkerVisibility
  const { forceMarkerVisibility } = useMarkerVisibility({ map });

  useEffect(() => {
    isMounted.current = true;
    
    // Create global storage for persistent markers if it doesn't exist
    if (typeof window !== 'undefined' && !window._persistentMarkers) {
      window._persistentMarkers = {};
    }
    
    // Add global event listener to handle popup clicks (persists across re-renders)
    const handleDocumentClick = (e: MouseEvent) => {
      // Don't close popups when clicking on the map or other elements
      if ((e.target as Element)?.closest('.mapboxgl-popup-content') ||
          (e.target as Element)?.closest('.custom-marker')) {
        // Prevent default actions for popup interactions
        e.stopPropagation();
      }
    };
    
    document.addEventListener('click', handleDocumentClick, true);
    
    return () => {
      isMounted.current = false;
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  // Function to create all markers with improved persistence
  const createMarkers = useCallback(() => {
    console.log(`Creating markers for ${facilities.length} facilities`);
    
    if (!map || !map.loaded()) {
      console.warn('Map not fully loaded yet, cannot create markers');
      return;
    }
    
    // Only show toast if we're actually creating new markers
    const newFacilities = facilities.filter(f => !processedFacilityIds.current.has(f.id));
    
    if (newFacilities.length > 0) {
      toast.info(`Loading ${newFacilities.length} facilities on map`);
    }
    
    // Initialize statistics
    let skipped = 0;
    let created = 0;

    // Build coordinates map to identify overlapping markers
    const coordinatesMap = buildCoordinatesMap(facilities);
    
    // Create markers for each facility
    facilities.forEach((facility, index) => {
      // Skip if we've already created a marker for this facility
      if (processedFacilityIds.current.has(facility.id)) {
        // Check if marker is already on the map - if not, re-add it
        const existingMarker = window._persistentMarkers?.[facility.id];
        if (existingMarker && map) {
          // Re-add to map if it was removed
          if (!existingMarker.getElement().isConnected) {
            existingMarker.addTo(map);
          }
          
          // Force marker element to be visible
          const el = existingMarker.getElement();
          if (el) {
            el.style.visibility = 'visible !important';
            el.style.opacity = '1 !important';
            el.style.display = 'block !important';
            el.style.zIndex = '1000 !important';
            el.style.pointerEvents = 'all !important';
          }
        }
        return;
      }
      
      try {
        // Check if facility has valid coordinates
        if (!hasValidCoordinates(facility)) {
          console.warn(`⚠️ Skipping facility due to missing coordinates: ${facility.name}`);
          skipped++;
          return;
        }
        
        // Calculate marker coordinates with offset for overlapping markers
        const coordinates = calculateMarkerOffset(facility, coordinatesMap, facilities, index);
        
        // Create the marker with explicit map reference for reliable addition
        const marker = createFacilityMarker(
          facility,
          coordinates,
          facility.id === highlightedFacility,
          onMarkerClick,
          map
        );

        // Add marker to the DOM with explicit addTo call to ensure it's added to the map
        marker.addTo(map);

        // Explicitly set popup options to prevent automatic closing
        const popup = marker.getPopup();
        popup.options.closeOnClick = false;
        popup.options.closeButton = true;
        
        // Force the marker to be visible and interactive
        const el = marker.getElement();
        if (el) {
          // IMPORTANT: Using !important flags for critical CSS properties
          el.style.cssText += `
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
            z-index: 1000 !important;
            pointer-events: all !important;
          `;
          
          // Set persistent data attribute
          el.setAttribute('data-persistent', 'true');
          el.setAttribute('data-facility-id', facility.id);
          
          // Add extra click handler that won't be garbage-collected
          const robustClickHandler = function(e: Event) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Robust click handler for: ${facility.name}`);
            onMarkerClick(facility.id);
            
            // Open popup if not open
            if (!marker.getPopup().isOpen()) {
              marker.togglePopup();
              
              // Force popup to be visible after a short delay
              setTimeout(() => {
                const popupEl = marker.getPopup().getElement();
                if (popupEl) {
                  popupEl.style.cssText += `
                    z-index: 1100 !important;
                    visibility: visible !important;
                    pointer-events: all !important;
                  `;
                }
              }, 50);
            }
          };
          
          // Remove existing handlers to prevent duplicates
          el.removeEventListener('click', robustClickHandler);
          
          // Add permanent click handler
          el.addEventListener('click', robustClickHandler);
        }

        // Store marker in global registry to prevent garbage collection
        if (window._persistentMarkers) {
          window._persistentMarkers[facility.id] = marker;
        }

        // Track marker for later management
        markers.current.push(marker);
        
        // Add to our processed set to avoid duplication
        processedFacilityIds.current.add(facility.id);
        
        created++;
      } catch (error) {
        console.error(`🚫 Error creating marker for ${facility.name}:`, error);
        skipped++;
      }
    });

    // Update statistics
    if (isMounted.current) {
      setStats({
        markersCreated: created,
        skippedFacilities: skipped,
        processedNYFacilities: 0,
        totalFacilities: facilities.length,
        totalNYFacilities: 0
      });
      
      // Log summary
      console.log(`✅ Created ${created} markers on the map out of ${facilities.length} facilities`);
      
      if (created > 0) {
        toast.success(`Added ${created} storage facilities to map`);
      } else if (facilities.length > 0 && created === 0 && newFacilities.length > 0) {
        toast.error('Failed to display facilities on map');
      }
    }
    
    // Force all markers to be visible after creation
    setTimeout(forceMarkerVisibility, 100);
  }, [facilities, map, highlightedFacility, onMarkerClick, forceMarkerVisibility]);

  return {
    markers,
    stats,
    createMarkers
  };
};
