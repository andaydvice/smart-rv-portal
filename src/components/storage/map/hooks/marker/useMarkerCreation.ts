
import { useCallback } from 'react';
import { StorageFacility } from '../../../types';
import { 
  createEmergencyMarkers,
  removeViewDetailsButtons
} from '@/utils/markers';

/**
 * Hook for marker creation functionality
 */
export const useMarkerCreation = (
  map: mapboxgl.Map | null, 
  mapLoaded: boolean, 
  validFacilities: StorageFacility[]
) => {
  // Create markers function
  const createMarkers = useCallback(() => {
    if (!map || !mapLoaded || validFacilities.length === 0) return 0;
    
    try {
      // Create emergency markers - ensure we're creating the exact number of markers needed
      
      // Force clear existing markers first to ensure accurate count
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      });
      
      // Create fresh markers for all facilities
      const markerCount = createEmergencyMarkers(map, validFacilities);
      
      // Remove any view details buttons that might be created
      removeViewDetailsButtons();
      
      return markerCount;
    } catch (error) {
      console.error("Error creating markers:", error);
      return 0;
    }
  }, [map, mapLoaded, validFacilities]);

  return {
    createMarkers
  };
};
