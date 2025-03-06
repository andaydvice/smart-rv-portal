
import { useEffect } from 'react';

/**
 * Hook to handle global click events to prevent popups from closing unintentionally
 */
export const usePopupClickHandler = () => {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Check if clicked element is part of a popup
      const isPopupClick = (e.target as HTMLElement)?.closest('.mapboxgl-popup');
      const isMarkerClick = (e.target as HTMLElement)?.closest('.custom-marker');
      
      if (isPopupClick || isMarkerClick) {
        // Stop event from reaching map and closing popup
        e.stopPropagation();
        console.log('Global click handler: prevented click from closing popup');
      }
    };

    // Use capture phase to intercept events before they reach map
    document.addEventListener('click', handleGlobalClick, true);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);
};
