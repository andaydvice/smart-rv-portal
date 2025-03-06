
import { useEffect } from 'react';

/**
 * Hook to apply global CSS styles for Mapbox elements
 */
export const useMapStyles = () => {
  useEffect(() => {
    // Apply global styles once when component mounts
    const style = document.createElement('style');
    style.innerHTML = `
      /* Base marker styles */
      .mapboxgl-marker, .custom-marker {
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
        z-index: 99 !important;
        cursor: pointer !important;
      }
      
      /* Base popup styles */
      .mapboxgl-popup {
        z-index: 100 !important;
        visibility: visible !important;
      }
      
      /* Optimizations for performance */
      .mapboxgl-popup-content {
        will-change: transform;
        transform: translateZ(0);
      }
      
      /* Ensure popups are clickable */
      .mapboxgl-popup-content {
        pointer-events: all !important;
      }
      
      /* Fix close button visibility */
      .mapboxgl-popup-close-button {
        z-index: 101 !important;
        font-size: 16px !important;
        pointer-events: all !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Class for markers with highlighted state */
      .custom-marker[data-highlighted="true"] {
        background-color: #10B981 !important;
        border: 2px solid white !important;
        box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
      }
      
      /* Apply hardware acceleration for smooth animations */
      .mapboxgl-canvas {
        transform: translate3d(0,0,0);
      }
      
      /* Optimized rendering for markers */
      .show-map-markers .mapboxgl-marker {
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
};
