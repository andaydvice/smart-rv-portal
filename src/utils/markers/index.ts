
import '../emergency-styles/styleInjection';
import { testMarkerVisibility, createMarkerDebugOverlay } from './testing';

// Optimized marker visibility enforcement
// Only set critical properties and avoid redundant operations
/**
 * Force map markers to be visible with optimized DOM manipulation
 */
export function forceMapMarkersVisible() {
  console.log("MarkerFix: Forcing markers visible");
  
  // Use a DocumentFragment for batch DOM operations
  document.body.classList.add('show-map-markers');
  
  // Query all markers once and operate on them
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  
  // Use a flag to prevent redundant styling
  let appliedStyleCount = 0;
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      // Only apply styles to elements that don't already have the forced attribute
      if (!marker.hasAttribute('data-forced')) {
        // Set only the critical styles needed for visibility
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.opacity = '1';
        marker.style.zIndex = '9999';
        
        // Set data attribute to avoid redundant operations
        marker.setAttribute('data-forced', 'true');
        appliedStyleCount++;
      }
    }
  });
  
  if (appliedStyleCount > 0) {
    console.log(`Applied visibility styles to ${appliedStyleCount} markers`);
  }
}

/**
 * Apply forced styles to marker elements with better performance
 */
export function applyForcedStyles(markers: NodeListOf<Element>) {
  // Use a batch operation approach for better performance
  // Create a style element for common styles instead of inline per-element
  if (!document.getElementById('forced-marker-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'forced-marker-styles';
    styleEl.textContent = `
      .mapboxgl-marker[data-forced="true"],
      .custom-marker[data-forced="true"] {
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
        position: absolute !important;
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(styleEl);
  }
  
  let count = 0;
  
  // Only set the attribute, the style comes from the CSS class
  markers.forEach(marker => {
    if (marker instanceof HTMLElement && !marker.hasAttribute('data-forced')) {
      marker.setAttribute('data-forced', 'true');
      count++;
    }
  });
  
  if (count > 0) {
    console.log(`Applied forced styles to ${count} markers`);
  }
}

/**
 * Create emergency markers when normal markers fail - optimized version
 */
export function createEmergencyMarkers() {
  console.log("Creating emergency markers");
  
  // Get the map container
  const mapContainer = document.querySelector('.mapboxgl-map');
  if (!mapContainer) {
    console.warn("Map container not found");
    return;
  }
  
  // Use a more efficient approach with classes instead of inline styles
  if (!document.getElementById('emergency-marker-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'emergency-marker-styles';
    styleEl.textContent = `
      .emergency-marker {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 24px;
        height: 24px;
        background-color: #F97316;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(0,0,0,0.8);
        transform: translate(-50%, -50%);
        z-index: 9999;
        animation: pulse 1.5s infinite ease-in-out;
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(styleEl);
  }
  
  // Create emergency marker
  const marker = document.createElement('div');
  marker.className = 'emergency-marker';
  marker.setAttribute('data-emergency', 'true');
  
  // Avoid adding duplicate emergency markers
  if (!mapContainer.querySelector('.emergency-marker')) {
    mapContainer.appendChild(marker);
  }
}

/**
 * Run comprehensive marker visibility testing with better performance
 */
export function testMarkersVisibility(autoFix = false) {
  return testMarkerVisibility({ 
    fixIssues: autoFix, 
    showToast: true,
    logResults: true
  });
}

/**
 * Create debugging overlay for marker visibility with better performance
 */
export function createMarkerDebugger() {
  return createMarkerDebugOverlay();
}

// Export testing functions
export * from './testing';
