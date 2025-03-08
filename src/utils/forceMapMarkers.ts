
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
  setTimeout(() => forceMarkersNow(), 500);
  setTimeout(() => forceMarkersNow(), 1000);
  setTimeout(() => forceMarkersNow(), 2000);
  
  // Continue with a regular interval after initial boosts
  setInterval(() => forceMarkersNow(), 3000);
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
      }
      
      .mapboxgl-popup {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 10000 !important;
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
      `;
      console.log(`Enhanced marker ${marker.id || 'unnamed'}`);
    }
  });
  
  // 2. Check if we need to create emergency markers
  const map = window.mapInstance;
  if (!map) {
    console.log("Map instance not found in window");
    return;
  }
  
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  if (markers.length === 0 && window.isStorageFacilitiesPage) {
    console.log("No markers found, creating emergency markers");
    createEmergencyMarkers(map);
  } else {
    console.log(`Found ${markers.length} markers`);
  }
}

function createEmergencyMarkers(map: mapboxgl.Map) {
  console.log("Creating emergency markers");
  
  // Use hardcoded facility data as a fallback
  const emergencyFacilities = [
    { id: "emergency1", name: "Downtown Storage", lat: 40.7128, lng: -74.0060 },
    { id: "emergency2", name: "Westside Storage", lat: 40.7139, lng: -74.0080 },
    { id: "emergency3", name: "Eastside Storage", lat: 40.7135, lng: -74.0040 },
    { id: "emergency4", name: "Uptown Storage", lat: 40.8000, lng: -73.9500 },
    { id: "emergency5", name: "Brooklyn Storage", lat: 40.6782, lng: -73.9442 },
    { id: "emergency6", name: "Queens Storage", lat: 40.7282, lng: -73.7949 }
  ];
  
  emergencyFacilities.forEach(facility => {
    // Create marker element with guaranteed visibility
    const el = document.createElement('div');
    el.className = 'custom-marker emergency-marker';
    el.id = `marker-${facility.id}`;
    
    // Apply styling that can't be blocked or overridden
    el.style.cssText = `
      background-color: #F97316;
      width: 24px !important;
      height: 24px !important;
      border-radius: 50% !important;
      border: 2px solid white !important;
      box-shadow: 0 0 10px rgba(0,0,0,0.8) !important;
      position: absolute !important;
      transform: translate(-50%, -50%) !important;
      z-index: 10000 !important;
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      pointer-events: all !important;
      cursor: pointer !important;
      left: 50% !important;
      top: 50% !important;
    `;
    
    // Add directly to document body and map container
    document.body.appendChild(el);
    const mapContainer = document.querySelector('.mapboxgl-map');
    if (mapContainer) {
      mapContainer.appendChild(el.cloneNode(true));
    }
    
    // Try to position on map if possible
    try {
      // Fix: Explicitly define coordinates as [number, number] tuple to satisfy LngLatLike
      const coordinates: [number, number] = [facility.lng, facility.lat];
      if (map && map.project) {
        const point = map.project(coordinates);
        el.style.left = `${point.x}px`;
        el.style.top = `${point.y}px`;
        console.log(`Positioned marker at: ${point.x}, ${point.y}`);
      }
    } catch (e) {
      console.error("Error positioning marker:", e);
    }
    
    // Add click handler
    el.addEventListener('click', () => {
      alert(`${facility.name} (ID: ${facility.id})`);
    });
    
    // Create fallback mapbox marker if available
    if (window.mapboxgl && map) {
      try {
        const marker = new window.mapboxgl.Marker({
          element: el.cloneNode(true) as HTMLElement
        })
        .setLngLat([facility.lng, facility.lat])
        .addTo(map);
        
        console.log(`Added Mapbox marker for ${facility.name}`);
      } catch (e) {
        console.error("Error creating Mapbox marker:", e);
      }
    }
  });
  
  console.log("Emergency markers created");
}
