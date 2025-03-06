
import { useRef, useState, useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { 
  calculateMarkerOffset, 
  buildCoordinatesMap, 
  createFacilityMarker,
  hasValidCoordinates
} from '../utils/markerUtils';
import { toast } from "sonner";
import { MarkerStatistics } from '../components/MarkerStats';

interface UseMarkerManagementProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

export const useMarkerManagement = ({ 
  map, 
  facilities, 
  highlightedFacility, 
  onMarkerClick 
}: UseMarkerManagementProps) => {
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

  useEffect(() => {
    isMounted.current = true;
    
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

  // Effect to update markers when highlighted facility changes
  useEffect(() => {
    if (map && markers.current.length > 0) {
      markers.current.forEach((marker, index) => {
        if (index < facilities.length) {
          const facility = facilities[index];
          const isHighlighted = facility.id === highlightedFacility;
          
          // Update marker appearance based on highlight state
          const el = marker.getElement();
          if (el) {
            el.style.backgroundColor = isHighlighted ? '#10B981' : '#F97316';
            el.style.zIndex = isHighlighted ? '1100' : '1000';
            el.style.transform = `translate(-50%, -50%) scale(${isHighlighted ? 1.2 : 1})`;
            el.style.boxShadow = isHighlighted ? 
              '0 0 20px rgba(16, 185, 129, 0.8)' : 
              '0 0 10px rgba(0,0,0,0.8)';
            
            // Set highlighted attribute for CSS targeting
            if (isHighlighted) {
              el.setAttribute('data-highlighted', 'true');
            } else {
              el.removeAttribute('data-highlighted');
            }
            
            // Force visibility and interactivity
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.display = 'block';
            el.style.pointerEvents = 'all';
          }
          
          if (isHighlighted) {
            console.log(`Highlighted marker for facility: ${facility.name}`);
            // Open popup for highlighted facility
            if (!marker.getPopup().isOpen()) {
              marker.togglePopup();
              
              // Enhance popup visibility after opening
              setTimeout(() => {
                const popupEl = marker.getPopup().getElement();
                if (popupEl) {
                  popupEl.style.zIndex = '1100';
                  popupEl.style.visibility = 'visible';
                  popupEl.style.pointerEvents = 'all';
                }
              }, 50);
            }
          }
        }
      });
    }
  }, [highlightedFacility, facilities, map]);

  // Function to create all markers - using useCallback to maintain reference stability
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
        console.log(`Marker already exists for ${facility.name}, skipping`);
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
        
        // Create the marker
        const marker = createFacilityMarker(
          facility,
          coordinates,
          facility.id === highlightedFacility,
          onMarkerClick,
          map
        );

        // Force the marker to be visible and interactive
        const el = marker.getElement();
        if (el) {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          el.style.display = 'block';
          el.style.zIndex = '1000';
          el.style.pointerEvents = 'all';
          
          // Set persistent data attribute
          el.setAttribute('data-persistent', 'true');
          
          // Add extra click handler in case the original one doesn't fire
          el.onclick = (e) => {
            e.stopPropagation();
            console.log(`Extra click handler for: ${facility.name}`);
            onMarkerClick(facility.id);
            
            // Open popup if not open
            if (!marker.getPopup().isOpen()) {
              marker.togglePopup();
            }
          };
        }

        // Track marker for later cleanup
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
  }, [facilities, map, highlightedFacility, onMarkerClick]);

  // Function to ensure markers are visible - using useCallback for stability
  const forceMarkerVisibility = useCallback(() => {
    // Force all markers to be visible and interactive
    document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.visibility = 'visible';
        marker.style.opacity = '1';
        marker.style.display = 'block';
        marker.style.zIndex = '1000';
        marker.style.pointerEvents = 'all';
        marker.style.cursor = 'pointer';
      }
    });
    
    // Force all popups to be visible and interactive with higher z-index
    document.querySelectorAll('.mapboxgl-popup, .mapboxgl-popup-content').forEach(popup => {
      if (popup instanceof HTMLElement) {
        popup.style.zIndex = '1100';
        popup.style.visibility = 'visible';
        popup.style.pointerEvents = 'all';
        popup.style.display = 'block';
      }
    });
    
    // Fix popup close buttons
    document.querySelectorAll('.mapboxgl-popup-close-button').forEach(button => {
      if (button instanceof HTMLElement) {
        button.style.zIndex = '1110';
        button.style.pointerEvents = 'all';
      }
    });
  }, []);
  
  // Restore markers after map style reload
  useEffect(() => {
    if (!map) return;
    
    const handleStyleData = () => {
      // When map style reloads, restore markers
      setTimeout(forceMarkerVisibility, 100);
    };
    
    map.on('styledata', handleStyleData);
    
    return () => {
      map.off('styledata', handleStyleData);
    };
  }, [map, forceMarkerVisibility]);

  return {
    markers,
    stats,
    createMarkers,
    forceMarkerVisibility
  };
};
