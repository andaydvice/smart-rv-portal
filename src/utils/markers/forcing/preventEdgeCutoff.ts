
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

  console.log(`Checking if marker at [${coordinates[0]}, ${coordinates[1]}] is near edge`);

  const mapBounds = map.getBounds();
  const mapContainer = map.getContainer();
  const mapWidth = mapContainer.offsetWidth;
  const mapHeight = mapContainer.offsetHeight;
  
  // Convert marker coordinates to pixel position
  const markerPoint = map.project(new mapboxgl.LngLat(coordinates[0], coordinates[1]));
  
  // Get marker dimensions
  const markerWidth = markerElement.offsetWidth || 24;
  const markerHeight = markerElement.offsetHeight || 24;
  
  // Account for popup height (estimated)
  const popupHeight = 150;
  const popupWidth = 300;
  
  // Determine standard padding as an object
  const standardPadding = typeof padding === 'number' 
    ? { top: padding, right: padding, bottom: padding, left: padding }
    : padding;
  
  // Initialize new center as current coordinates
  let newCenter = [...coordinates] as [number, number];
  let needsAdjustment = false;
  
  // Check if marker is too close to the left edge
  if (markerPoint.x < standardPadding.left + markerWidth / 2) {
    console.log('Marker too close to left edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(standardPadding.left + markerWidth / 2 + popupWidth/4, markerPoint.y)
    );
    newCenter[0] = adjustedPoint.lng;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the right edge
  else if (markerPoint.x > mapWidth - standardPadding.right - popupWidth/2) {
    console.log('Marker too close to right edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(mapWidth - standardPadding.right - popupWidth/2, markerPoint.y)
    );
    newCenter[0] = adjustedPoint.lng;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the top edge
  if (markerPoint.y < standardPadding.top + markerHeight/2) {
    console.log('Marker too close to top edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(markerPoint.x, standardPadding.top + markerHeight/2)
    );
    newCenter[1] = adjustedPoint.lat;
    needsAdjustment = true;
  }
  
  // Check if marker is too close to the bottom edge
  else if (markerPoint.y > mapHeight - standardPadding.bottom - popupHeight) {
    console.log('Marker too close to bottom edge, adjusting');
    const adjustedPoint = map.unproject(
      new mapboxgl.Point(markerPoint.x, mapHeight - standardPadding.bottom - popupHeight)
    );
    newCenter[1] = adjustedPoint.lat;
    needsAdjustment = true;
  }
  
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
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    console.log(`Edge-aware click handler triggered for [${coordinates[0]}, ${coordinates[1]}]`);
    
    // Get the marker element
    const markerElement = e.currentTarget as HTMLElement;
    
    // Prevent edge cutoff with generous padding
    preventMarkerEdgeCutoff(map, markerElement, coordinates, {
      top: 120,    // Extra space for header/controls
      right: 100,  // Extra space for popup
      bottom: 200, // Extra space for popup
      left: 100    // Extra space for popup
    });
    
    // Call the original click callback after a short delay to ensure map has adjusted
    if (onClickCallback) {
      setTimeout(() => {
        console.log('Executing click callback after map adjustment');
        onClickCallback(e);
      }, 300);
    }
  };
}

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
          if (popup) {
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
      
      count++;
    }
  });
  
  console.log(`Found ${count} markers to make visible`);
}
