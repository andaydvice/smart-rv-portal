
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
  el.className = 'marker-container';
  el.id = `marker-${facility.id}`;
  
  // Use simplified styling that won't cause positioning issues
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
  
  // Create popup content
  const popupContent = `
    <div class="facility-popup-content">
      <h3>${facility.name}</h3>
      <p>${facility.address}</p>
      <p>Price: $${facility.price_range.min} - $${facility.price_range.max}</p>
      <button class="view-facility-btn" data-facility-id="${facility.id}">View Details</button>
    </div>
  `;
  
  // Create popup
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    maxWidth: '300px',
    className: 'facility-popup',
    offset: 15
  }).setHTML(popupContent);
  
  // Add a direct click handler to the element before creating the marker
  const directClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`Direct marker click for facility ${facility.id}`);
    
    // Call the onClick handler directly
    onClick(facility.id);
  };
  
  // Add click event listener
  el.addEventListener('click', directClickHandler);
  
  // Create the marker with NO OFFSET to prevent movement
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center'
  })
  .setLngLat(coordinates)
  .setPopup(popup);
  
  // Add to map immediately
  if (map) {
    marker.addTo(map);
  }
  
  // Also handle popup button clicks directly
  setTimeout(() => {
    const popupEl = popup.getElement();
    if (popupEl) {
      const button = popupEl.querySelector('.view-facility-btn');
      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick(facility.id);
        });
      }
    }
  }, 100);
  
  return marker;
}
