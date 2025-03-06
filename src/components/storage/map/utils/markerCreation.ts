
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createPopupHTML } from '../../popupUtils';

/**
 * Creates a map marker for a facility with better performance
 */
export const createFacilityMarker = (
  facility: StorageFacility,
  coordinates: [number, number],
  isHighlighted: boolean,
  onMarkerClick: (facilityId: string) => void,
  map: mapboxgl.Map
): mapboxgl.Marker => {
  // Performance optimization: Skip excessive logging
  // console.log(`Creating marker for facility: ${facility.name} at ${coordinates}`);
  
  // Use more visible marker colors with higher contrast
  const markerColor = isHighlighted ? '#10B981' : '#F97316'; // Green for highlighted, Orange for normal
  
  // Create a custom HTML marker for better visibility
  const el = document.createElement('div');
  el.className = 'custom-marker';
  
  // Instead of setting many inline styles that can cause layout thrashing,
  // use CSS classes and minimal inline styles
  if (isHighlighted) {
    el.setAttribute('data-highlighted', 'true');
  }
  
  // Add a permanent ID for tracking and selection
  el.id = `marker-${facility.id}`;
  el.setAttribute('data-facility-id', facility.id);
  
  // Set only the essential styles that might not be in CSS
  el.style.backgroundColor = markerColor;
  
  // Create a popup but don't add it to the marker yet - improves initial loading
  const popup = new mapboxgl.Popup({
    offset: 25,
    maxWidth: '300px',
    className: 'storage-facility-popup',
    closeButton: true,
    closeOnClick: false, // Never close when clicking elsewhere
    focusAfterOpen: false,
    anchor: 'bottom'
  });
  
  // Set the popup content
  popup.setHTML(createPopupHTML(facility));
  
  // Create marker with custom element
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center'
  })
    .setLngLat(coordinates);
  
  // Add popup to marker after a small delay to prevent initial load freezing
  setTimeout(() => {
    marker.setPopup(popup);
  }, 100);
  
  // Store reference to the marker on the element for direct access
  // @ts-ignore - Adding a custom property
  el._mapboxMarker = marker;
  
  // Add click event to marker element instead of relying on mapbox events
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    onMarkerClick(facility.id);
  });
  
  // Store marker in global registry to prevent garbage collection - do this with a performance fix
  if (typeof window !== 'undefined' && !window._persistentMarkers?.[facility.id]) {
    if (!window._persistentMarkers) {
      window._persistentMarkers = {};
    }
    window._persistentMarkers[facility.id] = marker;
  }
  
  // CRITICAL: Add to map after a slight delay to improve initial performance
  requestAnimationFrame(() => {
    if (map && map.loaded()) {
      marker.addTo(map);
    }
  });
  
  return marker;
};
