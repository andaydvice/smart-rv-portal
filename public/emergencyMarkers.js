
// Emergency script for marker visibility - runs outside React
(function() {
  console.log('Emergency marker script loaded');
  
  // Check if current page should not have markers
  function shouldSkipMarkers() {
    return window.isRVWeatherPage === true || 
           window.location.pathname.includes('/rv-weather') ||
           document.title.toLowerCase().includes('weather');
  }
  
  // Run immediately and periodically
  forceMarkersVisible();
  const interval = setInterval(forceMarkersVisible, 2000);
  
  // Make sure we have markers on the map - but NOT on weather pages
  setTimeout(() => {
    if (!shouldSkipMarkers()) createEmergencyMarkers();
  }, 3000);
  
  setTimeout(() => {
    if (!shouldSkipMarkers()) createEmergencyMarkers();
  }, 6000);
  
  // Force all markers to be visible
  function forceMarkersVisible() {
    // Skip on weather pages
    if (shouldSkipMarkers()) {
      console.log('Weather page detected - not showing emergency markers');
      
      // Actually remove any markers that might be present
      document.querySelectorAll('.emergency-marker, .mapboxgl-marker, .custom-marker, .direct-marker, [class*="marker"]').forEach(marker => {
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      });
      
      return;
    }
    
    // Select all potential markers
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker, [class*="marker"]');
    
    if (markers.length > 0) {
      console.log(`Found ${markers.length} markers to make visible`);
      
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          // Force critical visibility styles
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
          marker.style.zIndex = '9999';
          marker.style.position = 'absolute';
        }
      });
    } else {
      console.log('No markers found, will create emergency markers');
    }
    
    // Also ensure map containers are visible and correctly sized
    document.querySelectorAll('.mapboxgl-map').forEach(map => {
      if (map instanceof HTMLElement) {
        map.style.overflow = 'visible';
        map.style.height = '100%';
        map.style.minHeight = '600px';
      }
    });
    
    // AGGRESSIVELY hide all popups except clicked ones
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
    
    // Remove any view details buttons - more aggressive approach
    document.querySelectorAll('.view-facility-btn, button.view-details, a.view-details, .view-details, [class*="view-detail"], [id*="view-detail"]').forEach(btn => {
      if (btn instanceof HTMLElement) {
        btn.style.display = 'none';
        btn.style.visibility = 'hidden';
        btn.style.opacity = '0';
        btn.style.width = '0';
        btn.style.height = '0';
        btn.style.padding = '0';
        btn.style.margin = '0';
        btn.style.border = 'none';
        btn.style.pointerEvents = 'none';
        
        // Remove from DOM
        if (btn.parentNode) {
          btn.parentNode.removeChild(btn);
        }
      }
    });
    
    // Also look for any button or link with text containing "view" and "detail"
    document.querySelectorAll('button, a').forEach(el => {
      if (el instanceof HTMLElement) {
        const text = el.textContent?.toLowerCase() || '';
        if (text.includes('view') && text.includes('detail')) {
          // Remove from DOM
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      }
    });
  }
  
  // Create emergency markers if none exist
  function createEmergencyMarkers() {
    // Skip marker creation for weather pages
    if (shouldSkipMarkers()) {
      console.log('Weather page detected - skipping emergency marker creation');
      return;
    }
    
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    if (existingMarkers.length > 0) {
      console.log(`${existingMarkers.length} markers already exist, not creating emergency markers`);
      return;
    }
    
    console.log('Creating emergency markers');
    
    // Sample marker locations for different states
    const locations = [
      { lat: 33.4484, lng: -112.0740, name: "Arizona Storage", state: "Arizona" },
      { lat: 36.7783, lng: -119.4179, name: "California Storage", state: "California" },
      { lat: 31.9686, lng: -99.9018, name: "Texas Storage", state: "Texas" },
      { lat: 27.6648, lng: -81.5158, name: "Florida Storage", state: "Florida" },
      { lat: 43.2994, lng: -74.2179, name: "New York Storage", state: "New York" }
    ];
    
    // Find map containers
    const mapContainers = document.querySelectorAll('.mapboxgl-map, .h-\\[600px\\]');
    
    mapContainers.forEach(container => {
      if (!(container instanceof HTMLElement)) return;
      
      locations.forEach((location, index) => {
        // Create marker element
        const marker = document.createElement('div');
        marker.className = 'emergency-marker mapboxgl-marker';
        marker.id = `emergency-marker-${index}`;
        
        // Position in different parts of the map
        const left = 20 + (index * 15);
        const top = 20 + (index * 10);
        
        // Set critical styling
        marker.style.cssText = `
          position: absolute !important;
          left: ${left}% !important;
          top: ${top}% !important;
          width: 24px !important;
          height: 24px !important;
          background-color: #F97316 !important;
          border-radius: 50% !important;
          border: 2px solid white !important;
          box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
          z-index: 9999 !important;
          transform: translate(-50%, -50%) !important;
          cursor: pointer !important;
          visibility: visible !important;
          display: block !important;
          opacity: 1 !important;
        `;
        
        // Create popup element (hidden by default)
        const popup = document.createElement('div');
        popup.className = 'emergency-popup';
        popup.id = `emergency-popup-${index}`;
        popup.style.cssText = `
          position: absolute !important;
          left: ${left}% !important;
          top: ${top - 5}% !important;
          transform: translate(-50%, -100%) !important;
          background-color: #151A22 !important;
          color: white !important;
          padding: 10px !important;
          border-radius: 4px !important;
          max-width: 200px !important;
          z-index: -9999 !important;
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        `;
        
        popup.innerHTML = `
          <div style="margin-bottom: 5px; font-weight: bold;">${location.name}</div>
          <div style="margin-bottom: 5px;">${location.state}</div>
          <div>Coordinates: ${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}</div>
          <button style="position:absolute; right:5px; top:5px; background:none; border:none; color:white; font-size:16px; cursor:pointer;" class="popup-close">×</button>
        `;
        
        // Add to container
        container.appendChild(marker);
        container.appendChild(popup);
        
        // Add click handler to toggle popup
        marker.addEventListener('click', () => {
          // Hide all other popups first
          document.querySelectorAll('.emergency-popup').forEach(p => {
            if (p.id !== popup.id) {
              p.style.display = 'none';
              p.style.visibility = 'hidden';
              p.style.opacity = '0';
              p.style.zIndex = '-9999';
              p.style.pointerEvents = 'none';
              p.classList.remove('clicked');
            }
          });
          
          const isVisible = popup.style.display === 'block';
          if (isVisible) {
            popup.style.display = 'none';
            popup.style.visibility = 'hidden';
            popup.style.opacity = '0';
            popup.style.zIndex = '-9999';
            popup.style.pointerEvents = 'none';
            popup.classList.remove('clicked');
          } else {
            popup.style.display = 'block';
            popup.style.visibility = 'visible';
            popup.style.opacity = '1';
            popup.style.zIndex = '10000';
            popup.style.pointerEvents = 'auto';
            popup.classList.add('clicked');
          }
        });
        
        // Add close button handler
        const closeButton = popup.querySelector('.popup-close');
        if (closeButton) {
          closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            popup.style.display = 'none';
            popup.style.visibility = 'hidden';
            popup.style.opacity = '0';
            popup.style.zIndex = '-9999';
            popup.style.pointerEvents = 'none';
            popup.classList.remove('clicked');
          });
        }
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
          if (e.target !== marker && !popup.contains(e.target)) {
            popup.style.display = 'none';
            popup.style.visibility = 'hidden';
            popup.style.opacity = '0'; 
            popup.style.zIndex = '-9999';
            popup.style.pointerEvents = 'none';
            popup.classList.remove('clicked');
          }
        });
      });
    });
  }
})();
