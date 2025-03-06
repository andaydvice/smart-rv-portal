
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createFacilityMarker } from '../utils/markerCreation';
import { calculateMarkerOffset, buildCoordinatesMap, hasValidCoordinates } from '../utils/markerUtils';

/**
 * Service responsible for creating markers
 */
export const createMarker = (
  facility: StorageFacility,
  map: mapboxgl.Map,
  isHighlighted: boolean,
  onMarkerClick: (facilityId: string) => void,
  facilities: StorageFacility[],
  index: number
): mapboxgl.Marker | null => {
  // Check if facility has valid coordinates
  if (!hasValidCoordinates(facility)) {
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

  return marker;
};

/**
 * Apply styles to enhance marker visibility
 */
export const enhanceMarkerVisibility = (marker: mapboxgl.Marker) => {
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

/**
 * Store the marker in a global registry to prevent garbage collection
 */
export const persistMarker = (facility: StorageFacility, marker: mapboxgl.Marker) => {
  if (typeof window !== 'undefined' && !window._persistentMarkers?.[facility.id]) {
    if (!window._persistentMarkers) {
      window._persistentMarkers = {};
    }
    window._persistentMarkers[facility.id] = marker;
  }
};
