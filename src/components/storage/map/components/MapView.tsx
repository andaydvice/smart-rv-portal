
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
  loadingProgress?: number;
  infiniteLoading?: boolean;
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
  selectedState,
  loadingProgress = 0,
  infiniteLoading = false
}) => {
  return (
    <div className="w-full h-full relative overflow-visible">
      {/* Map container with improved overflow handling */}
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-visible" 
        style={{ 
          overflow: 'visible', 
          minHeight: '400px',
          height: 'min(650px, 70vh)',
          contain: 'layout paint',
          isolation: 'isolate'
        }}
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
