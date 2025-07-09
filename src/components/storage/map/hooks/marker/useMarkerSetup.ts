
import { useEffect, useCallback } from 'react';
import { StorageFacility } from '../../../types';
import { 
  injectEmergencyStyles,
  createEmergencyMarkers,
  setupEmergencyMarkerListeners,
  removeViewDetailsButtons
} from '@/utils/markers';

/**
 * Hook for initial marker setup and event listeners
 */
export const useMarkerSetup = (
  map: mapboxgl.Map | null, 
  mapLoaded: boolean, 
  validFacilities: StorageFacility[], 
  onMarkerClick: (facilityId: string) => void,
  forceMarkerVisibility: () => void,
  updateStats: (created: number, skipped: number) => void
) => {
  // Setup markers and listeners
  useEffect(() => {
    if (!map || !mapLoaded || validFacilities.length === 0) return;
    
    // Inject emergency styles
    injectEmergencyStyles();
    
    // Set map container to be explicitly visible
    const container = map.getContainer();
    if (container) {
      container.style.visibility = 'visible';
      container.style.opacity = '1';
      container.style.display = 'block';
    }
    
    // Create emergency markers and set up listeners
    const markerCount = createEmergencyMarkers(map, validFacilities);
    
    // Remove any view details buttons
    removeViewDetailsButtons();
    
    // Update stats
    updateStats(markerCount, validFacilities.length - markerCount);
    
    // Set up event listeners
    const cleanup = setupEmergencyMarkerListeners(onMarkerClick);
    
    // Set up a MutationObserver to watch for popup close buttons and remove view details buttons
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // Look for newly added popups
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.classList.contains('mapboxgl-popup')) {
              // Remove any view details buttons
              removeViewDetailsButtons();
              
              // Find close button
              const closeButton = node.querySelector('.mapboxgl-popup-close-button');
              if (closeButton instanceof HTMLElement) {
                // Replace with new button to clear old event listeners
                const newButton = closeButton.cloneNode(true);
                closeButton.parentNode?.replaceChild(newButton, closeButton);
                
                // Add clean event listener to the close button
                newButton.addEventListener('click', (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  
                  // Remove the popup
                  node.remove();
                  
                  // Make sure map is visible
                  setTimeout(() => {
                    if (map) {
                      // Ensure map canvas is visible
                      const canvas = map.getCanvas();
                      if (canvas) {
                        canvas.style.visibility = 'visible';
                        canvas.style.display = 'block';
                      }
                      
                      // Force all markers to be visible
                      forceMarkerVisibility();
                    }
                  }, 50);
                });
              }
            }
          });
        }
      });
    });
    
    // Start observing the document for popup additions
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Periodically remove view details buttons
    const removalInterval = setInterval(removeViewDetailsButtons, 2000);
    
    return () => {
      cleanup();
      observer.disconnect();
      clearInterval(removalInterval);
      // Remove emergency markers
      document.querySelectorAll('.emergency-marker').forEach(marker => {
        if (marker.parentNode) marker.parentNode.removeChild(marker);
      });
    };
  }, [map, mapLoaded, validFacilities, onMarkerClick, forceMarkerVisibility, updateStats]);
};
