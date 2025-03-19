
// Google Maps Marker Visibility Fix Script
(function() {
  console.log('Google Maps marker visibility fix script loaded');
  
  // Function to ensure Google Maps markers are visible
  function forceGoogleMarkersVisible() {
    // Find all Google Maps markers
    const markers = document.querySelectorAll('.gm-style img[src*="marker"], .gm-style div[role="button"], .gm-style [title]');
    
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
          marker.style.transform = 'none';
        }
      });
    } else {
      console.log('No Google Maps markers found yet');
    }
  }
  
  // Expose the function globally
  window.forceGoogleMarkersVisible = forceGoogleMarkersVisible;
  
  // Run the fix function periodically
  setInterval(forceGoogleMarkersVisible, 1000);
  
  // Also run after state filter changes
  document.addEventListener('stateFilterChanged', () => {
    console.log('State filter changed, fixing Google Maps markers');
    
    // Run multiple times after a state filter change
    setTimeout(forceGoogleMarkersVisible, 500);
    setTimeout(forceGoogleMarkersVisible, 1000);
    setTimeout(forceGoogleMarkersVisible, 2000);
  });
  
  // Also run when map becomes idle (after zoom/pan operations)
  document.addEventListener('google-map-idle', forceGoogleMarkersVisible);
  
  // Initial run
  forceGoogleMarkersVisible();
  
  // Run again after a delay to catch late-loaded markers
  setTimeout(forceGoogleMarkersVisible, 2000);
})();
