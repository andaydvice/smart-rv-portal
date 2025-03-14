
/**
 * Tests the visibility of map markers and logs any issues
 */
export function testMarkersVisibility(isInitialLoad: boolean = false) {
  console.log('Testing map markers visibility');
  
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
  console.log(`Found ${markers.length} markers to test`);
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      const isVisible = marker.style.visibility === 'visible' &&
                        marker.style.display === 'block' &&
                        marker.style.opacity === '1';
      
      if (!isVisible) {
        console.warn('Marker is not visible:', marker);
        console.warn('Style:', marker.style.cssText);
        console.warn('Attributes:', marker.attributes);
        
        if (isInitialLoad) {
          console.warn('This may be due to initial load issues - try again after the map has fully loaded');
        }
      }
    }
  });
}
