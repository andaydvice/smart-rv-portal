
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
      const mockFacility: StorageFacility = {
        id: 'batch-creation',
        name: 'Batch Creation',
        latitude: 0,
        longitude: 0,
        address: '',
        city: '',
        state: '',
        features: { indoor: false, climate_controlled: false, "24h_access": false, security_system: false, vehicle_washing: false },
        price_range: { min: 0, max: 0, currency: 'USD' },
        verified_fields: { features: false, price_range: false, contact_info: false, location: false, business_hours: false }
      };
      addError(mockFacility, error instanceof Error ? error : new Error(String(error)), 'CREATION_ERROR');
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
