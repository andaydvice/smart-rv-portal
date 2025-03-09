
import { testMarkersVisibility as runTest } from '../testing/visibilityTester';

/**
 * Force all markers on the map to be visible
 */
export function forceMapMarkersVisible() {
  console.log("Forcing map markers to be visible");
  
  // Add a class to the body to indicate markers are being forced
  document.body.classList.add('markers-forced');
  
  // Find all mapbox markers and make them visible
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      applyForcedStyles(marker);
    }
  });
  
  // Also force map visibility
  const mapContainer = document.querySelector('.mapboxgl-map');
  if (mapContainer instanceof HTMLElement) {
    mapContainer.style.visibility = 'visible';
    mapContainer.style.opacity = '1';
    mapContainer.style.display = 'block';
  }
  
  // Ensure the map canvas is visible too
  const mapCanvas = document.querySelector('.mapboxgl-canvas');
  if (mapCanvas instanceof HTMLElement) {
    mapCanvas.style.visibility = 'visible';
    mapCanvas.style.opacity = '1';
    mapCanvas.style.display = 'block';
  }
  
  // Fix popup close buttons
  document.querySelectorAll('.mapboxgl-popup-close-button').forEach(button => {
    if (button instanceof HTMLElement) {
      button.style.pointerEvents = 'all';
      button.style.cursor = 'pointer';
      button.style.zIndex = '10001';
      
      // Remove any existing click events and add a clean one
      const newButton = button.cloneNode(true);
      button.parentNode?.replaceChild(newButton, button);
      
      newButton.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Find and remove the popup
        const popup = (newButton as HTMLElement).closest('.mapboxgl-popup');
        if (popup) {
          popup.remove();
          
          // Trigger custom event
          document.dispatchEvent(new CustomEvent('mapbox.popup.closed'));
          
          // Make sure map is visible
          setTimeout(() => {
            const mapCanvas = document.querySelector('.mapboxgl-canvas');
            if (mapCanvas instanceof HTMLElement) {
              mapCanvas.style.visibility = 'visible';
              mapCanvas.style.display = 'block';
              mapCanvas.style.opacity = '1';
            }
            
            // Ensure all markers are visible
            forceMapMarkersVisible();
          }, 50);
        }
      });
    }
  });
  
  // Remove the floating facility card
  const floatingCards = document.querySelectorAll('.fixed-orange-marker:not(.custom-marker):not(.mapboxgl-marker):not(.emergency-marker)');
  floatingCards.forEach(card => {
    if (card instanceof HTMLElement && !card.closest('.mapboxgl-map')) {
      card.style.display = 'none';
      card.style.visibility = 'hidden';
      card.style.opacity = '0';
    }
  });
  
  return markers.length;
}

/**
 * Apply critical styles to make a marker visible
 */
export function applyForcedStyles(element: HTMLElement) {
  // Apply critical visibility styles
  element.style.visibility = 'visible';
  element.style.display = 'block';
  element.style.opacity = '1';
  element.style.zIndex = '9999';
  element.style.pointerEvents = 'auto';
  element.style.position = 'absolute';
  
  // Mark as forced visible
  element.setAttribute('data-forced-visible', 'true');
  
  // Special handling for highlighted markers
  const facilityId = element.getAttribute('data-facility-id');
  if (facilityId && window._persistentMarkers && window._persistentMarkers[facilityId]) {
    // This is a marker that should be highlighted
    // Fix: Use type assertion to access highlightedFacilityId on window
    const highlightedId = (window as any).highlightedFacilityId;
    if (facilityId === highlightedId) {
      element.style.backgroundColor = '#10B981';
      element.style.width = '28px';
      element.style.height = '28px';
      element.style.transform = 'translate(-50%, -50%) scale(1.3)';
      element.style.zIndex = '10002';
      element.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.8)';
    }
  }
}

/**
 * Test marker visibility and fix any issues
 */
export function testMarkersVisibility(fixIssues = true) {
  return runTest(fixIssues);
}

/**
 * Ensure map container and canvas are visible
 */
export function ensureMapVisible() {
  // Force map container to be visible
  const mapContainer = document.querySelector('.mapboxgl-map');
  if (mapContainer instanceof HTMLElement) {
    mapContainer.style.visibility = 'visible';
    mapContainer.style.opacity = '1';
    mapContainer.style.display = 'block';
  }
  
  // Force map canvas to be visible
  const mapCanvas = document.querySelector('.mapboxgl-canvas');
  if (mapCanvas instanceof HTMLElement) {
    mapCanvas.style.visibility = 'visible';
    mapCanvas.style.opacity = '1';
    mapCanvas.style.display = 'block';
  }
}

/**
 * Remove any unwanted "View Details" buttons
 */
export function removeViewDetailsButtons() {
  // Target all view details buttons
  document.querySelectorAll('.view-facility-btn, button.view-details').forEach(button => {
    if (button instanceof HTMLElement) {
      button.style.display = 'none';
      button.style.visibility = 'hidden';
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    }
  });
  
  // Also remove the floating facility card in the top-left
  const floatingCards = document.querySelectorAll('.fixed-orange-marker:not(.custom-marker):not(.mapboxgl-marker):not(.emergency-marker)');
  floatingCards.forEach(card => {
    if (card instanceof HTMLElement && !card.closest('.mapboxgl-map')) {
      card.style.display = 'none';
      card.style.visibility = 'hidden';
      card.style.opacity = '0';
    }
  });
}
