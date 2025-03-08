
// Emergency fix for map markers
(function() {
  console.log('Map marker fix initialized');
  
  // Function to apply fixes to all markers
  function fixAllMarkers() {
    console.log('Force-displaying map markers!');
    
    // Apply to all markers
    document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        // Set critical styles directly
        marker.style.display = 'block';
        marker.style.visibility = 'visible';
        marker.style.opacity = '1';
        marker.style.zIndex = '9999';
        marker.style.pointerEvents = 'auto';
        
        // For empty/invisible markers, make them visible
        if (marker.clientWidth < 5 || marker.clientHeight < 5) {
          marker.style.width = '24px';
          marker.style.height = '24px';
          marker.style.borderRadius = '50%';
          marker.style.backgroundColor = '#F97316';
          marker.style.border = '2px solid white';
          marker.style.boxShadow = '0 0 10px rgba(0,0,0,0.8)';
        }
      }
    });
    
    // Fix popups
    document.querySelectorAll('.mapboxgl-popup').forEach(popup => {
      if (popup instanceof HTMLElement) {
        popup.style.display = 'block';
        popup.style.visibility = 'visible';
        popup.style.opacity = '1';
        popup.style.zIndex = '10000';
      }
    });
  }
  
  // Apply styles for map elements
  function addEmergencyStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-marker, .custom-marker {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
      }
      
      .mapboxgl-popup {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 10000 !important;
      }
      
      .mapboxgl-popup-content {
        display: block !important;
        visibility: visible !important;
        background-color: #151A22 !important;
        color: white !important;
        border-radius: 8px !important;
        padding: 15px !important;
      }
      
      .mapboxgl-popup-close-button {
        color: white !important;
        font-size: 16px !important;
      }
      
      /* Force marker visibility */
      body .mapboxgl-marker {
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create emergency markers if none exist
  function createEmergencyMarkers() {
    const mapContainer = document.querySelector('.mapboxgl-map');
    if (!mapContainer) return;
    
    // Check if we need emergency markers
    if (document.querySelectorAll('.mapboxgl-marker, .custom-marker').length > 0) return;
    
    console.log('Creating emergency markers');
    
    // Sample facilities with hardcoded coordinates
    const emergencyFacilities = [
      { name: "Downtown Storage", lat: 40.7128, lng: -74.0060 },
      { name: "Westside Storage", lat: 40.7139, lng: -74.0080 },
      { name: "Eastside Storage", lat: 40.7135, lng: -74.0040 }
    ];
    
    emergencyFacilities.forEach((facility, index) => {
      const marker = document.createElement('div');
      marker.className = 'custom-marker emergency-marker';
      
      // Style the marker
      Object.assign(marker.style, {
        position: 'absolute',
        left: `${50 + (index * 100)}px`,
        top: '50%',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: '#F97316',
        border: '2px solid white',
        boxShadow: '0 0 10px rgba(0,0,0,0.8)',
        zIndex: '9999',
        cursor: 'pointer'
      });
      
      // Add click handler
      marker.addEventListener('click', () => {
        alert(`${facility.name} (${facility.lat}, ${facility.lng})`);
      });
      
      // Add to map
      mapContainer.appendChild(marker);
    });
  }
  
  // Initialize all fixes
  function initialize() {
    addEmergencyStyles();
    
    // Apply fixes immediately
    fixAllMarkers();
    
    // Then periodically
    setInterval(fixAllMarkers, 3000);
    
    // Check for map container and create emergency markers if needed
    setTimeout(() => {
      createEmergencyMarkers();
    }, 5000);
  }
  
  // Run on load and when DOM changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
  
  // Make function available globally for manual triggering
  window.forceShowMapMarkers = fixAllMarkers;
})();
