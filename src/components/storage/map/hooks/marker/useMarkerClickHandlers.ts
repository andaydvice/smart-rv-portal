
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
      
      // Call the click handler first to update state
      onMarkerClick(facilityId);
      
      // Then open the popup if not already open
      if (!marker.getPopup().isOpen()) {
        marker.togglePopup();
      }
      
      // Force the popup to stay open with a delay
      setTimeout(() => {
        if (!marker.getPopup().isOpen()) {
          marker.togglePopup();
        }
        
        // Ensure popup is visible and clickable
        const popupElement = document.querySelector(`.mapboxgl-popup[data-facility-id="${facilityId}"]`);
        if (popupElement instanceof HTMLElement) {
          popupElement.style.zIndex = '1100';
          popupElement.style.visibility = 'visible';
          popupElement.style.display = 'block';
          popupElement.style.pointerEvents = 'all';
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
    // Remove any existing click listeners to prevent duplicates
    const oldHandler = markerElement.getAttribute('data-click-handler');
    if (oldHandler) {
      markerElement.removeEventListener('click', window[oldHandler as any] as EventListener);
    }
    
    // Create the click handler
    const handleMarkerClick = createMarkerClickHandler(
      marker,
      facilityId,
      facilityName,
      onMarkerClick
    );
    
    // Store handler reference for potential cleanup
    const handlerName = `markerClickHandler_${facilityId}`;
    window[handlerName as any] = handleMarkerClick;
    markerElement.setAttribute('data-click-handler', handlerName);
    
    // Add click event with direct method call and logging
    markerElement.addEventListener('click', handleMarkerClick);
    
    // Add additional data attributes for debugging
    markerElement.setAttribute('data-has-click', 'true');
    markerElement.setAttribute('data-facility-id', facilityId);
  };

  return {
    createMarkerClickHandler,
    applyClickHandlerToMarker
  };
};
