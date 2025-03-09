
/**
 * Apply inline styles directly to marker elements in the DOM with better performance
 */
export function forceExistingMarkersVisible() {
  console.log("Forcing existing markers visible via DOM manipulation");
  
  // Use document classes when possible instead of individual element styling
  document.body.classList.add('force-markers-visible');
  
  // Use more efficient selectors and batch operations
  const mapMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  const headerMarkers = document.querySelectorAll('.fixed-orange-marker, .orange-marker-indicator');
  
  // Only style elements that haven't been processed yet
  let mapMarkersStyled = 0;
  let headerMarkersStyled = 0;
  
  // Batch operations for map markers
  mapMarkers.forEach(marker => {
    if (marker instanceof HTMLElement && !marker.hasAttribute('data-forced-visible')) {
      // Set only the most critical styles
      marker.style.visibility = 'visible';
      marker.style.display = 'block';
      marker.style.opacity = '1';
      marker.style.zIndex = '9999';
      marker.style.pointerEvents = 'auto';
      marker.style.cursor = 'pointer';
      
      // Remove any transform that could cause movement
      if (marker.style.transform && marker.style.transform.includes('translate3d')) {
        marker.style.transform = 'translate(-50%, -50%)';
      }
      
      // Mark as processed
      marker.setAttribute('data-forced-visible', 'true');
      mapMarkersStyled++;
    }
  });
  
  // Batch operations for header markers
  headerMarkers.forEach(marker => {
    if (marker instanceof HTMLElement && !marker.hasAttribute('data-forced-visible')) {
      // Set only the most critical styles
      marker.style.visibility = 'visible';
      marker.style.display = 'block';
      marker.style.opacity = '1';
      marker.style.backgroundColor = '#F97316';
      
      // Mark as processed
      marker.setAttribute('data-forced-visible', 'true');
      headerMarkersStyled++;
    }
  });
  
  // Log only if we actually did something
  if (mapMarkersStyled > 0 || headerMarkersStyled > 0) {
    console.log(`Forced visibility on ${mapMarkersStyled} map markers and ${headerMarkersStyled} header markers`);
  }
}

/**
 * Add click handlers to markers if missing with better performance
 */
export function enhanceMarkerClickability() {
  // Use a more efficient selector
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  let handlersAdded = 0;
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement && !marker.getAttribute('data-has-click')) {
      marker.setAttribute('data-has-click', 'true');
      
      // Direct click handler that prevents event propagation
      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const facilityId = marker.getAttribute('data-facility-id');
        if (!facilityId) return;
        
        console.log('Marker clicked with enhanced handler:', facilityId);
        
        // Dispatch the custom event for facility selection
        document.dispatchEvent(new CustomEvent('emergency-marker-detail-view', {
          bubbles: true,
          detail: { facilityId }
        }));
      });
      
      handlersAdded++;
    }
  });
  
  if (handlersAdded > 0) {
    console.log(`Added click handlers to ${handlersAdded} markers`);
  }
}

/**
 * Enhance header markers with special styling with better performance
 */
export function enhanceHeaderMarkers() {
  // Create styles once instead of setting inline styles on each element
  if (!document.getElementById('header-marker-styles')) {
    const style = document.createElement('style');
    style.id = 'header-marker-styles';
    style.textContent = `
      .fixed-orange-marker {
        width: 30px !important;
        height: 30px !important;
        background-color: #F97316 !important;
        border-radius: 50% !important;
        border: 3px solid white !important;
        box-shadow: 0 0 15px rgba(249, 115, 22, 0.8) !important;
        animation: header-pulse 1.5s infinite ease-in-out !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Just add the data attribute to trigger the styles
  document.querySelectorAll('.fixed-orange-marker').forEach(marker => {
    if (marker instanceof HTMLElement && !marker.hasAttribute('data-enhanced')) {
      marker.setAttribute('data-enhanced', 'true');
    }
  });
}
