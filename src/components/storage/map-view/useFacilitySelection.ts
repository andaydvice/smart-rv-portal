
import { useState, useRef, useCallback, useEffect } from 'react';
import { Facility } from '../types';

interface UseFacilitySelectionProps {
  addToRecentlyViewed: (facility: Facility) => void;
}

export const useFacilitySelection = ({ addToRecentlyViewed }: UseFacilitySelectionProps) => {
  const [highlightedFacility, setHighlightedFacility] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const handleFacilityClick = useCallback((facilityId: string | null, facilities: Facility[]) => {
    setHighlightedFacility(facilityId);
    
    if (facilityId) {
      const facility = facilities.find(f => f.id === facilityId);
      if (facility) {
        addToRecentlyViewed(facility);
      }
    }
  }, [addToRecentlyViewed]);
  
  // Scroll to highlighted facility
  useEffect(() => {
    if (highlightedFacility && scrollAreaRef.current) {
      const highlightedElement = scrollAreaRef.current.querySelector(`[data-facility-id="${highlightedFacility}"]`);
      
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [highlightedFacility]);
  
  return { 
    highlightedFacility, 
    setHighlightedFacility,
    scrollAreaRef, 
    handleFacilityClick 
  };
};
