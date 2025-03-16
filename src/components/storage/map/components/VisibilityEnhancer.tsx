
import React, { useEffect, useCallback } from 'react';
import MarkerVisibilityEnhancer from './MarkerVisibilityEnhancer';
import { testMarkerVisibility } from '@/utils/markers/testing/core/testVisibility';

interface VisibilityEnhancerProps {
  enhanceVisibility: () => void;
}

const VisibilityEnhancer: React.FC<VisibilityEnhancerProps> = ({ enhanceVisibility }) => {
  // Memoize the visibility enhancer function to prevent unnecessary re-renders
  const enhanceVisibilityCallback = useCallback(enhanceVisibility, [enhanceVisibility]);

  // Run visibility test after marker creation in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        testMarkerVisibility();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <MarkerVisibilityEnhancer enhanceVisibility={enhanceVisibilityCallback} />
  );
};

export default VisibilityEnhancer;
