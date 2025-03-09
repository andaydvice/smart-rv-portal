
import React, { useEffect, useCallback, memo } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { usePopupClickHandler } from './hooks/usePopupClickHandler';
import MarkerStats, { MarkerStatistics } from './components/MarkerStats';
import { useMarkerManagement } from './hooks/useMarkerManagement';
import MarkerVisibilityEnhancer from './components/MarkerVisibilityEnhancer';
import MarkerErrorDisplay, { MarkerError } from './components/MarkerErrorDisplay';
import MarkerDebugOverlay from './components/MarkerDebugOverlay';
import { testMarkersVisibility } from '@/utils/markers';

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

  // Create log showing marker creation started
  useEffect(() => {
    console.log(`FacilityMarkers: Received ${facilities.length} facilities to display as markers`);
  }, [facilities]);

  // Effect to create markers when facilities or map changes
  useEffect(() => {
    // Create markers only when we have both map and facilities
    if (!map || !facilities.length) {
      console.log("FacilityMarkers: Missing map or facilities, skipping marker creation");
      return;
    }
    
    console.log(`FacilityMarkers: Creating markers for ${facilities.length} facilities`);
    
    // Add visible emergency marker outside the map system for debugging
    const debugElement = document.createElement('div');
    debugElement.className = 'debug-marker';
    debugElement.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      width: 24px;
      height: 24px;
      background-color: red;
      border-radius: 50%;
      z-index: 10000;
      border: 2px solid white;
    `;
    document.body.appendChild(debugElement);
    
    // Use multiple creation attempts with increasing delays
    const createWithRetry = (attempt = 1) => {
      console.log(`FacilityMarkers: Marker creation attempt ${attempt}`);
      createMarkers();
      
      // Check if markers were actually created after a short delay
      setTimeout(() => {
        const markerCount = document.querySelectorAll('.mapboxgl-marker, .custom-marker').length;
        console.log(`FacilityMarkers: Found ${markerCount} markers after creation attempt ${attempt}`);
        
        // If no markers created and we haven't exceeded max attempts, try again
        if (markerCount === 0 && attempt < 3) {
          setTimeout(() => createWithRetry(attempt + 1), 1000 * attempt);
        } else {
          // Run visibility test after marker creation
          if (process.env.NODE_ENV === 'development') {
            setTimeout(() => {
              testMarkersVisibility(false);
            }, 1000);
          }
        }
      }, 500);
    };
    
    // Start the creation process with a delay to ensure map is fully loaded
    setTimeout(() => createWithRetry(), 800);
    
    // Clean up debug marker on unmount
    return () => {
      if (debugElement.parentNode) {
        debugElement.parentNode.removeChild(debugElement);
      }
    };
  }, [map, facilities, createMarkers]);

  // Create a proper MarkerStatistics object from stats
  const markerStats: MarkerStatistics = {
    total: stats.total || 0,
    created: stats.created || 0,
    visible: stats.visible || 0,
    hidden: stats.hidden || 0,
    failed: stats.failed || 0,
    processedNYFacilities: stats.processedNYFacilities || 0,
    totalNYFacilities: stats.totalNYFacilities || 0
  };

  return (
    <>
      {/* Debug marker count */}
      <div className="absolute top-2 left-2 z-50 bg-black/70 text-white p-2 rounded text-xs pointer-events-none">
        {facilities.length} facilities | 
        {document.querySelectorAll('.mapboxgl-marker, .custom-marker').length} markers
      </div>
      
      {/* Only show stats in development mode */}
      {process.env.NODE_ENV === 'development' && <MarkerStats stats={markerStats} />}
      
      {/* This component runs the visibility enhancement on a regular interval */}
      <MarkerVisibilityEnhancer enhanceVisibility={enhanceVisibility} />
      
      {/* Marker debugger component (dev only) */}
      {process.env.NODE_ENV === 'development' && <MarkerDebugOverlay />}
      
      {/* Show errors only in dev mode or if there are critical errors */}
      {(process.env.NODE_ENV === 'development' || (errors && errors.length > 5)) && (
        <div className="absolute top-20 right-4 z-50 w-80">
          <MarkerErrorDisplay 
            errors={errors as MarkerError[]} 
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
