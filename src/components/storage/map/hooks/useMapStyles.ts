
import { useEffect } from 'react';
import { applyMapStyles } from '../utils/mapConfiguration';

export const useMapStyles = () => {
  useEffect(() => {
    // Apply custom CSS styles for map elements
    const cleanup = applyMapStyles();
    
    // Clean up on unmount
    return () => {
      cleanup();
    };
  }, []);
};
