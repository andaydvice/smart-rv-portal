
import mapboxgl from 'mapbox-gl';

/**
 * Waits for map style to load with timeout
 */
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

/**
 * Applies CSS styles for popups and markers to ensure proper rendering
 */
export const applyMapStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .mapboxgl-popup {
      z-index: 10000 !important;
    }
    .mapboxgl-popup-content {
      z-index: 10000 !important;
      pointer-events: auto !important;
      padding: 15px !important;
      border-radius: 8px !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
      background-color: #151A22 !important;
      color: white !important;
      border: 1px solid #1a202c !important;
    }
    .custom-marker {
      cursor: pointer !important;
      z-index: 2000 !important;
      transform: translate(-50%, -50%);
      position: absolute;
      display: block !important;
      width: 40px !important;
      height: 40px !important;
      border-radius: 50% !important;
      background-color: #F97316 !important;
      border: 4px solid white !important;
      box-shadow: 0 0 15px rgba(0,0,0,0.8) !important;
      pointer-events: auto !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
    .marker-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
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
    
    /* Ensure marker visibility */
    .mapboxgl-marker {
      z-index: 2000 !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    
    /* Fix marker container visibility */
    .mapboxgl-marker svg,
    .mapboxgl-marker div {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);
  
  // Force marker visibility on window resize
  window.addEventListener('resize', () => {
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.visibility = 'visible';
        marker.style.opacity = '1';
        marker.style.zIndex = '2000';
      }
    });
  });
  
  return () => {
    document.head.removeChild(style);
  };
};

/**
 * Configures the map with proper settings and bounds
 */
export const configureMapSettings = (map: mapboxgl.Map): void => {
  // Ensure popups appear above other elements
  map.getContainer().style.zIndex = '1';
  
  // Enable touch interactions explicitly to ensure popups work on mobile
  if (map.touchZoomRotate) {
    map.touchZoomRotate.enable();
  }
  
  // Setting max bounds to prevent users from getting lost
  map.setMaxBounds([
    [-180, -85], // Southwest coordinates
    [180, 85]    // Northeast coordinates
  ]);
  
  // Add custom layer to ensure markers show above all map layers
  map.on('load', () => {
    if (!map.getLayer('markers-layer')) {
      map.addLayer({
        id: 'markers-layer',
        type: 'background',
        paint: {
          'background-opacity': 0
        }
      });
    }
  });
};
