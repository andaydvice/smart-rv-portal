
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
  // Execute 5 seconds after page load and every 3 seconds thereafter
  setTimeout(() => {
    const forceMarkers = () => {
      // Find all map containers and their canvases
      const mapContainers = document.querySelectorAll('.mapboxgl-map');
      
      if (mapContainers.length > 0) {
        console.log("Force-displaying map markers!");
        
        // Create markers if none exist
        if (document.querySelectorAll('.custom-marker').length === 0) {
          createEmergencyMarkers();
        }
        
        // Force all markers to be visible with important styling
        document.querySelectorAll('.custom-marker, .mapboxgl-marker').forEach(marker => {
          if (marker instanceof HTMLElement) {
            Object.assign(marker.style, {
              display: 'block',
              visibility: 'visible',
              opacity: '1',
              zIndex: '9999',
              pointerEvents: 'auto',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#F97316',
              border: '2px solid white',
              boxShadow: '0 0 10px rgba(0,0,0,0.8)',
              position: 'absolute',
              transform: 'translate(-50%, -50%)'
            });
            
            // Ensure marker is in document
            if (!document.body.contains(marker)) {
              document.body.appendChild(marker);
            }
          }
        });
      }
    };

    // Create emergency markers directly if needed
    function createEmergencyMarkers() {
      // Access the map instance directly from window
      const map = window.mapInstance;
      if (!map) return;
      
      // Use hardcoded facility data in case the API failed
      const emergencyFacilities = [
        { id: "emergency1", name: "Downtown Storage", lat: 40.7128, lng: -74.0060 },
        { id: "emergency2", name: "Westside Storage", lat: 40.7139, lng: -74.0080 },
        { id: "emergency3", name: "Eastside Storage", lat: 40.7135, lng: -74.0040 }
      ];
      
      emergencyFacilities.forEach(facility => {
        const el = document.createElement('div');
        el.className = 'custom-marker emergency-marker';
        el.id = `marker-${facility.id}`;
        
        Object.assign(el.style, {
          display: 'block',
          visibility: 'visible',
          opacity: '1',
          zIndex: '9999',
          pointerEvents: 'auto',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: '#F97316',
          border: '2px solid white',
          boxShadow: '0 0 10px rgba(0,0,0,0.8)',
          position: 'absolute',
          transform: 'translate(-50%, -50%)'
        });
        
        // Add to DOM directly
        document.body.appendChild(el);
        
        // Position correctly on map
        if (map.project) {
          // Fix: Explicitly define coordinates as [number, number] tuple to satisfy LngLatLike
          const coordinates: [number, number] = [facility.lng, facility.lat];
          const point = map.project(coordinates);
          el.style.left = `${point.x}px`;
          el.style.top = `${point.y}px`;
        }
        
        // Add click handler
        el.addEventListener('click', () => {
          alert(`${facility.name} (ID: ${facility.id})`);
        });
      });
    }
    
    // Run immediately and periodically
    forceMarkers();
    setInterval(forceMarkers, 3000);
  }, 5000);
}
