
/**
 * Force map markers to be visible by periodically checking the DOM
 * This helps resolve issues where markers are loaded but not visible
 */
export const forceMapMarkersVisible = () => {
  // Immediately try to make markers visible
  fixMarkers();
  
  // Set up a periodic check to ensure markers remain visible
  const intervalId = setInterval(fixMarkers, 5000);
  
  // Clean up interval after 2 minutes
  setTimeout(() => {
    clearInterval(intervalId);
  }, 120000);
};

/**
 * Fix marker visibility issues
 */
const fixMarkers = () => {
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
  console.log(`Found ${markers.length} markers to make visible`);
  
  if (markers.length === 0) {
    console.log('No map markers found to fix');
    return;
  }
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.visibility = 'visible';
      marker.style.display = 'block';
      marker.style.opacity = '1';
      marker.style.zIndex = '1000';
    }
  });
};
