
import { useCallback } from 'react';
import { UseMarkerVisibilityProps } from './types';

export const useMarkerVisibility = ({ map }: UseMarkerVisibilityProps) => {
  // Function to ensure markers are visible - using useCallback for stability
  const forceMarkerVisibility = useCallback(() => {
    // Force all markers to be visible and interactive
    document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.cssText += `
          visibility: visible !important;
          opacity: 1 !important;
          display: block !important;
          z-index: 1000 !important;
          pointer-events: all !important;
          cursor: pointer !important;
        `;
      }
    });
    
    // Force all popups to be visible and interactive with higher z-index
    document.querySelectorAll('.mapboxgl-popup, .mapboxgl-popup-content').forEach(popup => {
      if (popup instanceof HTMLElement) {
        popup.style.cssText += `
          z-index: 1100 !important;
          visibility: visible !important;
          pointer-events: all !important;
          display: block !important;
        `;
      }
    });
    
    // Fix popup close buttons
    document.querySelectorAll('.mapboxgl-popup-close-button').forEach(button => {
      if (button instanceof HTMLElement) {
        button.style.cssText += `
          z-index: 1110 !important;
          pointer-events: all !important;
        `;
      }
    });
  }, []);

  return {
    forceMarkerVisibility
  };
};
