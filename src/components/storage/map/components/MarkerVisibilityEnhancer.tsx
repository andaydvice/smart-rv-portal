
import React, { useEffect } from 'react';

interface MarkerVisibilityEnhancerProps {
  enhanceVisibility: () => void;
  interval?: number;
}

/**
 * Component that periodically runs the visibility enhancement function
 */
const MarkerVisibilityEnhancer: React.FC<MarkerVisibilityEnhancerProps> = ({
  enhanceVisibility,
  interval = 2000
}) => {
  useEffect(() => {
    // Run once immediately
    enhanceVisibility();
    
    // Set up interval to continuously check marker visibility
    const intervalId = setInterval(() => {
      enhanceVisibility();
    }, interval);
    
    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [enhanceVisibility, interval]);

  // This is a utility component with no visual representation
  return null;
};

export default MarkerVisibilityEnhancer;
