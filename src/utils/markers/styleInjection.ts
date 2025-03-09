
/**
 * Inject CSS to ensure markers are visible
 */
export function injectEmergencyMarkerStyles() {
  // Check if styles are already injected
  if (document.getElementById('markers-emergency-css')) {
    return;
  }
  
  // Create style element
  const style = document.createElement('style');
  style.id = 'markers-emergency-css';
  style.textContent = `
    .mapboxgl-marker,
    .custom-marker,
    .emergency-marker {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 9999 !important;
      pointer-events: auto !important;
      position: absolute !important;
      cursor: pointer !important;
    }
    
    .emergency-marker {
      width: 30px !important;
      height: 30px !important;
      background-color: #F97316 !important;
      border-radius: 50% !important;
      border: 3px solid white !important;
      box-shadow: 0 0 15px rgba(249,115,22,0.8) !important;
      animation: emergency-pulse 1.5s infinite ease-in-out;
    }
    
    @keyframes emergency-pulse {
      0% { transform: scale(1) translate(-50%, -50%); box-shadow: 0 0 10px rgba(249, 115, 22, 0.8); }
      50% { transform: scale(1.1) translate(-45%, -45%); box-shadow: 0 0 20px rgba(249, 115, 22, 0.9); }
      100% { transform: scale(1) translate(-50%, -50%); box-shadow: 0 0 10px rgba(249, 115, 22, 0.8); }
    }
  `;
  
  // Add to document head
  document.head.appendChild(style);
  console.log('Injected emergency marker styles');
}

// Run style injection immediately
injectEmergencyMarkerStyles();
