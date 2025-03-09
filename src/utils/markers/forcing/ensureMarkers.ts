
import mapboxgl from 'mapbox-gl';
import { createFacilityMarker } from '@/components/storage/map/utils/markerCreation';
import { forceMapMarkersVisible } from './markerForcing';
import type { StorageFacility } from '../types';

// Helper to adapt any facility-like object to a compatible type
const adaptFacility = (facility: any): any => {
  // This is just to satisfy TypeScript - at runtime, the object is used as-is
  return facility;
};

/**
 * Emergency function to ensure markers are present on the map
 * This is a last resort when all else fails
 */
export function ensureMarkersOnMap(map: mapboxgl.Map, facilities: StorageFacility[] | any[]) {
  // First check if we already have markers
  const existingMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  console.log(`Emergency marker check: Found ${existingMarkers.length} markers, should have ${facilities.length}`);
  
  // If we have a reasonable number of markers, just make them visible
  if (existingMarkers.length > facilities.length * 0.8) {
    console.log('Sufficient markers found, forcing visibility');
    forceMapMarkersVisible();
    return existingMarkers.length;
  }
  
  console.log('EMERGENCY: Not enough markers found, creating them directly');
  
  // Track how many markers we create
  let createdCount = 0;
  
  // Try to create markers directly
  facilities.forEach((facilityRaw, index) => {
    try {
      // Adapt facility to a compatible type
      const facility = adaptFacility(facilityRaw);
      
      // Skip if facility already has a marker
      const existing = document.getElementById(`marker-${facility.id}`);
      if (existing) {
        return;
      }
      
      // Ensure map is ready
      if (!map || !map.loaded()) {
        return;
      }
      
      // Ensure coordinates are valid
      const lat = Number(facility.latitude);
      const lng = Number(facility.longitude);
      if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
        return;
      }
      
      // Create marker directly
      const marker = createFacilityMarker(
        facility,
        [lng, lat],
        false,
        (id) => {
          console.log(`Emergency marker clicked: ${id}`);
          // Dispatch a custom event for other systems to listen for
          const event = new CustomEvent('marker-emergency-click', { detail: { facilityId: id } });
          document.dispatchEvent(event);
        },
        map
      );
      
      // Force add to map
      marker.addTo(map);
      
      // Track in global store for future reference
      if (!(window as any)._persistentMarkers) {
        (window as any)._persistentMarkers = {};
      }
      (window as any)._persistentMarkers[facility.id] = marker;
      
      createdCount++;
    } catch (error) {
      console.error('Error in emergency marker creation:', error);
    }
  });
  
  console.log(`Emergency marker creation complete: Created ${createdCount} markers`);
  return createdCount;
}
