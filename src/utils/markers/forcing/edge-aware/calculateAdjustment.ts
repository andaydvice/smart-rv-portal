
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
  
  // Ensure minimum padding of 20px from all edges
  const minPadding = 20;
  const effectivePadding = {
    top: Math.max(padding.top, minPadding),
    right: Math.max(padding.right, minPadding),
    bottom: Math.max(padding.bottom, minPadding),
    left: Math.max(padding.left, minPadding)
  };
  
  // Track if any adjustment is needed
  let needsAdjustment = false;
  
  // Check if marker is too close to the left edge
  if (markerPoint.x < effectivePadding.left + markerWidth / 2) {
    console.log('Marker too close to left edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(effectivePadding.left + markerWidth / 2 + popupWidth/4, markerPoint.y)
    );
    newCenter[0] = adjustedPoint.lng;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the right edge
  else if (markerPoint.x > mapWidth - effectivePadding.right - popupWidth/2) {
    console.log('Marker too close to right edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(mapWidth - effectivePadding.right - popupWidth/2, markerPoint.y)
    );
    newCenter[0] = adjustedPoint.lng;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the top edge
  if (markerPoint.y < effectivePadding.top + markerHeight/2) {
    console.log('Marker too close to top edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(markerPoint.x, effectivePadding.top + markerHeight/2)
    );
    newCenter[1] = adjustedPoint.lat;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the bottom edge
  else if (markerPoint.y > mapHeight - effectivePadding.bottom - popupHeight) {
    console.log('Marker too close to bottom edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(markerPoint.x, mapHeight - effectivePadding.bottom - popupHeight)
    );
    newCenter[1] = adjustedPoint.lat;
    needsAdjustment = true;
  }
  
  return { needsAdjustment, newCenter };
}
