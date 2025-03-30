
/**
 * Service to enhance Google Maps marker visibility and appearance
 */

// Function to ensure markers are fully visible on the map
export const ensureMarkersVisible = (map: google.maps.Map | null) => {
  if (!map) return;
  
  // Force visibility of all marker elements
  setTimeout(() => {
    document.querySelectorAll('.gm-style img[src*="marker"]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.display = 'block';
        el.style.zIndex = '1000';
      }
    });
    
    // Remove any unwanted overlay elements 
    document.querySelectorAll('.gm-style div[title="Close"]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    // Remove any diagonal white arrows or unwanted UI elements
    document.querySelectorAll('.gm-ui-hover-effect, .gm-style img[src*="arrow"]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  }, 500);
};

// Function to create custom markers without unwanted UI elements
export const createCleanMarkers = (
  map: google.maps.Map | null, 
  position: google.maps.LatLngLiteral,
  title: string
): google.maps.Marker | null => {
  if (!map) return null;
  
  return new google.maps.Marker({
    position,
    map,
    title,
    optimized: false, // Important for consistent visibility
    clickable: true,
    visible: true,
    zIndex: 1000
  });
};

export const removeUnwantedMapElements = () => {
  // Remove any diagonal white arrows or other unwanted UI elements
  const removeElements = () => {
    document.querySelectorAll('.gm-ui-hover-effect, .gm-style img[src*="arrow"]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  };
  
  // Run immediately and also set interval to catch any dynamically added elements
  removeElements();
  return setInterval(removeElements, 1000);
};
