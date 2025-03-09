
/**
 * Create a marker DOM element for a facility
 */
export function createMarkerElement(facility: any, point: { x: number, y: number }): HTMLElement {
  const markerEl = document.createElement('div');
  markerEl.className = 'emergency-marker';
  markerEl.id = `emergency-marker-${facility.id}`;
  markerEl.setAttribute('data-facility-id', facility.id);
  markerEl.setAttribute('data-lat', String(facility.latitude));
  markerEl.setAttribute('data-lng', String(facility.longitude));
  
  // Style the marker
  (markerEl as HTMLElement).style.cssText = `
    position: absolute;
    left: ${point.x}px;
    top: ${point.y}px;
    width: 24px;
    height: 24px;
    background-color: #F97316;
    border-radius: 50%;
    border: 2px solid white;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    pointer-events: auto;
    z-index: 10000;
    visibility: visible;
    display: block;
    opacity: 1;
  `;
  
  // Add click handler with more direct callback
  markerEl.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Emergency marker clicked for facility:', facility.id);
    
    // Dispatch event for facility selection without showing popup
    // if we already have facility detail panel open
    if (window.hasDetailPanelOpen) {
      const event = new CustomEvent('emergency-marker-click', {
        bubbles: true,
        detail: { facilityId: facility.id, skipPopup: true }
      });
      document.dispatchEvent(event);
      return;
    }
    
    // Create a custom event for facility selection
    const event = new CustomEvent('emergency-marker-click', {
      bubbles: true,
      detail: { facilityId: facility.id }
    });
    
    // Dispatch the event
    document.dispatchEvent(event);
    
    // Create and show popup for this marker
    showMarkerPopup(facility, point);
  });
  
  return markerEl;
}

/**
 * Show a popup for a marker
 */
function showMarkerPopup(facility: any, point: { x: number, y: number }): void {
  // Remove any existing popups first
  closeAllPopups();
  
  // Create popup element
  const popup = document.createElement('div');
  popup.className = 'emergency-popup';
  popup.id = `emergency-popup-${facility.id}`;
  
  // Style the popup
  (popup as HTMLElement).style.cssText = `
    position: absolute;
    left: ${point.x}px;
    top: ${point.y - 10}px;
    transform: translate(-50%, -100%);
    background-color: #151A22;
    color: white;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #374151;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10001;
    max-width: 200px;
    pointer-events: auto;
  `;
  
  // Set popup content
  popup.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
      <div style="font-weight: bold;">${facility.name}</div>
      <button class="emergency-close-btn" style="
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        padding: 0 5px;
      ">×</button>
    </div>
    <div style="margin-bottom: 5px;">${facility.address || ''}</div>
    <button class="emergency-view-btn" style="
      background-color: #F97316;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
    ">View Details</button>
  `;
  
  // Add to document
  document.body.appendChild(popup);
  
  // Set up popup event handlers
  setupPopupEventHandlers(popup, facility.id);
}

/**
 * Close all popups
 */
function closeAllPopups(): void {
  document.querySelectorAll('.emergency-popup').forEach(popup => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  });
}

/**
 * Set up event handlers for a popup
 */
function setupPopupEventHandlers(popup: HTMLElement, facilityId: string): void {
  // Handle view button click
  const viewBtn = popup.querySelector('.emergency-view-btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      window.hasDetailPanelOpen = true;
      
      // Use a dedicated event for detail view
      document.dispatchEvent(new CustomEvent('emergency-marker-detail-view', {
        bubbles: true,
        detail: { facilityId: facilityId }
      }));
      
      // Remove popup
      closeAllPopups();
    });
  }
  
  // Handle close button click
  const closeBtn = popup.querySelector('.emergency-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeAllPopups();
    });
  }
  
  // Close when clicking outside
  document.addEventListener('click', function closePopupHandler(e) {
    // Skip if the click is on the popup itself
    if (popup.contains(e.target as Node)) {
      return;
    }
    
    // Skip if the click is on the marker that opened this popup
    const marker = document.getElementById(`emergency-marker-${facilityId}`);
    if (marker && marker.contains(e.target as Node)) {
      return;
    }
    
    closeAllPopups();
    document.removeEventListener('click', closePopupHandler);
  });
}
