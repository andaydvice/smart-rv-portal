
import mapboxgl from 'mapbox-gl';
import { updateMarkerPositions } from './updateMarkerPositions';
import { createMarkerElement } from './elements/markerElement';
import { getOrCreateContainer } from './elements/container';

/**
 * EMERGENCY SOLUTION: Create markers directly in the DOM without using mapbox API
 * This bypasses all the standard marker creation mechanisms that might be failing
 */
export function createEmergencyMarkers(map: mapboxgl.Map, facilities: any[]): number {
  console.log(`EMERGENCY: Creating ${facilities.length} markers directly in DOM`);
  
  // Track created markers
  let created = 0;
  
  // Get or create the markers container
  const container = getOrCreateContainer(map);
  
  // Clear existing emergency markers
  const existing = document.querySelectorAll('.emergency-marker');
  existing.forEach(marker => {
    if (marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
  
  // Create direct markers for each facility
  facilities.forEach((facility) => {
    try {
      // Skip invalid coordinates
      const lat = Number(facility.latitude);
      const lng = Number(facility.longitude);
      if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
        return;
      }
      
      // Convert geo coordinates to pixel coordinates
      const point = map.project([lng, lat]);
      
      // Create marker element
      const markerEl = createMarkerElement(facility, point);
      
      // Add to container
      container.appendChild(markerEl);
      
      created++;
    } catch (err) {
      console.error('Error creating emergency marker:', err);
    }
  });
  
  // Set up event listeners to update marker positions when the map moves
  map.on('move', () => updateMarkerPositions(map));
  map.on('zoom', () => updateMarkerPositions(map));
  
  console.log(`EMERGENCY: Successfully created ${created} direct DOM markers`);
  return created;
}
