
// Google Maps Marker Visibility Fix Script
(function() {
  console.log('Google Maps marker visibility fix script loaded');
  
  // Function to ensure Google Maps markers are visible
  function forceGoogleMapsMarkersVisible() {
    // Find all Google Maps markers
    const markers = document.querySelectorAll('.gm-style img[src*="marker"], .gm-style div[role="button"]');
    
    // If we found markers, make them visible
    if (markers.length > 0) {
      console.log(`Found ${markers.length} Google Maps markers to make visible`);
      
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          // Force critical visibility styles
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
          marker.style.zIndex = '999';
        }
      });
    }
  }
  
  // Run the fix function periodically
  setInterval(forceGoogleMapsMarkersVisible, 1000);
  
  // Also run after state filter changes
  document.addEventListener('stateFilterChanged', () => {
    console.log('State filter changed, fixing Google Maps markers');
    
    // Run multiple times after a state filter change
    setTimeout(forceGoogleMapsMarkersVisible, 500);
    setTimeout(forceGoogleMapsMarkersVisible, 1000);
    setTimeout(forceGoogleMapsMarkersVisible, 2000);
  });
  
  // Also check whenever the map is idle (after pan/zoom operations)
  if (window.google && window.google.maps) {
    const checkMapIdle = setInterval(() => {
      const maps = Array.from(document.querySelectorAll('.gm-style')).map(el => {
        // Try to find the map instance
        const mapDiv = el.closest('[id^="map_"]') || el.closest('.google-map-container');
        if (mapDiv && mapDiv.id && window.google.maps.Map && window.google.maps.event) {
          const mapInstance = window.google.maps.Map.getMapForElement(mapDiv);
          if (mapInstance) {
            window.google.maps.event.addListener(mapInstance, 'idle', forceGoogleMapsMarkersVisible);
            console.log('Added idle listener to Google Map');
          }
        }
      });
      
      // If we've found maps, clear the interval
      if (maps.length > 0) {
        clearInterval(checkMapIdle);
      }
    }, 1000);
  }
})();
