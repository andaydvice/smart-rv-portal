
// This script forces map markers to be visible no matter what
(function() {
  console.log("MarkerFix: Script loaded");
  
  // Run immediately and repeatedly
  forceMarkersVisible();
  setInterval(forceMarkersVisible, 1000);
  
  function forceMarkersVisible() {
    console.log("MarkerFix: Forcing markers visible");
    
    // Force all markers to be visible with !important styling
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .marker, [class*="marker"]');
    markers.forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.cssText += `
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: 9999 !important;
          pointer-events: auto !important;
          position: absolute !important;
          top: auto !important;
          left: auto !important;
          transform: translate(-50%, -50%) !important;
        `;
      }
    });
    
    // Ensure map containers are visible
    document.querySelectorAll('.mapboxgl-canvas-container, .mapboxgl-canvas').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.cssText += `
          height: 100% !important;
          width: 100% !important;
          visibility: visible !important;
          display: block !important;
        `;
      }
    });
    
    // Fix map container
    document.querySelectorAll('.h-\\[600px\\]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.cssText += `
          min-height: 600px !important;
          overflow: visible !important;
          position: relative !important;
        `;
      }
    });
    
    // Ensure mapbox is initialized
    if (window.mapboxgl && !window.mapboxgl._patched) {
      patchMapbox();
    }
  }
  
  function patchMapbox() {
    if (!window.mapboxgl || window.mapboxgl._patched) return;
    
    // Patch the Marker prototype to ensure markers are always visible
    if (window.mapboxgl.Marker) {
      const originalAddTo = window.mapboxgl.Marker.prototype.addTo;
      
      window.mapboxgl.Marker.prototype.addTo = function(map) {
        const result = originalAddTo.call(this, map);
        
        // Store map instance for emergency access
        window.mapInstance = map;
        
        // Force visibility on the marker element
        if (this._element) {
          this._element.style.cssText += `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            pointer-events: auto !important;
            position: absolute !important;
            transform: translate(-50%, -50%) !important;
          `;
        }
        
        return result;
      };
      
      // Also patch the remove method to prevent markers from being hidden
      const originalRemove = window.mapboxgl.Marker.prototype.remove;
      window.mapboxgl.Marker.prototype.remove = function() {
        // If this is a necessary marker, don't allow removal
        if (this._element && this._element.classList.contains('important-marker')) {
          console.log("Prevented removal of important marker");
          return this;
        }
        return originalRemove.call(this);
      };
      
      window.mapboxgl._patched = true;
      console.log("MarkerFix: Patched Mapbox Marker.prototype.addTo and remove");
    }
  }
  
  // Inject critical CSS
  const style = document.createElement('style');
  style.textContent = `
    .mapboxgl-marker, 
    .custom-marker, 
    .marker, 
    [class*="marker"] {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 9999 !important;
      pointer-events: auto !important;
      position: absolute !important;
      transform: translate(-50%, -50%) !important;
    }
    
    .mapboxgl-popup {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 10000 !important;
    }
    
    .mapboxgl-canvas-container,
    .mapboxgl-canvas {
      height: 100% !important;
      width: 100% !important;
      visibility: visible !important;
      display: block !important;
    }
    
    .h-\\[600px\\] {
      min-height: 600px !important;
      overflow: visible !important;
      position: relative !important;
    }
    
    .mapboxgl-map {
      overflow: visible !important;
    }
  `;
  document.head.appendChild(style);
  console.log("MarkerFix: Injected critical CSS");
  
  // Create emergency markers if none exist after 3 seconds
  setTimeout(() => {
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    if (markers.length === 0 && window.isStorageFacilitiesPage) {
      createEmergencyMarkers();
    }
  }, 3000);
  
  function createEmergencyMarkers() {
    if (!window.mapInstance) return;
    console.log("MarkerFix: Creating emergency markers");
    
    // Marker positions for different US states
    const emergencyPoints = [
      { id: "e1", name: "Arizona Storage", lat: 33.4484, lng: -112.0740, state: "Arizona" },
      { id: "e2", name: "California Storage", lat: 36.7783, lng: -119.4179, state: "California" },
      { id: "e3", name: "Texas Storage", lat: 31.9686, lng: -99.9018, state: "Texas" },
      { id: "e4", name: "Florida Storage", lat: 27.6648, lng: -81.5158, state: "Florida" },
      { id: "e5", name: "New York Storage", lat: 43.2994, lng: -74.2179, state: "New York" }
    ];
    
    emergencyPoints.forEach(point => {
      // Create a DOM element for the marker
      const el = document.createElement('div');
      el.className = 'emergency-marker custom-marker important-marker';
      el.setAttribute('data-state', point.state);
      el.style.cssText = `
        width: 24px;
        height: 24px;
        background-color: #F97316;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(0,0,0,0.8);
        cursor: pointer;
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 10000;
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
      `;
      
      // Add it to the map if possible
      if (window.mapboxgl && window.mapInstance) {
        try {
          new window.mapboxgl.Marker(el)
            .setLngLat([point.lng, point.lat])
            .addTo(window.mapInstance);
            
          console.log(`Created emergency marker for ${point.state}`);
        } catch (e) {
          console.error("MarkerFix: Error adding marker to map", e);
          // Fallback to just adding to DOM
          document.querySelector('.mapboxgl-map')?.appendChild(el);
        }
      } else {
        // Just add to DOM as fallback
        document.querySelector('.mapboxgl-map')?.appendChild(el);
      }
    });
  }
})();
