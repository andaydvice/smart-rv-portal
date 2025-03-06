
import React, { useEffect, useCallback, useMemo } from 'react';
import { useMap } from './MapContext';
import MapControls from './MapControls';
import ClusterLayer from './ClusterLayer';
import FacilityMarkers from './FacilityMarkers';
import MapLoadingState from './MapLoadingState';
import { StorageFacility } from '../types';
import { fitMapToBounds } from './utils/mapboxInit';
import { useMapStyles } from './hooks/useMapStyles';
import { setupMapEventListeners, createMapClickHandler } from './utils/mapEvents';

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

  // Apply custom styles to ensure markers and popups are visible
  useMapStyles();
  
  // Memoize the list of facilities to prevent unnecessary computations
  const validFacilities = useMemo(() => {
    // Filter out facilities with invalid coordinates
    return facilities.filter(facility => {
      const lat = Number(facility.latitude);
      const lng = Number(facility.longitude);
      return !isNaN(lat) && !isNaN(lng) && 
             Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
    });
  }, [facilities]);
  
  // Setup map event listeners when map is ready - using useCallback
  const setupEvents = useCallback(() => {
    if (map && mapLoaded) {
      console.log('Setting up map event listeners');
      setupMapEventListeners(map);
      
      if (mapContainer.current) {
        createMapClickHandler(mapContainer.current);
      }
      
      // Add map-loaded class to body when map is fully loaded
      document.body.classList.add('map-loaded');
    }
  }, [map, mapLoaded, mapContainer]);
  
  // Setup events only once when map is loaded
  useEffect(() => {
    setupEvents();
    
    // Clean up class on unmount
    return () => {
      document.body.classList.remove('map-loaded');
    };
  }, [setupEvents]);

  // Update map bounds when facilities change, but only if significantly different
  useEffect(() => {
    if (map && mapLoaded && validFacilities.length > 0) {
      // Debounce the bounds update for better performance
      const timer = setTimeout(() => {
        fitMapToBounds(map, validFacilities);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [validFacilities, mapLoaded, map]);
  
  // Force marker visibility after the map is loaded and after a short delay
  useEffect(() => {
    if (map && mapLoaded) {
      const enhanceVisibility = () => {
        document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
          if (marker instanceof HTMLElement) {
            marker.style.visibility = 'visible';
            marker.style.display = 'block';
            marker.style.opacity = '1';
            marker.style.pointerEvents = 'all';
          }
        });
      };
      
      // Ensure markers are visible after map style loads and after a delay
      const timer1 = setTimeout(enhanceVisibility, 500);
      const timer2 = setTimeout(enhanceVisibility, 2000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [map, mapLoaded]);

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
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {map && mapLoaded && (
        <>
          <MapControls map={map} />
          <ClusterLayer
            map={map}
            facilities={validFacilities}
            highlightedFacility={highlightedFacility}
          />
          <FacilityMarkers
            map={map}
            facilities={validFacilities}
            highlightedFacility={highlightedFacility}
            onMarkerClick={onMarkerClick}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(MapContainer);
