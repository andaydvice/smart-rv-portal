
import mapboxgl from 'mapbox-gl';

/**
 * Get the existing emergency markers container or create a new one
 */
export function getOrCreateContainer(map: mapboxgl.Map): HTMLElement {
  let container = document.querySelector('.emergency-markers-container') as HTMLElement;
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'emergency-markers-container';
    
    // Style the container
    container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    
    const mapContainer = map.getContainer();
    if (mapContainer) {
      mapContainer.appendChild(container);
    } else {
      const mapEl = document.querySelector('.mapboxgl-map');
      if (mapEl) mapEl.appendChild(container);
    }
  }
  
  return container;
}
