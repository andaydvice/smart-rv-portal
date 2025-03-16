
import { useCallback } from 'react';

/**
 * Hook for handling marker visibility
 */
export const useMarkerVisibility = () => {
  // Force marker visibility function
  const forceMarkerVisibility = useCallback(() => {
    document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.opacity = '1';
      }
    });
  }, []);

  return {
    forceMarkerVisibility
  };
};
