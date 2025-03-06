
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
  el.style.width = '40px'; // Increased size for better visibility
  el.style.height = '40px'; // Increased size for better visibility
  el.style.borderRadius = '50%';
  el.style.backgroundColor = markerColor;
  el.style.border = '4px solid white'; // Thicker white border
  el.style.boxShadow = '0 0 15px rgba(0,0,0,0.8)'; // Enhanced shadow
  el.style.cursor = 'pointer';
  el.style.position = 'absolute'; // Ensure correct positioning
  el.style.transform = 'translate(-50%, -50%)'; // Center the marker
  el.style.zIndex = isHighlighted ? '2000' : '1000'; // Ensure markers are above map layers
  el.setAttribute('data-facility-id', facility.id);
  
  // Add animation for better visibility
  const innerEl = el.querySelector('.marker-inner');
  if (innerEl instanceof HTMLElement) {
    innerEl.style.width = '100%';
    innerEl.style.height = '100%';
    innerEl.style.borderRadius = '50%';
    innerEl.style.opacity = '0.6';
    innerEl.style.animation = 'pulse 2s infinite';
  }
  
  // Create a persistent popup
  const popup = new mapboxgl.Popup({
    offset: 25,
    maxWidth: '300px',
    className: 'storage-facility-popup',
    closeButton: true,
    closeOnClick: false, // Critical: prevent popup from closing when clicking map
    anchor: 'bottom',
    focusAfterOpen: false // Don't steal focus when opening
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
    anchor: 'center', // Use center anchor for better positioning
    offset: [0, 0] // Reset offset as we're using center anchor
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
    
    // Apply additional styles to ensure popup content is visible
    const popupEl = popup.getElement();
    if (popupEl) {
      popupEl.style.zIndex = '10000';
      popupEl.style.pointerEvents = 'auto';
      
      // Ensure popup content is styled properly
      const contentEl = popupEl.querySelector('.mapboxgl-popup-content');
      if (contentEl instanceof HTMLElement) {
        contentEl.style.zIndex = '10000';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.backgroundColor = '#151A22';
        contentEl.style.color = 'white';
        contentEl.style.borderRadius = '8px';
        contentEl.style.padding = '15px';
        contentEl.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      }
    }
  });
  
  return marker;
};
