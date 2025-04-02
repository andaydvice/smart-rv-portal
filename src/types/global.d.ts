
import { StorageFacility } from '@/components/storage/types';
import mapboxgl from 'mapbox-gl';

declare global {
  interface Window {
    _persistentMarkers?: Record<string, mapboxgl.Marker>;
    isStorageFacilitiesPage?: boolean;
    mapInstance?: mapboxgl.Map;
    mapFacilities?: StorageFacility[];
  }
}

export {};
