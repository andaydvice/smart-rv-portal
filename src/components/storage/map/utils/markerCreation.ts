
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
    transform: translate(-50%, -50%) scale(${isHighlighted ? 1.2 : 1}) !important;
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
    offset: [0, -15]
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

  // Create and configure marker
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center'
  })
  .setLngLat(coordinates)
  .setPopup(popup);

  // Ensure marker gets added to map
  if (map) {
    const addMarkerWithRetry = (retries = 3) => {
      try {
        if (!marker.getElement().isConnected) {
          marker.addTo(map);
        }
      } catch (err) {
        console.error(`Marker addition attempt failed:`, err);
        if (retries > 0) {
          setTimeout(() => addMarkerWithRetry(retries - 1), 100);
        }
      }
    };

    addMarkerWithRetry();
  }

  // Handle marker click with direct handler
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(`Direct marker click detected for facility ${facility.id}`);
    
    // First trigger the state update
    onClick(facility.id);
    
    // Then handle popup visibility
    if (!popup.isOpen()) {
      popup.addTo(map);
    }
    
    // Force popup to be visible and interactive
    requestAnimationFrame(() => {
      const popupEl = popup.getElement();
      if (popupEl) {
        popupEl.style.cssText = `
          z-index: 10000 !important;
          visibility: visible !important;
          display: block !important;
          opacity: 1 !important;
          pointer-events: all !important;
        `;
        
        const viewButton = popupEl.querySelector('.view-facility-btn');
        if (viewButton) {
          viewButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            onClick(facility.id);
          });
        }
      }
    });
  });

  return marker;
}
