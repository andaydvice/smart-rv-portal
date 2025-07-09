
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
          
          // Trigger a custom event to notify that a popup was closed
          document.dispatchEvent(new CustomEvent('mapbox.popup.closed'));
          
          // Ensure the map is visible
          setTimeout(() => {
            const mapCanvas = document.querySelector('.mapboxgl-canvas');
            if (mapCanvas instanceof HTMLElement) {
              mapCanvas.style.visibility = 'visible';
              mapCanvas.style.display = 'block';
              mapCanvas.style.opacity = '1';
            }
            
            // Force all markers to be visible
            document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
              if (marker instanceof HTMLElement) {
                marker.style.visibility = 'visible';
                marker.style.display = 'block';
                marker.style.opacity = '1';
              }
            });
          }, 50);
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
          popup.style.visibility = 'visible';
          popup.style.display = 'block';
          
          // Make sure close buttons are clickable
          const closeButton = popup.querySelector('.mapboxgl-popup-close-button');
          if (closeButton instanceof HTMLElement) {
            closeButton.style.pointerEvents = 'all';
            closeButton.style.cursor = 'pointer';
          }
        }
      });
    };
    
    // Add handler for custom popup closed event
    const handlePopupClosed = () => {
      console.log('Popup closed, ensuring map visibility');
      
      // Find map canvas
      const mapCanvas = document.querySelector('.mapboxgl-canvas');
      if (mapCanvas instanceof HTMLElement) {
        mapCanvas.style.visibility = 'visible';
        mapCanvas.style.display = 'block';
        mapCanvas.style.opacity = '1';
      }
      
      // Show all markers
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
        }
      });
    };
    
    // Listen for custom popup closed event
    document.addEventListener('mapbox.popup.closed', handlePopupClosed);
    
    // Run periodically to ensure popups stay clickable
    const interval = setInterval(ensurePopupsAreClickable, 1000);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('mapbox.popup.closed', handlePopupClosed);
      clearInterval(interval);
    };
  }, []);
};
