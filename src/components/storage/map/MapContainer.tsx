
import React, { useEffect, useState } from 'react';
import { useMap, useMapContext } from './MapContext';
import { StorageFacility } from '../types';
import MapView from './components/MapView';
import MapInteractions from './components/MapInteractions';
import { createMapInstance, initializeMapboxGL, configureMapSettings } from './utils/mapboxInit';
import mapboxgl from 'mapbox-gl';

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
  const { mapContainer, mapLoaded, isInitializing, mapError } = useMap();
  const { mapRef } = useMapContext();
  const [markersCreated, setMarkersCreated] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  

  // Initialize map when the component mounts
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    
    // Initialize Mapbox GL
    const isInitialized = initializeMapboxGL();
    if (!isInitialized) {
      return;
    }
    
    try {
      // Create map instance
      const map = createMapInstance(
        mapContainer.current,
        mapboxgl.accessToken,
        [-98.5795, 39.8283], // Center of US
        3 // Initial zoom level
      );
      
      // Track loading progress
      map.on('dataloading', () => {
        setLoadingProgress(prev => Math.min(prev + 5, 90));
      });
      
      map.on('data', () => {
        setLoadingProgress(prev => Math.min(prev + 2, 95));
      });
      
      map.on('idle', () => {
        setLoadingProgress(100);
      });
      
      // Set the map reference
      mapRef.current = map;
      
      // Configure map settings
      configureMapSettings(map);
      
      // Clean up on unmount
      return () => {
        map.remove();
        mapRef.current = null;
      };
    } catch (error) {
      console.error('Error creating map instance:', error);
    }
  }, [mapContainer.current]);

  // Handler for marker creation status
  const handleMarkersCreated = (created: boolean) => {
    setMarkersCreated(created);
  };

  return (
    <>
      <MapView
        mapContainer={mapContainer}
        isInitializing={isInitializing}
        mapError={mapError}
        mapLoaded={mapLoaded}
        facilities={facilities || []}
        selectedState={selectedState}
        loadingProgress={loadingProgress}
      />
      
      {mapRef.current && mapLoaded && (
        <MapInteractions
          map={mapRef.current}
          mapLoaded={mapLoaded}
          facilities={facilities || []}
          highlightedFacility={highlightedFacility}
          selectedState={selectedState}
          onMarkersCreated={handleMarkersCreated}
        />
      )}
    </>
  );
};

export default MapContainer;
