
import mapboxgl from 'mapbox-gl';

/**
 * Configure popup options to prevent automatic closing and ensure it stays visible
 */
export const configurePopup = (marker: mapboxgl.Marker): void => {
  const popup = marker.getPopup();
  if (popup) {
    popup.options.closeOnClick = false;
    popup.options.closeButton = true;
  }
};

/**
 * Force a popup to stay open
 */
export const forcePopupOpen = (marker: mapboxgl.Marker, facilityId: string): void => {
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
