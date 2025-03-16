
import React, { useEffect, useState } from 'react';
import { useMap } from './MapContext';
import { StorageFacility } from '../types';
import MapView from './components/MapView';
import MapInteractions from './components/MapInteractions';

interface MapContainerProps {
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
}

const MapContainer: React.FC<MapContainerProps> = ({
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState
}) => {
  const { mapContainer, mapLoaded, isInitializing, mapError, map } = useMap();
  const [markersCreated, setMarkersCreated] = useState<boolean>(false);
  
  // Log props for debugging
  useEffect(() => {
    console.log(`MapContainer received ${facilities?.length || 0} facilities`);
    console.log(`Selected state: ${selectedState || 'none'}`);
    console.log(`Map loaded: ${mapLoaded}, Map initialized: ${!isInitializing}`);
  }, [facilities, selectedState, mapLoaded, isInitializing]);

  // Handler for marker creation status
  const handleMarkersCreated = (created: boolean) => {
    setMarkersCreated(created);
    console.log(`Markers created status: ${created}`);
  };

  return (
    <>
      <MapView
        mapContainer={mapContainer}
        isInitializing={isInitializing}
        mapError={mapError}
        mapLoaded={mapLoaded}
        facilities={facilities || []}
        selectedState={selectedState}
      />
      
      {map && mapLoaded && (
        <MapInteractions
          map={map}
          mapLoaded={mapLoaded}
          facilities={facilities || []}
          highlightedFacility={highlightedFacility}
          selectedState={selectedState}
          onMarkersCreated={handleMarkersCreated}
        />
      )}
    </>
  );
};

export default MapContainer;
