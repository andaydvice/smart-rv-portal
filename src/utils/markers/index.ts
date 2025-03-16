
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '@/components/storage/types';
import { enableEdgeAwareMarkers } from './forcing/edge-aware';
import { 
  createEmergencyMarkers,
  setupEmergencyMarkerListeners,
  injectEmergencyMarkerStyles
} from './emergency';

/**
 * Remove unnecessary "View Details" buttons from markers
 */
export const removeViewDetailsButtons = () => {
  const buttons = document.querySelectorAll('.mapboxgl-popup-content button');
  buttons.forEach(button => {
    if (button.textContent?.includes('View Details')) {
      button.parentElement?.removeChild(button);
    }
  });
};

/**
 * Ensure markers exist on the map, creating them if needed
 */
export const ensureMarkersExist = (map: mapboxgl.Map, facilities: StorageFacility[]) => {
  // Check if markers already exist
  const existingMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  
  if (existingMarkers.length === 0) {
    console.log('No markers found, will create emergency markers');
    
    // Create emergency markers for each facility
    facilities.forEach(facility => {
      if (!facility.latitude || !facility.longitude) return;
      
      try {
        // Create marker element
        const el = document.createElement('div');
        el.className = 'emergency-marker custom-marker';
        el.setAttribute('data-facility-id', facility.id);
        
        // Style the marker
        el.style.backgroundColor = '#F97316';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 10px rgba(0,0,0,0.8)';
        el.style.cursor = 'pointer';
        el.style.zIndex = '9998';
        
        // Create popup
        const popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
          offset: 15
        }).setHTML(`
          <div class="p-3">
            <h3 class="font-semibold">${facility.name}</h3>
            <p>${facility.address}, ${facility.city}, ${facility.state}</p>
          </div>
        `);
        
        // Create and add marker to map
        new mapboxgl.Marker(el)
          .setLngLat([parseFloat(String(facility.longitude)), parseFloat(String(facility.latitude))])
          .setPopup(popup)
          .addTo(map);
      } catch (err) {
        console.error(`Error creating emergency marker for facility ${facility.id}:`, err);
      }
    });
    
    // Apply edge-aware behavior to all markers
    setTimeout(() => {
      enableEdgeAwareMarkers(map);
    }, 1000);
    
    return true;
  }
  
  return false;
};

// Re-export emergency marker functions for use in other components
export { 
  createEmergencyMarkers,
  setupEmergencyMarkerListeners, 
  injectEmergencyMarkerStyles 
} from './emergency';
