
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
  
  // IMPROVED: More aggressive marker creation - create markers even if some exist
  // Only skip if we have almost the exact number of markers we need
  if (existingMarkers.length > facilities.length * 0.95) {
    console.log('Almost all markers found, forcing visibility');
    forceMapMarkersVisible();
    return existingMarkers.length;
  }
  
  console.log('EMERGENCY: Not enough markers found, creating them directly');
  
  // Track how many markers we create
  let createdCount = 0;
  
  // IMPROVED: Clear existing markers if we're recreating them
  if (existingMarkers.length > 0 && existingMarkers.length < facilities.length * 0.5) {
    console.log('Clearing existing incomplete markers before recreation');
    existingMarkers.forEach(marker => {
      if (marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    });
  }
  
  // Store created markers in a window variable for debugging
  if (!window._createdMarkers) {
    window._createdMarkers = [];
  }
  
  // Try to create markers directly
  facilities.forEach((facilityRaw, index) => {
    try {
      // Adapt facility to a compatible type
      const facility = adaptFacility(facilityRaw);
      
      // IMPROVED: Only skip if marker definitely exists
      const existing = document.getElementById(`marker-${facility.id}`);
      if (existing && existing.isConnected) {
        console.log(`Marker already exists for facility ${facility.id}`);
        return;
      }
      
      // Ensure map is ready
      if (!map || !map.loaded()) {
        console.log('Map not ready, cannot create markers');
        return;
      }
      
      // IMPROVED: More lenient coordinate validation
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
          console.log(`Emergency marker clicked: ${id}`);
          // Dispatch a custom event for other systems to listen for
          const event = new CustomEvent('marker-emergency-click', { detail: { facilityId: id } });
          document.dispatchEvent(event);
        },
        map
      );
      
      // Force add to map
      marker.addTo(map);
      
      // Store the marker in our debug array
      window._createdMarkers.push({
        id: facility.id,
        marker: marker,
        lat: lat,
        lng: lng
      });
      
      // IMPROVED: Force marker visibility through style attributes
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
      if (!window._persistentMarkers) {
        window._persistentMarkers = {};
      }
      window._persistentMarkers[facility.id] = marker;
      
      createdCount++;
    } catch (error) {
      console.error('Error in emergency marker creation:', error);
    }
  });
  
  console.log(`Emergency marker creation complete: Created ${createdCount} markers`);
  
  // IMPROVED: Trigger additional marker visibility enforcement
  setTimeout(() => forceMapMarkersVisible(), 100);
  setTimeout(() => forceMapMarkersVisible(), 500);
  
  // Return the count of actually created markers
  return createdCount;
}
