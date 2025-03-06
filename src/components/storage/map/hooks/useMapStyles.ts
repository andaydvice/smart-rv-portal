
import { useEffect } from 'react';

/**
 * Hook to add global CSS styles for mapbox elements
 */
export const useMapStyles = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .mapboxgl-popup {
        z-index: 9999 !important;
      }
      .mapboxgl-popup-content {
        z-index: 9999 !important;
        pointer-events: auto !important;
      }
      .custom-marker {
        cursor: pointer !important;
        z-index: 999 !important;
      }
      
      /* Ensure popup stays visible by overriding any conflicting CSS */
      .mapboxgl-popup-close-button {
        color: white !important;
        font-size: 18px !important;
        margin: 5px !important;
      }
      
      /* Make popup content clickable */
      .popup-content {
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
};
