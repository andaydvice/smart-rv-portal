
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
          marker.style.zIndex = '9999';
          marker.style.pointerEvents = 'auto';
          marker.style.display = 'block';
        }
      });
      
      document.querySelectorAll('.custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
          marker.style.zIndex = '9999';
          marker.style.pointerEvents = 'auto';
          marker.style.display = 'block';
        }
      });
    };
    
    // Apply styles immediately and repeatedly to ensure they take effect
    forceMarkerStyles();
    const styleInterval = setInterval(forceMarkerStyles, 300);
    
    // Clean up on unmount
    return () => {
      cleanup();
      clearInterval(styleInterval);
    };
  }, []);
};
