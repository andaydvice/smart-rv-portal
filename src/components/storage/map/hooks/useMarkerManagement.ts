
import { useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { 
  useMarkerCreation,
  useMarkerHighlight,
  useMarkerPersistence,
  useMarkerVisibility
} from './marker';

interface UseMarkerManagementProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

export const useMarkerManagement = ({ 
  map, 
  facilities, 
  highlightedFacility, 
  onMarkerClick 
}: UseMarkerManagementProps) => {
  // Use our new refactored hooks
  const { markers, stats, createMarkers } = useMarkerCreation({
    map,
    facilities,
    highlightedFacility,
    onMarkerClick
  });

  // Add marker highlighting
  useMarkerHighlight({
    map,
    facilities,
    highlightedFacility
  });

  // Add marker persistence
  useMarkerPersistence({
    map
  });

  // Get marker visibility utilities
  const { forceMarkerVisibility } = useMarkerVisibility({
    map
  });

  return {
    markers,
    stats,
    createMarkers,
    forceMarkerVisibility
  };
};
