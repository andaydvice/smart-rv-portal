
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';

export function createFacilityMarker(
  facility: StorageFacility,
  coordinates: [number, number],
  isHighlighted: boolean,
  onClick: (facilityId: string) => void,
  map: mapboxgl.Map
): mapboxgl.Marker {
  // Create marker container with simpler structure
  const el = document.createElement('div');
  el.className = 'static-marker';
  el.id = `marker-${facility.id}`;
  
  // Use static styling to prevent any marker movement
  el.style.cssText = `
    background-color: ${isHighlighted ? '#10B981' : '#F97316'};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid white;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    position: absolute;
    z-index: 9999;
    display: block;
    visibility: visible;
    opacity: 1;
  `;
  
  // Store facility ID as data attribute
  el.setAttribute('data-facility-id', facility.id);
  
  // Create simple HTML popup content with address, phone and price
  const popupContent = `
    <div class="facility-popup-content p-4">
      <h3 class="text-lg font-bold mb-2">${facility.name}</h3>
      <p class="mb-1 text-sm"><strong>Address:</strong> ${facility.address}</p>
      ${facility.contact_phone ? `<p class="mb-1 text-sm"><strong>Phone:</strong> ${facility.contact_phone}</p>` : ''}
      <p class="mb-2 text-sm"><strong>Price:</strong> $${facility.price_range.min} - $${facility.price_range.max}</p>
      <div class="flex justify-between items-center mt-3">
        <button class="view-facility-btn bg-[#F97316] text-white px-3 py-1 rounded text-sm" data-facility-id="${facility.id}">View Details</button>
        <button class="close-popup-btn text-white bg-gray-600 px-3 py-1 rounded text-sm">Close</button>
      </div>
    </div>
  `;
  
  // Create popup with fixed offset to avoid movement
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    maxWidth: '300px',
    className: 'facility-popup',
    offset: 0
  }).setHTML(popupContent);
  
  // Create marker with fixed position
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center'
  })
  .setLngLat(coordinates);
  
  // Simple direct click handler
  el.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`Marker clicked for facility: ${facility.name}`);
    
    // Toggle popup visibility
    if (!popup.isOpen()) {
      marker.setPopup(popup);
      marker.togglePopup();
      
      // Add event listeners to popup buttons after it's open
      setTimeout(() => {
        const popupEl = popup.getElement();
        if (popupEl) {
          // View details button
          const viewBtn = popupEl.querySelector('.view-facility-btn');
          if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(`View details clicked for: ${facility.name}`);
              onClick(facility.id);
              popup.remove(); // Close popup after clicking
            });
          }
          
          // Close button
          const closeBtn = popupEl.querySelector('.close-popup-btn');
          if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(`Close popup clicked for: ${facility.name}`);
              popup.remove();
            });
          }
        }
      }, 50);
    } else {
      popup.remove();
    }
  });
  
  // Add to map immediately
  if (map) {
    marker.addTo(map);
  }
  
  return marker;
}
