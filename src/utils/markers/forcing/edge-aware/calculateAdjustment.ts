
import mapboxgl from 'mapbox-gl';
import { EdgePadding, MarkerPosition } from './types';

/**
 * Determines if a marker position needs adjustment to prevent edge cutoff
 * and calculates the new center coordinates if needed
 */
export function calculateEdgeAdjustment(
  map: mapboxgl.Map,
  markerPoint: MarkerPosition,
  markerWidth: number,
  markerHeight: number,
  popupWidth: number,
  popupHeight: number,
  padding: EdgePadding
): { needsAdjustment: boolean; newCenter: [number, number] } {
  // Initialize with current coordinates (from the marker point)
  const currentPoint = map.unproject(new mapboxgl.Point(markerPoint.x, markerPoint.y));
  const newCenter: [number, number] = [currentPoint.lng, currentPoint.lat];
  
  // Get map dimensions
  const mapContainer = map.getContainer();
  const mapWidth = mapContainer.offsetWidth;
  const mapHeight = mapContainer.offsetHeight;
  
  // Track if any adjustment is needed
  let needsAdjustment = false;
  
  // Check if marker is too close to the left edge
  if (markerPoint.x < padding.left + markerWidth / 2) {
    console.log('Marker too close to left edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(padding.left + markerWidth / 2 + popupWidth/4, markerPoint.y)
    );
    newCenter[0] = adjustedPoint.lng;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the right edge
  else if (markerPoint.x > mapWidth - padding.right - popupWidth/2) {
    console.log('Marker too close to right edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(mapWidth - padding.right - popupWidth/2, markerPoint.y)
    );
    newCenter[0] = adjustedPoint.lng;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the top edge
  if (markerPoint.y < padding.top + markerHeight/2) {
    console.log('Marker too close to top edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(markerPoint.x, padding.top + markerHeight/2)
    );
    newCenter[1] = adjustedPoint.lat;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the bottom edge
  else if (markerPoint.y > mapHeight - padding.bottom - popupHeight) {
    console.log('Marker too close to bottom edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(markerPoint.x, mapHeight - padding.bottom - popupHeight)
    );
    newCenter[1] = adjustedPoint.lat;
    needsAdjustment = true;
  }
  
  return { needsAdjustment, newCenter };
}
