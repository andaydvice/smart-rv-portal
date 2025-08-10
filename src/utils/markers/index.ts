
// Export the emergency marker utilities
export * from './emergency/index';

// Helper function to ensure markers exist
export const ensureMarkersExist = (map: mapboxgl.Map, facilities: any[]) => {
  if (import.meta.env.DEV) console.log(`Ensuring markers exist for ${facilities.length} facilities`);
  
  // Check if markers already exist
  const existingMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  if (existingMarkers.length > 0) {
    if (import.meta.env.DEV) console.log(`Found ${existingMarkers.length} existing markers`);
    return;
  }
  
  // Wait a bit and force create markers if they don't exist
  setTimeout(() => {
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    if (import.meta.env.DEV) console.log(`After delay: found ${markers.length} markers`);
    
    if (markers.length === 0) {
      try {
        // Force create emergency markers
        if (import.meta.env.DEV) console.log('No markers found, creating emergency markers');
        const { createEmergencyMarkers } = require('./emergency/directMarkerCreation');
        createEmergencyMarkers(map, facilities);
        
        // Force markers to be visible
        setTimeout(() => {
          document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker').forEach(marker => {
            if (marker instanceof HTMLElement) {
              marker.style.visibility = 'visible';
              marker.style.display = 'block';
              marker.style.opacity = '1';
            }
          });
        }, 200);
      } catch (error) {
        console.error('Error creating emergency markers:', error);
      }
    }
  }, 1000);
};

// Helper function to remove "View Details" buttons (no-op to avoid removing UI)
export const removeViewDetailsButtons = () => {
  // Intentionally left blank to prevent unintended UI removal
};
