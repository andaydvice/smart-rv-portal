
import mapboxgl from 'mapbox-gl';

// Define a type for the global window extension with our handler properties
declare global {
  interface Window {
    markerClickHandlers: Record<string, (e: MouseEvent) => void>;
  }
}

export const useMarkerClickHandlers = () => {
  // Initialize the global handlers object if it doesn't exist
  if (typeof window !== 'undefined' && !window.markerClickHandlers) {
    window.markerClickHandlers = {};
  }

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
      // Prevent default behavior and stop propagation to prevent map movement
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`Marker clicked for: ${facilityName} (ID: ${facilityId})`);
      
      // Call the click handler to update state first
      onMarkerClick(facilityId);
      
      // Do not toggle or manipulate the popup here - let the state update handle it
      // This prevents markers from moving unexpectedly
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
    const oldHandlerKey = markerElement.getAttribute('data-click-handler');
    if (oldHandlerKey && window.markerClickHandlers[oldHandlerKey]) {
      markerElement.removeEventListener('click', window.markerClickHandlers[oldHandlerKey]);
    }
    
    // Create the click handler
    const handleMarkerClick = createMarkerClickHandler(
      marker,
      facilityId,
      facilityName,
      onMarkerClick
    );
    
    // Store handler reference for potential cleanup
    const handlerKey = `marker_${facilityId}_${Date.now()}`;
    window.markerClickHandlers[handlerKey] = handleMarkerClick;
    markerElement.setAttribute('data-click-handler', handlerKey);
    
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
