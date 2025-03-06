
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
  // Use more visible marker colors with higher contrast
  const markerColor = isHighlighted ? '#10B981' : '#F97316'; // Green for highlighted, Orange for normal
  
  // Create a custom HTML marker for better visibility
  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.innerHTML = '<div class="marker-inner"></div>';
  el.style.width = '30px'; // Increased size
  el.style.height = '30px'; // Increased size
  el.style.borderRadius = '50%';
  el.style.backgroundColor = markerColor;
  el.style.border = '3px solid white'; // Added white border
  el.style.boxShadow = '0 0 10px rgba(0,0,0,0.7)'; // Added shadow
  el.style.cursor = 'pointer';
  el.style.zIndex = isHighlighted ? '1000' : '1';
  el.setAttribute('data-facility-id', facility.id);
  
  // Create a persistent popup
  const popup = new mapboxgl.Popup({
    offset: 25,
    maxWidth: '300px',
    className: 'storage-facility-popup',
    closeButton: true,
    closeOnClick: false, // Critical: prevent popup from closing when clicking map
    anchor: 'bottom'
  });
  
  // Set the popup content
  popup.setHTML(createPopupHTML(facility));
  
  // Ensure popup stays on top
  const popupElement = popup.getElement();
  if (popupElement) {
    popupElement.style.zIndex = '10000';
  }
  
  // Create marker with custom element
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
    offset: [0, -5]
  })
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);

  // Add click event
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Record marker clicked for debugging
    console.log(`Marker clicked for: ${facility.name} (ID: ${facility.id})`);
    
    // Trigger the facility selection
    onMarkerClick(facility.id);
    
    // Ensure popup is open
    if (!marker.getPopup().isOpen()) {
      marker.togglePopup();
    }
  });
  
  // Add event listeners to popup element to prevent click bubbling
  popup.on('open', () => {
    console.log(`Popup opened for ${facility.name}`);
  });
  
  return marker;
};
