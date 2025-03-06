
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
  
  // Apply critical styling directly to element
  Object.assign(el.style, {
    backgroundColor: isHighlighted ? '#10B981' : '#F97316',
    zIndex: isHighlighted ? '9999' : '9998',
    visibility: 'visible !important',
    display: 'block !important',
    opacity: '1 !important',
    pointerEvents: 'all !important',
    cursor: 'pointer !important',
    position: 'absolute !important',
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
  
  // Set popup content
  popup.setHTML(`
    <div class="facility-popup-content">
      <h3>${facility.name}</h3>
      <p>${facility.address}</p>
      <p>Price: $${facility.priceRange.min} - $${facility.priceRange.max}</p>
      <button class="view-facility-btn" onclick="window.viewFacility('${facility.id}')">View Details</button>
    </div>
  `);
  
  // Add global function to window for popup button click
  window.viewFacility = function(id: string) {
    onClick(id);
  };
  
  // Create marker and attach popup
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center',
    draggable: false,
    offset: [0, 0]
  })
  .setLngLat(coordinates)
  .setPopup(popup)
  .addTo(map); // This is crucial - explicitly add to map
  
  // Add separate click handler on marker element
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    onClick(facility.id);
    
    // Toggle popup
    if (!popup.isOpen()) {
      marker.togglePopup();
      
      // Force popup visibility
      setTimeout(() => {
        const popupEl = popup.getElement();
        if (popupEl) {
          Object.assign(popupEl.style, {
            zIndex: '10000',
            visibility: 'visible !important',
            display: 'block !important',
            opacity: '1 !important',
            pointerEvents: 'all !important'
          });
        }
      }, 50);
    }
  });
  
  // Add observer to ensure marker stays in DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length > 0) {
        Array.from(mutation.removedNodes).forEach((node) => {
          if (node === el || node.contains(el)) {
            // Re-add marker to map if it was removed
            marker.addTo(map);
          }
        });
      }
    });
  });
  
  // Observe map container
  observer.observe(map.getContainer(), { 
    childList: true,
    subtree: true 
  });
  
  return marker;
}
