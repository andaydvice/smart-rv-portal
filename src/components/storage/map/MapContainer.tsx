
import React, { useMemo } from 'react';
import { useMap } from './MapContext';
import MapLoadingState from './MapLoadingState';
import { StorageFacility } from '../types';
import { useMapSetup } from './hooks/useMapSetup';
import { useMarkerManagement } from './hooks/useMarkerManagement';
import { useFacilityHighlight } from './hooks/useFacilityHighlight';
import MapControlsLayer from './components/MapControlsLayer';
import { validateFacilities } from './utils/validateFacilities';

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
  const { mapContainer, isInitializing, mapError, mapLoaded, map } = useMap();
  
  // Validate facilities data
  const validFacilities = useMemo(() => {
    return validateFacilities(facilities);
  }, [facilities]);

  // Set up map and make it globally available
  useMapSetup(map, mapLoaded, validFacilities, selectedState);
  
  // Handle marker creation and management
  useMarkerManagement(map, mapLoaded, validFacilities, onMarkerClick);
  
  // Handle facility highlighting
  useFacilityHighlight(map, mapLoaded, validFacilities, highlightedFacility);

  return (
    <div className="relative w-full h-full">
      <MapLoadingState 
        isInitializing={isInitializing}
        mapError={mapError}
        mapLoaded={mapLoaded}
        facilitiesCount={facilities.length}
      />
      
      <div 
        ref={mapContainer} 
        className="w-full h-full" 
        style={{ 
          minHeight: '600px',
          opacity: mapLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          visibility: 'visible'
        }}
      />
      
      {map && mapLoaded && (
        <MapControlsLayer
          map={map}
          facilities={facilities}
          highlightedFacility={highlightedFacility}
          onMarkerClick={onMarkerClick}
        />
      )}
    </div>
  );
};

export default React.memo(MapContainer);
