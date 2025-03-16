
import mapboxgl from 'mapbox-gl';
import { EdgePadding } from './types';
import { calculateEdgeAdjustment } from './calculateAdjustment';

/**
 * Adjusts the map view when an icon is clicked near the edge of the map
 * to ensure the icon and its popup remain fully visible with at least 20px padding
 * 
 * @param map - The mapbox map instance
 * @param markerElement - The HTML element of the clicked marker
 * @param coordinates - The [lng, lat] coordinates of the marker
 * @param padding - Optional padding to apply (default: 60px on all sides)
 */
export function preventMarkerEdgeCutoff(
  map: mapboxgl.Map,
  markerElement: HTMLElement,
  coordinates: [number, number],
  padding: number | EdgePadding = 60
): void {
  if (!map || !markerElement || !coordinates) {
    console.warn('Missing required parameters for preventMarkerEdgeCutoff');
    return;
  }

  console.log(`Checking if marker at [${coordinates[0]}, ${coordinates[1]}] is near edge`);
  
  // Determine standard padding as an object, ensuring minimum 20px padding
  const minPadding = 20;
  let standardPadding: EdgePadding;
  
  if (typeof padding === 'number') {
    const paddingValue = Math.max(padding, minPadding);
    standardPadding = { 
      top: paddingValue, 
      right: paddingValue, 
      bottom: paddingValue, 
      left: paddingValue 
    };
  } else {
    standardPadding = {
      top: Math.max(padding.top, minPadding),
      right: Math.max(padding.right, minPadding),
      bottom: Math.max(padding.bottom, minPadding),
      left: Math.max(padding.left, minPadding)
    };
  }
  
  // Convert marker coordinates to pixel position
  const markerPoint = map.project(new mapboxgl.LngLat(coordinates[0], coordinates[1]));
  
  // Get marker dimensions
  const markerWidth = markerElement.offsetWidth || 24;
  const markerHeight = markerElement.offsetHeight || 24;
  
  // Account for popup height (estimated)
  const popupHeight = 150;
  const popupWidth = 300;
  
  // Calculate if adjustment is needed
  const { needsAdjustment, newCenter } = calculateEdgeAdjustment(
    map,
    { x: markerPoint.x, y: markerPoint.y },
    markerWidth,
    markerHeight,
    popupWidth,
    popupHeight,
    standardPadding
  );
  
  // If adjustments are needed, update the map view
  if (needsAdjustment) {
    console.log(`Adjusting map view to new center: [${newCenter[0]}, ${newCenter[1]}]`);
    
    map.easeTo({
      center: newCenter,
      duration: 500,
      easing: (t) => t * (2 - t) // Ease out quad
    });
  } else {
    console.log('No adjustment needed, marker is not near edge');
  }
}
