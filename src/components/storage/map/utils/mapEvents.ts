
/**
 * Sets up map event listeners for essential map functionality
 */
export const setupMapEventListeners = (map: mapboxgl.Map): void => {
  if (!map) return;
  
  // Prevent map interaction events from bubbling up
  map.getCanvas().addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Log render performance statistics
  map.on('render', () => {
    // This will only log warnings if the frame rate drops significantly
    const frameTime = map.getFrameTime();
    if (frameTime > 100) { // Only log slow frames (>100ms)
      console.warn(`Slow map render detected: ${frameTime.toFixed(1)}ms`);
    }
  });
  
  // Enhance marker visibility after style load
  map.once('style.load', () => {
    // Apply any additional style-dependent configurations
    document.querySelectorAll('.mapboxgl-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.zIndex = '9999';
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
      }
    });
  });
};

/**
 * Creates a click handler for the map container to prevent closing popups
 */
export const createMapClickHandler = (container: HTMLElement): void => {
  if (!container) return;
  
  container.addEventListener('click', (e) => {
    // Prevent clicks on the map from bubbling up to parent elements
    e.stopPropagation();
    
    // Ensure markers remain visible after clicks
    setTimeout(() => {
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
          marker.style.zIndex = '9999';
        }
      });
    }, 100);
  });
};

