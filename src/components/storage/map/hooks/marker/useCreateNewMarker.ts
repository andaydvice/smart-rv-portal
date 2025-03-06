<lov-codelov-code>
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';
import { 
  calculateMarkerOffset, 
  buildCoordinatesMap, 
  createFacilityMarker,
  hasValidCoordinates
} from '../../utils/markerUtils';
import { useMarkerClickHandlers } from './useMarkerClickHandlers';
import { useMarkerErrorHandling } from './useMarkerErrorHandling';
import { MarkerError } from './types';

export const useCreateNewMarker = () => {
  const { applyClickHandlerToMarker } = useMarkerClickHandlers();
  const { 
    addError, 
    hasErrorForFacility, 
    markErrorAsRecovered, 
    attemptErrorRecovery 
  } = useMarkerErrorHandling();

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
        addError(facility, new Error('Missing coordinates'), 'INVALID_COORDINATES');
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
      
      // Get marker element and apply click handler
      const markerElement = marker.getElement();
      if (markerElement) {
        applyClickHandlerToMarker(
          markerElement,
          marker,
          facility.id,
          facility.name,
          onMarkerClick
        );
      } else {
        // Handle missing marker element error
        addError(facility, new Error('Marker element not created'), 'MISSING_ELEMENT');
        return null;
      }
      
      // Force the marker to be visible and interactive
      enhanceMarkerVisibility(marker);
      
      // Store marker in global registry to prevent garbage collection
      if (window._persistentMarkers) {
        window._persistentMarkers[facility.id] = marker;
      }
      
      // If we had previous errors for this facility, mark them as recovered
      if (hasErrorForFacility(facility.id)) {
        markErrorAsRecovered(facility.id);
      }
      
      return marker;
    } catch (error) {
      // Log and track the error
      console.error(`🚫 Error creating marker for ${facility.name}:`, error);
      
      // Add structured error information
      addError(
        facility, 
        error instanceof Error ? error : new Error('Unknown error creating marker'), 
        'MARKER_CREATION_FAILED'
      );
      
      // Check if we should retry the operation
      if (attemptErrorRecovery(facility.id)) {
        // If we should retry, attempt to create the marker again with a slight delay
        setTimeout(() => {
          console.log(`Retrying marker creation for ${facility.name}`);
          try {
            createMarker(facility, map, isHighlighted, onMarkerClick, facilities, index);
          } catch (retryError) {
            console.error(`Retry failed for ${facility.name}:`, retryError);
          }
        }, 500); // 500ms delay before retry
      }
      
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
</lov-code>
