
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createEdgeAwareClickHandler } from '@/utils/markers/forcing/preventEdgeCutoff';

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
  
  // Check if zoom level is close-up (> 10)
  const isZoomedIn = map.getZoom() > 10;
  
  // Choose color based on highlight state and zoom level
  const markerColor = isHighlighted ? '#10B981' : 
                      isZoomedIn ? '#10B981' : '#5B9BD5';
  
  // Force critical styling directly
  el.style.cssText = `
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    background-color: ${markerColor} !important;
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
  el.setAttribute('data-zoomed', isZoomedIn ? 'true' : 'false');
  
  // Create popup with updated styling
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    maxWidth: '340px',
    className: `facility-popup popup-${facility.id}`,
    offset: [0, -15],
    anchor: 'bottom',
    focusAfterOpen: false
  });

  // Set popup content with improved styling
  popup.setHTML(`
    <div class="facility-popup-content p-6 bg-[#131a2a] text-white" data-facility-id="${facility.id}">
      <h3 class="text-2xl font-semibold mb-2 text-[#60A5FA]">${facility.name}</h3>
      <p class="text-lg mb-1">${facility.address}</p>
      <p class="text-lg mb-4">${facility.city}, ${facility.state}</p>
      
      <p class="text-xl font-medium text-[#5B9BD5] mb-3">Price: $${facility.price_range?.min || 0} - $${facility.price_range?.max || 0}</p>
      
      ${facility.contact_phone ? `
        <p class="text-lg mb-4">Phone: ${facility.contact_phone}</p>
      ` : ''}
      
      ${Object.values(facility.features || {}).some(v => v) ? `
        <div class="mt-2">
          <p class="text-lg text-gray-400 mb-2">Features:</p>
          <div class="flex flex-wrap gap-2">
            ${facility.features?.indoor ? '<span class="text-md text-[#60A5FA]">Indoor</span>' : ''}
            ${facility.features?.climate_controlled ? '<span class="text-md text-[#60A5FA]">Climate Controlled</span>' : ''}
            ${facility.features?.["24h_access"] ? '<span class="text-md text-[#60A5FA]">24/7 Access</span>' : ''}
            ${facility.features?.security_system ? '<span class="text-md text-[#60A5FA]">Security</span>' : ''}
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

  // Create an edge-aware click handler
  const edgeAwareClickHandler = createEdgeAwareClickHandler(
    map,
    coordinates,
    (e) => {
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
    }
  );

  // Add the edge-aware click handler to the marker element
  el.addEventListener('click', edgeAwareClickHandler);
  
  // Mark as edge-aware
  el.setAttribute('data-edge-aware', 'true');

  // Add zoom change listener to update marker color
  map.on('zoom', () => {
    const zoomedIn = map.getZoom() > 10;
    if (zoomedIn && el.getAttribute('data-zoomed') !== 'true') {
      el.style.backgroundColor = isHighlighted ? '#10B981' : '#10B981';
      el.setAttribute('data-zoomed', 'true');
    } else if (!zoomedIn && el.getAttribute('data-zoomed') === 'true') {
      el.style.backgroundColor = isHighlighted ? '#10B981' : '#5B9BD5';
      el.setAttribute('data-zoomed', 'false');
    }
  });

  return marker;
}
