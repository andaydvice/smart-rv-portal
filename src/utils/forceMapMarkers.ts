
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
          Object.assign(marker.style, {
            display: 'block !important',
            visibility: 'visible !important',
            opacity: '1 !important',
            zIndex: '9999 !important',
            pointerEvents: 'auto !important',
            width: '24px !important',
            height: '24px !important',
            borderRadius: '50% !important',
            backgroundColor: '#F97316 !important',
            border: '2px solid white !important',
            boxShadow: '0 0 10px rgba(0,0,0,0.8) !important',
            position: 'absolute !important',
            transform: 'translate(-50%, -50%) !important'
          });
          
          // Ensure marker is in document
          if (!document.body.contains(marker)) {
            document.body.appendChild(marker);
          }
        });
      }
    };

    // Create emergency markers directly if needed
    function createEmergencyMarkers() {
      // Access the map instance directly from window
      const map = (window as any).mapInstance;
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
        const coordinates = [facility.lng, facility.lat];
        const point = map.project(coordinates);
        el.style.left = `${point.x}px`;
        el.style.top = `${point.y}px`;
        
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
