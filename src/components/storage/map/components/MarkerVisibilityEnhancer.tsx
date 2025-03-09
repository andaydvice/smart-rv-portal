
import React, { useEffect, useRef } from 'react';

/**
 * Component that periodically forces marker visibility with performance optimizations
 */
const MarkerVisibilityEnhancer: React.FC<{
  enhanceVisibility: () => void;
}> = ({ enhanceVisibility }) => {
  // Use refs to track state between renders
  const lastRunRef = useRef<number>(0);
  const pendingUpdateRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  
  // Track visibility changes to reduce unnecessary work
  useEffect(() => {
    // Throttled visibility function that only runs if enough time has passed
    const throttledEnhance = () => {
      const now = Date.now();
      // Only run if at least 1000ms have passed since last run
      if (now - lastRunRef.current > 1000) {
        enhanceVisibility();
        lastRunRef.current = now;
      }
    };
    
    // Initial run
    throttledEnhance();
    
    // Use visibility change event to optimize performance when tab is not active
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
      
      // When becoming visible again, immediately enhance
      if (isVisibleRef.current) {
        throttledEnhance();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Optimized interval that respects visibility
    const intervalFn = () => {
      // Only process when tab is visible
      if (isVisibleRef.current) {
        // Only run if there are actual markers to enhance
        const hasMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker').length > 0;
        
        if (hasMarkers) {
          throttledEnhance();
        }
      }
      
      // Schedule next update
      pendingUpdateRef.current = window.setTimeout(intervalFn, 2000);
    };
    
    // Start the interval
    pendingUpdateRef.current = window.setTimeout(intervalFn, 2000);
    
    // Use a more lightweight mutation observer with better selectors
    const observer = new MutationObserver((mutations) => {
      // Only process when tab is visible
      if (!isVisibleRef.current) return;
      
      // Check if any relevant mutations occurred
      const hasRelevantMutation = mutations.some(mutation => {
        if (mutation.type !== 'childList' || mutation.addedNodes.length === 0) {
          return false;
        }
        
        // Only process if mutation is related to maps or markers
        return mutation.target instanceof HTMLElement && (
          mutation.target.classList.contains('mapboxgl-map') ||
          mutation.target.classList.contains('mapboxgl-markers-container') ||
          mutation.target.closest('.mapboxgl-map')
        );
      });
      
      if (hasRelevantMutation) {
        throttledEnhance();
      }
    });
    
    // Observe only the map container for better performance
    const mapContainer = document.querySelector('.mapboxgl-map');
    if (mapContainer) {
      observer.observe(mapContainer, { 
        childList: true, 
        subtree: true,
        attributes: false // Don't watch attributes for better performance
      });
    }
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (pendingUpdateRef.current !== null) {
        clearTimeout(pendingUpdateRef.current);
      }
      observer.disconnect();
    };
  }, [enhanceVisibility]);

  // This is a utility component with no visual output
  return null;
};

export default React.memo(MarkerVisibilityEnhancer);
