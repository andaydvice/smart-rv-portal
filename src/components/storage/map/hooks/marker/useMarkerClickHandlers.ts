
import mapboxgl from 'mapbox-gl';

interface MarkerClickHandlers {
  [key: string]: (e: MouseEvent) => void;
}

// Define a type for the global window extension with our handler properties
declare global {
  interface Window {
    markerClickHandlers: MarkerClickHandlers;
  }
}

export const useMarkerClickHandlers = () => {
  // Initialize the global handlers object if it doesn't exist
  if (typeof window !== 'undefined' && !window.markerClickHandlers) {
    window.markerClickHandlers = {};
  }

  /**
   * Creates a simple click handler for markers
   */
  const createMarkerClickHandler = (
    facilityId: string,
    facilityName: string,
    onMarkerClick: (facilityId: string) => void
  ): ((e: MouseEvent) => void) => {
    // Simple handler that just calls onMarkerClick
    const handleMarkerClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`Marker clicked for: ${facilityName} (ID: ${facilityId})`);
      onMarkerClick(facilityId);
    };
    
    return handleMarkerClick;
  };

  /**
   * Applies a click handler to a marker element
   */
  const applyClickHandlerToMarker = (
    markerElement: HTMLElement,
    facilityId: string,
    facilityName: string,
    onMarkerClick: (facilityId: string) => void
  ): void => {
    // Remove any existing handlers
    const oldHandlerKey = markerElement.getAttribute('data-click-handler');
    if (oldHandlerKey && window.markerClickHandlers[oldHandlerKey]) {
      markerElement.removeEventListener('click', window.markerClickHandlers[oldHandlerKey]);
    }
    
    // Create new handler
    const handleMarkerClick = createMarkerClickHandler(
      facilityId,
      facilityName,
      onMarkerClick
    );
    
    // Store for cleanup
    const handlerKey = `marker_${facilityId}_${Date.now()}`;
    window.markerClickHandlers[handlerKey] = handleMarkerClick;
    
    // Set attribute and add listener
    markerElement.setAttribute('data-click-handler', handlerKey);
    markerElement.setAttribute('data-facility-id', facilityId);
    markerElement.setAttribute('data-has-click', 'true');
    
    // Add click listener
    markerElement.addEventListener('click', handleMarkerClick);
  };

  return {
    createMarkerClickHandler,
    applyClickHandlerToMarker
  };
};
