
export function injectEmergencyStyles() {
  // Check if styles already exist
  if (document.getElementById('emergency-marker-fix')) {
    return;
  }
  
  const style = document.createElement('style');
  style.id = 'emergency-marker-fix';
  style.innerHTML = `
    .custom-marker,
    .mapboxgl-marker,
    .marker,
    [class*="marker"] {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 9999 !important;
      pointer-events: auto !important;
    }
    
    .mapboxgl-marker:before,
    .custom-marker:before {
      content: '';
      position: absolute;
      display: block;
      width: 24px;
      height: 24px;
      background-color: #F97316;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 10px rgba(0,0,0,0.8);
      z-index: 9999;
      pointer-events: auto;
    }
    
    .mapboxgl-popup {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 10000 !important;
    }
    
    .mapboxgl-popup-content {
      display: block !important;
      background-color: #151A22 !important;
      color: white !important;
      border-radius: 8px !important;
      padding: 15px !important;
      border: 1px solid rgb(55 65 81) !important;
    }
  `;
  
  document.head.appendChild(style);
  console.log('Emergency marker styles injected');
}

// Patch the Mapbox marker prototype if available
export function patchMapboxMarkerPrototype() {
  if (window.mapboxgl && window.mapboxgl.Marker) {
    const originalAddTo = window.mapboxgl.Marker.prototype.addTo;
    
    window.mapboxgl.Marker.prototype.addTo = function(map) {
      const result = originalAddTo.call(this, map);
      
      if (this._element) {
        Object.assign(this._element.style, {
          visibility: 'visible',
          display: 'block',
          opacity: '1',
          zIndex: '9999'
        });
      }
      
      return result;
    };
    
    console.log('Mapbox Marker prototype patched');
  }
}
