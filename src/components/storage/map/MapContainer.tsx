
import React, { useEffect, useCallback, useMemo } from 'react';
import { useMap } from './MapContext';
import MapControls from './MapControls';
import ClusterLayer from './ClusterLayer';
import FacilityMarkers from './FacilityMarkers';
import MapLoadingState from './MapLoadingState';
import { StorageFacility } from '../types';
import { fitMapToBounds } from './utils/mapboxInit';

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
    return facilities.filter(facility => {
      const lat = Number(facility.latitude);
      const lng = Number(facility.longitude);
      return !isNaN(lat) && !isNaN(lng) && 
             Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
    });
  }, [facilities]);

  // Force marker visibility after map loads
  useEffect(() => {
    if (map && mapLoaded) {
      document.body.classList.add('map-loaded');
      
      // Force visibility checks
      const enhanceVisibility = () => {
        document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
          if (marker instanceof HTMLElement) {
            marker.style.visibility = 'visible';
            marker.style.display = 'block';
            marker.style.opacity = '1';
          }
        });
      };
      
      // Run visibility checks multiple times
      [0, 500, 1000, 2000].forEach(delay => {
        setTimeout(enhanceVisibility, delay);
      });
      
      return () => {
        document.body.classList.remove('map-loaded');
      };
    }
  }, [map, mapLoaded]);

  // Update map bounds when facilities change
  useEffect(() => {
    if (map && mapLoaded && validFacilities.length > 0) {
      console.log(`Fitting map to bounds with ${validFacilities.length} valid coordinates`);
      fitMapToBounds(map, validFacilities);
    }
  }, [validFacilities, mapLoaded, map]);

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
