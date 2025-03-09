
import mapboxgl from 'mapbox-gl';

export const useMarkerClickHandlers = () => {
  /**
   * Creates a simple direct click handler for markers
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
    // Clean up any existing listeners first for safety
    const newHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(`Static marker clicked for: ${facilityName}`);
      onMarkerClick(facilityId);
    };
    
    // Set attribute and add listener
    markerElement.setAttribute('data-facility-id', facilityId);
    markerElement.setAttribute('data-has-click', 'true');
    
    // Remove old handlers by cloning the element
    const newElement = markerElement.cloneNode(true) as HTMLElement;
    if (markerElement.parentNode) {
      markerElement.parentNode.replaceChild(newElement, markerElement);
    }
    
    // Add new click listener
    newElement.addEventListener('click', newHandler);
  };

  return {
    createMarkerClickHandler,
    applyClickHandlerToMarker
  };
};
