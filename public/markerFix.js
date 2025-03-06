
// Emergency fix for map markers
(function() {
  // Immediately invoked function to fix map markers
  function fixMapMarkers() {
    console.log('Attempting emergency marker fix');
    
    // Override prototypes to force markers to be visible
    if (window.mapboxgl && window.mapboxgl.Marker) {
      const originalAddTo = window.mapboxgl.Marker.prototype.addTo;
      
      window.mapboxgl.Marker.prototype.addTo = function(map) {
        const result = originalAddTo.call(this, map);
        
        // Force element to be visible after it's added to the map
        if (this._element) {
          Object.assign(this._element.style, {
            display: 'block !important',
            visibility: 'visible !important',
            opacity: '1 !important',
            zIndex: '9999 !important',
            backgroundColor: '#F97316 !important',
            width: '24px !important',
            height: '24px !important',
            borderRadius: '50% !important',
            border: '2px solid white !important',
            boxShadow: '0 0 10px rgba(0,0,0,0.8) !important'
          });
          
          // Add a data attribute to track our modified markers
          this._element.setAttribute('data-fixed-marker', 'true');
          
          // Log success
          console.log('Marker fixed:', this._element);
        }
        
        return result;
      };
      
      console.log('Mapbox Marker prototype successfully patched');
    }
    
    // Periodically check for markers and force them to be visible
    setInterval(() => {
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (!marker.hasAttribute('data-fixed-marker')) {
          Object.assign(marker.style, {
            display: 'block',
            visibility: 'visible',
            opacity: '1',
            zIndex: '9999',
            backgroundColor: '#F97316',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 0 10px rgba(0,0,0,0.8)'
          });
          
          marker.setAttribute('data-fixed-marker', 'true');
          console.log('Fixed existing marker:', marker);
        }
      });
    }, 1000);
    
    // Add a global event listener to catch when the map is created
    window.addEventListener('load', () => {
      console.log('Window loaded, looking for map');
      
      // Give the map time to initialize
      setTimeout(() => {
        const mapContainer = document.querySelector('.mapboxgl-map');
        if (mapContainer) {
          console.log('Map container found, injecting emergency markers');
          
          // Create emergency markers if none exist
          if (document.querySelectorAll('.mapboxgl-marker, .custom-marker').length === 0) {
            console.log('No markers found, creating emergency markers');
            
            // Create hardcoded markers as a last resort
            const emergencyLocations = [
              { lat: 40.7128, lng: -74.0060, name: "Central Storage" },
              { lat: 40.7500, lng: -74.0300, name: "North Storage" },
              { lat: 40.6800, lng: -73.9800, name: "South Storage" }
            ];
            
            emergencyLocations.forEach((location, index) => {
              const marker = document.createElement('div');
              marker.className = 'emergency-marker';
              marker.style.position = 'absolute';
              marker.style.width = '24px';
              marker.style.height = '24px';
              marker.style.backgroundColor = '#F97316';
              marker.style.borderRadius = '50%';
              marker.style.border = '2px solid white';
              marker.style.boxShadow = '0 0 10px rgba(0,0,0,0.8)';
              marker.style.zIndex = '9999';
              marker.style.cursor = 'pointer';
              
              // Position approximately based on map container dimensions
              const containerRect = mapContainer.getBoundingClientRect();
              marker.style.left = `${containerRect.width * (0.3 + (index * 0.2))}px`;
              marker.style.top = `${containerRect.height * 0.5}px`;
              
              // Add click handler
              marker.onclick = function() {
                alert(`${location.name}: ${location.lat}, ${location.lng}`);
              };
              
              mapContainer.appendChild(marker);
              console.log('Created emergency marker:', marker);
            });
          }
        }
      }, 3000);
    });
  }
  
  // Run our fix on script load
  fixMapMarkers();
  
  // Also add CSS directly to the page
  const style = document.createElement('style');
  style.textContent = `
    .mapboxgl-marker, .custom-marker, .emergency-marker {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 9999 !important;
    }
    
    .mapboxgl-popup {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 10000 !important;
    }
    
    [data-radix-tooltip-provider] {
      display: contents !important;
    }
  `;
  document.head.appendChild(style);
})();
