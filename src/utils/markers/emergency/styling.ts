
/**
 * Styling utilities for emergency markers
 */

/**
 * Inject emergency marker styles into the document
 */
export function injectEmergencyMarkerStyles(): void {
  if (document.getElementById('emergency-marker-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'emergency-marker-styles';
  style.textContent = `
    .emergency-marker,
    .direct-marker {
      width: 24px !important;
      height: 24px !important;
      border-radius: 50% !important;
      background-color: #F97316 !important;
      border: 2px solid white !important;
      box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
      transform: translate(-50%, -50%) !important;
      cursor: pointer !important;
      position: absolute !important;
      z-index: 9999 !important;
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    
    .direct-popup {
      z-index: -9999 !important;
      position: absolute !important;
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity 0.2s !important;
    }
    
    .direct-popup.visible,
    .direct-popup.clicked {
      z-index: 10000 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    
    .popup-close {
      cursor: pointer !important;
      font-size: 20px !important;
      padding: 0 !important;
      width: 24px !important;
      height: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 50% !important;
      background: rgba(0, 0, 0, 0.2) !important;
      transition: background 0.2s !important;
    }
    
    .popup-close:hover {
      background: rgba(0, 0, 0, 0.4) !important;
    }
  `;
  
  document.head.appendChild(style);
}
