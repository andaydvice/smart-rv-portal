
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
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    background-color: ${isHighlighted ? '#10B981' : '#F97316'} !important;
    width: ${isHighlighted ? '28px' : '24px'} !important;
    height: ${isHighlighted ? '28px' : '24px'} !important;
    border-radius: 50% !important;
    border: 2px solid white !important;
    cursor: pointer !important;
    box-shadow: ${isHighlighted ? '0 0 20px rgba(16, 185, 129, 0.8)' : '0 0 10px rgba(0,0,0,0.8)'} !important;
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
  el.setAttribute('data-state', facility.state);
  
  // Create properly positioned popup with fixed width
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    maxWidth: '300px',
    className: `facility-popup popup-${facility.id}`,
    offset: [0, -15],
    anchor: 'bottom',
    focusAfterOpen: false
  });
  
  // Set popup data attribute for CSS targeting
  popup.addClassName(`popup-${facility.id}`);
  
  // Create HTML content - full popup content with all information
  popup.setHTML(`
    <div class="facility-popup-content p-4 bg-[#131a2a] text-white" data-facility-id="${facility.id}">
      <h3 class="text-lg font-semibold mb-1 text-[#60A5FA]">${facility.name}</h3>
      <div class="space-y-1 text-sm">
        <p>${facility.address}</p>
        <p>${facility.city}, ${facility.state}</p>
        <p class="mt-2 font-semibold text-[#F97316]">Price: $${facility.price_range.min} - $${facility.price_range.max}</p>
        ${facility.contact_phone ? `<p class="mt-1">Phone: ${facility.contact_phone}</p>` : ''}
      </div>
      
      ${Object.values(facility.features).some(v => v) ? `
        <div class="mt-2 border-t border-gray-700 pt-2">
          <p class="text-xs text-gray-400 mb-1">Features:</p>
          <div class="flex flex-wrap gap-1">
            ${facility.features.indoor ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">Indoor</span>' : ''}
            ${facility.features.climate_controlled ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">Climate Controlled</span>' : ''}
            ${facility.features["24h_access"] ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">24/7 Access</span>' : ''}
            ${facility.features.security_system ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">Security</span>' : ''}
            ${facility.features.vehicle_washing ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">Vehicle Washing</span>' : ''}
          </div>
        </div>
      ` : ''}
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
  try {
    marker.addTo(map);
    console.log(`Added marker for ${facility.name} at [${coordinates[0]}, ${coordinates[1]}]`);
  } catch (err) {
    console.error(`Failed to add marker for ${facility.name}:`, err);
    // Retry with a short delay
    setTimeout(() => {
      try {
        if (!marker.getElement().isConnected) {
          marker.addTo(map);
          console.log(`Retry successful for marker ${facility.id}`);
        }
      } catch (retryErr) {
        console.error(`Retry failed for marker ${facility.id}:`, retryErr);
      }
    }, 100);
  }

  // Add click handler to the marker element
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Call the onClick callback to handle facility selection
    onClick(facility.id);
    
    // Toggle the popup
    if (!marker.getPopup().isOpen()) {
      marker.togglePopup();
      
      // Force popup to correct size after opening
      setTimeout(() => {
        const popupEl = document.querySelector(`.popup-${facility.id}`);
        if (popupEl instanceof HTMLElement) {
          popupEl.style.maxWidth = '300px';
          popupEl.style.width = 'auto';
          
          const contentEl = popupEl.querySelector('.mapboxgl-popup-content');
          if (contentEl instanceof HTMLElement) {
            contentEl.style.minWidth = '220px';
            contentEl.style.width = 'auto';
            contentEl.style.maxWidth = '300px';
          }
        }
      }, 50);
    }
  });

  return marker;
}
