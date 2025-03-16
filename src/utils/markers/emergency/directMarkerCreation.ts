
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { injectEmergencyMarkerStyles } from '../styleInjection';
import { createMarkerElement, removeExistingEmergencyMarkers, createMarkerClickHandler, setupMarkerPositionUpdates } from './marker';
import { createFacilityPopup, setupPopupCloseButton, closeAllPopupsExcept } from './popup';
import { setupEmergencyMarkerListeners, storeHandlerReference } from './eventListeners';

/**
 * Create emergency-style markers for facilities (direct DOM creation)
 */
export function createEmergencyMarkers(
  map: mapboxgl.Map,
  facilities: StorageFacility[]
): number {
  console.log(`Creating ${facilities.length} emergency markers`);
  
  // Remove existing emergency markers to avoid duplicates
  removeExistingEmergencyMarkers();
  
  // Add styles for emergency markers
  injectEmergencyMarkerStyles();
  
  let count = 0;
  
  // Create markers for each facility
  facilities.forEach(facility => {
    if (!facility.latitude || !facility.longitude) return;
    
    const lat = parseFloat(String(facility.latitude));
    const lng = parseFloat(String(facility.longitude));
    
    if (isNaN(lat) || isNaN(lng)) return;
    
    try {
      // Convert geo coordinates to pixel coordinates
      const point = map.project(new mapboxgl.LngLat(lng, lat));
      
      // Create marker element
      const marker = createMarkerElement(facility, point, facility.id);
      
      // Create popup content
      const popup = createFacilityPopup(facility, point, facility.id);
      
      // Add marker and popup to map
      map.getContainer().appendChild(marker);
      map.getContainer().appendChild(popup);
      
      // Create edge-aware click handler for the marker
      const edgeAwareHandler = createMarkerClickHandler(map, facility, marker, popup);
      
      // Add edge-aware click handler to marker
      marker.addEventListener('click', edgeAwareHandler);
      
      // Store handler reference
      storeHandlerReference(marker, edgeAwareHandler, facility.id);
      
      // Add close button handler
      setupPopupCloseButton(popup, marker);
      
      count++;
    } catch (error) {
      console.error(`Error creating emergency marker for ${facility.name}:`, error);
    }
  });
  
  console.log(`Successfully created ${count} emergency markers`);
  
  // Set up marker position updates on map movement
  setupMarkerPositionUpdates(map, facilities);
  
  return count;
}

// Re-export from utility modules for backward compatibility
export { injectEmergencyMarkerStyles } from '../styleInjection';
export { setupEmergencyMarkerListeners } from './eventListeners';

