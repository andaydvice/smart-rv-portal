
// Emergency script for marker visibility - runs outside React
(function() {
  console.log('Emergency marker script loaded');
  
  // Run immediately and periodically
  forceMarkersVisible();
  const interval = setInterval(forceMarkersVisible, 2000);
  
  // Make sure we have markers on the map
  setTimeout(createEmergencyMarkers, 3000);
  setTimeout(createEmergencyMarkers, 6000);
  
  // Force all markers to be visible
  function forceMarkersVisible() {
    // Select all potential markers
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker, [class*="marker"]');
    
    if (markers.length > 0) {
      console.log(`Found ${markers.length} markers to make visible`);
      
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          // Force critical visibility styles
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
          marker.style.zIndex = '9999';
          marker.style.position = 'absolute';
        }
      });
    } else {
      console.log('No markers found, will create emergency markers');
    }
    
    // Also ensure map containers are visible and correctly sized
    document.querySelectorAll('.mapboxgl-map').forEach(map => {
      if (map instanceof HTMLElement) {
        map.style.overflow = 'visible';
        map.style.height = '100%';
        map.style.minHeight = '600px';
      }
    });
    
    // Hide all popups by default
    document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
      if (popup instanceof HTMLElement && !popup.classList.contains('clicked')) {
        popup.style.display = 'none';
        popup.style.visibility = 'hidden';
        popup.style.opacity = '0';
      }
    });
    
    // Remove any view details buttons
    document.querySelectorAll('.view-facility-btn, button.view-details, a.view-details, .view-details').forEach(btn => {
      if (btn instanceof HTMLElement) {
        btn.style.display = 'none';
        btn.style.visibility = 'hidden';
        btn.style.opacity = '0';
        btn.style.width = '0';
        btn.style.height = '0';
      }
    });
  }
  
  // Create emergency markers if none exist
  function createEmergencyMarkers() {
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    if (existingMarkers.length > 0) {
      console.log(`${existingMarkers.length} markers already exist, not creating emergency markers`);
      return;
    }
    
    console.log('Creating emergency markers');
    
    // Sample marker locations for different states
    const locations = [
      { lat: 33.4484, lng: -112.0740, name: "Arizona Storage", state: "Arizona" },
      { lat: 36.7783, lng: -119.4179, name: "California Storage", state: "California" },
      { lat: 31.9686, lng: -99.9018, name: "Texas Storage", state: "Texas" },
      { lat: 27.6648, lng: -81.5158, name: "Florida Storage", state: "Florida" },
      { lat: 43.2994, lng: -74.2179, name: "New York Storage", state: "New York" }
    ];
    
    // Find map containers
    const mapContainers = document.querySelectorAll('.mapboxgl-map, .h-\\[600px\\]');
    
    mapContainers.forEach(container => {
      if (!(container instanceof HTMLElement)) return;
      
      locations.forEach((location, index) => {
        // Create marker element
        const marker = document.createElement('div');
        marker.className = 'emergency-marker mapboxgl-marker';
        marker.id = `emergency-marker-${index}`;
        
        // Position in different parts of the map
        const left = 20 + (index * 15);
        const top = 20 + (index * 10);
        
        // Set critical styling
        marker.style.cssText = `
          position: absolute !important;
          left: ${left}% !important;
          top: ${top}% !important;
          width: 24px !important;
          height: 24px !important;
          background-color: #F97316 !important;
          border-radius: 50% !important;
          border: 2px solid white !important;
          box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
          z-index: 9999 !important;
          transform: translate(-50%, -50%) !important;
          cursor: pointer !important;
          visibility: visible !important;
          display: block !important;
          opacity: 1 !important;
        `;
        
        // Create popup element (hidden by default)
        const popup = document.createElement('div');
        popup.className = 'emergency-popup';
        popup.id = `emergency-popup-${index}`;
        popup.style.cssText = `
          position: absolute !important;
          left: ${left}% !important;
          top: ${top - 5}% !important;
          transform: translate(-50%, -100%) !important;
          background-color: #151A22 !important;
          color: white !important;
          padding: 10px !important;
          border-radius: 4px !important;
          max-width: 200px !important;
          z-index: 10000 !important;
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        `;
        
        popup.innerHTML = `
          <div style="margin-bottom: 5px; font-weight: bold;">${location.name}</div>
          <div style="margin-bottom: 5px;">${location.state}</div>
          <div>Coordinates: ${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}</div>
        `;
        
        // Add to container
        container.appendChild(marker);
        container.appendChild(popup);
        
        // Add click handler to toggle popup
        marker.addEventListener('click', () => {
          const isVisible = popup.style.display === 'block';
          popup.style.display = isVisible ? 'none' : 'block';
          popup.style.visibility = isVisible ? 'hidden' : 'visible';
          popup.style.opacity = isVisible ? '0' : '1';
          
          // Toggle clicked class
          if (isVisible) {
            popup.classList.remove('clicked');
          } else {
            popup.classList.add('clicked');
          }
        });
        
        // Add close handler for clicking outside popup
        document.addEventListener('click', (e) => {
          if (e.target !== marker && e.target !== popup && !popup.contains(e.target)) {
            popup.style.display = 'none';
            popup.style.visibility = 'hidden';
            popup.style.opacity = '0';
            popup.classList.remove('clicked');
          }
        });
      });
    });
  }
})();
