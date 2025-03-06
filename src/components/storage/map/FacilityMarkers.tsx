
import React, { useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { usePopupClickHandler } from './hooks/usePopupClickHandler';
import MarkerStats from './components/MarkerStats';
import { useMarkerManagement } from './hooks/useMarkerManagement';
import MarkerVisibilityEnhancer from './components/MarkerVisibilityEnhancer';
import MarkerErrorDisplay from './components/MarkerErrorDisplay';

interface FacilityMarkersProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

const FacilityMarkers: React.FC<FacilityMarkersProps> = ({
  map,
  facilities,
  highlightedFacility,
  onMarkerClick
}) => {
  // Use popup click handler
  usePopupClickHandler();
  
  // Use marker management hook
  const { 
    stats, 
    createMarkers, 
    forceMarkerVisibility,
    errors,
    markErrorAsRecovered
  } = useMarkerManagement({
    map,
    facilities,
    highlightedFacility,
    onMarkerClick
  });
  
  // Memoize the visibility enhancer function to prevent unnecessary re-renders
  const enhanceVisibility = useCallback(forceMarkerVisibility, [forceMarkerVisibility]);

  // Effect to create markers when facilities or map changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (map && facilities.length > 0) {
        createMarkers();
      }
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [map, facilities, createMarkers]);

  return (
    <>
      <MarkerStats stats={stats} />
      <MarkerVisibilityEnhancer enhanceVisibility={enhanceVisibility} />
      
      {/* Show errors in dev mode or if there are more than 5 errors */}
      {(process.env.NODE_ENV === 'development' || (errors && errors.length > 5)) && (
        <div className="absolute top-20 right-4 z-50 w-80">
          <MarkerErrorDisplay 
            errors={errors || []} 
            onDismiss={markErrorAsRecovered}
            className="max-h-48 overflow-y-auto"
          />
        </div>
      )}
    </>
  );
};

export default FacilityMarkers;
