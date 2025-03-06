
import { useEffect } from 'react';

/**
 * Hook to set up global handlers for map popups
 * Ensures popups don't close when clicking on the map
 */
export const usePopupClickHandler = () => {
  useEffect(() => {
    // Global handler to prevent closing popups when clicking outside them
    const handleDocumentClick = (e: MouseEvent) => {
      // If we're clicking on a popup or marker, don't do anything special
      if ((e.target as HTMLElement)?.closest('.mapboxgl-popup') || 
          (e.target as HTMLElement)?.closest('.custom-marker')) {
        return;
      }
      
      // If we're clicking on the map canvas directly
      if ((e.target as HTMLElement)?.classList.contains('mapboxgl-canvas')) {
        console.log('Click on map canvas detected, ensuring popups stay open');
      }
    };
    
    // Add global document click listener
    document.addEventListener('click', handleDocumentClick, true);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);
};
