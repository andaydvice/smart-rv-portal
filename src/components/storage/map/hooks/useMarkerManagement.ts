
import { useEffect } from 'react';
import { StorageFacility } from '../../types';
import { 
  injectEmergencyMarkerStyles,
  createEmergencyMarkers,
  setupEmergencyMarkerListeners
} from '@/utils/markers';

/**
 * Hook to handle marker creation and management
 */
export const useMarkerManagement = (
  map: mapboxgl.Map | null, 
  mapLoaded: boolean, 
  validFacilities: StorageFacility[], 
  onMarkerClick: (facilityId: string) => void
) => {
  
  // Emergency marker creation approach
  useEffect(() => {
    if (!map || !mapLoaded || validFacilities.length === 0) return;
    
    // Inject emergency styles
    injectEmergencyMarkerStyles();
    
    // Set map container to be explicitly visible
    const container = map.getContainer();
    if (container) {
      container.style.visibility = 'visible';
      container.style.opacity = '1';
      container.style.display = 'block';
    }
    
    console.log('Creating markers for facilities...');
    
    // Create emergency markers and set up listeners
    // Pass both map and validFacilities as arguments
    const markerCount = createEmergencyMarkers(map, validFacilities);
    console.log(`Created ${markerCount} emergency markers`);
    
    // Set up event listeners
    const cleanup = setupEmergencyMarkerListeners(onMarkerClick);
    
    // Set up a MutationObserver to watch for popup close buttons
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // Look for newly added popups
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.classList.contains('mapboxgl-popup')) {
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
                      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(m => {
                        if (m instanceof HTMLElement) {
                          m.style.visibility = 'visible';
                          m.style.display = 'block';
                          m.style.opacity = '1';
                        }
                      });
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
    
    return () => {
      cleanup();
      observer.disconnect();
      // Remove emergency markers
      document.querySelectorAll('.emergency-marker').forEach(marker => {
        if (marker.parentNode) marker.parentNode.removeChild(marker);
      });
    };
  }, [map, mapLoaded, validFacilities, onMarkerClick]);
};
