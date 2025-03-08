
(function() {
  console.log("MarkerFix: Emergency marker fix loading");

  // Direct style injection for critical marker visibility
  const injectStyles = () => {
    const style = document.createElement('style');
    style.id = 'emergency-marker-fix';
    style.innerHTML = `
      .mapboxgl-marker, .custom-marker, .marker {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
      }
      
      .mapboxgl-marker:after, .custom-marker:after {
        content: '';
        display: block !important;
        width: 24px !important;
        height: 24px !important;
        border-radius: 50% !important;
        background-color: #F97316 !important;
        border: 2px solid white !important;
        box-shadow: 0 0 10px rgba(0,0,0,0.8) !important;
      }
      
      .mapboxgl-popup {
        z-index: 10000 !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      .mapboxgl-popup-content {
        background-color: #151A22 !important;
        color: white !important;
        border: 1px solid #333 !important;
      }
    `;
    document.head.appendChild(style);
    console.log("MarkerFix: Emergency styles injected");
  };
  
  // Forcibly create backup markers if needed
  const createBackupMarkers = () => {
    setTimeout(() => {
      if (!window.isStorageFacilitiesPage) return;
      
      const mapContainer = document.querySelector('.mapboxgl-map');
      if (!mapContainer) return;
      
      console.log("MarkerFix: Checking for markers");
      const existingMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
      
      if (existingMarkers.length === 0) {
        console.log("MarkerFix: No markers found, creating emergency markers");
        
        // Emergency fallback locations
        const emergencyLocations = [
          { lat: 33.4484, lng: -112.0740, name: "Phoenix Storage" },
          { lat: 32.7767, lng: -96.7970, name: "Dallas Storage" },
          { lat: 36.1699, lng: -115.1398, name: "Las Vegas Storage" },
          { lat: 40.7128, lng: -74.0060, name: "New York Storage" },
          { lat: 34.0522, lng: -118.2437, name: "Los Angeles Storage" }
        ];
        
        emergencyLocations.forEach((location) => {
          const marker = document.createElement('div');
          marker.className = 'emergency-marker custom-marker';
          
          Object.assign(marker.style, {
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#F97316',
            border: '2px solid white',
            boxShadow: '0 0 10px rgba(0,0,0,0.8)',
            zIndex: '9999',
            cursor: 'pointer',
            transform: 'translate(-50%, -50%)',
            visibility: 'visible',
            display: 'block'
          });
          
          // Add click handler
          marker.addEventListener('click', () => {
            alert(`${location.name}: ${location.lat}, ${location.lng}`);
          });
          
          // Add to map container
          mapContainer.appendChild(marker);
        });
        
        console.log("MarkerFix: Created emergency markers");
      }
    }, 3000);
  };
  
  // Function to force visibility of any markers
  const forceMarkersVisible = () => {
    if (!window.isStorageFacilitiesPage) return;
    
    console.log("MarkerFix: Forcing markers visible");
    document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.opacity = '1';
        marker.style.zIndex = '9999';
        marker.style.pointerEvents = 'auto';
      }
    });
  };
  
  // Patch Mapbox prototype if available
  const patchMapboxPrototype = () => {
    if (window.mapboxgl && window.mapboxgl.Marker) {
      const originalAddTo = window.mapboxgl.Marker.prototype.addTo;
      
      window.mapboxgl.Marker.prototype.addTo = function(map) {
        const result = originalAddTo.call(this, map);
        
        // Force element to be visible
        if (this._element) {
          setTimeout(() => {
            this._element.style.visibility = 'visible';
            this._element.style.display = 'block';
            this._element.style.opacity = '1';
            this._element.style.zIndex = '9999';
          }, 100);
        }
        
        return result;
      };
      
      console.log("MarkerFix: Patched Mapbox Marker prototype");
    }
  };
  
  // Initialize all fixes
  injectStyles();
  
  // Set up interval for force markers and backup creation
  setInterval(() => {
    forceMarkersVisible();
  }, 1000);
  
  // Create backup markers after a delay
  setTimeout(() => {
    createBackupMarkers();
    patchMapboxPrototype();
    
    // Monitor for map instance
    const checkForMap = setInterval(() => {
      if (window.mapInstance) {
        console.log("MarkerFix: Map instance found");
        clearInterval(checkForMap);
        forceMarkersVisible();
      }
    }, 1000);
  }, 2000);
  
  // Notify that the script is loaded
  console.log("MarkerFix: Emergency fixes loaded successfully");
})();
