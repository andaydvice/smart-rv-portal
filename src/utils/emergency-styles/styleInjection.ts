
/**
 * Core function to inject emergency marker styles with better performance
 */
export function injectEmergencyStyles() {
  console.log("Injecting emergency marker styles");
  
  // Check if styles already exist to avoid redundant operations
  if (document.getElementById('emergency-marker-fix')) {
    return;
  }
  
  // Create a single style element instead of manipulating individual elements
  const style = document.createElement('style');
  style.id = 'emergency-marker-fix';
  
  // Use more efficient CSS selectors and optimize the CSS rules
  style.innerHTML = `
    /* Critical visibility overrides with higher specificity but fewer rules */
    .mapboxgl-marker,
    .custom-marker,
    [class*="marker"].mapboxgl-marker,
    .mapboxgl-canvas-container .mapboxgl-marker {
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      z-index: 9999 !important;
      pointer-events: auto !important;
    }
    
    /* Combined emergency marker styling for better performance */
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
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      z-index: 99999 !important;
    }
    
    /* Simplified animations with better performance */
    @keyframes pulse-marker {
      0%, 100% { transform: scale(1) translate(-50%, -50%); }
      50% { transform: scale(1.2) translate(-42%, -42%); }
    }
    
    @keyframes header-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    /* More efficient popup styling */
    .mapboxgl-popup {
      z-index: 10000 !important;
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
    }
    
    /* Combined popup styling */
    .mapboxgl-popup-content {
      background-color: #151A22 !important;
      color: white !important;
      border-radius: 8px !important;
      padding: 15px !important;
      border: 1px solid rgb(55 65 81) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
    }
    
    /* Data attribute based selectors for more efficient targeting */
    body[data-markers-loading="true"] .mapboxgl-marker,
    .mapboxgl-map[loaded="true"] .mapboxgl-marker {
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
    }
    
    /* Hardware acceleration for better performance */
    .mapboxgl-marker, .custom-marker, .mapboxgl-popup {
      transform: translateZ(0);
      will-change: transform;
    }
  `;
  
  document.head.appendChild(style);
  console.log('Emergency marker styles injected successfully');
}
