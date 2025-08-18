
import { useState, useRef, RefObject } from 'react';
import { StorageFacility } from '../types';

interface UseFacilitySelectionProps {
  addToRecentlyViewed: (facility: StorageFacility) => void;
}

export const useFacilitySelection = ({ addToRecentlyViewed }: UseFacilitySelectionProps) => {
  const [highlightedFacility, setHighlightedFacility] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const facilityRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleFacilityClick = (
    facilityId: string | null, 
    facilities: StorageFacility[] | undefined
  ) => {
    setHighlightedFacility(facilityId);
    
    if (facilityId && facilities) {
      const facility = facilities.find(f => f.id === facilityId);
      if (facility) {
        addToRecentlyViewed(facility);
      }
    }
    
    setTimeout(() => {
      if (facilityId && facilityRefs.current[facilityId] && scrollAreaRef.current) {
        const facilityElement = facilityRefs.current[facilityId];
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        
        if (facilityElement && scrollContainer) {
          const containerRect = scrollContainer.getBoundingClientRect();
          const elementRect = facilityElement.getBoundingClientRect();
          
          const isInView = 
            elementRect.top >= containerRect.top && 
            elementRect.bottom <= containerRect.bottom;
            
          if (!isInView) {
            const scrollTop = 
              elementRect.top - 
              containerRect.top + 
              (scrollContainer as HTMLElement).scrollTop - 
              (containerRect.height - elementRect.height) / 2;
              
            (scrollContainer as HTMLElement).scrollTo({
              top: scrollTop,
              behavior: 'smooth'
            });
          }
        }
      }
    }, 100);
  };

  return {
    highlightedFacility,
    scrollAreaRef,
    facilityRefs,
    handleFacilityClick
  };
};
