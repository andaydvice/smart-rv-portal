
import mapboxgl from 'mapbox-gl';

export const useMarkerClickHandlers = () => {
  /**
   * Creates a robust click handler for markers that won't be garbage collected
   */
  const createMarkerClickHandler = (
    marker: mapboxgl.Marker,
    facilityId: string,
    facilityName: string,
    onMarkerClick: (facilityId: string) => void
  ): ((e: MouseEvent) => void) => {
    // Define a more robust click handler that won't be garbage collected
    const handleMarkerClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`Marker clicked for: ${facilityName} (ID: ${facilityId})`);
      
      // Call the click handler first (this navigates or shows details)
      onMarkerClick(facilityId);
      
      // Then handle the popup toggle
      if (!marker.getPopup().isOpen()) {
        marker.togglePopup();
      }
      
      // Ensure popup is visible and clickable
      setTimeout(() => {
        const popupElement = document.querySelector(`.mapboxgl-popup[data-facility-id="${facilityId}"]`);
        if (popupElement instanceof HTMLElement) {
          popupElement.style.zIndex = '10000';
          popupElement.style.visibility = 'visible';
          popupElement.style.display = 'block';
          popupElement.style.pointerEvents = 'all';
          
          // Ensure the close button works
          const closeButton = popupElement.querySelector('.mapboxgl-popup-close-button');
          if (closeButton instanceof HTMLElement) {
            closeButton.style.pointerEvents = 'all';
            closeButton.style.cursor = 'pointer';
            
            // Ensure close button has proper event handler
            closeButton.addEventListener('click', (e) => {
              e.stopPropagation();
              marker.getPopup().remove();
            });
          }
          
          // Make "View Details" button functional
          const viewButton = popupElement.querySelector('.view-facility-btn');
          if (viewButton instanceof HTMLElement) {
            viewButton.style.pointerEvents = 'all';
            viewButton.style.cursor = 'pointer';
            viewButton.addEventListener('click', (e) => {
              e.stopPropagation();
              onMarkerClick(facilityId);
            });
          }
        }
      }, 50);
    };
    
    return handleMarkerClick;
  };

  /**
   * Applies a click handler to a marker element
   */
  const applyClickHandlerToMarker = (
    markerElement: HTMLElement,
    marker: mapboxgl.Marker,
    facilityId: string,
    facilityName: string,
    onMarkerClick: (facilityId: string) => void
  ): void => {
    // Create the click handler
    const handleMarkerClick = createMarkerClickHandler(
      marker,
      facilityId,
      facilityName,
      onMarkerClick
    );
    
    // Remove any existing click listeners to prevent duplicates
    const oldHandler = markerElement.getAttribute('data-click-handler');
    if (oldHandler) {
      markerElement.removeEventListener('click', (window as any)[oldHandler] as EventListener);
    }
    
    // Add new click event handler
    markerElement.addEventListener('click', handleMarkerClick);
    
    // Store handler reference for later cleanup - using window object instead of globalThis
    const handlerName = `marker_handler_${facilityId.replace(/[^a-zA-Z0-9]/g, '_')}`;
    (window as any)[handlerName] = handleMarkerClick;
    markerElement.setAttribute('data-click-handler', handlerName);
  };

  return {
    createMarkerClickHandler,
    applyClickHandlerToMarker
  };
};
