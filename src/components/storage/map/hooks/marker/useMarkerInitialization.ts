
import { useEffect, useRef } from 'react';

/**
 * Hook to handle global marker initialization and cleanup
 */
export const useMarkerInitialization = () => {
  // Use a reference to track if the component is mounted
  const isMounted = useRef(true);
  
  useEffect(() => {
    isMounted.current = true;
    
    // Create global storage for persistent markers if it doesn't exist
    if (typeof window !== 'undefined' && !window._persistentMarkers) {
      window._persistentMarkers = {};
    }
    
    // Add global event listener to handle popup clicks (persists across re-renders)
    const handleDocumentClick = (e: MouseEvent) => {
      // Don't close popups when clicking on the map or other elements
      if ((e.target as Element)?.closest('.mapboxgl-popup-content') ||
          (e.target as Element)?.closest('.custom-marker')) {
        // Prevent default actions for popup interactions
        e.stopPropagation();
      }
    };
    
    document.addEventListener('click', handleDocumentClick, true);
    
    return () => {
      isMounted.current = false;
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  return {
    isMounted
  };
};
