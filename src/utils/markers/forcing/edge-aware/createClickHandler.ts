
import mapboxgl from 'mapbox-gl';
import { EdgeAwareClickHandler } from './types';
import { preventMarkerEdgeCutoff } from './preventEdgeCutoff';

/**
 * Creates a click handler for markers that prevents edge cutoff
 * with a minimum padding of 20px from any edge
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
    
    if (import.meta.env.DEV) console.log(`Edge-aware click handler triggered for [${coordinates[0]}, ${coordinates[1]}]`);
    
    // Get the marker element
    const markerElement = e.currentTarget as HTMLElement;
    
    // Prevent edge cutoff with generous padding (minimum 20px on all sides)
    preventMarkerEdgeCutoff(map, markerElement, coordinates, {
      top: Math.max(120, 20),     // Extra space for header/controls
      right: Math.max(100, 20),   // Extra space for popup
      bottom: Math.max(200, 20),  // Extra space for popup
      left: Math.max(100, 20)     // Extra space for popup
    });
    
    // Call the original click callback after a short delay to ensure map has adjusted
    if (onClickCallback) {
      setTimeout(() => {
        if (import.meta.env.DEV) console.log('Executing click callback after map adjustment');
        onClickCallback(e);
      }, 300);
    }
  };
}
