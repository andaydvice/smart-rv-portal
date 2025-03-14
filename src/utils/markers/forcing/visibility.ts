
import mapboxgl from 'mapbox-gl';

/**
 * Forces all map markers to be visible by setting their CSS styles
 */
export function forceMapMarkersVisible() {
  console.log('Forcing map markers to be visible');
  
  document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      applyForcedStyles(marker);
    }
  });
}

/**
 * Applies forced visibility styles to a single marker
 */
export function applyForcedStyles(marker: HTMLElement) {
  marker.style.visibility = 'visible';
  marker.style.display = 'block';
  marker.style.opacity = '1';
  marker.style.zIndex = '9999';
  marker.style.pointerEvents = 'auto';
  marker.style.position = 'absolute';
  marker.setAttribute('data-forced-visible', 'true');
}
