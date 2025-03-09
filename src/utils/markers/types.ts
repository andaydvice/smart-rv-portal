
// Type augmentation for window to add map properties
declare global {
  interface Window {
    mapboxgl?: any;
    mapInstance?: any;
    isStorageFacilitiesPage?: boolean;
    _persistentMarkers?: Record<string, any>;
  }
}

export {};
