
import mapboxgl from 'mapbox-gl';
import { useMarkerClickHandlers } from './useMarkerClickHandlers';
import { useMarkerErrorHandling } from './useMarkerErrorHandling';
import { StorageFacility } from '../../../types';
import { createFacilityMarker } from '../../utils/markerCreation';
import { calculateMarkerOffset, buildCoordinatesMap, hasValidCoordinates } from '../../utils/markerUtils';

export const useCreateNewMarker = () => {
  const { applyClickHandlerToMarker } = useMarkerClickHandlers();
  const { 
    addError, 
    hasErrorForFacility, 
    markErrorAsRecovered
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
      
      // Store the marker for future reference
      if (typeof window !== 'undefined') {
        if (!window._persistentMarkers) {
          window._persistentMarkers = {};
        }
        window._persistentMarkers[facility.id] = marker;
      }
      
      // Apply extra click handler directly to the marker element
      const markerElement = marker.getElement();
      if (markerElement) {
        applyClickHandlerToMarker(
          markerElement,
          facility.id,
          facility.name,
          onMarkerClick
        );
        
        // Force marker to be visible
        markerElement.style.visibility = 'visible';
        markerElement.style.display = 'block';
        markerElement.style.opacity = '1';
        markerElement.style.zIndex = '9999';
        markerElement.style.pointerEvents = 'auto';
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
      
      return null;
    }
  };

  // Apply styles to enhance marker visibility
  const enhanceMarkerVisibility = (marker: mapboxgl.Marker) => {
    const el = marker.getElement();
    if (el) {
      // Set critical inline styles for visibility
      el.style.visibility = 'visible';
      el.style.display = 'block';
      el.style.opacity = '1';
      el.style.zIndex = '9999';
      el.style.pointerEvents = 'auto';
      el.style.position = 'absolute';
      el.style.transform = 'none';
      el.style.transition = 'none';
      
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
