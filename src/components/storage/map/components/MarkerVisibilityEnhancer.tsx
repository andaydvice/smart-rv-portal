
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
    
    // Set up periodic visibility enhancement
    const timer = setInterval(() => {
      enhanceVisibility();
    }, 500);
    
    return () => {
      clearInterval(timer);
    };
  }, [enhanceVisibility]);

  // This is a utility component with no visual output
  return null;
};

export default MarkerVisibilityEnhancer;
