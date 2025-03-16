
import { StorageFacility } from '../types';
import mapboxgl from 'mapbox-gl';
import { createEdgeAwareClickHandler } from '../forcing/edge-aware';

/**
 * Create a marker element for a facility
 */
export function createMarkerElement(
  facility: StorageFacility,
  point: mapboxgl.Point,
  facilityId: string
): HTMLElement {
  // Create marker element
  const marker = document.createElement('div');
  marker.id = `direct-marker-${facilityId}`;
  marker.className = 'emergency-marker direct-marker';
  marker.setAttribute('data-facility-id', facilityId);
  marker.setAttribute('data-lat', String(facility.latitude));
  marker.setAttribute('data-lng', String(facility.longitude));
  
  // Position marker
  marker.style.position = 'absolute';
  marker.style.left = `${point.x}px`;
  marker.style.top = `${point.y}px`;
  marker.style.transform = 'translate(-50%, -50%)';
  
  return marker;
}

/**
 * Remove existing emergency markers from the DOM
 */
export function removeExistingEmergencyMarkers(): void {
  document.querySelectorAll('.emergency-marker').forEach(marker => {
    if (marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
}

/**
 * Create edge-aware click handler for a marker
 */
export function createMarkerClickHandler(
  map: mapboxgl.Map,
  facility: StorageFacility,
  marker: HTMLElement,
  popup: HTMLElement,
  onPopupToggle?: (isOpen: boolean) => void
): (e: MouseEvent) => void {
  const lat = parseFloat(String(facility.latitude));
  const lng = parseFloat(String(facility.longitude));
  
  // Create edge-aware click handler
  const edgeAwareHandler = createEdgeAwareClickHandler(
    map,
    [lng, lat],
    (e) => {
      // Close all other popups
      document.querySelectorAll('.direct-popup').forEach(p => {
        if (p.id !== popup.id && p instanceof HTMLElement) {
          p.style.display = 'none';
          p.style.visibility = 'hidden';
          p.style.opacity = '0';
          p.style.zIndex = '-9999';
          p.classList.remove('visible');
          p.classList.remove('clicked');
        }
      });
      
      // Toggle this popup
      const isCurrentlyVisible = 
        popup.style.display === 'block' && 
        popup.style.visibility === 'visible';
      
      if (!isCurrentlyVisible) {
        popup.style.display = 'block';
        popup.style.visibility = 'visible';
        popup.style.opacity = '1';
        popup.style.zIndex = '10000';
        popup.classList.add('visible');
        popup.classList.add('clicked');
        
        // Highlight the marker
        marker.style.backgroundColor = '#10B981';
        marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
        marker.style.zIndex = '10000';
        marker.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
        
        if (onPopupToggle) onPopupToggle(true);
      } else {
        popup.style.display = 'none';
        popup.style.visibility = 'hidden';
        popup.style.opacity = '0';
        popup.style.zIndex = '-9999';
        popup.classList.remove('visible');
        popup.classList.remove('clicked');
        
        // Reset marker
        marker.style.backgroundColor = '#F97316';
        marker.style.transform = 'translate(-50%, -50%) scale(1)';
        marker.style.zIndex = '9999';
        marker.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        
        if (onPopupToggle) onPopupToggle(false);
      }
    }
  );
  
  return edgeAwareHandler;
}

/**
 * Update marker positions on map move
 */
export function setupMarkerPositionUpdates(
  map: mapboxgl.Map,
  facilities: StorageFacility[]
): void {
  // Update marker positions when map moves
  map.on('move', () => {
    facilities.forEach(facility => {
      if (!facility.latitude || !facility.longitude) return;
      
      const lat = parseFloat(String(facility.latitude));
      const lng = parseFloat(String(facility.longitude));
      
      if (isNaN(lat) || isNaN(lng)) return;
      
      try {
        // Convert geo coordinates to pixel coordinates
        const point = map.project(new mapboxgl.LngLat(lng, lat));
        
        // Update marker position
        const marker = document.getElementById(`direct-marker-${facility.id}`);
        if (marker && marker instanceof HTMLElement) {
          marker.style.left = `${point.x}px`;
          marker.style.top = `${point.y}px`;
        }
        
        // Update popup position
        const popup = document.getElementById(`direct-popup-${facility.id}`);
        if (popup && popup instanceof HTMLElement) {
          popup.style.left = `${point.x}px`;
          popup.style.top = `${point.y - 140}px`;
        }
      } catch (error) {
        console.error(`Error updating emergency marker position for ${facility.name}:`, error);
      }
    });
  });
}
