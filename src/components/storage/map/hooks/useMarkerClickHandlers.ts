
import mapboxgl from 'mapbox-gl';
import { createEdgeAwareClickHandler } from '@/utils/markers/forcing/edge-aware';

export const useMarkerClickHandlers = () => {
  /**
   * Creates a robust click handler for markers that won't be garbage collected
   */
  const createMarkerClickHandler = (
    marker: mapboxgl.Marker,
    facilityId: string,
    facilityName: string,
    onMarkerClick: (facilityId: string) => void,
    map: mapboxgl.Map
  ): ((e: MouseEvent) => void) => {
    // Define a more robust click handler that won't be garbage collected
    const handleMarkerClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      
      
      // Call the click handler first (this navigates or shows details)
      onMarkerClick(facilityId);
      
      // Apply edge-aware positioning to ensure marker and popup are fully visible
      const markerElement = marker.getElement();
      const coordinates = marker.getLngLat().toArray() as [number, number];
      
      // Use edge-aware handler to adjust map position with increased padding
      const edgeHandler = createEdgeAwareClickHandler(
        map,
        coordinates,
        () => {
          // Then handle the popup toggle after map position is adjusted
          if (!marker.getPopup().isOpen()) {
            marker.togglePopup();
          }
        }
      );
      
      // Execute with the current event
      edgeHandler(e);
      
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
            
            // Replace with new button to clear existing handlers
            const newButton = closeButton.cloneNode(true);
            closeButton.parentNode?.replaceChild(newButton, closeButton);
            
            // Enhance close button with clear event handler
            newButton.addEventListener('click', (e) => {
              e.stopPropagation();
              e.preventDefault();
              
              // Remove the popup
              marker.getPopup().remove();
              
              // Trigger custom event to ensure map visibility
              document.dispatchEvent(new CustomEvent('mapbox.popup.closed'));
              
              // Ensure map is visible
              setTimeout(() => {
                const canvas = document.querySelector('.mapboxgl-canvas');
                if (canvas instanceof HTMLElement) {
                  canvas.style.visibility = 'visible';
                  canvas.style.display = 'block';
                  canvas.style.opacity = '1';
                }
              }, 50);
            });
          }
        }
      }, 100);
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
    onMarkerClick: (facilityId: string) => void,
    map: mapboxgl.Map
  ): void => {
    // Create the click handler
    const handleMarkerClick = createMarkerClickHandler(
      marker,
      facilityId,
      facilityName,
      onMarkerClick,
      map
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
