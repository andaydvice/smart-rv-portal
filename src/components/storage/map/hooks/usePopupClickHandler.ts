
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
      
      // Handle view details button clicks
      if ((e.target as HTMLElement)?.closest('.view-facility-btn')) {
        e.preventDefault();
        e.stopPropagation();
        
        // Find facility ID
        const facilityId = (e.target as HTMLElement)?.closest('.view-facility-btn')?.getAttribute('data-facility-id');
        if (facilityId) {
          console.log(`View details clicked for facility ${facilityId}`);
          // Dispatch a custom event that can be listened for to handle navigation
          document.dispatchEvent(new CustomEvent('facility-details-requested', {
            detail: { facilityId }
          }));
        }
        
        return;
      }
      
      // If we're clicking on a popup or marker, don't do anything special
      if ((e.target as HTMLElement)?.closest('.mapboxgl-popup') || 
          (e.target as HTMLElement)?.closest('.custom-marker')) {
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
          
          // Make sure view details buttons are clickable
          const viewDetailsButton = popup.querySelector('.view-facility-btn');
          if (viewDetailsButton instanceof HTMLElement) {
            viewDetailsButton.style.pointerEvents = 'all';
            viewDetailsButton.style.cursor = 'pointer';
          }
        }
      });
    };
    
    // Run periodically to ensure popups stay clickable
    const interval = setInterval(ensurePopupsAreClickable, 1000);
    
    // Listen for our custom event
    const handleFacilityDetailsRequested = (e: Event) => {
      const { facilityId } = (e as CustomEvent).detail;
      console.log(`Handling facility details request for ${facilityId}`);
      // This could dispatch to a router or state manager
    };
    
    document.addEventListener('facility-details-requested', handleFacilityDetailsRequested);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('facility-details-requested', handleFacilityDetailsRequested);
      clearInterval(interval);
    };
  }, []);
};
