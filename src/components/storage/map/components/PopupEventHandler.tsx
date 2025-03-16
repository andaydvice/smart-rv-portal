
import React, { useEffect } from 'react';

interface PopupEventHandlerProps {
  map: mapboxgl.Map;
  onMarkerClick: (facilityId: string) => void;
}

const PopupEventHandler: React.FC<PopupEventHandlerProps> = ({ map, onMarkerClick }) => {
  // Set up event delegation for popups
  useEffect(() => {
    const handlePopupInteractions = (e: MouseEvent) => {
      // Handle close button clicks
      if ((e.target as HTMLElement)?.closest('.mapboxgl-popup-close-button')) {
        e.preventDefault();
        e.stopPropagation();
        
        const popup = (e.target as HTMLElement).closest('.mapboxgl-popup');
        if (popup) {
          popup.remove();
        }
      }
      
      // Handle view details button clicks
      if ((e.target as HTMLElement)?.closest('.view-facility-btn')) {
        e.preventDefault();
        e.stopPropagation();
        
        const btn = (e.target as HTMLElement).closest('.view-facility-btn');
        const facilityId = btn?.getAttribute('data-facility-id');
        if (facilityId) {
          onMarkerClick(facilityId);
        }
      }
    };
    
    map.getContainer().addEventListener('click', handlePopupInteractions);
    
    return () => {
      map.getContainer().removeEventListener('click', handlePopupInteractions);
    };
  }, [map, onMarkerClick]);

  // This is a utility component with no visual representation
  return null;
};

export default PopupEventHandler;
