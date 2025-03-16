
import mapboxgl from 'mapbox-gl';

/**
 * Adjusts the map view when an icon is clicked near the edge of the map
 * to ensure the icon and its popup remain fully visible
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
  padding: number | { top: number; right: number; bottom: number; left: number } = 60
): void {
  if (!map || !markerElement || !coordinates) {
    console.warn('Missing required parameters for preventMarkerEdgeCutoff');
    return;
  }

  const mapBounds = map.getBounds();
  const mapContainer = map.getContainer();
  const mapWidth = mapContainer.offsetWidth;
  const mapHeight = mapContainer.offsetHeight;
  
  // Convert marker coordinates to pixel position
  const markerPoint = map.project(new mapboxgl.LngLat(coordinates[0], coordinates[1]));
  
  // Get marker dimensions
  const markerWidth = markerElement.offsetWidth;
  const markerHeight = markerElement.offsetHeight;
  
  // Determine standard padding as an object
  const standardPadding = typeof padding === 'number' 
    ? { top: padding, right: padding, bottom: padding, left: padding }
    : padding;
  
  // Initialize new center as current coordinates
  let newCenter = [...coordinates] as [number, number];
  let needsAdjustment = false;
  
  // Check if marker is too close to the left edge
  if (markerPoint.x < standardPadding.left + markerWidth / 2) {
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(standardPadding.left + markerWidth / 2, markerPoint.y)
    );
    newCenter[0] = adjustedPoint.lng;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the right edge
  else if (markerPoint.x > mapWidth - standardPadding.right - markerWidth / 2) {
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(mapWidth - standardPadding.right - markerWidth / 2, markerPoint.y)
    );
    newCenter[0] = adjustedPoint.lng;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the top edge
  if (markerPoint.y < standardPadding.top + markerHeight) {
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(markerPoint.x, standardPadding.top + markerHeight)
    );
    newCenter[1] = adjustedPoint.lat;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the bottom edge
  else if (markerPoint.y > mapHeight - standardPadding.bottom - markerHeight / 2) {
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(markerPoint.x, mapHeight - standardPadding.bottom - markerHeight / 2)
    );
    newCenter[1] = adjustedPoint.lat;
    needsAdjustment = true;
  }
  
  // If adjustments are needed, update the map view
  if (needsAdjustment) {
    map.easeTo({
      center: newCenter,
      duration: 500,
      easing: (t) => t * (2 - t) // Ease out quad
    });
    
    console.log(`Adjusted map view for marker at [${coordinates[0]}, ${coordinates[1]}]`);
  }
}

/**
 * Creates a click handler for markers that prevents edge cutoff
 * 
 * @param map - The mapbox map instance
 * @param coordinates - The [lng, lat] coordinates of the marker
 * @param onClickCallback - Optional callback to run after adjustment
 * @returns A click event handler function
 */
export function createEdgeAwareClickHandler(
  map: mapboxgl.Map,
  coordinates: [number, number],
  onClickCallback?: (e: MouseEvent) => void
): (e: MouseEvent) => void {
  return (e: MouseEvent) => {
    e.stopPropagation();
    
    // Get the marker element
    const markerElement = e.currentTarget as HTMLElement;
    
    // Prevent edge cutoff
    preventMarkerEdgeCutoff(map, markerElement, coordinates, {
      top: 100,   // Extra space for header/controls
      right: 60,  // Space for popup
      bottom: 80, // Space for footer/attribution
      left: 60    // Space for controls
    });
    
    // Call the original click callback if provided
    if (onClickCallback) {
      onClickCallback(e);
    }
  };
}

/**
 * Hook up all markers in the map with edge-aware click handlers
 * 
 * @param map - The mapbox map instance
 */
export function enableEdgeAwareMarkers(map: mapboxgl.Map): void {
  if (!map) return;
  
  // Find all markers
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      // Get facility ID from data attribute
      const facilityId = marker.getAttribute('data-facility-id');
      
      // Skip if already processed or missing ID
      if (!facilityId || marker.hasAttribute('data-edge-aware')) {
        return;
      }
      
      // Find coordinates from marker's transform style
      // Extract translate3d values from style.transform
      const transformMatch = marker.style.transform.match(/translate3d\((.*?)px, (.*?)px, 0px\)/);
      if (transformMatch && transformMatch.length >= 3) {
        const x = parseFloat(transformMatch[1]);
        const y = parseFloat(transformMatch[2]);
        
        // Convert pixel coordinates to geographical coordinates
        const point = new mapboxgl.Point(x, y);
        const lngLat = map.unproject(point);
        
        // Create and apply the edge-aware click handler
        const originalOnClick = marker.onclick;
        
        marker.onclick = (e) => {
          // Apply edge prevention
          preventMarkerEdgeCutoff(
            map, 
            marker, 
            [lngLat.lng, lngLat.lat],
            { top: 100, right: 60, bottom: 80, left: 60 }
          );
          
          // Execute original click handler if it exists
          if (originalOnClick) {
            originalOnClick.call(marker, e);
          }
        };
        
        // Mark as processed
        marker.setAttribute('data-edge-aware', 'true');
      }
    }
  });
  
  console.log('Enabled edge-aware click handling for map markers');
}
