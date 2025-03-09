
// Type augmentation for window to add map properties
import type { Map as MapboxMap, Marker } from 'mapbox-gl';

declare global {
  interface Window {
    isStorageFacilitiesPage?: boolean;
  }
}

export {};
