
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
    zIndex: isHighlighted ? '9999' : '9998',
    visibility: 'visible !important',
    display: 'block !important',
    opacity: '1 !important',
    pointerEvents: 'all !important',
    cursor: 'pointer',
    position: 'absolute',
    transform: `translate(-50%, -50%) scale(${isHighlighted ? 1.2 : 1})`,
    boxShadow: isHighlighted ? '0 0 20px rgba(16, 185, 129, 0.8)' : '0 0 10px rgba(0,0,0,0.8)',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid white'
  });
  
  // Set data attributes for stable selection
  el.setAttribute('data-facility-id', facility.id);
  el.setAttribute('data-marker-persistent', 'true');
  
  // Create popup with rich content
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    maxWidth: '300px',
    className: 'facility-popup'
  });
  
  // Make sure popup doesn't automatically close when clicking elsewhere
  popup.on('open', () => {
    setTimeout(() => {
      const popupElement = popup.getElement();
      if (popupElement) {
        popupElement.style.zIndex = '10000';
        popupElement.style.visibility = 'visible';
        popupElement.style.display = 'block';
        popupElement.style.opacity = '1';
        popupElement.style.pointerEvents = 'all';
        popupElement.setAttribute('data-facility-id', facility.id);
      }
    }, 10);
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
    anchor: 'center',
    draggable: false,
    offset: [0, 0]
  })
  .setLngLat(coordinates)
  .setPopup(popup);
  
  // Add marker to map immediately if it's loaded
  if (map && map.loaded()) {
    try {
      marker.addTo(map);
    } catch (err) {
      console.error(`Error adding marker for ${facility.name}:`, err);
      
      // Retry once after a short delay
      setTimeout(() => {
        try {
          if (!marker.getElement().isConnected && map) {
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
    
    // Toggle popup with force-open behavior
    if (!popup.isOpen()) {
      popup.addTo(map);
    }
    
    // Ensure popup stays visible and gets proper styling
    setTimeout(() => {
      const popupEl = popup.getElement();
      if (popupEl) {
        popupEl.style.zIndex = '10000';
        popupEl.style.visibility = 'visible';
        popupEl.style.display = 'block';
        popupEl.style.opacity = '1';
        popupEl.style.pointerEvents = 'all';
      }
      
      // Add event listener to View Details button inside popup
      const viewButton = popupEl?.querySelector('.view-facility-btn');
      if (viewButton) {
        viewButton.addEventListener('click', () => {
          onClick(facility.id);
        });
      }
    }, 50);
  });
  
  return marker;
}
