
/**
 * Creates a debug overlay for marker visibility testing
 */
export function createMarkerDebugOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'marker-debug-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 4px;
    z-index: 10000;
    font-size: 12px;
    max-width: 300px;
    max-height: 400px;
    overflow: auto;
  `;
  
  document.body.appendChild(overlay);
  return overlay;
}

/**
 * Creates a debugger for marker visibility
 */
export function createMarkerDebugger() {
  const overlay = createMarkerDebugOverlay();
  
  // Update the overlay with marker stats
  const updateStats = () => {
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
    let visibleCount = 0;
    let hiddenCount = 0;
    
    markers.forEach(marker => {
      if (marker instanceof HTMLElement) {
        const computedStyle = window.getComputedStyle(marker);
        const isVisible = 
          computedStyle.visibility !== 'hidden' && 
          computedStyle.display !== 'none' && 
          computedStyle.opacity !== '0';
        
        if (isVisible) {
          visibleCount++;
        } else {
          hiddenCount++;
        }
      }
    });
    
    overlay.innerHTML = `
      <h3>Marker Debug</h3>
      <p>Total markers: ${markers.length}</p>
      <p>Visible: ${visibleCount}</p>
      <p>Hidden: ${hiddenCount}</p>
      <button id="force-markers-visible">Force Visible</button>
    `;
    
    // Add force visible button handler
    const forceButton = document.getElementById('force-markers-visible');
    if (forceButton) {
      forceButton.addEventListener('click', () => {
        document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker').forEach(marker => {
          if (marker instanceof HTMLElement) {
            marker.style.visibility = 'visible';
            marker.style.display = 'block';
            marker.style.opacity = '1';
            marker.style.zIndex = '9999';
          }
        });
        updateStats();
      });
    }
  };
  
  // Initial update
  updateStats();
  
  // Update every 2 seconds
  const interval = setInterval(updateStats, 2000);
  
  // Return cleanup function
  return () => {
    clearInterval(interval);
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  };
}
