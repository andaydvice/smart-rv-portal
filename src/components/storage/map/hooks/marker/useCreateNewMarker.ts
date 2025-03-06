
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
        console.warn(`Map not loaded for marker: ${facility.name}`);
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
        console.warn(`⚠️ Skipping facility due to missing coordinates: ${facility.name}`);
        return null;
      }
      
      // Calculate marker coordinates with offset for overlapping markers
      const coordinatesMap = buildCoordinatesMap(facilities);
      const coordinates = calculateMarkerOffset(facility, coordinatesMap, facilities, index);
      
      console.log(`Creating marker for: ${facility.name} at coordinates:`, coordinates);
      
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
      
      // Aggressive approach: Add marker to the map multiple times to ensure it appears
      marker.addTo(map);
      
      // Force a second attachment after a small delay to ensure it's added
      setTimeout(() => {
        if (map && marker) {
          if (!marker.getElement().isConnected) {
            console.log(`Re-adding marker for ${facility.name} to ensure visibility`);
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
      if (typeof window !== 'undefined') {
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
      // CRITICAL: Apply extremely aggressive styling to force visibility
      el.style.cssText = `
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
        z-index: 9999 !important;
        pointer-events: all !important;
        position: absolute !important;
        transform: translate(-50%, -50%) !important;
        width: 24px !important;
        height: 24px !important;
        border-radius: 50% !important;
        background-color: ${el.getAttribute('data-highlighted') === 'true' ? '#10B981' : '#F97316'} !important;
        border: 3px solid white !important;
        box-shadow: 0 0 10px rgba(0,0,0,0.8) !important;
      `;
      
      // Set persistent data attribute
      el.setAttribute('data-persistent', 'true');
      el.setAttribute('data-facility-id', marker.getPopup()._content.dataset.facilityId || 'unknown');
      
      // Enhance popup visibility when it opens
      const popup = marker.getPopup();
      if (popup) {
        popup.on('open', () => {
          setTimeout(() => {
            const popupEl = popup.getElement();
            if (popupEl) {
              popupEl.style.cssText += `
                z-index: 10000 !important;
                visibility: visible !important;
                pointer-events: all !important;
                display: block !important;
              `;
              
              // Find close button and ensure it's visible
              const closeButton = popupEl.querySelector('.mapboxgl-popup-close-button');
              if (closeButton && closeButton instanceof HTMLElement) {
                closeButton.style.cssText += `
                  visibility: visible !important;
                  display: block !important;
                  z-index: 10001 !important;
                  pointer-events: all !important;
                `;
              }
            }
          }, 50);
        });
      }
    }
  };

  return {
    createMarker,
    enhanceMarkerVisibility
  };
};
