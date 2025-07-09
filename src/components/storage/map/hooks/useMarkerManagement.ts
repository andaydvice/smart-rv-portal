
import { useCallback } from 'react';
import { StorageFacility } from '../../types';
import { removeViewDetailsButtons } from '@/utils/markers';
import { 
  useMarkerCreation,
  useMarkerVisibility,
  useMarkerErrorHandling,
  useMarkerStats,
  useMarkerSetup
} from './marker';

/**
 * Hook to handle marker creation and management
 */
export const useMarkerManagement = (
  map: mapboxgl.Map | null, 
  mapLoaded: boolean, 
  validFacilities: StorageFacility[], 
  onMarkerClick: (facilityId: string) => void
) => {
  // Use smaller, focused hooks
  const { stats, updateStats } = useMarkerStats();
  const { forceMarkerVisibility } = useMarkerVisibility();
  const { errors, markErrorAsRecovered, addError } = useMarkerErrorHandling();
  const { createMarkers: createMarkersBase } = useMarkerCreation(map, mapLoaded, validFacilities);
  
  // Set up markers and event listeners
  useMarkerSetup(
    map, 
    mapLoaded, 
    validFacilities, 
    onMarkerClick, 
    forceMarkerVisibility,
    updateStats
  );

  // Enhanced createMarkers function that updates stats and tracks errors
  const createMarkers = useCallback(() => {
    if (!map || !mapLoaded || validFacilities.length === 0) return 0;
    
    try {
      const markerCount = createMarkersBase();
      
      // Update stats
      updateStats(markerCount, validFacilities.length - markerCount);
      
      return markerCount;
    } catch (error) {
      console.error("Error creating markers:", error);
      addError(
        { id: 'batch-creation' } as StorageFacility, 
        error instanceof Error ? error : new Error(String(error)), 
        'CREATION_ERROR'
      );
      return 0;
    }
  }, [map, mapLoaded, validFacilities, createMarkersBase, updateStats, addError]);

  // Return all needed functions and state
  return {
    stats,
    createMarkers,
    forceMarkerVisibility,
    errors,
    markErrorAsRecovered
  };
};
