
import { useEffect } from 'react';
import { applyMapStyles } from '../utils/mapConfiguration';

export const useMapStyles = () => {
  useEffect(() => {
    // Apply custom CSS styles for map elements
    console.log('Applying map styles for better marker visibility');
    const cleanup = applyMapStyles();
    
    // Add additional global styles for markers
    const forceMarkerStyles = () => {
      document.querySelectorAll('.mapboxgl-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
          marker.style.zIndex = '2000';
          marker.style.pointerEvents = 'auto';
        }
      });
    };
    
    // Apply styles immediately and after a short delay
    forceMarkerStyles();
    const styleInterval = setInterval(forceMarkerStyles, 500);
    
    // Clean up on unmount
    return () => {
      cleanup();
      clearInterval(styleInterval);
    };
  }, []);
};
