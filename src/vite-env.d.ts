
/// <reference types="vite/client" />

interface Window {
  _persistentMarkers?: Record<string, mapboxgl.Marker>;
  viewFacility?: (id: string) => void;
}
