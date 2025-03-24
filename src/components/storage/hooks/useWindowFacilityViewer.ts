
import { useEffect } from 'react';
import { StorageFacility } from '../types';

export const useWindowFacilityViewer = (
  highlightedFacility: string | null,
  facilities: StorageFacility[] | undefined,
  handleFacilityClick: (facilityId: string | null, facilities: StorageFacility[]) => void
) => {
  // Function to help view a facility when needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.viewFacility = (id: string) => {
        handleFacilityClick(id, facilities || []);
      };
      window.highlightedFacilityId = highlightedFacility;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.viewFacility = undefined;
        window.highlightedFacilityId = null;
      }
    };
  }, [handleFacilityClick, facilities, highlightedFacility]);
};
