
import { useEffect } from 'react';

/**
 * Hook to set up global handlers for map popups
 * Ensures popups don't close when clicking on the map
 */
export const usePopupClickHandler = () => {
  useEffect(() => {
    // Global handler for popup interactions
    const handleDocumentClick = (e: MouseEvent) => {
      // Handle close button clicks
      if ((e.target as HTMLElement)?.closest('.mapboxgl-popup-close-button')) {
        e.preventDefault();
        e.stopPropagation();
        
        // Find the popup this close button belongs to
        const popup = (e.target as HTMLElement)?.closest('.mapboxgl-popup');
        if (popup) {
          // Remove the popup from the DOM
          popup.remove();
        }
        
        return;
      }
    };
    
    // Add global document click listener
    document.addEventListener('click', handleDocumentClick, true);
    
    // Force popups to be clickable
    const ensurePopupsAreClickable = () => {
      document.querySelectorAll('.mapboxgl-popup, .mapboxgl-popup-content').forEach(popup => {
        if (popup instanceof HTMLElement) {
          popup.style.pointerEvents = 'auto';
          popup.style.zIndex = '10000';
          
          // Make sure close buttons are clickable
          const closeButton = popup.querySelector('.mapboxgl-popup-close-button');
          if (closeButton instanceof HTMLElement) {
            closeButton.style.pointerEvents = 'all';
            closeButton.style.cursor = 'pointer';
          }
        }
      });
    };
    
    // Run periodically to ensure popups stay clickable
    const interval = setInterval(ensurePopupsAreClickable, 1000);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      clearInterval(interval);
    };
  }, []);
};
