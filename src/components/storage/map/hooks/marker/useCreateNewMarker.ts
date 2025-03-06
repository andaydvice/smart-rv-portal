
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
      // Ensure map is fully loaded before creating markers
      if (!map || !map.loaded()) {
        setTimeout(() => {
          if (map && map.loaded()) {
            createMarker(facility, map, isHighlighted, onMarkerClick, facilities, index);
          }
        }, 500);
        return null;
      }
      
      // Check if facility has valid coordinates
      if (!hasValidCoordinates(facility)) {
        addError(facility, new Error('Missing coordinates'), 'INVALID_COORDINATES');
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

      // Explicitly set popup options to prevent automatic closing
      const popup = marker.getPopup();
      if (popup) {
        popup.options.closeOnClick = false;
        popup.options.closeButton = true;
      }
      
      // Force a second attachment after a small delay to ensure it's added
      setTimeout(() => {
        if (map && marker) {
          if (!marker.getElement().isConnected) {
            marker.addTo(map);
          }
          enhanceMarkerVisibility(marker);
        }
      }, 100);
      
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
      if (typeof window !== 'undefined' && !window._persistentMarkers?.[facility.id]) {
        if (!window._persistentMarkers) {
          window._persistentMarkers = {};
        }
        window._persistentMarkers[facility.id] = marker;
      }
      
      // If we had previous errors for this facility, mark them as recovered
      if (hasErrorForFacility(facility.id)) {
        markErrorAsRecovered(facility.id);
      }
      
      return marker;
    } catch (error) {
      // Log and track the error
      console.error(`Error creating marker for ${facility.name}:`, error);
      
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

  // Simplified enhancer to prevent excessive DOM manipulation
  const enhanceMarkerVisibility = (marker: mapboxgl.Marker) => {
    const el = marker.getElement();
    if (el) {
      // Use CSS classes instead of inline styles where possible
      el.classList.add('custom-marker');
      
      // Set minimal but critical inline styles
      el.style.visibility = 'visible';
      el.style.display = 'block';
      el.style.zIndex = '9999';
      
      // Set persistent data attribute
      el.setAttribute('data-persistent', 'true');
      
      // Set facility ID for click handlers
      const facilityId = el.getAttribute('data-facility-id');
      if (!facilityId) {
        const popup = marker.getPopup();
        if (popup && popup._content) {
          const contentDataset = popup._content.dataset;
          if (contentDataset && contentDataset.facilityId) {
            el.setAttribute('data-facility-id', contentDataset.facilityId);
          }
        }
      }
    }
  };

  return {
    createMarker,
    enhanceMarkerVisibility
  };
};
