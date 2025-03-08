
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
          `;
        }
        
        return result;
      };
      
      window.mapboxgl._patched = true;
      console.log("MarkerFix: Patched Mapbox Marker.prototype.addTo");
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
    }
    
    .mapboxgl-popup {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 10000 !important;
    }
  `;
  document.head.appendChild(style);
  console.log("MarkerFix: Injected critical CSS");
  
  // Create emergency markers if none exist after 5 seconds
  setTimeout(() => {
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    if (markers.length === 0 && window.isStorageFacilitiesPage) {
      createEmergencyMarkers();
    }
  }, 5000);
  
  function createEmergencyMarkers() {
    if (!window.mapInstance) return;
    console.log("MarkerFix: Creating emergency markers");
    
    // Default markers in case no facilities are loaded
    const emergencyPoints = [
      { id: "e1", name: "Storage A", lat: 40.7128, lng: -74.0060 },
      { id: "e2", name: "Storage B", lat: 34.0522, lng: -118.2437 },
      { id: "e3", name: "Storage C", lat: 41.8781, lng: -87.6298 }
    ];
    
    emergencyPoints.forEach(point => {
      // Create a DOM element for the marker
      const el = document.createElement('div');
      el.className = 'emergency-marker custom-marker';
      el.innerHTML = `<div class="marker-inner"></div>`;
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
        } catch (e) {
          console.error("MarkerFix: Error adding marker to map", e);
          // Fallback to just adding to DOM
          document.body.appendChild(el);
        }
      } else {
        // Just add to DOM as fallback
        document.body.appendChild(el);
      }
    });
  }
})();
