
import { useCallback } from 'react';
import { UseMarkerVisibilityProps } from './types';

export const useMarkerVisibility = ({ map }: UseMarkerVisibilityProps) => {
  // Function to ensure markers are visible - using useCallback for stability
  const forceMarkerVisibility = useCallback(() => {
    // Use more efficient DOM operations - batch operations with DocumentFragment
    const markerElements = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    
    // Only perform operations if there are markers to update
    if (markerElements.length === 0) return;
    
    // Use a more efficient approach - apply a common class rather than individual styles
    document.body.classList.add('show-map-markers');
    
    // Apply critical styles to marker elements
    markerElements.forEach(marker => {
      if (marker instanceof HTMLElement && !marker.hasAttribute('data-visible')) {
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.opacity = '1';
        marker.setAttribute('data-visible', 'true');
      }
    });
    
    // Optimize popup visibility - only target visible popups
    document.querySelectorAll('.mapboxgl-popup:not([data-optimized])').forEach(popup => {
      if (popup instanceof HTMLElement) {
        popup.style.zIndex = '100';
        popup.setAttribute('data-optimized', 'true');
      }
    });
  }, []);

  return {
    forceMarkerVisibility
  };
};
