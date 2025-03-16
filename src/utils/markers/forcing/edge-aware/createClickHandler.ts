
import mapboxgl from 'mapbox-gl';
import { EdgeAwareClickHandler } from './types';
import { preventMarkerEdgeCutoff } from './preventEdgeCutoff';

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
): EdgeAwareClickHandler {
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
