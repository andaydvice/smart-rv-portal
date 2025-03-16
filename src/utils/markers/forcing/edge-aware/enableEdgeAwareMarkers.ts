
import mapboxgl from 'mapbox-gl';
import { preventMarkerEdgeCutoff } from './preventEdgeCutoff';

/**
 * Enables edge-aware behavior for all markers on a map
 * ensuring popups stay at least 20px from any edge
 * 
 * @param map - The mapbox map instance
 */
export function enableEdgeAwareMarkers(map: mapboxgl.Map): void {
  if (!map) {
    console.warn('Cannot enable edge-aware markers: map is null');
    return;
  }
  
  // Find all markers
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker');
  console.log(`Found ${markers.length} markers to make edge-aware`);
  
  // Force markers to be visible first
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.visibility = 'visible';
      marker.style.display = 'block';
      marker.style.opacity = '1';
    }
  });
  
  // Add click event listener to map container to handle marker clicks
  map.getContainer().addEventListener('click', (e) => {
    const marker = (e.target as HTMLElement)?.closest('.mapboxgl-marker, .custom-marker, .direct-marker');
    if (marker instanceof HTMLElement) {
      const facilityId = marker.getAttribute('data-facility-id');
      const lat = parseFloat(marker.getAttribute('data-lat') || '0');
      const lng = parseFloat(marker.getAttribute('data-lng') || '0');
      
      if (facilityId && !isNaN(lat) && !isNaN(lng)) {
        // Minimum required padding from any edge
        const minPadding = 20;
        
        // Prevent popup from being cut off at map edge with generous padding
        preventMarkerEdgeCutoff(map, marker, [lng, lat], {
          top: Math.max(100, minPadding),
          right: Math.max(150, minPadding),
          bottom: Math.max(150, minPadding),
          left: Math.max(150, minPadding)
        });
      }
    }
  });
  
  // Flag markers as edge-aware
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.setAttribute('data-edge-aware', 'true');
    }
  });
}
