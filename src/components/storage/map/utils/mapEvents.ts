
/**
 * Sets up map event listeners for essential map functionality
 */
export const setupMapEventListeners = (map: mapboxgl.Map): void => {
  if (!map) return;
  
  // Prevent map interaction events from bubbling up
  map.getCanvas().addEventListener('click', (e) => {
    // Allow click events on popups to work
    if ((e.target as HTMLElement)?.closest('.mapboxgl-popup')) {
      return;
    }
    
    e.stopPropagation();
  });
  
  // Log render performance statistics
  let lastRenderTime = Date.now();
  
  map.on('render', () => {
    // Calculate frame time manually
    const currentTime = Date.now();
    const frameTime = currentTime - lastRenderTime;
    lastRenderTime = currentTime;
    
    // Only log slow frames (>100ms)
    if (frameTime > 100) {
      console.warn(`Slow map render detected: ${frameTime.toFixed(1)}ms`);
    }
  });
  
  // Handle popup close button clicks
  const handleCloseButtonClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement)?.closest('.mapboxgl-popup-close-button')) {
      e.preventDefault();
      e.stopPropagation();
      
      const popup = (e.target as HTMLElement).closest('.mapboxgl-popup');
      if (popup) {
        popup.remove();
      }
    }
  };
  
  // Add global listener for popup close button clicks
  document.addEventListener('click', handleCloseButtonClick, true);
  
  // Enhance marker visibility and interactivity after style load
  map.once('style.load', () => {
    // Apply any additional style-dependent configurations
    document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.zIndex = '9999';
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.pointerEvents = 'auto';
      }
    });
    
    // Fix for popup z-index issues
    document.querySelectorAll('.mapboxgl-popup').forEach(popup => {
      if (popup instanceof HTMLElement) {
        popup.style.zIndex = '10000';
        popup.style.pointerEvents = 'auto';
        
        // Ensure close button is clickable
        const closeButton = popup.querySelector('.mapboxgl-popup-close-button');
        if (closeButton instanceof HTMLElement) {
          closeButton.style.pointerEvents = 'all';
          closeButton.style.cursor = 'pointer';
        }
      }
    });
  });
};

/**
 * Creates a click handler for the map container to prevent closing popups
 */
export const createMapClickHandler = (container: HTMLElement): void => {
  if (!container) return;
  
  // Global handler to ensure markers and popups stay visible and interactive
  container.addEventListener('click', (e) => {
    // Don't interfere with popup interactions
    if ((e.target as HTMLElement)?.closest('.mapboxgl-popup')) {
      return;
    }
    
    // Don't interfere with marker interactions
    if ((e.target as HTMLElement)?.closest('.mapboxgl-marker, .custom-marker')) {
      return;
    }
    
    // Prevent clicks on the map from bubbling up to parent elements
    e.stopPropagation();
    
    // Log click for debugging
    console.log('Click on map container detected');
    
    // Force markers to remain visible after clicks
    setTimeout(() => {
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
          marker.style.zIndex = '9999';
          marker.style.pointerEvents = 'auto';
        }
      });
    }, 100);
  });
};
