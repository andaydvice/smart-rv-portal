
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
        
        // Add to container
        container.appendChild(marker);
        
        // Log creation
        console.log(`Created emergency marker for ${location.name}`);
      });
    });
  }
})();
