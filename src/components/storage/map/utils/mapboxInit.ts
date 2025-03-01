
import mapboxgl from 'mapbox-gl';

// Prevent WebGL context errors in Firefox
export const initializeMapboxGL = () => {
  if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
    return false;
  } else {
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
    return true;
  }
};

export const createMapInstance = (
  container: HTMLDivElement,
  mapToken: string,
  center: [number, number] = [-98.5795, 39.8283],
  zoom: number = 3
): mapboxgl.Map => {
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
    refreshExpiredTiles: false // Disable tile refresh
  });
};

export const waitForMapStyleLoad = (map: mapboxgl.Map): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Map style load timeout'));
    }, 10000);

    map.once('style.load', () => {
      clearTimeout(timeoutId);
      resolve();
    });
  });
};

export const fitMapToBounds = (
  map: mapboxgl.Map, 
  facilities: Array<{ longitude: number; latitude: number }>,
  padding: number = 50,
  maxZoom: number = 10
): void => {
  try {
    // Calculate bounds of all facilities
    const bounds = new mapboxgl.LngLatBounds();
    facilities.forEach(facility => {
      if (facility.longitude && facility.latitude) {
        bounds.extend([facility.longitude, facility.latitude]);
      }
    });
    
    // Fit map to these bounds if we have valid coordinates
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding,
        maxZoom
      });
    }
  } catch (error) {
    console.error('Error setting map bounds:', error);
  }
};
