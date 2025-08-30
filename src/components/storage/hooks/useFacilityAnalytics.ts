
import { useEffect } from 'react';
import { StorageFacility } from '../types';

export const useFacilityAnalytics = (facilities: StorageFacility[] | undefined) => {
  // Log state-specific counts for debugging
  useEffect(() => {
    if (facilities && facilities.length > 0) {
      const stateMap = new Map<string, number>();
      
      facilities.forEach(facility => {
        if (facility.state) {
          stateMap.set(facility.state, (stateMap.get(facility.state) || 0) + 1);
        }
      });
      
      // Facility counts by state analyzed
    }
  }, [facilities]);
};
