
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { calculateMapBounds } from '../utils/mapBounds';
import { ensureMarkersExist } from '@/utils/markers';

/**
 * Sets up the map with facilities data
 */
export const useMapSetup = (
  map: mapboxgl.Map | null,
  mapLoaded: boolean,
  facilities: StorageFacility[],
  selectedState: string | null
) => {
  // When facilities change, update the map
  useEffect(() => {
    if (!map || !mapLoaded || facilities.length === 0) return;

    try {
      // Store facilities in window for emergency access
      if (typeof window !== 'undefined') {
        window.mapFacilities = facilities;
        window.mapInstance = map;
      }

      // Get bounds for all visible facilities
      const bounds = calculateMapBounds(facilities, selectedState);
      
      // If we have valid bounds, fit the map to those bounds
      if (bounds && 
          bounds.north !== bounds.south && 
          bounds.east !== bounds.west) {
        map.fitBounds(
          [
            [bounds.west, bounds.south],
            [bounds.east, bounds.north]
          ],
          {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            duration: 1000
          }
        );
      } else {
        // Fallback to USA-wide view
        map.flyTo({
          center: [-95.7129, 37.0902],
          zoom: 3.5,
          essential: true
        });
      }
      
      // Log information
      console.log(`Map setup with ${facilities.length} facilities`);
      console.log('Map bounds:', bounds);
      
      // Dispatch an event that map is ready with facilities
      const event = new CustomEvent('map.ready', { 
        detail: { map, facilities } 
      });
      document.dispatchEvent(event);
      
      // Add the facilities data as an attribute to the map
      map.getContainer().setAttribute('data-facilities-count', facilities.length.toString());
      
      // For California, New York, and Georgia, ensure markers exist
      if (selectedState === 'California' || selectedState === 'New York' || selectedState === 'Georgia') {
        console.log(`Ensuring markers exist for ${selectedState}`);
        // Fix: Pass both map and facilities to ensureMarkersExist
        ensureMarkersExist(map, facilities);
      }
    } catch (err) {
      console.error('Error setting up map:', err);
    }
  }, [map, mapLoaded, facilities, selectedState]);
};
