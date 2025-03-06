
import mapboxgl from 'mapbox-gl';

// Prevent WebGL context errors in Firefox
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
  const mapInstance = new mapboxgl.Map({
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
  
  // Disable map fog for better performance
  mapInstance.once('style.load', () => {
    // Ensure popups appear above other elements
    mapInstance.getContainer().style.zIndex = '1';
    
    // Add global click handler to prevent popup closing
    const container = mapInstance.getContainer();
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
  });
  
  // Add debug event listeners
  mapInstance.on('load', () => {
    console.log('Map fully loaded');
    
    // Enable touch interactions explicitly to ensure popups work on mobile
    if (mapInstance.touchZoomRotate) {
      mapInstance.touchZoomRotate.enable();
    }
    
    // Setting max bounds to prevent users from getting lost
    mapInstance.setMaxBounds([
      [-180, -85], // Southwest coordinates
      [180, 85]    // Northeast coordinates
    ]);
    
    // Add global CSS for popups - also ensures they work
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-popup {
        z-index: 10000 !important;
      }
      .mapboxgl-popup-content {
        z-index: 10000 !important;
        pointer-events: auto !important;
      }
      .custom-marker {
        cursor: pointer !important;
        z-index: 999 !important;
      }
      /* Prevent popup closing by ensuring clicking on map doesn't close it */
      .mapboxgl-popup-close-button {
        font-size: 20px !important;
        color: white !important;
        background: rgba(0,0,0,0.2) !important;
        border-radius: 50% !important;
        width: 24px !important;
        height: 24px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        top: 5px !important;
        right: 5px !important;
      }
    `;
    document.head.appendChild(style);
  });
  
  mapInstance.on('idle', () => {
    console.log('Map is idle and ready for markers');
  });
  
  return mapInstance;
};

export const waitForMapStyleLoad = (map: mapboxgl.Map): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (map.isStyleLoaded()) {
      console.log('Map style already loaded');
      resolve();
      return;
    }
    
    console.log('Waiting for map style to load...');
    const timeoutId = setTimeout(() => {
      reject(new Error('Map style load timeout after 15 seconds'));
    }, 15000); // Increased timeout

    map.once('style.load', () => {
      clearTimeout(timeoutId);
      console.log('Map style loaded event fired');
      resolve();
    });
  });
};

export const fitMapToBounds = (
  map: mapboxgl.Map, 
  facilities: Array<{ longitude: number | string; latitude: number | string }>,
  padding: number = 50,
  maxZoom: number = 10
): void => {
  try {
    if (!facilities || facilities.length === 0) {
      console.warn('No facilities provided to fit bounds');
      return;
    }
    
    // Calculate bounds of all facilities
    const bounds = new mapboxgl.LngLatBounds();
    let validCoordinatesCount = 0;
    
    facilities.forEach(facility => {
      try {
        const lng = typeof facility.longitude === 'string' ? 
          parseFloat(facility.longitude) : Number(facility.longitude);
        const lat = typeof facility.latitude === 'string' ? 
          parseFloat(facility.latitude) : Number(facility.latitude);
          
        if (!isNaN(lng) && !isNaN(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
          bounds.extend([lng, lat]);
          validCoordinatesCount++;
        }
      } catch (e) {
        console.warn('Invalid facility coordinates:', facility);
      }
    });
    
    console.log(`Fitting map to bounds with ${validCoordinatesCount} valid coordinates`);
    
    // Fit map to these bounds if we have valid coordinates
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding,
        maxZoom
      });
    } else {
      console.warn('No valid coordinates to fit bounds');
      // Default to US view if no valid coordinates
      map.flyTo({
        center: [-98.5795, 39.8283],
        zoom: 3
      });
    }
  } catch (error) {
    console.error('Error setting map bounds:', error);
  }
};
