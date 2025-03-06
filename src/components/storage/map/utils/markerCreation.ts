
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
  el.style.width = '24px'; // Smaller size to ensure proper clicking
  el.style.height = '24px'; 
  el.style.borderRadius = '50%';
  el.style.backgroundColor = markerColor;
  el.style.border = '3px solid white'; 
  el.style.boxShadow = '0 0 10px rgba(0,0,0,0.8)';
  el.style.cursor = 'pointer';
  el.style.position = 'absolute';
  el.style.transform = 'translate(-50%, -50%)';
  el.style.zIndex = '9999';
  el.style.visibility = 'visible';
  el.style.opacity = '1';
  el.style.display = 'block';
  el.style.pointerEvents = 'auto';
  el.setAttribute('data-facility-id', facility.id);
  
  // Create a popup that stays open until explicitly closed
  const popup = new mapboxgl.Popup({
    offset: 25,
    maxWidth: '300px',
    className: 'storage-facility-popup',
    closeButton: true,
    closeOnClick: false,
    focusAfterOpen: false
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

  // Add click event with direct method call and logging
  el.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`Marker clicked for: ${facility.name} (ID: ${facility.id})`);
    
    // First open the popup
    if (!marker.getPopup().isOpen()) {
      marker.togglePopup();
    }
    
    // Then call the click handler
    onMarkerClick(facility.id);
    
    // Force the popup to stay open
    setTimeout(() => {
      if (!marker.getPopup().isOpen()) {
        marker.togglePopup();
      }
    }, 10);
  });
  
  return marker;
};
