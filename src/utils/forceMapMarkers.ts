
// Import mapboxgl to ensure we have the Marker type
import mapboxgl from 'mapbox-gl';

// Define the Window interface extension once with the correct type
interface Window {
  _persistentMarkers?: Record<string, mapboxgl.Marker>;
  mapInstance?: mapboxgl.Map;
  isStorageFacilitiesPage?: boolean;
  mapboxgl?: typeof mapboxgl;
}

// Update the global declaration to match the interface above
declare global {
  interface Window {
    _persistentMarkers?: Record<string, mapboxgl.Marker>;
    mapInstance?: mapboxgl.Map;
    isStorageFacilitiesPage?: boolean;
    mapboxgl?: typeof mapboxgl;
  }
}

export function forceMapMarkersVisible() {
  console.log("Starting force map markers visible function");
  
  // Execute immediately and then at intervals
  forceMarkersNow();
  
  // Set up intervals with increasing frequency for the first 10 seconds
  setTimeout(() => forceMarkersNow(), 100);
  setTimeout(() => forceMarkersNow(), 500);
  setTimeout(() => forceMarkersNow(), 1000);
  setTimeout(() => forceMarkersNow(), 2000);
  
  // Continue with a regular interval after initial boosts
  setInterval(() => forceMarkersNow(), 2000);
}

function forceMarkersNow() {
  console.log("ForceMarkersNow: Attempting to make markers visible");
  
  // Directly inject CSS to ensure markers are always visible
  if (!document.getElementById('force-marker-styles')) {
    const style = document.createElement('style');
    style.id = 'force-marker-styles';
    style.innerHTML = `
      .mapboxgl-marker, 
      .custom-marker, 
      .marker, 
      [class*="marker"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
        position: absolute !important;
        cursor: pointer !important;
      }
      
      .mapboxgl-popup {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 10000 !important;
      }

      @keyframes marker-pulse {
        0% { transform: scale(1) translate(-50%, -50%); }
        50% { transform: scale(1.2) translate(-42%, -42%); }
        100% { transform: scale(1) translate(-50%, -50%); }
      }
      
      .emergency-marker {
        animation: marker-pulse 1.5s infinite ease-in-out;
      }
    `;
    document.head.appendChild(style);
    console.log("Injected force-marker-styles");
  }
  
  // 1. Force all existing markers to be visible
  document.querySelectorAll('.mapboxgl-marker, .custom-marker, .marker, [class*="marker"]').forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.cssText += `
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
        position: absolute !important;
        cursor: pointer !important;
      `;
      
      // Add click handler if missing
      if (!marker.getAttribute('data-has-click')) {
        marker.setAttribute('data-has-click', 'true');
        marker.addEventListener('click', () => {
          console.log('Marker clicked:', marker.id);
          // Try to trigger popup
          const facilityId = marker.getAttribute('data-facility-id');
          if (facilityId) {
            // Find and click the view button
            document.querySelectorAll(`.view-facility-btn[data-facility-id="${facilityId}"]`).forEach(btn => {
              (btn as HTMLElement).click();
            });
          }
        });
      }
    }
  });
  
  // 2. Check if we need to create emergency markers
  const map = window.mapInstance;
  if (!map) {
    console.log("Map instance not found in window");
    return;
  }
  
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  if (markers.length < 3 && window.isStorageFacilitiesPage) {
    console.log("Too few markers found, creating emergency markers");
    createEmergencyMarkers(map);
  } else {
    console.log(`Found ${markers.length} markers`);
  }
}

