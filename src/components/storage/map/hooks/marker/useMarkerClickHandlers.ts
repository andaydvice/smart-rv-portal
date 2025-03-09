
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
    // Simple handler that just calls onMarkerClick with proper event handling
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
    // Make sure the element is visible and clickable
    markerElement.style.visibility = 'visible';
    markerElement.style.display = 'block';
    markerElement.style.opacity = '1';
    markerElement.style.pointerEvents = 'auto';
    markerElement.style.cursor = 'pointer';
    
    // Set attribute and add listener
    markerElement.setAttribute('data-facility-id', facilityId);
    
    // Simple direct click handler
    const newHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(`Static marker clicked for: ${facilityName}`);
      onMarkerClick(facilityId);
    };
    
    // Add new click listener (use once: false to ensure it can be clicked multiple times)
    markerElement.addEventListener('click', newHandler);
  };

  return {
    createMarkerClickHandler,
    applyClickHandlerToMarker
  };
};
