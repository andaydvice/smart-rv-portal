
import { useEffect } from 'react';
import { StorageFacility } from '../../types';

/**
 * Hook to handle highlighted facility marker behavior
 */
export const useFacilityHighlight = (
  map: mapboxgl.Map | null, 
  mapLoaded: boolean, 
  validFacilities: StorageFacility[],
  highlightedFacility: string | null
) => {
  
  // Listen for facility selection to update the map view
  useEffect(() => {
    if (map && mapLoaded && highlightedFacility) {
      const facility = validFacilities.find(f => f.id === highlightedFacility);
      if (facility) {
        const lat = Number(facility.latitude);
        const lng = Number(facility.longitude);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`Flying to facility: ${facility.name}`);
          map.flyTo({
            center: [lng, lat],
            zoom: 12,
            padding: {top: 50, bottom: 50, left: 50, right: 50}, // Add padding to ensure marker is visible
            essential: true
          });
          
          // Highlight the emergency marker
          document.querySelectorAll('.emergency-marker, .custom-marker, .mapboxgl-marker').forEach(marker => {
            if (marker instanceof HTMLElement) {
              const markerFacilityId = marker.getAttribute('data-facility-id');
              if (markerFacilityId === highlightedFacility) {
                marker.style.backgroundColor = '#10B981';
                marker.style.width = '28px';
                marker.style.height = '28px';
                marker.style.transform = 'translate(-50%, -50%) scale(1.3)';
                marker.style.zIndex = '10002';
                marker.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.8)';
                marker.style.display = 'block';
                marker.style.visibility = 'visible';
                marker.style.opacity = '1';
              } else if (markerFacilityId) {
                marker.style.backgroundColor = '#F97316';
                marker.style.width = '24px';
                marker.style.height = '24px';
                marker.style.transform = 'translate(-50%, -50%) scale(1)';
                marker.style.zIndex = '10000';
                marker.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                marker.style.display = 'block';
                marker.style.visibility = 'visible';
                marker.style.opacity = '1';
              }
            }
          });
        }
      }
    }
  }, [highlightedFacility, map, mapLoaded, validFacilities]);
};
