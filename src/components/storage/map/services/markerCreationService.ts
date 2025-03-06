
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createFacilityMarker } from '../utils/markerCreation';
import { calculateMarkerOffset, buildCoordinatesMap, hasValidCoordinates } from '../utils/markerUtils';

let creationAttempts = 0;
const MAX_ATTEMPTS = 3;

/**
 * Service responsible for creating markers with performance optimizations
 */
export const createMarker = (
  facility: StorageFacility,
  map: mapboxgl.Map,
  isHighlighted: boolean,
  onMarkerClick: (facilityId: string) => void,
  facilities: StorageFacility[],
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
    
    // Reset attempts counter on success
    creationAttempts = 0;
    
    return marker;
  } catch (error) {
    console.error(`Error creating marker for facility ${facility.id}:`, error);
    
    // Implement retry logic for transient errors
    if (creationAttempts < MAX_ATTEMPTS) {
      creationAttempts++;
      console.log(`Retrying marker creation (attempt ${creationAttempts}/${MAX_ATTEMPTS})`);
      return createMarker(facility, map, isHighlighted, onMarkerClick, facilities, index);
    }
    
    // Reset counter after max attempts
    creationAttempts = 0;
    return null;
  }
};

/**
 * Apply styles to enhance marker visibility with better performance
 */
export const enhanceMarkerVisibility = (marker: mapboxgl.Marker) => {
  const el = marker.getElement();
  if (el) {
    // Use CSS classes instead of inline styles when possible
    el.classList.add('custom-marker');
    
    // Set minimal but critical inline styles
    el.style.visibility = 'visible';
    el.style.display = 'block';
    el.style.opacity = '1';
    
    // Use a more reasonable z-index that doesn't conflict with controls
    el.style.zIndex = '99';
    
    // Set persistent data attribute
    el.setAttribute('data-persistent', 'true');
  }
};

/**
 * Store the marker in a global registry with memory management
 */
export const persistMarker = (facility: StorageFacility, marker: mapboxgl.Marker) => {
  if (typeof window !== 'undefined') {
    if (!window._persistentMarkers) {
      window._persistentMarkers = {};
    }
    
    // Don't overwrite existing markers to reduce re-rendering
    if (!window._persistentMarkers[facility.id]) {
      window._persistentMarkers[facility.id] = marker;
    }
    
    // Limit total number of persistent markers to prevent memory issues
    const markerKeys = Object.keys(window._persistentMarkers);
    const MAX_PERSISTENT_MARKERS = 100; // Reduced from 200 to 100 for better performance
    
    if (markerKeys.length > MAX_PERSISTENT_MARKERS) {
      // Remove oldest markers when we exceed the limit
      const markersToRemove = markerKeys.slice(0, markerKeys.length - MAX_PERSISTENT_MARKERS);
      markersToRemove.forEach(id => {
        if (window._persistentMarkers && window._persistentMarkers[id]) {
          window._persistentMarkers[id].remove();
          delete window._persistentMarkers[id];
        }
      });
    }
  }
};
