
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { useFacilityHighlight } from '../hooks/useFacilityHighlight';
import { useMapSetup } from '../hooks/useMapSetup';

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
  // Ensure facilities is always an array even if undefined
  const validFacilities = facilities || [];
  
  // Use hooks for marker creation and facility highlighting - always call hooks
  const { markersCreated } = useMapMarkers(map, mapLoaded, validFacilities, selectedState, onMarkersCreated);
  
  // Setup map with facilities data
  useMapSetup(map, mapLoaded, validFacilities, selectedState);
  
  // Handle facility highlighting
  useFacilityHighlight(map, mapLoaded, validFacilities, highlightedFacility);
  
  // Log status for debugging
  useEffect(() => {
    console.log(`MapInteractions: Markers created: ${markersCreated}`);
  }, [markersCreated]);

  // This component doesn't render any UI
  return null;
};

export default MapInteractions;
