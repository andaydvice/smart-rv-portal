
/**
 * Removes all "View Details" buttons from popups
 * These are often added by Mapbox or other libraries and we don't want them
 */
export function removeViewDetailsButtons(): void {
  console.log("Removing all View Details buttons from popups");
  
  // Find all buttons with common view details classes or text
  const viewDetailsSelectors = [
    '.view-facility-btn',
    '.view-details',
    'button.view-details',
    'a.view-details',
    'button:contains("View Details")',
    'a:contains("View Details")',
    '[class*="view"][class*="detail"]',
    '[id*="view"][id*="detail"]',
  ];
  
  // Get all elements matching these selectors
  const viewDetailsElements = document.querySelectorAll(viewDetailsSelectors.join(', '));
  console.log(`Removed ${viewDetailsElements.length} view details buttons`);
  
  // Remove or hide all found elements
  let count = 0;
  viewDetailsElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.display = 'none';
      element.style.visibility = 'hidden';
      element.style.opacity = '0';
      element.style.pointerEvents = 'none';
      element.style.position = 'absolute';
      element.style.width = '0';
      element.style.height = '0';
      element.style.overflow = 'hidden';
      element.style.zIndex = '-9999';
      count++;
    }
  });
  
  console.log(`Total of ${count} view detail elements removed`);
}

/**
 * Hides all popups on the map
 */
export function hideAllPopups(): void {
  // Hide all mapboxgl popups
  document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
    if (popup instanceof HTMLElement) {
      popup.style.display = 'none';
      popup.style.visibility = 'hidden';
      popup.style.opacity = '0';
      popup.style.zIndex = '-9999';
      popup.style.pointerEvents = 'none';
      popup.classList.remove('visible');
      popup.classList.remove('clicked');
    }
  });
}

/**
 * Ensures map elements are visible
 */
export function ensureMapElementsVisible(): void {
  // Ensure mapboxgl-map is visible
  document.querySelectorAll('.mapboxgl-map').forEach(map => {
    if (map instanceof HTMLElement) {
      map.style.visibility = 'visible';
      map.style.display = 'block';
      map.style.opacity = '1';
    }
  });
  
  // Ensure mapboxgl-canvas is visible
  document.querySelectorAll('.mapboxgl-canvas').forEach(canvas => {
    if (canvas instanceof HTMLElement) {
      canvas.style.visibility = 'visible';
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
    }
  });
}
