
import { useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';

export const useProcessExistingMarkers = () => {
  // Track facilities that have already been processed
  const processedFacilityIds = useRef<Set<string>>(new Set());

  const processExistingMarker = (
    facility: StorageFacility,
    map: mapboxgl.Map
  ): boolean => {
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
      return true; // Marker was already processed
    }
    return false; // Marker needs to be created
  };

  const markAsProcessed = (facilityId: string) => {
    processedFacilityIds.current.add(facilityId);
  };

  return {
    processedFacilityIds,
    processExistingMarker,
    markAsProcessed
  };
};
