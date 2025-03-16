
import React, { memo } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { usePopupClickHandler } from './hooks/usePopupClickHandler';
import { useMarkerManagement } from './hooks/useMarkerManagement';
import MarkerDebugInfo from './components/MarkerDebugInfo';
import PopupEventHandler from './components/PopupEventHandler';
import MarkerCreator from './components/MarkerCreator';
import VisibilityEnhancer from './components/VisibilityEnhancer';

interface FacilityMarkersProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

// Use React.memo to prevent unnecessary re-renders
const FacilityMarkers: React.FC<FacilityMarkersProps> = memo(({
  map,
  facilities,
  highlightedFacility,
  onMarkerClick
}) => {
  // Use popup click handler
  usePopupClickHandler();
  
  // Use marker management hook with all required parameters
  const { 
    stats, 
    createMarkers, 
    forceMarkerVisibility,
    errors,
    markErrorAsRecovered
  } = useMarkerManagement(map, true, facilities, onMarkerClick);

  return (
    <>
      {/* Component for handling marker creation */}
      <MarkerCreator 
        map={map}
        facilities={facilities}
        highlightedFacility={highlightedFacility}
        onMarkerClick={onMarkerClick}
        createMarkers={createMarkers}
      />
      
      {/* Component for enhancing visibility */}
      <VisibilityEnhancer enhanceVisibility={forceMarkerVisibility} />
      
      {/* Component for handling popup interactions */}
      <PopupEventHandler map={map} onMarkerClick={onMarkerClick} />
      
      {/* Component for displaying debug information */}
      <MarkerDebugInfo 
        facilities={facilities}
        stats={stats}
        errors={errors}
        markErrorAsRecovered={markErrorAsRecovered}
      />
    </>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return (
    prevProps.map === nextProps.map &&
    prevProps.highlightedFacility === nextProps.highlightedFacility &&
    prevProps.facilities.length === nextProps.facilities.length
  );
});

export default FacilityMarkers;
