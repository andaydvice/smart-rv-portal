
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
