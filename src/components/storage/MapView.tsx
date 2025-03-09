
import React from 'react';
import { StorageFacility } from './types';
import { MapProvider } from './map/MapContext';
import MapContainer from './map/MapContainer';

interface MapViewProps {
  mapToken: string;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
}

const MapView = ({
  mapToken,
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState
}: MapViewProps) => {
  // Debug output - log facilities count whenever it changes
  React.useEffect(() => {
    console.log(`MapView received ${facilities.length} facilities to display`);
    if (facilities.length > 0) {
      console.log('Sample facilities:', facilities.slice(0, 3));
    }
  }, [facilities]);

  return (
    <MapProvider mapToken={mapToken}>
      <MapContainer
        facilities={facilities}
        highlightedFacility={highlightedFacility}
        onMarkerClick={onMarkerClick}
        selectedState={selectedState}
      />
    </MapProvider>
  );
};

export default MapView;
