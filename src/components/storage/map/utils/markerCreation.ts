
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
  
  // Set popup data attribute for CSS targeting
  popup.addClassName(`popup-${facility.id}`);
  
  // Set rich popup content
  popup.setHTML(`
    <div class="facility-popup-content" data-facility-id="${facility.id}">
      <h3 class="text-lg font-semibold mb-1">${facility.name}</h3>
      <p class="text-sm mb-1">${facility.address}</p>
      <p class="text-sm mb-2">Price: $${facility.price_range.min} - $${facility.price_range.max}</p>
      <button class="view-facility-btn bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-2 px-4 rounded w-full" data-facility-id="${facility.id}">View Details</button>
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
    try {
      marker.addTo(map);
    } catch (err) {
      console.error(`Failed to add marker for ${facility.name}:`, err);
      // Retry once after a short delay
      setTimeout(() => {
        try {
          if (!marker.getElement().isConnected) {
            marker.addTo(map);
          }
        } catch (retryErr) {
          console.error(`Retry failed for marker ${facility.id}:`, retryErr);
        }
      }, 100);
    }
  }

  // Once the popup is added, set up event listeners on it
  marker.getPopup().on('open', () => {
    // Get the popup element
    const popupEl = marker.getPopup().getElement();
    if (popupEl) {
      // Set facility ID data attribute on popup
      popupEl.setAttribute('data-facility-id', facility.id);
      
      // Ensure popup has the right styles
      popupEl.style.zIndex = '10000';
      popupEl.style.visibility = 'visible';
      popupEl.style.pointerEvents = 'all';
      
      // Make close button work
      const closeButton = popupEl.querySelector('.mapboxgl-popup-close-button');
      if (closeButton instanceof HTMLElement) {
        closeButton.style.pointerEvents = 'all';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', (e) => {
          e.stopPropagation();
          marker.getPopup().remove();
        });
      }
      
      // Make "View Details" button work
      const viewButton = popupEl.querySelector('.view-facility-btn');
      if (viewButton instanceof HTMLElement) {
        viewButton.style.pointerEvents = 'all';
        viewButton.style.cursor = 'pointer';
        viewButton.addEventListener('click', (e) => {
          e.stopPropagation();
          onClick(facility.id);
        });
      }
    }
  });

  return marker;
}
