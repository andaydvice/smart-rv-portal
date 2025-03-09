
import mapboxgl from 'mapbox-gl';

/**
 * EMERGENCY SOLUTION: Create markers directly in the DOM without using mapbox API
 * This bypasses all the standard marker creation mechanisms that might be failing
 */
export function createEmergencyMarkers(map: mapboxgl.Map, facilities: any[]): number {
  console.log(`EMERGENCY: Creating ${facilities.length} markers directly in DOM`);
  
  // Track created markers
  let created = 0;
  
  // Create container if it doesn't exist
  let container = document.querySelector('.emergency-markers-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'emergency-markers-container';
    container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    
    const mapContainer = map.getContainer();
    if (mapContainer) {
      mapContainer.appendChild(container);
    } else {
      document.querySelector('.mapboxgl-map')?.appendChild(container);
    }
  }
  
  // Clear existing emergency markers
  const existing = document.querySelectorAll('.emergency-marker');
  existing.forEach(marker => {
    if (marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
  
  // Create direct markers for each facility
  facilities.forEach((facility, index) => {
    try {
      // Skip invalid coordinates
      const lat = Number(facility.latitude);
      const lng = Number(facility.longitude);
      if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
        return;
      }
      
      // Convert geo coordinates to pixel coordinates
      const point = map.project([lng, lat]);
      
      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'emergency-marker';
      markerEl.id = `emergency-marker-${facility.id}`;
      markerEl.setAttribute('data-facility-id', facility.id);
      markerEl.setAttribute('data-lat', String(lat));
      markerEl.setAttribute('data-lng', String(lng));
      
      // Style the marker
      markerEl.style.cssText = `
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
      
      // Add to container
      container.appendChild(markerEl);
      
      // Add click handler
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Create a custom event for facility selection
        const event = new CustomEvent('emergency-marker-click', {
          bubbles: true,
          detail: { facilityId: facility.id }
        });
        
        // Dispatch the event
        document.dispatchEvent(event);
        
        // Show a simple popup
        const popup = document.createElement('div');
        popup.className = 'emergency-popup';
        popup.style.cssText = `
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
        
        popup.innerHTML = `
          <div style="margin-bottom: 5px; font-weight: bold;">${facility.name}</div>
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
        
        // Handle button click
        const viewBtn = popup.querySelector('.emergency-view-btn');
        if (viewBtn) {
          viewBtn.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('emergency-marker-click', {
              bubbles: true,
              detail: { facilityId: facility.id }
            }));
            
            // Remove popup
            if (popup.parentNode) {
              popup.parentNode.removeChild(popup);
            }
          });
        }
        
        // Close when clicking outside
        const closePopup = (e: MouseEvent) => {
          if (!popup.contains(e.target as Node)) {
            if (popup.parentNode) {
              popup.parentNode.removeChild(popup);
            }
            document.removeEventListener('click', closePopup);
          }
        };
        
        // Add event listener with small delay
        setTimeout(() => {
          document.addEventListener('click', closePopup);
        }, 100);
      });
      
      created++;
    } catch (err) {
      console.error('Error creating emergency marker:', err);
    }
  });
  
  // Update marker positions on map move
  const updateMarkerPositions = () => {
    const markers = document.querySelectorAll('.emergency-marker');
    markers.forEach(marker => {
      if (marker instanceof HTMLElement) {
        const lat = parseFloat(marker.getAttribute('data-lat') || '0');
        const lng = parseFloat(marker.getAttribute('data-lng') || '0');
        
        // Skip invalid coordinates
        if (isNaN(lat) || isNaN(lng)) return;
        
        // Convert geo coordinates to pixel coordinates
        const point = map.project([lng, lat]);
        
        // Update position
        marker.style.left = `${point.x}px`;
        marker.style.top = `${point.y}px`;
      }
    });
  };
  
  // Update on map move
  map.on('move', updateMarkerPositions);
  map.on('zoom', updateMarkerPositions);
  
  console.log(`EMERGENCY: Successfully created ${created} direct DOM markers`);
  return created;
}

/**
 * Listen for emergency marker clicks
 */
export function setupEmergencyMarkerListeners(onMarkerClick: (facilityId: string) => void) {
  // Remove any existing listeners
  document.removeEventListener('emergency-marker-click', handleClick as any);
  
  // Function to handle marker clicks
  function handleClick(event: CustomEvent<{facilityId: string}>) {
    const facilityId = event.detail.facilityId;
    console.log('Emergency marker clicked:', facilityId);
    onMarkerClick(facilityId);
  }
  
  // Add listener
  document.addEventListener('emergency-marker-click', handleClick as any);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('emergency-marker-click', handleClick as any);
  };
}

// Add emergency CSS styles to document
export function injectEmergencyMarkerStyles() {
  if (document.getElementById('emergency-marker-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'emergency-marker-styles';
  style.textContent = `
    .emergency-marker {
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      position: absolute !important;
      z-index: 10000 !important;
      pointer-events: auto !important;
      cursor: pointer !important;
      animation: pulse-emergency 1.5s infinite ease-in-out;
    }
    
    @keyframes pulse-emergency {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.2); }
    }
    
    .emergency-popup {
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      z-index: 10001 !important;
    }
  `;
  
  document.head.appendChild(style);
}
