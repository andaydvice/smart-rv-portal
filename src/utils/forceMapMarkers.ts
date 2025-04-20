
/**
 * This utility provides emergency fixes for map marker visibility issues
 * by directly modifying the DOM after elements are rendered.
 */

export const forceMapMarkersVisible = () => {
  console.log('Setting up map marker visibility enforcement');
  
  // Run immediately
  applyMarkerFixes();
  
  // Set up mutation observer to continuously fix markers
  setupMutationObserver();
  
  // Set interval to periodically check for markers
  setInterval(applyMarkerFixes, 2000);
};

const applyMarkerFixes = () => {
  try {
    // Force all markers to be visible
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker, [class*="marker"]');
    if (markers.length > 0) {
      console.log(`Found and fixing ${markers.length} map markers`);
      
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
          marker.style.zIndex = '9999';
          marker.style.pointerEvents = 'auto';
        }
      });
    } else {
      console.log('No map markers found to fix');
    }
    
    // Force all popups to be visible
    const popups = document.querySelectorAll('.mapboxgl-popup');
    popups.forEach(popup => {
      if (popup instanceof HTMLElement) {
        popup.style.zIndex = '10000';
        popup.style.visibility = 'visible';
        popup.style.display = 'block';
        popup.style.opacity = '1';
      }
    });
    
    // Fix map containers
    const mapContainers = document.querySelectorAll('.mapboxgl-map, .map-container');
    mapContainers.forEach(container => {
      if (container instanceof HTMLElement) {
        container.style.overflow = 'visible';
      }
    });
  } catch (err) {
    console.error('Error applying marker fixes:', err);
  }
};

const setupMutationObserver = () => {
  try {
    // Create observer to watch for new markers being added to the DOM
    const observer = new MutationObserver((mutations) => {
      let shouldCheckMarkers = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              if (
                node.classList.contains('mapboxgl-marker') ||
                node.classList.contains('custom-marker') ||
                node.classList.contains('emergency-marker') ||
                node.className.includes('marker')
              ) {
                shouldCheckMarkers = true;
              }
            }
          });
        }
      });
      
      if (shouldCheckMarkers) {
        applyMarkerFixes();
      }
    });
    
    // Start observing the document body
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('Mutation observer set up for marker visibility');
  } catch (err) {
    console.error('Error setting up mutation observer:', err);
  }
};
