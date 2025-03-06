
import mapboxgl from 'mapbox-gl';

/**
 * Reliably attach a marker to the map with retry logic
 */
export const attachMarkerToMap = (
  marker: mapboxgl.Marker, 
  map: mapboxgl.Map
): void => {
  if (!map || !map.loaded()) {
    setTimeout(() => {
      if (map && map.loaded()) {
        attachMarkerToMap(marker, map);
      }
    }, 500);
    return;
  }
  
  // Force a second attachment after a small delay to ensure it's added
  marker.addTo(map);
  
  setTimeout(() => {
    if (map && marker) {
      if (!marker.getElement().isConnected) {
        marker.addTo(map);
      }
    }
  }, 100);
  
  // Use requestAnimationFrame for smoother performance
  requestAnimationFrame(() => {
    if (map && map.loaded() && marker) {
      marker.addTo(map);
    }
  });
};
