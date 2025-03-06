
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
  el.className = 'custom-marker';
  el.id = `marker-${facility.id}`;
  
  // Apply critical styling directly to element for guaranteed visibility
  Object.assign(el.style, {
    backgroundColor: isHighlighted ? '#10B981' : '#F97316',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid white',
    cursor: 'pointer',
    boxShadow: isHighlighted ? '0 0 20px rgba(16, 185, 129, 0.8)' : '0 0 10px rgba(0,0,0,0.8)',
    position: 'absolute',
    transform: `translate(-50%, -50%) scale(${isHighlighted ? 1.2 : 1})`,
    zIndex: isHighlighted ? '9999' : '9998',
    visibility: 'visible',
    display: 'block',
    opacity: '1',
    pointerEvents: 'all'
  });
  
  // Set data attributes for facility identification
  el.setAttribute('data-facility-id', facility.id);
  el.setAttribute('data-marker-type', 'facility');
  
  // Create popup with facility information
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    maxWidth: '300px',
    className: 'facility-popup'
  });
  
  // Set popup content
  popup.setHTML(`
    <div class="facility-popup-content">
      <h3>${facility.name}</h3>
      <p>${facility.address}</p>
      <p>Price: $${facility.price_range.min} - $${facility.price_range.max}</p>
      <button class="view-facility-btn" data-facility-id="${facility.id}">View Details</button>
    </div>
  `);
  
  // Create marker and attach popup
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center'
  })
  .setLngLat(coordinates)
  .setPopup(popup);
  
  // Add marker to map immediately if map is ready
  if (map && map.loaded()) {
    try {
      marker.addTo(map);
    } catch (err) {
      console.error(`Error adding marker to map:`, err);
      // Retry after a short delay
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
  
  // Add click handler to marker element
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    onClick(facility.id);
    
    // Force popup to stay open
    if (!popup.isOpen()) {
      popup.addTo(map);
    }
    
    // Ensure popup has proper styling
    const popupEl = popup.getElement();
    if (popupEl) {
      Object.assign(popupEl.style, {
        zIndex: '10000',
        visibility: 'visible',
        display: 'block',
        opacity: '1',
        pointerEvents: 'all'
      });
      
      // Add click event to the view details button inside popup
      const viewButton = popupEl.querySelector('.view-facility-btn');
      if (viewButton) {
        viewButton.addEventListener('click', () => {
          onClick(facility.id);
        });
      }
    }
  });
  
  return marker;
}
