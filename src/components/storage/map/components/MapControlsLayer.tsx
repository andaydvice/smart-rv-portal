import React from 'react';
import MapControls from '../MapControls';
import ClusterLayer from '../ClusterLayer';
import FacilityMarkers from '../FacilityMarkers';
import { StorageFacility } from '../../types';

interface MapControlsLayerProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

/**
 * Component that manages all map control layers
 */
const MapControlsLayer: React.FC<MapControlsLayerProps> = ({
  map,
  facilities,
  highlightedFacility,
  onMarkerClick
}) => {
  return (
    <>
      <MapControls map={map} />
      <ClusterLayer
        map={map}
        facilities={facilities}
        highlightedFacility={highlightedFacility}
      />
      {/* Keep the original markers but they'll likely be invisible */}
      <FacilityMarkers
        map={map}
        facilities={facilities}
        highlightedFacility={highlightedFacility}
        onMarkerClick={onMarkerClick}
      />
    </>
  );
};

export default MapControlsLayer;
