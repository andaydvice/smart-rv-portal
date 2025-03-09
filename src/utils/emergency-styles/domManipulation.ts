
/**
 * Apply inline styles directly to marker elements in the DOM
 */
export function forceExistingMarkersVisible() {
  console.log("Forcing existing markers visible via DOM manipulation");
  
  // Force map markers
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
  
  // Force header markers
  document.querySelectorAll('.fixed-orange-marker, .orange-marker-indicator').forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.cssText += `
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
        background-color: #F97316 !important;
        border-radius: 50% !important;
        border: 3px solid white !important;
        box-shadow: 0 0 15px rgba(249,115,22,0.8) !important;
        z-index: 999999 !important;
      `;
    }
  });
}

/**
 * Add click handlers to markers if missing
 */
export function enhanceMarkerClickability() {
  document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
    if (marker instanceof HTMLElement && !marker.getAttribute('data-has-click')) {
      marker.setAttribute('data-has-click', 'true');
      
      marker.addEventListener('click', (e) => {
        console.log('Marker clicked:', marker.getAttribute('data-facility-id'));
        e.stopPropagation();
        
        // Try to find and click the view button
        const facilityId = marker.getAttribute('data-facility-id');
        if (facilityId) {
          setTimeout(() => {
            document.querySelectorAll(`.view-facility-btn[data-facility-id="${facilityId}"]`).forEach(btn => {
              (btn as HTMLElement).click();
            });
          }, 100);
        }
      });
    }
  });
}

/**
 * Enhance header markers with special styling
 */
export function enhanceHeaderMarkers() {
  document.querySelectorAll('.fixed-orange-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.cssText += `
        width: 30px !important;
        height: 30px !important;
        background-color: #F97316 !important;
        border-radius: 50% !important;
        border: 3px solid white !important;
        box-shadow: 0 0 15px rgba(249, 115, 22, 0.8) !important;
        animation: header-pulse 1.5s infinite ease-in-out !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      `;
    }
  });
}
