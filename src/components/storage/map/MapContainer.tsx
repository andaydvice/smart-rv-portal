
import React, { useEffect, useCallback, useMemo } from 'react';
import { useMap } from './MapContext';
import MapControls from './MapControls';
import ClusterLayer from './ClusterLayer';
import FacilityMarkers from './FacilityMarkers';
import MapLoadingState from './MapLoadingState';
import { StorageFacility } from '../types';
import { fitMapToBounds } from './utils/mapBounds';
import { ensureMarkersOnMap } from '@/utils/markers/forcing/ensureMarkers';

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
  
  // Add global map instance access
  useEffect(() => {
    if (map) {
      (window as any).mapInstance = map;
      document.dispatchEvent(new CustomEvent('mapboxgl.map.created', { detail: { map } }));
      
      // Explicitly set map container to visible
      const container = map.getContainer();
      if (container) {
        container.style.visibility = 'visible';
        container.style.opacity = '1';
      }
    }
    
    return () => {
      (window as any).mapInstance = null;
    };
  }, [map]);

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
      
      // Set map container to be explicitly visible
      const container = map.getContainer();
      if (container) {
        container.style.visibility = 'visible';
        container.style.opacity = '1';
        container.style.display = 'block';
      }
      
      // EMERGENCY FIX: Ensure markers are created if normal method fails
      // Try after a delay to allow normal creation first
      const emergencyTimeout = setTimeout(() => {
        const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
        if (markers.length < validFacilities.length * 0.5) {
          console.warn('EMERGENCY FIX: Not enough markers created, forcing creation');
          ensureMarkersOnMap(map, validFacilities);
        }
      }, 3000);
      
      return () => {
        document.body.classList.remove('map-loaded');
        clearTimeout(emergencyTimeout);
      };
    }
  }, [map, mapLoaded, validFacilities]);

  // Update map bounds when facilities change
  useEffect(() => {
    if (map && mapLoaded && validFacilities.length > 0) {
      console.log(`Fitting map to bounds with ${validFacilities.length} valid coordinates`);
      fitMapToBounds(map, validFacilities);
    }
  }, [validFacilities, mapLoaded, map, selectedState]);

  // Listen for facility selection to update the map view
  useEffect(() => {
    if (map && mapLoaded && highlightedFacility) {
      const facility = validFacilities.find(f => f.id === highlightedFacility);
      if (facility) {
        const lat = Number(facility.latitude);
        const lng = Number(facility.longitude);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`Flying to facility: ${facility.name}`);
          map.flyTo({
            center: [lng, lat],
            zoom: 12,
            essential: true
          });
        }
      }
    }
  }, [highlightedFacility, map, mapLoaded, validFacilities]);

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
        <>
          <MapControls map={map} />
          <ClusterLayer
            map={map}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
          />
          <FacilityMarkers
            map={map}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
            onMarkerClick={onMarkerClick}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(MapContainer);
