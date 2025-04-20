
/**
 * This utility handles the emergency injection of CSS styles to ensure
 * map markers are always visible regardless of other issues.
 */

export const injectEmergencyStyles = () => {
  console.log('Injecting emergency styles for map markers');
  
  try {
    // Create a style element
    const style = document.createElement('style');
    
    // Critical CSS to force marker visibility
    style.textContent = `
      /* Force marker visibility */
      .mapboxgl-marker,
      .custom-marker,
      .emergency-marker,
      [class*="marker"],
      .map-marker {
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
        position: absolute !important;
        z-index: 10000 !important;
        pointer-events: auto !important;
      }
      
      /* Fix map container */
      .mapboxgl-map {
        overflow: visible !important;
      }
      
      /* Fix popup visibility */
      .mapboxgl-popup {
        z-index: 10001 !important;
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
      }
      
      /* Fix blank page issues */
      #root {
        display: block !important;
        visibility: visible !important;
      }
      
      body {
        overflow: auto !important;
      }
    `;
    
    // Append to document head
    document.head.appendChild(style);
    console.log('Emergency styles injected successfully');
    
    // Also apply styles directly to any existing markers
    setTimeout(() => {
      document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
          marker.style.zIndex = '9999';
        }
      });
    }, 500);
  } catch (err) {
    console.error('Failed to inject emergency styles:', err);
  }
};
