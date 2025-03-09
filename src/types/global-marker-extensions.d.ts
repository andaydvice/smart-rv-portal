
import type { Map as MapboxMap, Marker } from 'mapbox-gl';
import type { StorageFacility } from '../utils/markers';

declare global {
  interface Window {
    // Map-related global properties
    isStorageFacilitiesPage?: boolean;
    mapInstance?: MapboxMap;
    mapFacilities?: StorageFacility[];
    _persistentMarkers?: {
      [key: string]: Marker;
    };
  }
}

export {};
