
/**
 * Sets up map event listeners for essential map functionality
 */
export const setupMapEventListeners = (map: mapboxgl.Map): void => {
  if (!map) return;
  
  // Prevent map interaction events from bubbling up
  map.getCanvas().addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Log render performance statistics using timestamp tracking instead of getFrameTime
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
      }
    });
  });
  
  // Add mouseover effect to markers
  map.on('mousemove', () => {
    document.querySelectorAll('.custom-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.cursor = 'pointer';
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
      
      // Ensure popups stay visible
      document.querySelectorAll('.mapboxgl-popup').forEach(popup => {
        if (popup instanceof HTMLElement) {
          popup.style.zIndex = '10000';
          popup.style.pointerEvents = 'auto';
        }
      });
    }, 100);
  });
  
  // Add specific handler for map clicks
  const mapCanvas = container.querySelector('.mapboxgl-canvas');
  if (mapCanvas) {
    mapCanvas.addEventListener('click', (e) => {
      console.log('Click on map canvas detected, ensuring popups stay open');
    });
  }
};
