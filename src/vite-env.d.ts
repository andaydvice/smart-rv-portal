
/// <reference types="vite/client" />

interface Window {
  _persistentMarkers?: Record<string, mapboxgl.Marker>;
  viewFacility?: (id: string) => void;
  highlightedFacilityId?: string | null;
  mapFacilities?: any[];
  mapInstance?: mapboxgl.Map;
  isStorageFacilitiesPage?: boolean;
}