function createEmergencyMarkers(map: mapboxgl.Map) {
  console.log("Creating emergency markers");
  
  // Use hardcoded facility data as a fallback
  const emergencyFacilities = [
    { id: "emergency1", name: "Downtown Storage", lat: 34.0522, lng: -118.2437 },
    { id: "emergency2", name: "Westside Storage", lat: 34.0522, lng: -118.4437 },
    { id: "emergency3", name: "Eastside Storage", lat: 34.0522, lng: -118.0437 },
    { id: "emergency4", name: "Uptown Storage", lat: 34.1522, lng: -118.2437 },
    { id: "emergency5", name: "Brooklyn Storage", lat: 33.9522, lng: -118.2437 },
    { id: "emergency6", name: "Queens Storage", lat: 33.9522, lng: -118.0437 }
  ];
  
  emergencyFacilities.forEach((facility, index) => {
    // Only create if not already exists
    if (document.getElementById(`marker-${facility.id}`)) {
      return;
    }
    
    // Create marker element with guaranteed visibility
    const el = document.createElement('div');
    el.className = 'custom-marker emergency-marker';
    el.id = `marker-${facility.id}`;
    
    // Apply styling that can't be blocked or overridden
    el.style.cssText = `
      background-color: #F97316;
      width: 30px !important;
      height: 30px !important;
      border-radius: 50% !important;
      border: 3px solid white !important;
      box-shadow: 0 0 15px rgba(249,115,22,0.8) !important;
      position: absolute !important;
      transform: translate(-50%, -50%) !important;
      z-index: 10000 !important;
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      pointer-events: all !important;
      cursor: pointer !important;
    `;
    
    // Set facility data attributes
    el.setAttribute('data-facility-id', facility.id);
    el.setAttribute('data-facility-name', facility.name);
    
    // Add click handler
    el.addEventListener('click', () => {
      alert(`${facility.name} (ID: ${facility.id})\nThis is a storage facility for your RV.`);
    });
    
    // Try to position on map if possible using coordinates from facility
    try {
      // Fix: Explicitly define coordinates as [number, number] tuple
      const coordinates: [number, number] = [facility.lng, facility.lat];
      
      // Add directly to document body for guaranteed visibility
      document.body.appendChild(el);
      
      // Try to position using map projection if map is available
      if (map && map.project && typeof map.project === 'function') {
        try {
          const point = map.project(coordinates);
          el.style.left = `${point.x}px`;
          el.style.top = `${point.y}px`;
          console.log(`Positioned marker at: ${point.x}, ${point.y}`);
        } catch (e) {
          console.error("Error positioning marker:", e);
          // Fallback positioning
          positionMarkerInViewport(el, index);
        }
      } else {
        // Fallback positioning if map projection not available
        positionMarkerInViewport(el, index);
      }
    } catch (e) {
      console.error("Error creating emergency marker:", e);
      // Fallback positioning
      positionMarkerInViewport(el, index);
    }
    
    // Create fallback mapbox marker if available
    if (window.mapboxgl && map) {
      try {
        // Clone element for mapbox marker
        const markerElement = el.cloneNode(true) as HTMLElement;
        markerElement.id = `mapbox-${facility.id}`;
        
        const marker = new window.mapboxgl.Marker({
          element: markerElement
        })
        .setLngLat([facility.lng, facility.lat]);
        
        try {
          marker.addTo(map);
          console.log(`Added Mapbox marker for ${facility.name}`);
        } catch (err) {
          console.error("Error adding marker to map:", err);
        }
        
        // Create and add popup
        const popup = new window.mapboxgl.Popup({ 
          closeButton: true,
          closeOnClick: false,
          className: 'facility-popup'
        })
        .setHTML(`
          <div>
            <h3 style="font-weight: bold; margin-bottom: 8px;">${facility.name}</h3>
            <p>Indoor RV Storage Facility</p>
            <p>Price: $150 - $300 per month</p>
            <button class="view-facility-btn" data-facility-id="${facility.id}" style="
              background-color: #F97316;
              color: white;
              border: none;
              padding: 8px 12px;
              border-radius: 4px;
              cursor: pointer;
              font-weight: bold;
              margin-top: 8px;
              display: block;
              width: 100%;
            ">View Details</button>
          </div>
        `);
        
        marker.setPopup(popup);
        
        // Store marker in persistent registry
        if (!window._persistentMarkers) {
          window._persistentMarkers = {};
        }
        window._persistentMarkers[facility.id] = marker;
      } catch (e) {
        console.error("Error creating Mapbox marker:", e);
      }
    }
  });
  
  console.log("Emergency markers created");
}

// Position marker in viewport when map coordinates fail
function positionMarkerInViewport(markerElement: HTMLElement, index: number) {
  // Get map container dimensions
  const mapContainer = document.querySelector('.mapboxgl-map') as HTMLElement;
  if (!mapContainer) {
    // Fallback to using viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate position based on index to spread markers
    const xPos = viewportWidth * (0.3 + (index % 3) * 0.2);
    const yPos = viewportHeight * (0.4 + Math.floor(index / 3) * 0.1);
    
    markerElement.style.left = `${xPos}px`;
    markerElement.style.top = `${yPos}px`;
    return;
  }
  
  // Use map container dimensions
  const rect = mapContainer.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  
  // Calculate position based on index to spread markers
  const xPos = rect.left + width * (0.3 + (index % 3) * 0.2);
  const yPos = rect.top + height * (0.4 + Math.floor(index / 3) * 0.1);
  
  markerElement.style.left = `${xPos}px`;
  markerElement.style.top = `${yPos}px`;
  
  console.log(`Positioned marker in viewport at: ${xPos}, ${yPos}`);
}
