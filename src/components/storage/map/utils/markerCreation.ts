
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';

export function createFacilityMarker(
  facility: StorageFacility,
  coordinates: [number, number],
  isHighlighted: boolean,
  onClick: (facilityId: string) => void,
  map: mapboxgl.Map
): mapboxgl.Marker {
  // Create marker container
  const el = document.createElement('div');
  el.className = 'static-marker';
  el.id = `marker-${facility.id}`;
  
  // Use fixed styling without transforms to prevent marker movement
  el.style.cssText = `
    background-color: ${isHighlighted ? '#10B981' : '#F97316'};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid white;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  `;
  
  // Store facility ID as data attribute
  el.setAttribute('data-facility-id', facility.id);
  
  // Create popup content with address, phone and price
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
  
  // Create popup with proper offset to avoid movement
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
  
  // Add click handler directly to the element
  el.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle popup
    const popupIsOpen = el.getAttribute('data-popup-open') === 'true';
    
    if (!popupIsOpen) {
      marker.setPopup(popup);
      marker.togglePopup();
      el.setAttribute('data-popup-open', 'true');
      
      // Add event listeners to popup buttons
      setTimeout(() => {
        const popupEl = popup.getElement();
        if (popupEl) {
          // View details button
          const viewBtn = popupEl.querySelector('.view-facility-btn');
          if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick(facility.id);
              marker.togglePopup(); // Close popup after clicking
            });
          }
          
          // Close button
          const closeBtn = popupEl.querySelector('.close-popup-btn');
          if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              marker.togglePopup(); // Close popup
              el.setAttribute('data-popup-open', 'false');
            });
          }
        }
      }, 50);
    } else {
      marker.togglePopup();
      el.setAttribute('data-popup-open', 'false');
    }
  });
  
  // Add to map immediately
  if (map) {
    marker.addTo(map);
  }
  
  return marker;
}
