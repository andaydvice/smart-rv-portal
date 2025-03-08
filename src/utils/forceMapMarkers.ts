
// Utility to force map markers to be visible through multiple approaches
export function forceMapMarkersVisible() {
  console.log("ForceMarkersNow: Attempting to make markers visible");
  
  // Find all markers currently on the page
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  console.log(`Found ${markers.length} markers`);
  
  // If no markers exist yet, create emergency markers
  if (markers.length === 0) {
    createEmergencyMarkers();
    return;
  }
  
  // Apply direct style fixes to existing markers
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      // Force critical visibility styles
      marker.style.cssText += `
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
        position: absolute !important;
        cursor: pointer !important;
      `;
      
      // Add specific marker attributes
      marker.setAttribute('data-forced', 'true');
      
      // Ensure marker has appropriate class for styling
      if (!marker.classList.contains('emergency-marker') && 
          !marker.classList.contains('custom-marker')) {
        marker.classList.add('custom-marker');
      }
    }
  });
}

// Function to create emergency markers if none exist
function createEmergencyMarkers() {
  console.log("Creating emergency markers as fallback");
  
  // Try to get the map container
  const mapContainer = document.querySelector('.mapboxgl-map') as HTMLElement;
  if (!mapContainer) {
    console.warn("No map container found to place emergency markers");
    return;
  }
  
  // Create emergency markers - direct DOM approach
  createDOMEmergencyMarkers(mapContainer);
  
  // Alternative: Try to create markers using Mapbox API if available
  createMapboxEmergencyMarkers();
}

// Create markers directly in the DOM
function createDOMEmergencyMarkers(mapContainer: HTMLElement) {
  // Default positions (spread across the map)
  const positions = [
    { left: '25%', top: '25%' },
    { left: '50%', top: '50%' },
    { left: '75%', top: '25%' },
    { left: '25%', top: '75%' },
    { left: '75%', top: '75%' }
  ];
  
  // Create visible DOM markers
  positions.forEach((pos, index) => {
    const marker = document.createElement('div');
    marker.className = 'emergency-marker';
    marker.id = `emergency-marker-${index}`;
    marker.setAttribute('data-emergency', 'true');
    marker.setAttribute('data-facility-id', `emergency-${index}`);
    
    // Position absolute with inline styles
    marker.style.cssText = `
      position: absolute !important;
      left: ${pos.left} !important;
      top: ${pos.top} !important;
      width: 30px !important;
      height: 30px !important;
      background-color: #F97316 !important;
      border-radius: 50% !important;
      border: 3px solid white !important;
      box-shadow: 0 0 15px rgba(249,115,22,0.8) !important;
      transform: translate(-50%, -50%) !important;
      z-index: 9999 !important;
      cursor: pointer !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    `;
    
    // Add a facility name for debugging
    marker.setAttribute('title', `Emergency Marker ${index}`);
    
    // Add to map container
    mapContainer.appendChild(marker);
    
    // Add click handler
    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log(`Emergency marker ${index} clicked`);
      alert(`Storage facility ${index + 1} selected. This is an emergency marker.`);
    });
  });
  
  console.log("Added emergency DOM markers to map container");
}

// Create markers using Mapbox API if available
function createMapboxEmergencyMarkers() {
  // Check if Mapbox and map instance are available
  if (window.mapboxgl && window.mapInstance) {
    const map = window.mapInstance;
    
    // Get the viewport bounds to place markers
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    
    // Create coordinates based on map bounds
    const emergencyCoordinates = [
      [sw.lng + (ne.lng - sw.lng) * 0.25, sw.lat + (ne.lat - sw.lat) * 0.25],
      [sw.lng + (ne.lng - sw.lng) * 0.5, sw.lat + (ne.lat - sw.lat) * 0.5],
      [sw.lng + (ne.lng - sw.lng) * 0.75, sw.lat + (ne.lat - sw.lat) * 0.25],
      [sw.lng + (ne.lng - sw.lng) * 0.25, sw.lat + (ne.lat - sw.lat) * 0.75],
      [sw.lng + (ne.lng - sw.lng) * 0.75, sw.lat + (ne.lat - sw.lat) * 0.75]
    ];
    
    // Use Mapbox to add markers
    emergencyCoordinates.forEach((coords, index) => {
      // Create popup for the marker
      const popup = new window.mapboxgl.Popup({ closeButton: true })
        .setHTML(`
          <div>
            <h3>Storage Facility ${index + 1}</h3>
            <p>Emergency marker location</p>
            <button class="view-facility-btn" data-facility-id="emergency-${index}">
              View Details
            </button>
          </div>
        `);
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'emergency-marker';
      el.setAttribute('data-emergency', 'true');
      el.setAttribute('data-facility-id', `emergency-${index}`);
      
      // Critical inline styles
      el.style.cssText = `
        width: 30px !important;
        height: 30px !important;
        background-color: #F97316 !important;
        border-radius: 50% !important;
        border: 3px solid white !important;
        box-shadow: 0 0 15px rgba(249,115,22,0.8) !important;
        z-index: 9999 !important;
        cursor: pointer !important;
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      `;
      
      // Create and add the marker
      try {
        const marker = new window.mapboxgl.Marker({ element: el })
          .setLngLat(coords)
          .setPopup(popup)
          .addTo(map);
        
        // Store marker in global registry if available
        if (window._persistentMarkers) {
          window._persistentMarkers[`emergency-${index}`] = marker;
        }
        
        console.log(`Added Mapbox emergency marker ${index} at [${coords[0]}, ${coords[1]}]`);
      } catch (err) {
        console.error('Error adding Mapbox emergency marker:', err);
      }
    });
  } else {
    console.warn('Mapbox API not available for emergency markers');
  }
}

// Inject CSS to ensure markers are visible
function injectEmergencyMarkerStyles() {
  // Check if styles are already injected
  if (document.getElementById('markers-emergency-css')) {
    return;
  }
  
  // Create style element
  const style = document.createElement('style');
  style.id = 'markers-emergency-css';
  style.textContent = `
    .mapboxgl-marker,
    .custom-marker,
    .emergency-marker {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 9999 !important;
      pointer-events: auto !important;
      position: absolute !important;
      cursor: pointer !important;
    }
    
    .emergency-marker {
      width: 30px !important;
      height: 30px !important;
      background-color: #F97316 !important;
      border-radius: 50% !important;
      border: 3px solid white !important;
      box-shadow: 0 0 15px rgba(249,115,22,0.8) !important;
      animation: emergency-pulse 1.5s infinite ease-in-out;
    }
    
    @keyframes emergency-pulse {
      0% { transform: scale(1) translate(-50%, -50%); box-shadow: 0 0 10px rgba(249, 115, 22, 0.8); }
      50% { transform: scale(1.1) translate(-45%, -45%); box-shadow: 0 0 20px rgba(249, 115, 22, 0.9); }
      100% { transform: scale(1) translate(-50%, -50%); box-shadow: 0 0 10px rgba(249, 115, 22, 0.8); }
    }
  `;
  
  // Add to document head
  document.head.appendChild(style);
  console.log('Injected emergency marker styles');
}

// Run immediately
injectEmergencyMarkerStyles();
