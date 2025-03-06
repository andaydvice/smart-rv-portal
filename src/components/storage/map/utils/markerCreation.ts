
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
  el.innerHTML = '<div class="marker-inner"></div>';
  el.style.width = '50px'; // Increased size for better visibility
  el.style.height = '50px'; // Increased size for better visibility
  el.style.borderRadius = '50%';
  el.style.backgroundColor = markerColor;
  el.style.border = '5px solid white'; // Thicker white border
  el.style.boxShadow = '0 0 20px rgba(0,0,0,0.9)'; // Enhanced shadow
  el.style.cursor = 'pointer';
  el.style.position = 'absolute'; // Ensure correct positioning
  el.style.transform = 'translate(-50%, -50%)'; // Center the marker
  el.style.zIndex = '9999'; // Ensure markers are always visible
  el.style.visibility = 'visible';
  el.style.opacity = '1';
  el.style.display = 'block';
  el.style.pointerEvents = 'auto';
  el.setAttribute('data-facility-id', facility.id);
  
  // Create a persistent popup
  const popup = new mapboxgl.Popup({
    offset: 25,
    maxWidth: '300px',
    className: 'storage-facility-popup',
    closeButton: true,
    closeOnClick: false
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

  // Add click event
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(`Marker clicked for: ${facility.name} (ID: ${facility.id})`);
    onMarkerClick(facility.id);
    
    // Toggle popup
    if (!marker.getPopup().isOpen()) {
      marker.togglePopup();
    }
  });
  
  // Force visibility after creation
  setTimeout(() => {
    const markerEl = marker.getElement();
    if (markerEl) {
      markerEl.style.visibility = 'visible';
      markerEl.style.opacity = '1';
      markerEl.style.display = 'block';
      markerEl.style.zIndex = '9999';
      markerEl.style.pointerEvents = 'auto';
    }
  }, 100);
  
  return marker;
};
