
/**
 * Add emergency CSS styles to document
 */
export function injectEmergencyMarkerStyles() {
  if (document.getElementById('emergency-marker-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'emergency-marker-styles';
  style.textContent = `
    .emergency-marker {
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      position: absolute !important;
      z-index: 10000 !important;
      pointer-events: auto !important;
      cursor: pointer !important;
      animation: pulse-emergency 1.5s infinite ease-in-out;
    }
    
    @keyframes pulse-emergency {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.2); }
    }
    
    .emergency-popup {
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      z-index: 10001 !important;
    }
    
    .emergency-close-btn:hover {
      color: #F97316;
    }
  `;
  
  document.head.appendChild(style);
}
