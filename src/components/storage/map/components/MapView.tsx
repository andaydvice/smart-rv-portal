
import React from 'react';
import { StorageFacility } from '../../types';
import MapDebugOverlay from './MapDebugOverlay';
import MapLoadingState from '../MapLoadingState';

interface MapViewProps {
  mapContainer: React.RefObject<HTMLDivElement>;
  isInitializing: boolean;
  mapError: string | null;
  mapLoaded: boolean;
  facilities: StorageFacility[];
  selectedState: string | null;
}

/**
 * Responsible for rendering the map container and loading states
 */
const MapView: React.FC<MapViewProps> = ({
  mapContainer,
  isInitializing,
  mapError,
  mapLoaded,
  facilities,
  selectedState
}) => {
  return (
    <div className="w-full h-full relative">
      {/* Map container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-visible" 
        style={{ overflow: 'visible', minHeight: '650px' }}
      />
      
      {/* Loading and error states */}
      <MapLoadingState 
        isInitializing={isInitializing} 
        mapError={mapError} 
        mapLoaded={mapLoaded} 
        facilitiesCount={facilities.length}
      />
      
      {/* Debug overlay */}
      <MapDebugOverlay
        facilitiesCount={facilities.length}
        selectedState={selectedState}
      />
    </div>
  );
};

export default MapView;
