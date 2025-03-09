
import { testMarkersVisibility as runTest } from '../testing/visibilityTester';

/**
 * Force all markers on the map to be visible
 */
export function forceMapMarkersVisible() {
  console.log("Forcing map markers to be visible");
  
  // Add a class to the body to indicate markers are being forced
  document.body.classList.add('markers-forced');
  
  // Find all mapbox markers and make them visible
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
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
  }
  
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
  
  // Mark as forced visible
  element.setAttribute('data-forced-visible', 'true');
}

/**
 * Test marker visibility and fix any issues
 */
export function testMarkersVisibility(fixIssues = true) {
  return runTest(fixIssues);
}
