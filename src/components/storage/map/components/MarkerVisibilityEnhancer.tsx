
import React, { useEffect } from 'react';

/**
 * Component that periodically forces marker visibility
 * to ensure map markers remain clickable and visible
 */
const MarkerVisibilityEnhancer: React.FC<{
  enhanceVisibility: () => void;
}> = ({ enhanceVisibility }) => {
  useEffect(() => {
    // Run visibility enhancement immediately
    enhanceVisibility();
    
    // Run again after a short delay to handle initial rendering issues
    const initialTimer = setTimeout(enhanceVisibility, 100);
    
    // Set up more aggressive periodic visibility enhancement
    const timer = setInterval(() => {
      enhanceVisibility();
    }, 300); // More frequent updates for better visibility
    
    // Set up a mutation observer to detect DOM changes that might affect markers
    const observer = new MutationObserver((mutations) => {
      // Check if any mutations might be affecting our markers
      const shouldEnhance = mutations.some(mutation => 
        mutation.target instanceof HTMLElement && 
        (mutation.target.classList.contains('mapboxgl-map') || 
         mutation.target.closest('.mapboxgl-map'))
      );
      
      if (shouldEnhance) {
        enhanceVisibility();
      }
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
      observer.disconnect();
    };
  }, [enhanceVisibility]);

  // This is a utility component with no visual output
  return null;
};

export default MarkerVisibilityEnhancer;
