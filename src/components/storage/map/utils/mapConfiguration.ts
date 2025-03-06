
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
      z-index: 999 !important;
      transform: translate(-50%, -50%);
      position: absolute;
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
  `;
  document.head.appendChild(style);
  
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
};
