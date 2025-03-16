
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';
import { injectDirectMarkerStyles } from './styling';
import { createMarkerElement, removeExistingDirectMarkers, setupMarkerPositionUpdates } from './marker';
import { createPopupElement, addCloseButton, removeExistingDirectPopups } from './popup';
import { setupMarkerClickEvent } from './eventListeners';

/**
 * Create direct markers that aren't managed by Mapbox
 */
export function createDirectMarkers(
  facilities: StorageFacility[],
  map: mapboxgl.Map
): number {
  console.log(`Creating ${facilities.length} direct markers`);
  
  // Guard clause - if no facilities, return early
  if (!facilities || facilities.length === 0 || !map) {
    console.warn('No facilities or map provided for marker creation');
    return 0;
  }
  
  try {
    // Remove existing markers to prevent duplicates
    removeExistingDirectMarkers();
    removeExistingDirectPopups();
    
    // Add styles for direct markers
    injectDirectMarkerStyles();
    
    let count = 0;
    
    // Create markers for each facility
    facilities.forEach(facility => {
      try {
        // Skip invalid coordinates
        if (!facility.latitude || !facility.longitude) {
          console.warn(`Missing coordinates for facility ${facility.id}`);
          return;
        }
        
        const lat = parseFloat(String(facility.latitude));
        const lng = parseFloat(String(facility.longitude));
        
        if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
          console.warn(`Invalid coordinates for facility ${facility.id}: ${lat}, ${lng}`);
          return;
        }
        
        // Convert lat/lng to pixel coordinates
        const point = map.project([lng, lat]);
        
        // Create marker element
        const marker = createMarkerElement(facility, point);
        
        // Create popup element
        const popup = createPopupElement(facility, { x: point.x, y: point.y - 15 });
        
        // Add close button to popup
        addCloseButton(popup);
        
        // Add to map container
        map.getContainer().appendChild(marker);
        map.getContainer().appendChild(popup);
        
        // Set up marker click event
        setupMarkerClickEvent(marker, popup, facility.id);
        
        count++;
      } catch (err) {
        console.error(`Error creating marker for facility ${facility.id}:`, err);
      }
    });
    
    // Set up marker position updates
    setupMarkerPositionUpdates(map, facilities);
    
    console.log(`Created ${count} direct markers`);
    return count;
  } catch (error) {
    console.error('Error in createDirectMarkers:', error);
    return 0;
  }
}
