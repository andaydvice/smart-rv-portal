
import '../emergency-styles/styleInjection';

/**
 * Force map markers to be visible
 */
export function forceMapMarkersVisible() {
  console.log("MarkerFix: Forcing markers visible");
  
  // Query all markers
  document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.cssText += `
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
        position: absolute !important;
        cursor: pointer !important;
      `;
    }
  });
}

/**
 * Apply forced styles to marker elements
 */
export function applyForcedStyles(markers: NodeListOf<Element>) {
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      // Force critical visibility styles
      marker.style.cssText += `
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
        position: absolute !important;
        cursor: pointer !important;
      `;
      
      // Add specific marker attributes
      marker.setAttribute('data-forced', 'true');
    }
  });
}

/**
 * Create emergency markers when normal markers fail
 */
export function createEmergencyMarkers() {
  console.log("Creating emergency markers");
  
  // Get the map container
  const mapContainer = document.querySelector('.mapboxgl-map');
  if (!mapContainer) {
    console.warn("Map container not found");
    return;
  }
  
  // Create emergency marker
  const marker = document.createElement('div');
  marker.className = 'emergency-marker';
  marker.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    background-color: #F97316;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 10px rgba(0,0,0,0.8);
    transform: translate(-50%, -50%);
    z-index: 9999;
    animation: pulse 1.5s infinite ease-in-out;
  `;
  
  mapContainer.appendChild(marker);
}
