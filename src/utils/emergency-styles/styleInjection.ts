
/**
 * Core function to inject emergency marker styles
 */
export function injectEmergencyStyles() {
  console.log("Injecting emergency marker styles");
  
  // Check if styles already exist
  if (document.getElementById('emergency-marker-fix')) {
    return;
  }
  
  const style = document.createElement('style');
  style.id = 'emergency-marker-fix';
  style.innerHTML = `
    /* Critical visibility overrides with higher specificity */
    .mapboxgl-marker,
    .custom-marker,
    .marker,
    [class*="marker"],
    div[class*="marker"],
    .mapboxgl-canvas-container .mapboxgl-marker {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 9999 !important;
      pointer-events: auto !important;
      position: absolute !important;
      cursor: pointer !important;
    }
    
    /* Emergency marker styling */
    .emergency-marker,
    .fixed-orange-marker {
      width: 30px !important;
      height: 30px !important;
      background-color: #F97316 !important;
      border-radius: 50% !important;
      border: 3px solid white !important;
      box-shadow: 0 0 15px rgba(249,115,22,0.8) !important;
      transform: translate(-50%, -50%) !important;
      animation: pulse-marker 1.5s infinite ease-in-out !important;
    }
    
    /* Pulsing animation */
    @keyframes pulse-marker {
      0% { transform: scale(1) translate(-50%, -50%); box-shadow: 0 0 10px rgba(249, 115, 22, 0.8); }
      50% { transform: scale(1.2) translate(-42%, -42%); box-shadow: 0 0 20px rgba(249, 115, 22, 0.9); }
      100% { transform: scale(1) translate(-50%, -50%); box-shadow: 0 0 10px rgba(249, 115, 22, 0.8); }
    }
    
    @keyframes header-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .fixed-orange-marker {
      animation: header-pulse 1.5s infinite ease-in-out;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    /* Force popup visibility */
    .mapboxgl-popup {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 10000 !important;
      pointer-events: auto !important;
    }
    
    /* Style popup content */
    .mapboxgl-popup-content {
      display: block !important;
      background-color: #151A22 !important;
      color: white !important;
      border-radius: 8px !important;
      padding: 15px !important;
      border: 1px solid rgb(55 65 81) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
    }
    
    /* Ensure map is visible */
    .mapboxgl-map {
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    /* Add visibility to header markers */
    .orange-marker-indicator,
    .fixed-orange-marker {
      width: 24px !important;
      height: 24px !important;
      background-color: #F97316 !important;
      border-radius: 50% !important;
      border: 2px solid white !important;
      box-shadow: 0 0 10px rgba(249,115,22,0.8) !important;
      display: inline-block !important;
      position: relative !important;
      visibility: visible !important;
      opacity: 1 !important;
      animation: header-pulse 1.5s infinite ease-in-out !important;
      z-index: 999999 !important;
    }
    
    /* Make sure markers created programmatically are visible */
    body[data-markers-loading="true"] .mapboxgl-marker,
    .mapboxgl-map[loaded="true"] .mapboxgl-marker,
    #map .mapboxgl-marker,
    div .mapboxgl-marker {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
  `;
  
  document.head.appendChild(style);
  console.log('Emergency marker styles injected successfully');
}
