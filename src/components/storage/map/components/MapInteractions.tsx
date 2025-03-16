
import React, { useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createDirectMarkers } from '../utils/directMarkerCreation';
import { 
  removeViewDetailsButtons, 
  hideAllPopups,
  createEdgeAwareClickHandler,
  enableEdgeAwareMarkers
} from '@/utils/markers';
import { toast } from "sonner";

interface MapInteractionsProps {
  map: mapboxgl.Map | null;
  mapLoaded: boolean;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  selectedState: string | null;
  onMarkersCreated: (created: boolean) => void;
}

/**
 * Handles map interactions, marker creation, and focus changes
 */
const MapInteractions: React.FC<MapInteractionsProps> = ({
  map,
  mapLoaded,
  facilities,
  highlightedFacility,
  selectedState,
  onMarkersCreated
}) => {
  // Create markers when map is ready
  useEffect(() => {
    if (!map || !mapLoaded) {
      console.log('Map not ready yet, will create markers when ready');
      return;
    }
    
    console.log('Map is ready, creating direct markers');
    
    // Create direct markers
    const markers = createDirectMarkers(facilities, map);
    onMarkersCreated(true);
    
    // Show toast with the correct number of locations
    if (facilities.length > 0) {
      toast.success(`Showing ${facilities.length} locations${selectedState ? ` in ${selectedState}` : ''}`);
    }
    
    // Fit bounds to show all markers
    if (facilities.length > 0 && map) {
      const bounds = new mapboxgl.LngLatBounds();
      
      facilities.forEach(facility => {
        if (facility.latitude && facility.longitude) {
          const lat = parseFloat(String(facility.latitude));
          const lng = parseFloat(String(facility.longitude));
          
          if (!isNaN(lat) && !isNaN(lng)) {
            bounds.extend([lng, lat]);
          }
        }
      });
      
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, {
          padding: { top: 70, bottom: 70, left: 50, right: 50 },
          maxZoom: 15
        });
      }
    }
    
    // Apply edge-aware click handling to all markers - IMPORTANT
    const applyEdgeAwareHandling = () => {
      console.log('Applying edge-aware handling to markers');
      enableEdgeAwareMarkers(map);
      
      // Also directly apply to all markers to ensure it works
      document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker').forEach(markerEl => {
        if (markerEl instanceof HTMLElement) {
          const facilityId = markerEl.getAttribute('data-facility-id');
          if (!facilityId) return;
          
          const facility = facilities.find(f => f.id === facilityId);
          if (!facility) return;
          
          // Get coordinates
          const lat = parseFloat(String(facility.latitude));
          const lng = parseFloat(String(facility.longitude));
          if (isNaN(lat) || isNaN(lng)) return;
          
          // Create edge-aware handler
          const edgeAwareHandler = createEdgeAwareClickHandler(
            map,
            [lng, lat],
            (e) => {
              if (e) {
                e.stopPropagation();
                e.preventDefault();
              }
              
              // Call the marker click handler
              const facilityId = markerEl.getAttribute('data-facility-id');
              if (facilityId) {
                console.log(`Edge-aware handler clicking facility: ${facilityId}`);
                // Show popup with delay to ensure map is repositioned first
                setTimeout(() => {
                  // Find popup
                  const popup = document.getElementById(`direct-popup-${facilityId}`);
                  if (popup) {
                    popup.style.display = 'block';
                    popup.style.visibility = 'visible';
                    popup.style.opacity = '1';
                    popup.style.zIndex = '10000';
                    popup.classList.add('visible');
                    popup.classList.add('clicked');
                  }
                }, 300);
              }
            }
          );
          
          // Remove old handlers
          const oldHandler = markerEl.getAttribute('data-click-handler');
          if (oldHandler && (window as any)[oldHandler]) {
            markerEl.removeEventListener('click', (window as any)[oldHandler]);
          }
          
          // Add new edge-aware handler
          markerEl.addEventListener('click', edgeAwareHandler);
          
          // Store reference
          const handlerName = `edge_handler_${facilityId.replace(/[^a-zA-Z0-9]/g, '_')}`;
          (window as any)[handlerName] = edgeAwareHandler;
          markerEl.setAttribute('data-click-handler', handlerName);
          markerEl.setAttribute('data-edge-aware', 'true');
          
          console.log(`Applied edge-aware handler to marker ${facilityId}`);
        }
      });
    };
    
    // Apply immediately and periodically
    applyEdgeAwareHandling();
    const intervalId = setInterval(applyEdgeAwareHandling, 2000);
    
    // Aggressively remove any "View Details" buttons
    removeViewDetailsButtons();
    
    // Hide all popups initially
    hideAllPopups();
    
    // Add global click handler to close popups when clicking outside
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't close popups if clicking on a marker or inside a popup
      if ((e.target as HTMLElement)?.closest('.mapboxgl-marker, .custom-marker, .direct-marker, .mapboxgl-popup, .direct-popup')) {
        return;
      }
      
      // Close all popups
      document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
        if (popup instanceof HTMLElement) {
          popup.style.display = 'none';
          popup.style.visibility = 'hidden';
          popup.style.opacity = '0';
          popup.style.zIndex = '-9999';
          popup.style.pointerEvents = 'none';
          popup.classList.remove('visible');
          popup.classList.remove('clicked');
        }
      });
    };
    
    document.addEventListener('click', handleGlobalClick);
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [map, mapLoaded, facilities, selectedState, onMarkersCreated]);
  
  // Focus on specific facility when highlighted
  useEffect(() => {
    if (!map || !mapLoaded || !highlightedFacility) return;
    
    const facility = facilities.find(f => f.id === highlightedFacility);
    if (facility && facility.latitude && facility.longitude) {
      const lat = parseFloat(String(facility.latitude));
      const lng = parseFloat(String(facility.longitude));
      
      if (!isNaN(lat) && !isNaN(lng)) {
        map.flyTo({
          center: [lng, lat],
          zoom: 14,
          essential: true
        });
        
        // Highlight the marker
        const marker = document.getElementById(`direct-marker-${facility.id}`);
        if (marker) {
          marker.style.backgroundColor = '#10B981';
          marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
          marker.style.zIndex = '10000';
          marker.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
          
          // Close all other popups first
          document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
            if (popup.id !== `direct-popup-${facility.id}`) {
              popup.classList.remove('clicked');
              popup.classList.remove('visible');
              (popup as HTMLElement).style.display = 'none';
              (popup as HTMLElement).style.visibility = 'hidden';
              (popup as HTMLElement).style.opacity = '0';
              (popup as HTMLElement).style.zIndex = '-9999';
              (popup as HTMLElement).style.pointerEvents = 'none';
            }
          });
          
          // Show the popup for the highlighted facility
          const popup = document.getElementById(`direct-popup-${facility.id}`);
          if (popup) {
            popup.style.display = 'block';
            popup.style.visibility = 'visible';
            popup.style.opacity = '1';
            popup.style.zIndex = '10000';
            popup.style.pointerEvents = 'auto';
            popup.classList.add('clicked');
            popup.classList.add('visible');
          }
        }
      }
    }
  }, [highlightedFacility, map, mapLoaded, facilities]);

  return null; // This component doesn't render any UI
};

export default MapInteractions;
