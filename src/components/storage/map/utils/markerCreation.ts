
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';

export function createFacilityMarker(
  facility: StorageFacility,
  coordinates: [number, number],
  isHighlighted: boolean,
  onClick: (facilityId: string) => void,
  map: mapboxgl.Map
): mapboxgl.Marker {
  // Create marker container with guaranteed visibility
  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.id = `marker-${facility.id}`;
  
  // Force critical styling directly
  el.style.cssText = `
    background-color: ${isHighlighted ? '#10B981' : '#F97316'};
    width: 24px !important;
    height: 24px !important;
    border-radius: 50% !important;
    border: 2px solid white !important;
    cursor: pointer !important;
    box-shadow: ${isHighlighted ? '0 0 20px rgba(16, 185, 129, 0.8)' : '0 0 10px rgba(0,0,0,0.8)'} !important;
    position: absolute !important;
    transform: translate(-50%, -50%) !important;
    z-index: ${isHighlighted ? 9999 : 9998} !important;
    visibility: visible !important;
    display: block !important;
    opacity: 1 !important;
    pointer-events: all !important;
  `;
  
  // Set data attributes
  el.setAttribute('data-facility-id', facility.id);
  el.setAttribute('data-marker-type', 'facility');
  
  // Create persistent popup
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    maxWidth: '300px',
    className: 'facility-popup',
    offset: [0, -15],
    anchor: 'bottom'
  });
  
  // Set rich popup content
  popup.setHTML(`
    <div class="facility-popup-content">
      <h3>${facility.name}</h3>
      <p>${facility.address}</p>
      <p>Price: $${facility.price_range.min} - $${facility.price_range.max}</p>
      <button class="view-facility-btn" data-facility-id="${facility.id}">View Details</button>
    </div>
  `);

  // Create and configure marker - do NOT use offset or other settings that could cause movement
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center',
    pitchAlignment: 'auto',
    rotationAlignment: 'auto'
  })
  .setLngLat(coordinates)
  .setPopup(popup);

  // Ensure marker gets added to map
  if (map) {
    marker.addTo(map);
  }

  // Handle marker click with direct handler
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    console.log(`Direct marker click detected for facility ${facility.id}`);
    
    // Simply call the onClick handler to update application state
    onClick(facility.id);
    
    // Don't manipulate popups directly here - let the state change handle display updates
  });

  return marker;
}
