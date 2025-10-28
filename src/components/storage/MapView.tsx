
import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'; // Lazy load Mapbox CSS only when map is used
import { MapProvider } from './map/MapContext';
import MapContainer from './map/MapContainer';
import { StorageFacility } from './types';

interface MapViewProps {
  mapToken: string;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
}

const MapView: React.FC<MapViewProps> = ({
  mapToken,
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState
}) => {
  // Simple logging to confirm props being passed
  console.log(`MapView rendering with ${facilities.length} facilities, selected state: ${selectedState}`);
  
  return (
    <div className="w-full h-full">
      <MapProvider 
        facilities={facilities} 
        mapToken={mapToken}
      >
        <MapContainer
          facilities={facilities}
          highlightedFacility={highlightedFacility}
          onMarkerClick={onMarkerClick}
          selectedState={selectedState}
          mapToken={mapToken}
        />
      </MapProvider>
    </div>
  );
};

export default MapView;
