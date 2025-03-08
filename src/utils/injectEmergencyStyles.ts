
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
    
    .emergency-marker {
      animation: pulse-marker 1.5s infinite ease-in-out;
    }
    
    .fixed-orange-marker {
      animation: header-pulse 1.5s infinite ease-in-out;
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
    
    /* Style marker buttons */
    .view-facility-btn {
      background-color: #F97316 !important;
      color: white !important;
      border: none !important;
      padding: 8px 12px !important;
      border-radius: 4px !important;
      cursor: pointer !important;
      font-weight: bold !important;
      margin-top: 8px !important;
      display: block !important;
      width: 100% !important;
    }
    
    .view-facility-btn:hover {
      background-color: #EA580C !important;
    }
    
    /* Add visibility to header markers */
    .orange-marker-indicator {
      width: 24px !important;
      height: 24px !important;
      background-color: #F97316 !important;
      border-radius: 50% !important;
      border: 2px solid white !important;
      box-shadow: 0 0 10px rgba(249,115,22,0.8) !important;
      display: inline-block !important;
      position: relative !important;
      animation: header-pulse 1.5s infinite ease-in-out !important;
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

  // Add inline styles to any existing markers immediately
  setTimeout(() => {
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
  }, 0);
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
            console.log('Marker clicked via patched handler');
            
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
    const originalSetPopup = window.mapboxgl.Marker.prototype.setPopup;
    
    window.mapboxgl.Marker.prototype.setPopup = function(popup) {
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
    
    console.log('Mapbox Marker prototype successfully patched');
  } else {
    console.warn('Could not patch Mapbox Marker prototype - mapboxgl not available');
    
    // Add a fallback to try again later after scripts may have loaded
    setTimeout(() => {
      if (window.mapboxgl && window.mapboxgl.Marker) {
        patchMapboxMarkerPrototype();
      }
    }, 1000);
  }
}
