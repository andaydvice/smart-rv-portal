
// Export the emergency marker utilities
export * from './emergency/index';

// Helper function to ensure markers exist
export const ensureMarkersExist = (map: mapboxgl.Map, facilities: Record<string, any>[]) => {
  // Check if markers already exist
  const existingMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  if (existingMarkers.length > 0) {
    return;
  }
  
  // Wait a bit and force create markers if they don't exist
  setTimeout(() => {
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    
    if (markers.length === 0) {
      try {
        // Force create emergency markers
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

// Helper function to remove "View Details" buttons
export const removeViewDetailsButtons = () => {
  document.querySelectorAll('.view-facility-btn, .view-details, button.view-details, a.view-details').forEach(btn => {
    if (btn.parentNode) {
      btn.parentNode.removeChild(btn);
    }
  });
};
