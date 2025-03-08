
export function injectEmergencyStyles() {
  console.log("Injecting emergency marker styles");
  
  // Check if styles already exist
  if (document.getElementById('emergency-marker-fix')) {
    return;
  }
  
  const style = document.createElement('style');
  style.id = 'emergency-marker-fix';
  style.innerHTML = `
    /* Critical visibility overrides */
    .custom-marker,
    .mapboxgl-marker,
    .marker,
    [class*="marker"] {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 9999 !important;
      pointer-events: auto !important;
      position: absolute !important;
    }
    
    /* Emergency marker styling */
    .mapboxgl-marker:before,
    .custom-marker:before {
      content: '';
      position: absolute;
      display: block !important;
      width: 24px;
      height: 24px;
      background-color: #F97316;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 10px rgba(0,0,0,0.8);
      z-index: 9999;
      pointer-events: auto;
      opacity: 1 !important;
      visibility: visible !important;
    }
    
    /* Force popup visibility */
    .mapboxgl-popup {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 10000 !important;
    }
    
    /* Style popup content */
    .mapboxgl-popup-content {
      display: block !important;
      background-color: #151A22 !important;
      color: white !important;
      border-radius: 8px !important;
      padding: 15px !important;
      border: 1px solid rgb(55 65 81) !important;
    }
    
    /* Ensure map is visible */
    .mapboxgl-map {
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    /* Make sure markers created programmatically are visible */
    body[data-markers-loading="true"] .mapboxgl-marker {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
  `;
  
  document.head.appendChild(style);
  console.log('Emergency marker styles injected successfully');
}

// Patch the Mapbox marker prototype if available
export function patchMapboxMarkerPrototype() {
  console.log("Attempting to patch Mapbox Marker prototype");
  
  if (window.mapboxgl && window.mapboxgl.Marker) {
    const originalAddTo = window.mapboxgl.Marker.prototype.addTo;
    
    window.mapboxgl.Marker.prototype.addTo = function(map) {
      console.log("Patched addTo called for marker");
      // Store map instance globally for emergency access
      window.mapInstance = map;
      
      const result = originalAddTo.call(this, map);
      
      // Ensure element is visible with direct style manipulation
      if (this._element) {
        console.log("Forcing marker element visible");
        Object.assign(this._element.style, {
          visibility: 'visible',
          display: 'block',
          opacity: '1',
          zIndex: '9999',
          pointerEvents: 'auto',
          position: 'absolute'
        });
        
        // Add a data attribute for debugging
        this._element.setAttribute('data-patched', 'true');
      }
      
      return result;
    };
    
    console.log('Mapbox Marker prototype successfully patched');
  } else {
    console.warn('Could not patch Mapbox Marker prototype - mapboxgl not available');
  }
}
