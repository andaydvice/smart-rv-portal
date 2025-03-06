
import React, { useEffect } from 'react';
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
  
  // Setup map event listeners when map is ready
  useEffect(() => {
    if (map && mapLoaded) {
      console.log('Setting up map event listeners');
      setupMapEventListeners(map);
      
      if (mapContainer.current) {
        createMapClickHandler(mapContainer.current);
      }
    }
  }, [map, mapLoaded, mapContainer]);

  // Update map bounds when facilities change
  useEffect(() => {
    if (map && mapLoaded && facilities.length > 0) {
      console.log('Updating map bounds for new facilities');
      fitMapToBounds(map, facilities);
    }
  }, [facilities, mapLoaded, map]);
  
  // Handle facility highlighting specially
  useEffect(() => {
    if (map && highlightedFacility) {
      console.log(`Highlighting facility: ${highlightedFacility}`);
      
      // Find the highlighted marker element
      const markerEl = document.querySelector(`[data-facility-id="${highlightedFacility}"]`);
      if (markerEl) {
        // Scroll to bring it into view if needed
        markerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [highlightedFacility, map]);

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

export default MapContainer;
