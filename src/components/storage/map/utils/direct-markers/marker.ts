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
    isZoomedIn?: boolean;
    isHighlighted?: boolean;
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

/**
 * Updates marker colors based on zoom level
 */
export function updateMarkersForZoomLevel(map: mapboxgl.Map, zoomThreshold: number = 10): void {
  if (!map) return;
  
  const currentZoom = map.getZoom();
  const isZoomedIn = currentZoom > zoomThreshold;
  
  document.querySelectorAll('.direct-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      // Change color based on zoom level
      if (isZoomedIn) {
        marker.style.backgroundColor = '#10B981'; // Green color when zoomed in
        marker.classList.add('zoomed-marker');
      } else {
        // Check if this is a highlighted marker before changing back to orange
        if (!marker.classList.contains('highlighted-marker')) {
          marker.style.backgroundColor = '#F97316'; // Orange color when zoomed out
          marker.classList.remove('zoomed-marker');
        }
      }
    }
  });
  
  // Show or hide the zoom indicator
  const zoomIndicator = document.querySelector('.zoom-level-indicator');
  if (zoomIndicator instanceof HTMLElement) {
    zoomIndicator.style.display = isZoomedIn ? 'flex' : 'none';
  } else if (isZoomedIn) {
    // Create zoom indicator if it doesn't exist
    createZoomLevelIndicator(map.getContainer());
  }
}

/**
 * Creates a zoom level indicator element
 */
export function createZoomLevelIndicator(container: HTMLElement): HTMLElement {
  const indicator = document.createElement('div');
  indicator.className = 'zoom-level-indicator';
  indicator.innerHTML = `
    <div class="indicator-dot"></div>
    <span>Zoomed in - Showing nearby facilities</span>
  `;
  
  // Style the indicator
  indicator.style.position = 'absolute';
  indicator.style.top = '60px';
  indicator.style.left = '10px';
  indicator.style.backgroundColor = 'rgba(16, 185, 129, 0.8)';
  indicator.style.color = 'white';
  indicator.style.padding = '4px 12px';
  indicator.style.borderRadius = '16px';
  indicator.style.fontSize = '12px';
  indicator.style.display = 'flex';
  indicator.style.alignItems = 'center';
  indicator.style.zIndex = '1000';
  
  // Style the dot
  const dot = indicator.querySelector('.indicator-dot');
  if (dot instanceof HTMLElement) {
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.backgroundColor = 'white';
    dot.style.borderRadius = '50%';
    dot.style.marginRight = '6px';
  }
  
  container.appendChild(indicator);
  return indicator;
}
