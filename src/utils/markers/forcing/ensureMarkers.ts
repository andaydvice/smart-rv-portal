
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
  
  // IMPROVED: More aggressive marker creation - always recreate all markers to ensure accurate count
  console.log('EMERGENCY: Recreating all markers to ensure accurate count');
  
  // Clear existing markers first
  existingMarkers.forEach(marker => {
    if (marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
  
  // Track how many markers we create
  let createdCount = 0;
  
  // Store created markers in a window variable for debugging
  if (!window._createdMarkers) {
    window._createdMarkers = [];
  } else {
    // Clear existing tracked markers
    window._createdMarkers = [];
  }
  
  // Clear existing persistent markers
  if (window._persistentMarkers) {
    Object.values(window._persistentMarkers).forEach((marker: any) => {
      if (marker && typeof marker.remove === 'function') {
        marker.remove();
      }
    });
    window._persistentMarkers = {};
  } else {
    window._persistentMarkers = {};
  }
  
  // Try to create markers directly
  facilities.forEach((facilityRaw) => {
    try {
      // Adapt facility to a compatible type
      const facility = adaptFacility(facilityRaw);
      
      // Ensure map is ready
      if (!map || !map.loaded()) {
        console.log('Map not ready, cannot create markers');
        return;
      }
      
      // Validate coordinates
      const lat = Number(facility.latitude);
      const lng = Number(facility.longitude);
      if (isNaN(lat) || isNaN(lng)) {
        console.log(`Invalid coordinates for facility ${facility.id}: ${lat}, ${lng}`);
        return;
      }
      
      // Create marker directly
      const marker = createFacilityMarker(
        facility,
        [lng, lat],
        false,
        (id) => {
          console.log(`Marker clicked: ${id}`);
          // Dispatch a custom event for other systems to listen for
          const event = new CustomEvent('marker-click', { detail: { facilityId: id } });
          document.dispatchEvent(event);
        },
        map
      );
      
      // Force add to map
      marker.addTo(map);
      
      // Store the marker in our debug array
      window._createdMarkers?.push({
        id: facility.id,
        marker: marker,
        lat: lat,
        lng: lng
      });
      
      // Force marker visibility through style attributes
      const el = marker.getElement();
      if (el) {
        el.style.visibility = 'visible';
        el.style.display = 'block';
        el.style.opacity = '1';
        el.style.zIndex = '9999';
        el.style.pointerEvents = 'auto';
        el.setAttribute('data-emergency-created', 'true');
        el.setAttribute('title', facility.name); // Add title for debugging
      }
      
      // Track in global store for future reference
      window._persistentMarkers[facility.id] = marker;
      
      createdCount++;
    } catch (error) {
      console.error('Error in marker creation:', error);
    }
  });
  
  console.log(`Marker creation complete: Created ${createdCount} markers for ${facilities.length} facilities`);
  
  // Force marker visibility after creation
  setTimeout(() => forceMapMarkersVisible(), 100);
  setTimeout(() => forceMapMarkersVisible(), 500);
  
  // Return the count of actually created markers
  return createdCount;
}
