
/// <reference types="vite/client" />

interface Window {
  _persistentMarkers?: Record<string, mapboxgl.Marker>;
  _createdMarkers?: Array<{
    id: string;
    marker: mapboxgl.Marker;
    lat: number;
    lng: number;
  }>;
  viewFacility?: (id: string) => void;
  highlightedFacilityId?: string | null;
  mapFacilities?: Record<string, any>[];
  mapInstance?: mapboxgl.Map;
  isStorageFacilitiesPage?: boolean;
}
