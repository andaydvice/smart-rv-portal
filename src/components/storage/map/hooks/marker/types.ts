
import { RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';

export interface MarkerStatistics {
  markersCreated: number;
  skippedFacilities: number;
  processedNYFacilities: number;
  totalFacilities: number;
  totalNYFacilities: number;
}

export interface UseMarkerCreationProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

export interface UseMarkerVisibilityProps {
  map: mapboxgl.Map | null;
}

export interface UseMarkerHighlightProps {
  map: mapboxgl.Map | null;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
}

export interface UseMarkerPersistenceProps {
  map: mapboxgl.Map | null;
}

export interface PersistentMarkers {
  [facilityId: string]: mapboxgl.Marker;
}

// Extend Window interface to include our custom property
declare global {
  interface Window {
    _persistentMarkers?: PersistentMarkers;
  }
}
