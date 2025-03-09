
import mapboxgl from 'mapbox-gl';

/**
 * Update the positions of all emergency markers when the map moves
 */
export function updateMarkerPositions(map: mapboxgl.Map): void {
  const markers = document.querySelectorAll('.emergency-marker');
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      const lat = parseFloat(marker.getAttribute('data-lat') || '0');
      const lng = parseFloat(marker.getAttribute('data-lng') || '0');
      
      // Skip invalid coordinates
      if (isNaN(lat) || isNaN(lng)) return;
      
      // Convert geo coordinates to pixel coordinates
      const point = map.project([lng, lat]);
      
      // Update position
      marker.style.left = `${point.x}px`;
      marker.style.top = `${point.y}px`;
      
      // Update associated popup position if it exists
      const facilityId = marker.getAttribute('data-facility-id');
      if (facilityId) {
        const popup = document.getElementById(`emergency-popup-${facilityId}`);
        if (popup instanceof HTMLElement) {
          popup.style.left = `${point.x}px`;
          popup.style.top = `${point.y - 10}px`;
        }
      }
    }
  });
}
