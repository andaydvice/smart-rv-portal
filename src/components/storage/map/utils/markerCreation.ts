
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
  el.style.zIndex = isHighlighted ? '1100' : '1000';
  el.style.visibility = 'visible';
  el.style.opacity = '1';
  el.style.display = 'block';
  el.style.pointerEvents = 'all'; // Changed from 'auto' to 'all' for better click handling
  
  // Add a permanent ID for tracking and selection
  el.id = `marker-${facility.id}`;
  el.setAttribute('data-facility-id', facility.id);
  
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
    .setPopup(popup)
    .addTo(map);
  
  // Store reference to the marker on the element for direct access
  // @ts-ignore - Adding a custom property
  el._mapboxMarker = marker;
  
  // Add marker reference to window to prevent garbage collection
  // @ts-ignore - Adding a global reference
  if (!window._persistentMarkers) {
    // @ts-ignore - Adding a global reference
    window._persistentMarkers = {};
  }
  // @ts-ignore - Adding a global reference
  window._persistentMarkers[facility.id] = marker;

  // Define a more robust click handler that won't be garbage collected
  const handleMarkerClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`Marker clicked for: ${facility.name} (ID: ${facility.id})`);
    
    // First open the popup if not already open
    if (!marker.getPopup().isOpen()) {
      marker.togglePopup();
    }
    
    // Then call the click handler
    onMarkerClick(facility.id);
    
    // Force the popup to stay open with a delay
    setTimeout(() => {
      if (!marker.getPopup().isOpen()) {
        marker.togglePopup();
      }
      
      // Ensure popup is visible and clickable
      const popupElement = document.querySelector(`.mapboxgl-popup[data-facility-id="${facility.id}"]`);
      if (popupElement instanceof HTMLElement) {
        popupElement.style.zIndex = '1100';
        popupElement.style.visibility = 'visible';
        popupElement.style.display = 'block';
        popupElement.style.pointerEvents = 'all';
      }
    }, 50);
  };
  
  // Remove any existing click listeners to prevent duplicates
  el.removeEventListener('click', handleMarkerClick as EventListener);
  
  // Add click event with direct method call and logging
  el.addEventListener('click', handleMarkerClick);
  
  // Add the facility ID to the popup element when it's added to the DOM
  popup.on('open', () => {
    setTimeout(() => {
      const popupEl = marker.getPopup().getElement();
      if (popupEl) {
        popupEl.setAttribute('data-facility-id', facility.id);
        popupEl.style.zIndex = '1100';
        popupEl.style.visibility = 'visible';
        popupEl.style.pointerEvents = 'all';
      }
    }, 0);
  });
  
  return marker;
};
