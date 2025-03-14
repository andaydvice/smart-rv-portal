import mapboxgl from 'mapbox-gl';

/**
 * Forces all map markers to be visible by setting their CSS styles
 */
export function forceMapMarkersVisible() {
  console.log('Forcing map markers to be visible');
  
  document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.visibility = 'visible';
      marker.style.display = 'block';
      marker.style.opacity = '1';
      marker.style.zIndex = '9999';
      marker.style.pointerEvents = 'auto';
      marker.style.position = 'absolute';
      marker.setAttribute('data-forced-visible', 'true');
    }
  });
}

/**
 * Applies forced visibility styles to a single marker
 */
export function applyForcedStyles(marker: HTMLElement) {
  marker.style.visibility = 'visible';
  marker.style.display = 'block';
  marker.style.opacity = '1';
  marker.style.zIndex = '9999';
  marker.style.pointerEvents = 'auto';
  marker.style.position = 'absolute';
  marker.setAttribute('data-forced-visible', 'true');
}

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

/**
 * Forces the map to be visible
 */
export function ensureMapVisible() {
  document.querySelectorAll('.mapboxgl-canvas-container, .mapboxgl-canvas').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.visibility = 'visible';
      el.style.display = 'block';
      el.style.opacity = '1';
    }
  });
}

/**
 * Remove View Details buttons from all popups since they're not functional
 */
export function removeViewDetailsButtons() {
  console.log('Removing all View Details buttons from popups');
  
  const viewDetailsButtons = document.querySelectorAll('.view-facility-btn, button.view-details, a.view-details, .view-details');
  viewDetailsButtons.forEach(btn => {
    if (btn instanceof HTMLElement) {
      // Completely remove the button from the DOM
      if (btn.parentNode) {
        btn.parentNode.removeChild(btn);
      }
    }
  });
  
  // Also check popups for any view details buttons and remove them
  document.querySelectorAll('.mapboxgl-popup-content').forEach(popup => {
    if (popup instanceof HTMLElement) {
      // Find any elements that might be view details buttons by text content
      const possibleButtons = Array.from(popup.querySelectorAll('button, a, div')).filter(el => {
        const text = el.textContent?.toLowerCase() || '';
        return text.includes('view') && text.includes('detail');
      });
      
      // Remove any found buttons
      possibleButtons.forEach(btn => {
        if (btn.parentNode) {
          btn.parentNode.removeChild(btn);
        }
      });
    }
  });
  
  // Also add CSS to hide these buttons if they're added dynamically
  const style = document.createElement('style');
  style.textContent = `
    .view-facility-btn, button.view-details, a.view-details, .view-details, 
    [class*="view-detail"], [id*="view-detail"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);
}
