
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createPopupHTML } from '../../popupUtils';

/**
 * Creates a map marker for a facility
 */
export const createFacilityMarker = (
  facility: StorageFacility,
  coordinates: [number, number],
  isHighlighted: boolean,
  onMarkerClick: (facilityId: string) => void,
  map: mapboxgl.Map
): mapboxgl.Marker => {
  console.log(`Creating marker for facility: ${facility.name} at ${coordinates}`);
  
  // Use more visible marker colors with higher contrast
  const markerColor = isHighlighted ? '#10B981' : '#F97316'; // Green for highlighted, Orange for normal
  
  // Create a custom HTML marker for better visibility
  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.style.width = '24px';
  el.style.height = '24px'; 
  el.style.borderRadius = '50%';
  el.style.backgroundColor = markerColor;
  el.style.border = '3px solid white'; 
  el.style.boxShadow = '0 0 10px rgba(0,0,0,0.8)';
  el.style.cursor = 'pointer';
  el.style.position = 'absolute';
  el.style.transform = 'translate(-50%, -50%)';
  el.style.zIndex = isHighlighted ? '10000' : '9999';
  el.style.visibility = 'visible';
  el.style.opacity = '1';
  el.style.display = 'block';
  el.style.pointerEvents = 'all'; // Changed from 'auto' to 'all' for better click handling
  
  // Add a permanent ID for tracking and selection
  el.id = `marker-${facility.id}`;
  el.setAttribute('data-facility-id', facility.id);
  
  // Mark highlighted markers
  if (isHighlighted) {
    el.setAttribute('data-highlighted', 'true');
  }
  
  // Persist marker in the DOM with a custom attribute
  el.setAttribute('data-persistent', 'true');
  
  // Create a popup that stays open until explicitly closed
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
    .setLngLat(coordinates)
    .setPopup(popup);
  
  // CRITICAL: Add to map IMMEDIATELY
  marker.addTo(map);
  
  // Store reference to the marker on the element for direct access
  // @ts-ignore - Adding a custom property
  el._mapboxMarker = marker;
  
  // Store marker in global registry to prevent garbage collection
  if (typeof window !== 'undefined') {
    if (!window._persistentMarkers) {
      window._persistentMarkers = {};
    }
    window._persistentMarkers[facility.id] = marker;
  }

  // Add the facility ID to the popup element when it's added to the DOM
  popup.on('open', () => {
    setTimeout(() => {
      const popupEl = popup.getElement();
      if (popupEl) {
        popupEl.setAttribute('data-facility-id', facility.id);
        popupEl.style.zIndex = '10000';
        popupEl.style.visibility = 'visible';
        popupEl.style.pointerEvents = 'all';
        popupEl.style.display = 'block';
        
        // Find close button and ensure it's visible and clickable
        const closeButton = popupEl.querySelector('.mapboxgl-popup-close-button');
        if (closeButton && closeButton instanceof HTMLElement) {
          closeButton.style.visibility = 'visible';
          closeButton.style.display = 'block';
          closeButton.style.zIndex = '10001';
          closeButton.style.pointerEvents = 'all';
        }
      }
    }, 0);
  });
  
  return marker;
};
