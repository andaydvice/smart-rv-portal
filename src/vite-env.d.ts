
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
  mapFacilities?: any[];
  mapInstance?: mapboxgl.Map;
  isStorageFacilitiesPage?: boolean;
  forceGoogleMarkersVisible?: () => void; // Add this declaration for the Google Maps marker visibility function
}
