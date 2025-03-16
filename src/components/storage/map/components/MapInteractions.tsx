
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { useFacilityHighlight } from '../hooks/useFacilityHighlight';

interface MapInteractionsProps {
  map: mapboxgl.Map | null;
  mapLoaded: boolean;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  selectedState: string | null;
  onMarkersCreated: (created: boolean) => void;
}

/**
 * Handles map interactions, marker creation, and focus changes
 */
const MapInteractions: React.FC<MapInteractionsProps> = ({
  map,
  mapLoaded,
  facilities,
  highlightedFacility,
  selectedState,
  onMarkersCreated
}) => {
  // Use hooks for marker creation and facility highlighting
  useMapMarkers(map, mapLoaded, facilities, selectedState, onMarkersCreated);
  useFacilityHighlight(map, mapLoaded, facilities, highlightedFacility);

  // This component doesn't render any UI
  return null;
};

export default MapInteractions;
