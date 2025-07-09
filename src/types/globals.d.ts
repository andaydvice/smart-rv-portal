
import mapboxgl from 'mapbox-gl';

declare global {
  interface Window {
    _persistentMarkers?: Record<string, mapboxgl.Marker>;
    mapInstance?: mapboxgl.Map;
    mapboxgl?: typeof mapboxgl;
    isStorageFacilitiesPage?: boolean;
  }
}

// This needs to be a module
export {};
