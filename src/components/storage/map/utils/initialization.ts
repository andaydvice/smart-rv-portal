
import mapboxgl from 'mapbox-gl';

/**
 * Initializes Mapbox GL and prepares the WebGL context
 * @returns boolean indicating whether initialization was successful
 */
export const initializeMapboxGL = () => {
  if (!mapboxgl.supported()) {
    console.error('Your browser does not support Mapbox GL');
    return false;
  } else {
    try {
      // Pre-initialize WebGL context
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl', {
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: true,
        antialias: false // Disable antialiasing to reduce context loss
      });
      
      if (gl) {
        gl.getExtension('OES_element_index_uint');
        // Clear any existing context
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
      
      // Warm up the GL context
      mapboxgl.prewarm();
      console.log('MapboxGL initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing MapboxGL:', error);
      return false;
    }
  }
};

/**
 * Creates a new Mapbox GL map instance
 */
export const createMapInstance = (
  container: HTMLDivElement,
  mapToken: string,
  center: [number, number] = [-98.5795, 39.8283],
  zoom: number = 3
): mapboxgl.Map => {
  console.log('Setting up mapbox with token', mapToken.substring(0, 5) + '...');
  
  // Set the token
  mapboxgl.accessToken = mapToken;

  // Create map with optimized settings
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v11',
    center,
    zoom,
    preserveDrawingBuffer: true,
    antialias: false, // Disable antialiasing
    trackResize: true,
    attributionControl: true,
    renderWorldCopies: false, // Disable world copies to reduce rendering load
    failIfMajorPerformanceCaveat: false,
    maxZoom: 17, // Limit max zoom to reduce tile requests
    minZoom: 2, // Set minimum zoom
    hash: false, // Disable hash
    refreshExpiredTiles: false, // Disable tile refresh
    logoPosition: 'bottom-left',
    cooperativeGestures: false, // Disable cooperative gestures for better mobile experience
    interactive: true, // Ensure the map is interactive
    pitchWithRotate: false, // Disable pitch with rotate for simpler navigation
  });
  
  // Add load event listener to debug loading issues
  map.on('load', () => {
    console.log('Map load event fired');
    
    // Force canvas to be visible
    const canvas = map.getCanvas();
    if (canvas) {
      canvas.style.visibility = 'visible';
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
    }
  });
  
  // Add error event listener
  map.on('error', (e) => {
    console.error('Mapbox error:', e);
  });

  return map;
};

/**
 * Waits for the map style to be fully loaded
 */
export const waitForMapStyleLoad = (map: mapboxgl.Map): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!map) {
      reject(new Error('Map instance is null or undefined'));
      return;
    }

    if (map.isStyleLoaded()) {
      console.log('Map style already loaded');
      resolve();
      return;
    }

    // Set a timeout to avoid hanging if the style never loads
    const timeout = setTimeout(() => {
      console.warn('Map style load timeout - continuing anyway');
      resolve();
    }, 5000); // Reduced from 10s to 5s to prevent long hangs

    // Listen for the styledata event
    const styleListener = () => {
      console.log('Map style loaded via event');
      clearTimeout(timeout);
      map.off('styledata', styleListener);
      resolve();
    };

    map.on('styledata', styleListener);
    
    // Also check for the style.load event
    map.once('style.load', () => {
      console.log('Map style.load event fired');
      clearTimeout(timeout);
      map.off('styledata', styleListener);
      resolve();
    });
  });
};

/**
 * Configures map settings after initialization
 */
export const configureMapSettings = (map: mapboxgl.Map): void => {
  if (!map) return;
  
  // Apply performance optimizations
  map.dragRotate.disable(); // Disable 3D rotation for better performance
  
  // Set better defaults for marker visibility
  map.getCanvas().style.cursor = 'default';
  
  // Force hardware acceleration if available
  const canvas = map.getCanvas();
  canvas.style.transform = 'translate3d(0,0,0)';
  
  // Add a custom event for map ready state
  setTimeout(() => {
    map.fire('map.ready');
    console.log('Map ready event fired');
    
    // Force canvas to be visible again
    const canvas = map.getCanvas();
    if (canvas) {
      canvas.style.visibility = 'visible';
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
    }
  }, 300); // Reduced from 500ms to 300ms
};
