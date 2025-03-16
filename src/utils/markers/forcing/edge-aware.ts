
import mapboxgl from 'mapbox-gl';
import { preventMarkerEdgeCutoff } from './edge-aware/preventEdgeCutoff';
import { createEdgeAwareClickHandler } from './edge-aware/createClickHandler';
import { enableEdgeAwareMarkers } from './edge-aware/enableEdgeAwareMarkers';
import type { EdgePadding } from './edge-aware/types';

// Re-export all utilities
export { preventMarkerEdgeCutoff, createEdgeAwareClickHandler, enableEdgeAwareMarkers };
export type { EdgePadding };

/**
 * Enables edge-aware behavior for all markers on a map
 * 
 * @deprecated Use `enableEdgeAwareMarkers` from './edge-aware/enableEdgeAwareMarkers' instead
 */
export function enableEdgeAwareMarkers_old(map: mapboxgl.Map): void {
  if (!map) {
    console.warn('Cannot enable edge-aware markers: map is null');
    return;
  }
  
  // Find all markers
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker');
  console.log(`Found ${markers.length} markers to make edge-aware`);
  
  // Force markers to be visible first
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.visibility = 'visible';
      marker.style.display = 'block';
      marker.style.opacity = '1';
    }
  });
  
  // Add click event listener to map container to handle marker clicks
  map.getContainer().addEventListener('click', (e) => {
    const marker = (e.target as HTMLElement)?.closest('.mapboxgl-marker, .custom-marker, .direct-marker');
    if (marker instanceof HTMLElement) {
      const facilityId = marker.getAttribute('data-facility-id');
      const lat = parseFloat(marker.getAttribute('data-lat') || '0');
      const lng = parseFloat(marker.getAttribute('data-lng') || '0');
      
      if (facilityId && !isNaN(lat) && !isNaN(lng)) {
        // Prevent popup from being cut off at map edge
        preventMarkerEdgeCutoff(map, marker, [lng, lat], {
          top: 100,
          right: 150,
          bottom: 150,
          left: 150
        });
      }
    }
  });
}

/**
 * Creates an edge-aware click handler for a marker at specific coordinates
 * 
 * @deprecated Use `createEdgeAwareClickHandler` from './edge-aware/createClickHandler' instead
 */
export function createEdgeAwareClickHandler_old(
  map: mapboxgl.Map,
  coordinates: [number, number],
  callback: (e: MouseEvent) => void
): (e: MouseEvent) => void {
  return (e: MouseEvent) => {
    e.stopPropagation();
    
    // Get marker element
    const marker = (e.target as HTMLElement)?.closest('.mapboxgl-marker, .custom-marker, .direct-marker');
    
    if (!(marker instanceof HTMLElement)) {
      console.warn('Marker element not found');
      callback(e); // Still call the callback
      return;
    }
    
    console.log(`Marker ${marker.getAttribute('data-facility-id')} clicked, applying edge-aware handling`);
    
    // Prevent marker from being cut off at map edge with increased padding
    preventMarkerEdgeCutoff(map, marker, coordinates, {
      top: 150,
      right: 300,
      bottom: 180,
      left: 300
    });
    
    // Call the original callback after a slight delay to allow map positioning to complete
    setTimeout(() => {
      callback(e);
    }, 200);
  };
}
