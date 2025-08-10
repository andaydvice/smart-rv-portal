
/**
 * Patch the Mapbox marker prototype if available
 */
export function patchMapboxMarkerPrototype() {
  if (import.meta.env.DEV) console.log("Attempting to patch Mapbox Marker prototype");
  
  if (window.mapboxgl && window.mapboxgl.Marker) {
    // Store original methods to call them later
    const originalAddTo = window.mapboxgl.Marker.prototype.addTo;
    const originalSetPopup = window.mapboxgl.Marker.prototype.setPopup;
    
    // Patch the addTo method
    window.mapboxgl.Marker.prototype.addTo = function(map) {
      if (import.meta.env.DEV) console.log("Patched addTo called for marker");
      // Store map instance globally for emergency access
      window.mapInstance = map;
      
      // Call original method
      const result = originalAddTo.call(this, map);
      
      // Ensure element is visible with direct style manipulation
      if (this._element) {
        if (import.meta.env.DEV) console.log("Forcing marker element visible");
        Object.assign(this._element.style, {
          visibility: 'visible',
          display: 'block',
          opacity: '1',
          zIndex: '9999',
          pointerEvents: 'auto',
          position: 'absolute',
          cursor: 'pointer'
        });
        
        // Add a data attribute for debugging
        this._element.setAttribute('data-patched', 'true');
        
        // Add click handler if missing
        if (!this._element.getAttribute('data-has-click')) {
          this._element.setAttribute('data-has-click', 'true');
          
          this._element.addEventListener('click', (e) => {
            e.stopPropagation();
            if (import.meta.env.DEV) console.log('Marker clicked via patched handler');
            
            // Try to open popup
            if (this.getPopup && typeof this.getPopup === 'function' && !this.getPopup().isOpen()) {
              this.togglePopup();
            }
          });
        }
      }
      
      return result;
    };
    
    // Patch the popup system
    window.mapboxgl.Marker.prototype.setPopup = function(popup) {
      // Call original method
      const result = originalSetPopup.call(this, popup);
      
      // Enhance popup if it exists
      if (popup && popup.getElement) {
        const popupEl = popup.getElement();
        if (popupEl) {
          Object.assign(popupEl.style, {
            visibility: 'visible',
            display: 'block',
            opacity: '1',
            zIndex: '10000',
            pointerEvents: 'auto'
          });
        }
      }
      
      return result;
    };
    
    if (import.meta.env.DEV) console.log('Mapbox Marker prototype successfully patched');
  } else {
    if (import.meta.env.DEV) console.warn('Could not patch Mapbox Marker prototype - mapboxgl not available');
    
    // Add a fallback to try again later after scripts may have loaded
    setTimeout(() => {
      if (window.mapboxgl && window.mapboxgl.Marker) {
        patchMapboxMarkerPrototype();
      }
    }, 1000);
  }
}

/**
 * Try to patch Mapbox multiple times to ensure it works
 */
export function attemptMapboxPatchWithRetry() {
  // Initial attempt
  patchMapboxMarkerPrototype();
  
  // Retry a few times with increasing delays
  [100, 500, 1000, 2000].forEach(delay => {
    setTimeout(() => {
      if (window.mapboxgl && window.mapboxgl.Marker) {
        patchMapboxMarkerPrototype();
      }
    }, delay);
  });
}
