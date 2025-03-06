
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';
import { 
  calculateMarkerOffset, 
  buildCoordinatesMap, 
  createFacilityMarker,
  hasValidCoordinates
} from '../../utils/markerUtils';

export const useCreateNewMarker = () => {
  const createMarker = (
    facility: StorageFacility,
    map: mapboxgl.Map,
    isHighlighted: boolean,
    onMarkerClick: (facilityId: string) => void,
    facilities: StorageFacility[],
    index: number
  ): mapboxgl.Marker | null => {
    try {
      // Check if facility has valid coordinates
      if (!hasValidCoordinates(facility)) {
        console.warn(`⚠️ Skipping facility due to missing coordinates: ${facility.name}`);
        return null;
      }
      
      // Calculate marker coordinates with offset for overlapping markers
      const coordinatesMap = buildCoordinatesMap(facilities);
      const coordinates = calculateMarkerOffset(facility, coordinatesMap, facilities, index);
      
      // Create the marker with explicit map reference for reliable addition
      const marker = createFacilityMarker(
        facility,
        coordinates,
        isHighlighted,
        onMarkerClick,
        map
      );

      // Add marker to the DOM with explicit addTo call to ensure it's added to the map
      marker.addTo(map);

      // Explicitly set popup options to prevent automatic closing
      const popup = marker.getPopup();
      popup.options.closeOnClick = false;
      popup.options.closeButton = true;
      
      // Force the marker to be visible and interactive
      enhanceMarkerVisibility(marker);
      
      // Store marker in global registry to prevent garbage collection
      if (window._persistentMarkers) {
        window._persistentMarkers[facility.id] = marker;
      }
      
      return marker;
    } catch (error) {
      console.error(`🚫 Error creating marker for ${facility.name}:`, error);
      return null;
    }
  };

  const enhanceMarkerVisibility = (marker: mapboxgl.Marker) => {
    const el = marker.getElement();
    if (el) {
      // IMPORTANT: Using !important flags for critical CSS properties
      el.style.cssText += `
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
        z-index: 1000 !important;
        pointer-events: all !important;
      `;
      
      // Set persistent data attribute
      el.setAttribute('data-persistent', 'true');
      el.setAttribute('data-facility-id', marker.getPopup()._content.dataset.facilityId);
      
      // Enhance popup visibility when it opens
      marker.getPopup().on('open', () => {
        setTimeout(() => {
          const popupEl = marker.getPopup().getElement();
          if (popupEl) {
            popupEl.style.cssText += `
              z-index: 1100 !important;
              visibility: visible !important;
              pointer-events: all !important;
            `;
          }
        }, 50);
      });
    }
  };

  return {
    createMarker,
    enhanceMarkerVisibility
  };
};
