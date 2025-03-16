
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';
import { applyMarkerStyling } from './styling';

/**
 * Creates a marker element for a facility
 */
export function createMarkerElement(
  facility: StorageFacility,
  point: mapboxgl.Point | { x: number, y: number },
  options?: {
    backgroundColor?: string;
    borderColor?: string;
    size?: number;
    zIndex?: number;
  }
): HTMLElement {
  // Create marker element
  const marker = document.createElement('div');
  marker.className = 'direct-marker';
  marker.id = `direct-marker-${facility.id}`;
  
  // Set data attributes for debugging and filtering
  marker.setAttribute('data-facility-id', facility.id);
  marker.setAttribute('data-state', facility.state);
  marker.setAttribute('data-lat', String(facility.latitude));
  marker.setAttribute('data-lng', String(facility.longitude));
  
  // Position the marker
  marker.style.left = `${point.x}px`;
  marker.style.top = `${point.y}px`;
  
  // Apply styling to the marker
  applyMarkerStyling(marker, options);
  
  return marker;
}

/**
 * Removes existing direct markers from the DOM
 */
export function removeExistingDirectMarkers(): void {
  document.querySelectorAll('.direct-marker').forEach(marker => {
    if (marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
}

/**
 * Updates marker positions when the map moves
 */
export function setupMarkerPositionUpdates(
  map: mapboxgl.Map,
  facilities: StorageFacility[]
): void {
  // Update marker positions on map move
  map.on('move', () => {
    facilities.forEach(facility => {
      if (!facility.latitude || !facility.longitude) return;
      
      const lat = parseFloat(String(facility.latitude));
      const lng = parseFloat(String(facility.longitude));
      
      if (isNaN(lat) || isNaN(lng)) return;
      
      try {
        // Convert geo coordinates to pixel coordinates
        const newPos = map.project(new mapboxgl.LngLat(lng, lat));
        
        // Update marker position
        const marker = document.getElementById(`direct-marker-${facility.id}`);
        if (marker && marker instanceof HTMLElement) {
          marker.style.left = `${newPos.x}px`;
          marker.style.top = `${newPos.y}px`;
        }
        
        // Update popup position
        const popup = document.getElementById(`direct-popup-${facility.id}`);
        if (popup && popup instanceof HTMLElement) {
          popup.style.left = `${newPos.x}px`;
          popup.style.top = `${newPos.y - 15}px`;
        }
      } catch (error) {
        console.error(`Error updating marker position for ${facility.name}:`, error);
      }
    });
  });
}
