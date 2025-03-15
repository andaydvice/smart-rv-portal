
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';

/**
 * Creates a marker directly in the DOM, bypassing any Mapbox abstractions that might be failing
 */
export function createDirectMarker(
  facility: StorageFacility,
  map: mapboxgl.Map | null
): HTMLElement {
  console.log(`Creating direct marker for ${facility.name}`);
  
  // Create marker element
  const marker = document.createElement('div');
  marker.className = 'direct-marker mapboxgl-marker custom-marker';
  marker.id = `direct-marker-${facility.id}`;
  
  // Set critical styling to guarantee visibility
  marker.style.cssText = `
    position: absolute !important;
    visibility: visible !important;
    display: block !important;
    opacity: 1 !important;
    width: 24px !important;
    height: 24px !important;
    background-color: #F97316 !important;
    border-radius: 50% !important;
    border: 2px solid white !important;
    box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
    z-index: 9999 !important;
    transform: translate(-50%, -50%) !important;
    cursor: pointer !important;
    left: 50% !important;
    top: 50% !important;
  `;
  
  // Create a simple popup element
  const popup = document.createElement('div');
  popup.className = 'direct-popup mapboxgl-popup';
  popup.id = `direct-popup-${facility.id}`;
  popup.style.cssText = `
    position: absolute;
    background-color: #151A22;
    color: white;
    padding: 10px;
    border-radius: 4px;
    max-width: 250px;
    z-index: 10000;
    display: none;
    visibility: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
  `;
  
  // Set popup content
  popup.innerHTML = `
    <h3 style="margin: 0; font-size: 14px; font-weight: bold;">${facility.name}</h3>
    <p style="margin: 5px 0 0; font-size: 12px;">${facility.address}</p>
    <p style="margin: 5px 0 0; font-size: 12px;">${facility.city}, ${facility.state}</p>
    ${facility.price_range ? 
      `<p style="margin: 5px 0 0; font-size: 12px;">Price: $${facility.price_range.min} - $${facility.price_range.max}</p>` : ''}
  `;
  
  // Position marker on map if coordinates and map are available
  if (map && facility.latitude && facility.longitude) {
    const lat = parseFloat(String(facility.latitude));
    const lng = parseFloat(String(facility.longitude));
    
    if (!isNaN(lat) && !isNaN(lng)) {
      try {
        // Try to use mapbox to position the marker
        const point = map.project([lng, lat]);
        marker.style.left = `${point.x}px`;
        marker.style.top = `${point.y}px`;
      } catch (err) {
        console.error(`Error positioning marker for ${facility.name}:`, err);
      }
    }
  }
  
  // Add to map container if available
  const mapContainer = document.querySelector('.mapboxgl-map');
  if (mapContainer) {
    mapContainer.appendChild(marker);
    mapContainer.appendChild(popup);
    
    // Add click handler to marker
    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Toggle popup visibility
      const isVisible = popup.style.display === 'block';
      popup.style.display = isVisible ? 'none' : 'block';
      popup.style.visibility = isVisible ? 'hidden' : 'visible';
      
      // Log click for debugging
      console.log(`Clicked direct marker ${facility.id}`);
    });
    
    console.log(`Added direct marker ${facility.id} to map container`);
  } else {
    console.error('No map container found to add direct marker');
  }
  
  return marker;
}

/**
 * Creates markers directly in the DOM for multiple facilities
 */
export function createDirectMarkers(
  facilities: StorageFacility[],
  map: mapboxgl.Map | null
): void {
  console.log(`Creating ${facilities.length} direct markers`);
  
  // Clear any existing direct markers first
  document.querySelectorAll('.direct-marker, .direct-popup').forEach(el => {
    el.remove();
  });
  
  // Create markers for each facility
  facilities.forEach(facility => {
    createDirectMarker(facility, map);
  });
  
  console.log('Direct marker creation complete');
}
