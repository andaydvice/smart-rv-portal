import { useState, useRef, useCallback } from 'react';
import { StorageFacility } from '../types';

interface UseFacilitySelectionProps {
  addToRecentlyViewed: (facility: StorageFacility) => void;
}

export const useFacilitySelection = ({ addToRecentlyViewed }: UseFacilitySelectionProps) => {
  const [highlightedFacility, setHighlightedFacility] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleFacilityClick = useCallback((facilityId: string, facilities: StorageFacility[]) => {
    const facility = facilities.find(f => f.id === facilityId);
    
    if (highlightedFacility === facilityId) {
      setHighlightedFacility(null);
      window.hasDetailPanelOpen = false;
      return;
    }
    
    setHighlightedFacility(facilityId);
    window.hasDetailPanelOpen = true;
    
    if (facility) {
      addToRecentlyViewed(facility);
    }
    
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [highlightedFacility, addToRecentlyViewed]);

  return {
    highlightedFacility,
    setHighlightedFacility,
    scrollAreaRef,
    handleFacilityClick
  };
};
