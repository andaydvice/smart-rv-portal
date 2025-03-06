
import mapboxgl from 'mapbox-gl';
import { useMarkerClickHandlers } from './useMarkerClickHandlers';
import { useMarkerErrorHandling } from './useMarkerErrorHandling';
import { StorageFacility } from '../../../types';
import { 
  createMarker, 
  enhanceMarkerVisibility, 
  persistMarker 
} from '../../services/markerCreationService';
import { configurePopup, forcePopupOpen } from '../../services/markerPopupService';
import { attachMarkerToMap } from '../../services/markerAttachmentService';

export const useCreateNewMarker = () => {
  const { applyClickHandlerToMarker } = useMarkerClickHandlers();
  const { 
    addError, 
    hasErrorForFacility, 
    markErrorAsRecovered, 
    attemptErrorRecovery 
  } = useMarkerErrorHandling();

  // Clear existing markers before creating new ones
  const clearExistingMarkers = () => {
    if (window._persistentMarkers) {
      Object.values(window._persistentMarkers).forEach(marker => {
        marker.remove();
      });
      window._persistentMarkers = {};
    }
  };

  const createNewMarker = (
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
            createNewMarker(facility, map, isHighlighted, onMarkerClick, facilities, index);
          }
        }, 500);
        return null;
      }
      
      // Don't create duplicate markers
      if (window._persistentMarkers && window._persistentMarkers[facility.id]) {
        // Update existing marker if highlight state changed
        const existingMarker = window._persistentMarkers[facility.id];
        const markerEl = existingMarker.getElement();
        
        if (markerEl) {
          if (isHighlighted) {
            markerEl.style.backgroundColor = '#10B981';
            markerEl.style.zIndex = '9999';
            markerEl.style.transform = 'translate(-50%, -50%) scale(1.2)';
            markerEl.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
          } else {
            markerEl.style.backgroundColor = '#F97316';
            markerEl.style.zIndex = '9998';
            markerEl.style.transform = 'translate(-50%, -50%) scale(1)';
            markerEl.style.boxShadow = '0 0 10px rgba(0,0,0,0.8)';
          }
        }
        
        return existingMarker;
      }
      
      // Create the marker using our service
      const marker = createMarker(
        facility,
        map,
        isHighlighted,
        onMarkerClick,
        facilities,
        index
      );
      
      if (!marker) {
        addError(facility, new Error('Failed to create marker'), 'CREATION_FAILED');
        return null;
      }

      // Configure the popup
      configurePopup(marker);
      
      // Attach marker to map
      attachMarkerToMap(marker, map);
      
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
        
        // Also apply click handler to show popup
        markerElement.addEventListener('click', () => {
          forcePopupOpen(marker, facility.id);
        });
      } else {
        // Handle missing marker element error
        addError(facility, new Error('Marker element not created'), 'MISSING_ELEMENT');
        return null;
      }
      
      // Force the marker to be visible and interactive
      enhanceMarkerVisibility(marker);
      
      // Persist marker to prevent garbage collection
      persistMarker(facility, marker);
      
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
            createNewMarker(facility, map, isHighlighted, onMarkerClick, facilities, index);
          } catch (retryError) {
            console.error(`Retry failed for ${facility.name}:`, retryError);
          }
        }, 500); // 500ms delay before retry
      }
      
      return null;
    }
  };

  return {
    createMarker: createNewMarker,
    enhanceMarkerVisibility,
    clearExistingMarkers
  };
};
