
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
    
    // More aggressive removal of diagonal white arrows and unwanted UI elements
    document.querySelectorAll('.gm-ui-hover-effect, .gm-style img[src*="arrow"], .gm-style button, .gm-control-active').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
      }
    });
    
    // Remove the diagonal white arrow in the info windows
    document.querySelectorAll('.gm-style-iw-a, .gm-style-iw-t').forEach(el => {
      if (el instanceof HTMLElement) {
        const arrows = el.querySelectorAll('img');
        arrows.forEach(arrow => {
          arrow.style.display = 'none';
          arrow.style.visibility = 'hidden';
          arrow.style.opacity = '0';
        });
      }
    });
    
    // Ensure info window content is visible and scrollable
    document.querySelectorAll('.gm-style-iw, .gm-style-iw-c, .gm-style-iw-d').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.overflow = 'auto';
        el.style.maxHeight = 'none';
        el.style.boxSizing = 'border-box';
        el.style.padding = '12px';
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

// Run this function to remove all unwanted Google Maps UI elements
export const removeUnwantedMapElements = () => {
  // More comprehensive removal of unwanted UI elements
  const removeElements = () => {
    // Remove diagonal white arrows
    document.querySelectorAll('.gm-ui-hover-effect, .gm-style img[src*="arrow"]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
      }
    });
    
    // Remove additional unwanted UI controls
    document.querySelectorAll('.gm-style button, .gm-control-active, .gm-svpc').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
      }
    });
    
    // Fix info window appearance
    document.querySelectorAll('.gm-style-iw-c').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.padding = '12px';
        el.style.borderRadius = '8px';
        el.style.boxShadow = '0 2px 7px 1px rgba(0, 0, 0, 0.3)';
        el.style.maxHeight = 'none';
      }
    });
    
    // Ensure info window content is visible and scrollable
    document.querySelectorAll('.gm-style-iw-d').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.overflow = 'auto !important';
        el.style.maxHeight = 'none !important';
      }
    });
    
    // Target specific arrow elements in the info window
    document.querySelectorAll('.gm-style-iw-t').forEach(el => {
      const arrowImgs = el.querySelectorAll('img');
      arrowImgs.forEach(img => {
        if (img instanceof HTMLElement) {
          img.style.display = 'none';
          img.style.visibility = 'hidden';
          img.style.opacity = '0';
        }
      });
    });
    
    // Log count of found elements for debugging (only if count changed)
    const markerCount = document.querySelectorAll('.gm-style img[src*="marker"]').length;
    if (markerCount > 0) {
      console.log(`Found ${markerCount} markers to make visible`);
    }
  };
  
  // Run immediately and also set interval to catch any dynamically added elements
  removeElements();
  return setInterval(removeElements, 2000); // Check every 2 seconds
};

// Function to fix infowindow scrolling issues
export const fixInfoWindowScrolling = () => {
  document.querySelectorAll('.gm-style-iw, .gm-style-iw-c, .gm-style-iw-d').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.overflow = 'auto';
      el.style.maxHeight = 'none';
      
      // Ensure infowindow content is scrollable
      const content = el.querySelector('div');
      if (content instanceof HTMLElement) {
        content.style.overflow = 'auto';
        content.style.maxHeight = '300px'; // Set a reasonable max height
      }
    }
  });
};
