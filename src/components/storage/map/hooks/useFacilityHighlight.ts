
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { updateMarkersForZoomLevel } from '../utils/direct-markers/marker';

/**
 * Hook for highlighting a specific facility on the map
 */
export const useFacilityHighlight = (
  map: mapboxgl.Map | null,
  mapLoaded: boolean,
  facilities: StorageFacility[],
  highlightedFacility: string | null
) => {
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
          zoom: 14, // Zoomed in enough to show the green marker
          essential: true
        });
        
        // Highlight the marker
        highlightMarker(facility.id);
        
        // Update all markers based on new zoom level
        setTimeout(() => {
          updateMarkersForZoomLevel(map);
        }, 1000);
      }
    }
  }, [highlightedFacility, map, mapLoaded, facilities]);

  /**
   * Highlights a marker and shows its popup
   */
  const highlightMarker = (facilityId: string) => {
    const marker = document.getElementById(`direct-marker-${facilityId}`);
    if (marker instanceof HTMLElement) {
      marker.style.backgroundColor = '#10B981'; // Always green for highlighted marker
      marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
      marker.style.zIndex = '10000';
      marker.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
      marker.classList.add('highlighted-marker'); // Add class to track highlighted state
      
      // Close all other popups first
      document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
        if (popup.id !== `direct-popup-${facilityId}` && popup instanceof HTMLElement) {
          popup.classList.remove('clicked');
          popup.classList.remove('visible');
          popup.style.display = 'none';
          popup.style.visibility = 'hidden';
          popup.style.opacity = '0';
          popup.style.zIndex = '-9999';
          popup.style.pointerEvents = 'none';
        }
      });
      
      // Show the popup for the highlighted facility
      const popup = document.getElementById(`direct-popup-${facilityId}`);
      if (popup instanceof HTMLElement) {
        popup.style.display = 'block';
        popup.style.visibility = 'visible';
        popup.style.opacity = '1';
        popup.style.zIndex = '10000';
        popup.style.pointerEvents = 'auto';
        popup.classList.add('clicked');
        popup.classList.add('visible');
      }
    }
  };
};
