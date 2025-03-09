
import mapboxgl from 'mapbox-gl';
import { createFacilityMarker } from '@/components/storage/map/utils/markerCreation';
import { forceMapMarkersVisible } from './markerForcing';
import type { StorageFacility } from '../types';

// Create a cache for markers to prevent duplicate creation
const markerCache = new Map();

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
  
  // Check if map is ready before creating markers
  if (!map || !map.loaded()) {
    console.log('Map not ready, waiting for map to load before creating markers');
    return 0;
  }
  
  // Track how many markers we create
  let createdCount = 0;
  
  // Try to create markers directly with performance optimizations
  for (let i = 0; i < facilities.length; i++) {
    try {
      const facilityRaw = facilities[i];
      
      // Skip if null or undefined
      if (!facilityRaw) continue;
      
      // Adapt facility to a compatible type
      const facility = adaptFacility(facilityRaw);
      
      // Use the facility ID as a cache key
      const cacheKey = facility.id || `facility-${i}`;
      
      // Check if we already have this marker in cache
      if (markerCache.has(cacheKey)) {
        // Skip if already created
        continue;
      }
      
      // Skip if facility already has a marker
      const existing = document.getElementById(`marker-${facility.id}`);
      if (existing) {
        continue;
      }
      
      // Ensure coordinates are valid
      const lat = Number(facility.latitude);
      const lng = Number(facility.longitude);
      if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
        continue;
      }
      
      // Create marker directly with optimized performance
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
      
      // Add to cache to prevent recreation
      markerCache.set(cacheKey, marker);
      
      // Track in global store for future reference
      if (!(window as any)._persistentMarkers) {
        (window as any)._persistentMarkers = {};
      }
      (window as any)._persistentMarkers[facility.id] = marker;
      
      createdCount++;
      
      // Batch marker creation to improve performance
      if (createdCount % 50 === 0) {
        // Allow other processing to happen
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    } catch (error) {
      console.error('Error in emergency marker creation:', error);
    }
  }
  
  console.log(`Emergency marker creation complete: Created ${createdCount} markers`);
  
  // Force markers to be visible after creation
  forceMapMarkersVisible();
  
  return createdCount;
}
