
import mapboxgl from 'mapbox-gl';

/**
 * Reliably attach a marker to the map with performance optimizations
 */
export const attachMarkerToMap = (
  marker: mapboxgl.Marker, 
  map: mapboxgl.Map
): void => {
  if (!map || !map.loaded()) {
    // Don't try to attach markers to unloaded maps - schedule just once
    setTimeout(() => {
      if (map && map.loaded()) {
        marker.addTo(map);
      }
    }, 500);
    return;
  }
  
  // Attach marker to map only once
  marker.addTo(map);
  
  // Check if marker is actually attached after a short delay
  setTimeout(() => {
    if (map && marker && !marker.getElement().isConnected) {
      marker.addTo(map);
    }
  }, 300);
};
