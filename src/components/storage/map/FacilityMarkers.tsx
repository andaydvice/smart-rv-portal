
import React, { useEffect, useCallback, memo } from 'react';
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

// Use React.memo to prevent unnecessary re-renders
const FacilityMarkers: React.FC<FacilityMarkersProps> = memo(({
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
    // Create markers only when we have both map and facilities
    if (!map || !facilities.length) return;
    
    // Use a longer delay for initial marker creation to ensure the map is ready
    const timer = setTimeout(() => {
      createMarkers();
    }, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, [map, facilities, createMarkers]);

  return (
    <>
      {/* Only show stats in development mode */}
      {process.env.NODE_ENV === 'development' && <MarkerStats stats={stats} />}
      
      <MarkerVisibilityEnhancer enhanceVisibility={enhanceVisibility} />
      
      {/* Show errors only in dev mode or if there are critical errors */}
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
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return (
    prevProps.map === nextProps.map &&
    prevProps.highlightedFacility === nextProps.highlightedFacility &&
    prevProps.facilities.length === nextProps.facilities.length
  );
});

export default FacilityMarkers;
