
import mapboxgl from 'mapbox-gl';
import { useMarkerClickHandlers } from './useMarkerClickHandlers';
import { useMarkerErrorHandling } from './useMarkerErrorHandling';
import { StorageFacility } from '../../../types';
import { createFacilityMarker } from '../../utils/markerCreation';
import { calculateMarkerOffset, buildCoordinatesMap, hasValidCoordinates } from '../../utils/markerUtils';

// Helper function to adapt any facility-like object to the expected StorageFacility type
const adaptFacility = (facility: any): StorageFacility => {
  return facility as StorageFacility;
};

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
        if (marker && marker.remove) {
          try {
            marker.remove();
          } catch (err) {
            console.error("Error removing marker:", err);
          }
        }
      });
      window._persistentMarkers = {};
    }
  };

  const createMarker = (
    facility: StorageFacility,
    map: mapboxgl.Map,
    isHighlighted: boolean,
    onMarkerClick: (facilityId: string) => void,
    facilities: any[],
    index: number
  ): mapboxgl.Marker | null => {
    try {
      // Check if map is loaded and valid
      if (!map || !map.loaded()) {
        console.warn('Map not fully loaded, cannot create marker');
        return null;
      }
      
      // Check if facility has valid coordinates
      if (!hasValidCoordinates(facility)) {
        console.warn(`Invalid coordinates for facility ${facility.id}`);
        return null;
      }
      
      // Adapt facilities to the expected type before building coordinates map
      const adaptedFacilities = facilities.map(adaptFacility);
      
      // Calculate marker coordinates with offset for overlapping markers
      const coordinatesMap = buildCoordinatesMap(adaptedFacilities);
      const coordinates = calculateMarkerOffset(facility, coordinatesMap, adaptedFacilities, index);
      
      // Create the marker with explicit map reference for reliable addition
      const marker = createFacilityMarker(
        facility,
        coordinates,
        isHighlighted,
        onMarkerClick,
        map
      );
      
      // Don't overwrite existing markers to reduce re-rendering
      if (typeof window !== 'undefined') {
        if (!window._persistentMarkers) {
          window._persistentMarkers = {};
        }
        
        // Store the marker for future reference
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

  // Apply styles to enhance marker visibility
  const enhanceMarkerVisibility = (marker: mapboxgl.Marker) => {
    const el = marker.getElement();
    if (el) {
      // Use CSS classes instead of inline styles when possible
      el.classList.add('custom-marker');
      
      // Set critical inline styles for visibility
      el.style.visibility = 'visible';
      el.style.display = 'block';
      el.style.opacity = '1';
      el.style.zIndex = '9999';
      
      // Set persistent data attribute
      el.setAttribute('data-persistent', 'true');
    }
  };

  return {
    createMarker,
    enhanceMarkerVisibility,
    clearExistingMarkers
  };
};
