
import mapboxgl from 'mapbox-gl';

/**
 * Fits map view to bounds of all facility coordinates
 * @param map - The Mapbox GL map instance
 * @param facilities - Array of facilities with longitude and latitude
 * @param padding - Padding around the bounds in pixels (default: 50)
 * @param maxZoom - Maximum zoom level (default: 10)
 */
export const fitMapToBounds = (
  map: mapboxgl.Map, 
  facilities: Array<{ longitude: number | string; latitude: number | string }>,
  padding: number = 50,
  maxZoom: number = 10
): void => {
  try {
    if (!facilities || facilities.length === 0) {
      console.warn('No facilities provided to fit bounds');
      return;
    }
    
    // Calculate bounds of all facilities
    const bounds = new mapboxgl.LngLatBounds();
    let validCoordinatesCount = 0;
    
    facilities.forEach(facility => {
      try {
        const lng = typeof facility.longitude === 'string' ? 
          parseFloat(facility.longitude) : Number(facility.longitude);
        const lat = typeof facility.latitude === 'string' ? 
          parseFloat(facility.latitude) : Number(facility.latitude);
          
        if (!isNaN(lng) && !isNaN(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
          bounds.extend([lng, lat]);
          validCoordinatesCount++;
        }
      } catch (e) {
        console.warn('Invalid facility coordinates:', facility);
      }
    });
    
    console.log(`Fitting map to bounds with ${validCoordinatesCount} valid coordinates`);
    
    // Fit map to these bounds if we have valid coordinates
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding,
        maxZoom
      });
    } else {
      console.warn('No valid coordinates to fit bounds');
      // Default to US view if no valid coordinates
      map.flyTo({
        center: [-98.5795, 39.8283],
        zoom: 3
      });
    }
  } catch (error) {
    console.error('Error setting map bounds:', error);
  }
};
