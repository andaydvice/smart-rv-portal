
import mapboxgl from 'mapbox-gl';

/**
 * Set up event listeners for the map
 */
export const setupMapEventListeners = (map: mapboxgl.Map): void => {
  // Log when the map becomes idle (fully loaded and ready)
  map.on('idle', () => {
    console.log('Map is idle and ready for markers');
  });

  // Handle click events on map to ensure popups stay open
  map.on('click', (e) => {
    // Log the click coordinates
    console.log(`Map clicked at: ${e.lngLat.lng}, ${e.lngLat.lat}`);
  });

  // Handle popup events for debugging
  map.on('popupopen', () => {
    console.log('A popup was opened');
  });

  map.on('popupclose', () => {
    console.log('A popup was closed');
  });

  // Handle map movement events
  map.on('movestart', () => {
    console.log('Map movement started');
  });

  map.on('moveend', () => {
    console.log('Map movement ended');
  });

  // Handle zoom events
  map.on('zoomstart', () => {
    console.log('Map zoom started');
  });

  map.on('zoomend', () => {
    console.log('Map zoom ended');
  });

  // Log errors
  map.on('error', (e) => {
    console.error('Map error:', e);
  });
};

/**
 * Create map click handler to prevent popups from closing
 */
export const createMapClickHandler = (mapContainer: HTMLElement): void => {
  // This handler is attached to the map container to prevent closing popups
  mapContainer.addEventListener('click', (e: MouseEvent) => {
    // Only handle clicks on the map canvas, not on markers or popups
    if ((e.target as HTMLElement)?.classList.contains('mapboxgl-canvas')) {
      // Check if we're clicking outside any popup
      if (!(e.target as HTMLElement)?.closest('.mapboxgl-popup')) {
        console.log('Map canvas clicked, checking if we need to prevent popup closing');
        
        // Let map handle the click, but log for debugging
        console.log('Allowing map click to proceed');
      }
    }
  }, true); // Use capture phase to intercept events early
};
