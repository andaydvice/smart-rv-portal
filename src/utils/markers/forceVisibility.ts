
/**
 * Core utility to force map markers to be visible
 */
export function forceMapMarkersVisible() {
  console.log("ForceMarkersNow: Attempting to make markers visible");
  
  // Find all markers currently on the page
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  console.log(`Found ${markers.length} markers`);
  
  // If no markers exist yet, create emergency markers
  if (markers.length === 0) {
    // Import from separate file for emergency markers
    const { createEmergencyMarkers } = require('./emergencyMarkers');
    createEmergencyMarkers();
    return;
  }
  
  // Apply direct style fixes to existing markers
  applyForcedStyles(markers);
}

/**
 * Apply forced visibility styles to marker elements
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
      
      // Ensure marker has appropriate class for styling
      if (!marker.classList.contains('emergency-marker') && 
          !marker.classList.contains('custom-marker')) {
        marker.classList.add('custom-marker');
      }
    }
  });
}
