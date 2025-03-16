
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '@/components/storage/types';
import { createEmergencyMarkers } from '../emergency/directMarkerCreation';

/**
 * Ensures markers exist for all facilities, even if the regular marker creation failed
 * This is a safety net to make sure users always see markers on the map
 * 
 * @param map - The Mapbox map instance
 * @param facilities - Array of storage facilities to create markers for
 * @returns The number of markers created
 */
export function ensureMarkersExist(
  map: mapboxgl.Map,
  facilities: StorageFacility[]
): number {
  if (!map || !facilities?.length) {
    console.warn('Cannot ensure markers: missing map or facilities');
    return 0;
  }

  // First check if we already have markers for these facilities
  const existingMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  
  // If we have a reasonable number of markers already, don't create emergency ones
  if (existingMarkers.length >= facilities.length * 0.7) {
    console.log(`Found ${existingMarkers.length} existing markers, not creating emergency markers`);
    return existingMarkers.length;
  }
  
  console.log(`Not enough markers found (${existingMarkers.length}/${facilities.length}), creating emergency markers`);
  
  // Create emergency markers directly in the DOM
  return createEmergencyMarkers(map, facilities);
}
