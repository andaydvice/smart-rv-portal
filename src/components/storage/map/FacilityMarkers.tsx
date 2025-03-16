import React, { useEffect, useCallback, memo } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { usePopupClickHandler } from './hooks/usePopupClickHandler';
import MarkerStats from './components/MarkerStats';
import { useMarkerManagement } from './hooks/useMarkerManagement';
import MarkerVisibilityEnhancer from './components/MarkerVisibilityEnhancer';
import MarkerErrorDisplay from './components/MarkerErrorDisplay';
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
  
  // Use marker management hook with all required parameters
  const { 
    stats, 
    createMarkers, 
    forceMarkerVisibility,
    errors,
    markErrorAsRecovered
  } = useMarkerManagement(map, true, facilities, onMarkerClick);
  
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
          // Set up event listeners for popup close buttons and view details buttons
          document.querySelectorAll('.mapboxgl-popup-close-button').forEach(btn => {
            if (btn instanceof HTMLElement) {
              btn.style.pointerEvents = 'all';
              btn.style.cursor = 'pointer';
            }
          });
          
          document.querySelectorAll('.view-facility-btn').forEach(btn => {
            if (btn instanceof HTMLElement) {
              btn.style.pointerEvents = 'all';
              btn.style.cursor = 'pointer';
              
              // Re-add click handler to ensure it works
              const facilityId = btn.getAttribute('data-facility-id');
              if (facilityId) {
                btn.addEventListener('click', (e) => {
                  e.stopPropagation();
                  onMarkerClick(facilityId);
                });
              }
            }
          });
          
          // Run visibility test after marker creation
          if (process.env.NODE_ENV === 'development') {
            setTimeout(() => {
              // Fix: Remove the argument as testMarkersVisibility doesn't expect one
              testMarkersVisibility();
            }, 1000);
          }
        }
      }, 500);
    };
    
    // Start the creation process with a delay to ensure map is fully loaded
    setTimeout(() => createWithRetry(), 800);
    
    // Set up event delegation for popups
    const handlePopupInteractions = (e: MouseEvent) => {
      // Handle close button clicks
      if ((e.target as HTMLElement)?.closest('.mapboxgl-popup-close-button')) {
        e.preventDefault();
        e.stopPropagation();
        
        const popup = (e.target as HTMLElement).closest('.mapboxgl-popup');
        if (popup) {
          popup.remove();
        }
      }
      
      // Handle view details button clicks
      if ((e.target as HTMLElement)?.closest('.view-facility-btn')) {
        e.preventDefault();
        e.stopPropagation();
        
        const btn = (e.target as HTMLElement).closest('.view-facility-btn');
        const facilityId = btn?.getAttribute('data-facility-id');
        if (facilityId) {
          onMarkerClick(facilityId);
        }
      }
    };
    
    map.getContainer().addEventListener('click', handlePopupInteractions);
    
    return () => {
      map.getContainer().removeEventListener('click', handlePopupInteractions);
    };
  }, [map, facilities, createMarkers, onMarkerClick]);

  // Create a proper stats object for the MarkerStats component
  const displayStats = {
    total: stats.markersCreated + stats.skippedFacilities || 0,
    created: stats.markersCreated || 0,
    visible: stats.markersCreated - (stats.skippedFacilities || 0),
    hidden: stats.skippedFacilities || 0,
    failed: stats.skippedFacilities || 0,
    processedNYFacilities: stats.processedNYFacilities || 0,
    totalNYFacilities: stats.totalNYFacilities || 0
  };

  // Convert errors to the format expected by MarkerErrorDisplay
  const displayErrors = errors ? errors.map(err => ({
    id: `${err.facilityId}-${err.timestamp}`,
    facilityId: err.facilityId,
    errorMessage: err.error?.message || 'Unknown error',
    errorCode: err.type || 'ERR',
    timestamp: err.timestamp
  })) : [];

  return (
    <>
      {/* Debug marker count */}
      <div className="absolute top-2 left-2 z-50 bg-black/70 text-white p-2 rounded text-xs pointer-events-none">
        {facilities.length} facilities | 
        {document.querySelectorAll('.mapboxgl-marker, .custom-marker').length} markers
      </div>
      
      {/* Only show stats in development mode */}
      {process.env.NODE_ENV === 'development' && <MarkerStats stats={displayStats} />}
      
      {/* This component runs the visibility enhancement on a regular interval */}
      <MarkerVisibilityEnhancer enhanceVisibility={enhanceVisibility} />
      
      {/* Marker debugger component (dev only) */}
      {process.env.NODE_ENV === 'development' && <MarkerDebugOverlay />}
      
      {/* Show errors only in dev mode or if there are critical errors */}
      {(process.env.NODE_ENV === 'development' || (displayErrors && displayErrors.length > 5)) && (
        <div className="absolute top-20 right-4 z-50 w-80">
          <MarkerErrorDisplay 
            errors={displayErrors} 
            onDismiss={(errorId) => {
              const parts = errorId.split('-');
              if (parts.length > 0) {
                markErrorAsRecovered(parts[0]);
              }
            }}
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
