
import mapboxgl from 'mapbox-gl';

/**
 * Sets up event listeners for the map to handle popup interactions
 */
export const setupMapEventListeners = (map: mapboxgl.Map): void => {
  // Add global click handler to prevent popup closing
  const container = map.getContainer();
  container.addEventListener('click', (e) => {
    // If we clicked a marker or popup, stop propagation
    if ((e.target as HTMLElement)?.closest('.custom-marker') || 
        (e.target as HTMLElement)?.closest('.mapboxgl-popup')) {
      e.stopPropagation();
      console.log('Prevented map click from closing popup');
    } else {
      // For debugging, log regular map clicks
      console.log('Regular map click detected');
    }
  }, true); // Use capture phase
  
  // Setup debug event listeners
  map.on('idle', () => {
    console.log('Map is idle and ready for markers');
  });
};

/**
 * Creates a click handler for map containers to prevent popup closing
 */
export const createMapClickHandler = (mapEl: HTMLElement): void => {
  mapEl.addEventListener('click', (e) => {
    // Only prevent default behavior if NOT clicking a marker (so marker clicks work)
    if (!(e.target as HTMLElement)?.closest('.custom-marker')) {
      console.log('Map container click - keeping popups open');
    }
  }, true);
};
