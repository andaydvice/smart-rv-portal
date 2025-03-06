
import { useEffect } from 'react';
import { applyMapStyles } from '../utils/mapboxInit';

/**
 * Hook to add global CSS styles for mapbox elements
 */
export const useMapStyles = () => {
  useEffect(() => {
    // Use the utility function to apply styles and get cleanup function
    const removeStyles = applyMapStyles();
    
    // Return cleanup function
    return removeStyles;
  }, []);
};
