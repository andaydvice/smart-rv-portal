
import mapboxgl from 'mapbox-gl';
import { createEdgeAwareClickHandler } from './createClickHandler';

/**
 * Hook up all markers in the map with edge-aware click handlers
 * 
 * @param map - The mapbox map instance
 */
export function enableEdgeAwareMarkers(map: mapboxgl.Map): void {
  if (!map) {
    console.warn('Cannot enable edge-aware markers: map is null');
    return;
  }
  
  // Find all markers
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker, .emergency-marker');
  console.log(`Found ${markers.length} markers to make edge-aware`);
  
  let count = 0;
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      // Skip if already processed
      if (marker.hasAttribute('data-edge-aware')) {
        return;
      }
      
      // Get facility ID from data attribute
      const facilityId = marker.getAttribute('data-facility-id');
      if (!facilityId) {
        return;
      }
      
      // Try to get coordinates from the marker's lng/lat attributes first
      let lng = parseFloat(marker.getAttribute('data-lng') || '');
      let lat = parseFloat(marker.getAttribute('data-lat') || '');
      
      // If coordinates aren't available as attributes, try to extract from transform style
      if (isNaN(lng) || isNaN(lat)) {
        try {
          // Get the marker's position from its transform
          const transformValue = window.getComputedStyle(marker).transform;
          
          // Extract the marker's position
          const lngLat = map.unproject(new mapboxgl.Point(
            parseFloat(transformValue.split(',')[4]), 
            parseFloat(transformValue.split(',')[5])
          ));
          
          lng = lngLat.lng;
          lat = lngLat.lat;
        } catch (error) {
          console.error(`Failed to get coordinates for marker ${facilityId}:`, error);
          return;
        }
      }
      
      if (isNaN(lng) || isNaN(lat)) {
        console.warn(`Could not determine coordinates for marker ${facilityId}`);
        return;
      }
      
      // Store coordinates on the marker element for future reference
      marker.setAttribute('data-lng', String(lng));
      marker.setAttribute('data-lat', String(lat));
      
      setupMarkerClickHandler(map, marker, facilityId, lng, lat);
      count++;
    }
  });
  
  console.log(`Found ${count} markers to make visible`);
}

/**
 * Sets up a click handler for a specific marker
 * Extracted to reduce the complexity of the main function
 */
function setupMarkerClickHandler(
  map: mapboxgl.Map,
  marker: HTMLElement, 
  facilityId: string, 
  lng: number, 
  lat: number
): void {
  // Create edge-aware click handler
  const edgeAwareHandler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`Marker ${facilityId} clicked, applying edge-aware handling`);
    
    // Use the edge-aware handler with the marker's coordinates
    preventMarkerEdgeCutoff(
      map,
      marker,
      [lng, lat],
      { top: 120, right: 100, bottom: 200, left: 100 }
    );
    
    // After adjusting map position, show the popup
    setTimeout(() => {
      // Find and show the popup
      const popup = document.getElementById(`direct-popup-${facilityId}`);
      if (popup instanceof HTMLElement) {
        popup.style.display = 'block';
        popup.style.visibility = 'visible';
        popup.style.opacity = '1';
        popup.style.zIndex = '10000';
        popup.classList.add('visible');
        popup.classList.add('clicked');
      }
      
      // Highlight the marker
      marker.style.backgroundColor = '#10B981';
      marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
      marker.style.zIndex = '10000';
      marker.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
    }, 300);
  };
  
  // Remove old handler if exists
  const oldHandler = marker.getAttribute('data-click-handler');
  if (oldHandler && (window as any)[oldHandler]) {
    marker.removeEventListener('click', (window as any)[oldHandler]);
  }
  
  // Add new edge-aware handler
  marker.addEventListener('click', edgeAwareHandler);
  
  // Store reference to handler
  const handlerName = `edge_handler_${facilityId.replace(/[^a-zA-Z0-9]/g, '_')}`;
  (window as any)[handlerName] = edgeAwareHandler;
  marker.setAttribute('data-click-handler', handlerName);
  marker.setAttribute('data-edge-aware', 'true');
}

/**
 * Helper function to prevent edge cutoff
 * Extracted to avoid circular dependencies
 */
function preventMarkerEdgeCutoff(
  map: mapboxgl.Map,
  marker: HTMLElement,
  coordinates: [number, number],
  padding: { top: number; right: number; bottom: number; left: number }
): void {
  if (!map || !marker) return;
  
  const mapContainer = map.getContainer();
  const mapWidth = mapContainer.offsetWidth;
  const mapHeight = mapContainer.offsetHeight;
  
  // Convert coordinates to pixel position
  const point = map.project(new mapboxgl.LngLat(coordinates[0], coordinates[1]));
  
  // Estimate marker and popup dimensions
  const markerWidth = marker.offsetWidth || 24;
  const markerHeight = marker.offsetHeight || 24;
  const popupHeight = 150;
  const popupWidth = 300;
  
  // Initialize center
  let newCenter = [...coordinates] as [number, number];
  let needsAdjustment = false;
  
  // Check horizontal edges
  if (point.x < padding.left + markerWidth/2) {
    const adjusted = map.unproject(new mapboxgl.Point(padding.left + markerWidth/2 + popupWidth/4, point.y));
    newCenter[0] = adjusted.lng;
    needsAdjustment = true;
  } 
  else if (point.x > mapWidth - padding.right - popupWidth/2) {
    const adjusted = map.unproject(new mapboxgl.Point(mapWidth - padding.right - popupWidth/2, point.y));
    newCenter[0] = adjusted.lng;
    needsAdjustment = true;
  }
  
  // Check vertical edges
  if (point.y < padding.top + markerHeight/2) {
    const adjusted = map.unproject(new mapboxgl.Point(point.x, padding.top + markerHeight/2));
    newCenter[1] = adjusted.lat;
    needsAdjustment = true;
  } 
  else if (point.y > mapHeight - padding.bottom - popupHeight) {
    const adjusted = map.unproject(new mapboxgl.Point(point.x, mapHeight - padding.bottom - popupHeight));
    newCenter[1] = adjusted.lat;
    needsAdjustment = true;
  }
  
  // Apply adjustment if needed
  if (needsAdjustment) {
    map.easeTo({
      center: newCenter,
      duration: 500,
      easing: (t) => t * (2 - t)
    });
  }
}
