
import mapboxgl from 'mapbox-gl';

/**
 * Initializes Mapbox GL and prepares the WebGL context
 * @returns boolean indicating whether initialization was successful
 */
export const initializeMapboxGL = () => {
  if (!mapboxgl.supported()) {
    console.error('Your browser does not support Mapbox GL');
    alert('Your browser does not support Mapbox GL');
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
  return new mapboxgl.Map({
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
};
