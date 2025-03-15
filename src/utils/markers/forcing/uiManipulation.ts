
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
  
  // Use more aggressive selectors to find all potential view details buttons
  const viewDetailsButtons = document.querySelectorAll(
    '.view-facility-btn, button.view-details, a.view-details, .view-details, [class*="view-detail"], [id*="view-detail"]'
  );
  
  // Remove each button from the DOM
  let removedCount = 0;
  viewDetailsButtons.forEach(btn => {
    if (btn instanceof HTMLElement) {
      // Completely remove the button from the DOM
      if (btn.parentNode) {
        btn.parentNode.removeChild(btn);
        removedCount++;
      }
    }
  });
  
  console.log(`Removed ${removedCount} view details buttons`);
  
  // Also check all popups for any elements that might be view details buttons by text content
  document.querySelectorAll('.mapboxgl-popup-content, .facility-popup-content, .direct-popup').forEach(popup => {
    if (popup instanceof HTMLElement) {
      // Find any elements that might be view details buttons by text content
      const possibleButtons = Array.from(popup.querySelectorAll('button, a, div')).filter(el => {
        const text = el.textContent?.toLowerCase() || '';
        return (text.includes('view') && text.includes('detail')) || 
               (text.includes('see') && text.includes('more')) ||
               (text.includes('more') && text.includes('info'));
      });
      
      // Remove any found buttons
      possibleButtons.forEach(btn => {
        if (btn.parentNode) {
          btn.parentNode.removeChild(btn);
          removedCount++;
        }
      });
    }
  });
  
  console.log(`Total of ${removedCount} view detail elements removed`);
  
  // Add CSS to hide these buttons if they're added dynamically
  if (!document.getElementById('view-details-removal-style')) {
    const style = document.createElement('style');
    style.id = 'view-details-removal-style';
    style.textContent = `
      .view-facility-btn, button.view-details, a.view-details, .view-details, 
      [class*="view-detail"], [id*="view-detail"],
      *[class*="view"][class*="detail"],
      *[id*="view"][id*="detail"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        z-index: -999 !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Also hide all popups by default
  const hidePopupsStyle = document.createElement('style');
  hidePopupsStyle.textContent = `
    .mapboxgl-popup, .direct-popup {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      z-index: -9999 !important;
    }
    
    .mapboxgl-popup.clicked, .direct-popup.clicked,
    .mapboxgl-popup.visible, .direct-popup.visible {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      z-index: 10000 !important;
    }
  `;
  document.head.appendChild(hidePopupsStyle);
}

/**
 * Force all popups to be hidden by default
 */
export function hideAllPopups() {
  // Hide all popups that don't have a clicked class
  document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
    if (popup instanceof HTMLElement && 
        !popup.classList.contains('clicked') && 
        !popup.classList.contains('visible')) {
      popup.style.display = 'none';
      popup.style.visibility = 'hidden';
      popup.style.opacity = '0';
      popup.style.zIndex = '-9999';
      popup.style.pointerEvents = 'none';
    }
  });
}
