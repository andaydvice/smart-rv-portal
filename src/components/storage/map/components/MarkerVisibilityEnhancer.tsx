
import React, { useEffect, useRef } from 'react';

/**
 * Component that periodically forces marker visibility with performance optimizations
 */
const MarkerVisibilityEnhancer: React.FC<{
  enhanceVisibility: () => void;
}> = ({ enhanceVisibility }) => {
  // Use ref to track last execution time to prevent too-frequent updates
  const lastRunRef = useRef<number>(0);

  useEffect(() => {
    // Runs visibility enhancement initially
    enhanceVisibility();
    
    // Check if markers are present before setting up expensive watchers
    const hasMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker').length > 0;
    
    // Only set up interval if we actually have markers
    if (!hasMarkers) return;
    
    // Use a longer interval for better performance
    const timer = setInterval(() => {
      const now = Date.now();
      // Only run if at least 1000ms have passed since last run
      if (now - lastRunRef.current > 1000) {
        enhanceVisibility();
        lastRunRef.current = now;
      }
    }, 1000);
    
    // Use a more lightweight mutation observer
    const observer = new MutationObserver((mutations) => {
      // Only run on significant DOM changes to map container
      const isMapChange = mutations.some(mutation => 
        mutation.type === 'childList' && 
        mutation.addedNodes.length > 0 &&
        mutation.target instanceof HTMLElement &&
        (mutation.target.classList.contains('mapboxgl-map') ||
         mutation.target.closest('.mapboxgl-map'))
      );
      
      if (isMapChange) {
        const now = Date.now();
        // Throttle execution to max once per 500ms
        if (now - lastRunRef.current > 500) {
          enhanceVisibility();
          lastRunRef.current = now;
        }
      }
    });
    
    // Observe only the map container for better performance
    const mapContainer = document.querySelector('.mapboxgl-map');
    if (mapContainer) {
      observer.observe(mapContainer, { 
        childList: true, 
        subtree: true,
        attributes: false
      });
    }
    
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [enhanceVisibility]);

  // This is a utility component with no visual output
  return null;
};

export default MarkerVisibilityEnhancer;
