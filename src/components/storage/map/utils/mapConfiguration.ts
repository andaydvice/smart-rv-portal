
import { toast } from "sonner";

/**
 * Applies necessary styles for map elements
 */
export const applyMapStyles = () => {
  // Create a style element
  const styleElement = document.createElement('style');
  styleElement.id = 'mapbox-custom-styles';
  styleElement.textContent = `
    .mapboxgl-marker {
      z-index: 9999 !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      display: block !important;
    }
    
    .mapboxgl-popup {
      z-index: 10000 !important;
      visibility: visible !important;
    }
    
    .mapboxgl-popup-content {
      z-index: 10000 !important;
      pointer-events: auto !important;
      background-color: #151A22 !important;
      color: white !important;
      border-radius: 8px !important;
      padding: 15px !important;
      visibility: visible !important;
    }
    
    .mapboxgl-popup-close-button {
      color: white !important;
      right: 5px !important;
      top: 5px !important;
      z-index: 10001 !important;
    }
    
    .custom-marker {
      z-index: 9999 !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      display: block !important;
    }
  `;
  
  // Add to document
  document.head.appendChild(styleElement);
  
  if (import.meta.env.DEV) {
    toast.info('Enhanced map marker visibility');
  }
  
  // Return cleanup function
  return () => {
    const existingStyle = document.getElementById('mapbox-custom-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
  };
};
