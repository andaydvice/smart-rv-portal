
import React, { useEffect, useState, useRef } from 'react';
import { useMap, useMapContext } from './MapContext';
import { StorageFacility } from '../types';
import MapView from './components/MapView';
import MapInteractions from './components/MapInteractions';
import { createMapInstance, initializeMapboxGL, configureMapSettings } from './utils/mapboxInit';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapContainerProps {
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
  mapToken: string;
}

const MapContainer: React.FC<MapContainerProps> = ({
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState,
  mapToken
}) => {
  const { mapContainer, mapLoaded, isInitializing, mapError } = useMap();
  const { mapRef } = useMapContext();
  const [markersCreated, setMarkersCreated] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const initializationRef = useRef<boolean>(false);
  
  // Log props for debugging
  useEffect(() => {
    console.log(`MapContainer received ${facilities?.length || 0} facilities`);
    console.log(`Selected state: ${selectedState || 'none'}`);
    console.log(`Map loaded: ${mapLoaded}, Map initialized: ${!isInitializing}`);
    console.log(`MapToken available: ${!!mapToken}, MapToken value: ${mapToken ? mapToken.substring(0, 10) + '...' : 'none'}`);
  }, [facilities, selectedState, mapLoaded, isInitializing, mapToken]);

  // Initialize map when the component mounts - wait for token to be available
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || initializationRef.current) return;
    
    // Don't initialize if token is not available
    if (!mapToken || mapToken === 'null' || mapToken === 'undefined') {
      console.log('MapContainer: Waiting for Mapbox token before initialization... Token:', mapToken);
      return;
    }
    
    initializationRef.current = true;
    console.log('Starting map initialization with valid token');
    
    // Initialize Mapbox GL
    const isInitialized = initializeMapboxGL();
    if (!isInitialized) {
      console.error('Failed to initialize MapboxGL');
      return;
    }
    
    try {
      // Create map instance with the provided token
      const map = createMapInstance(
        mapContainer.current,
        mapToken,
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
      
      console.log('Map instance created successfully');
      
      // Clean up on unmount
      return () => {
        console.log('Cleaning up map instance');
        if (map && map.remove) {
          map.remove();
        }
        mapRef.current = null;
        initializationRef.current = false;
      };
    } catch (error) {
      console.error('Error creating map instance:', error);
    }
  }, [mapContainer.current, mapToken]);

  // Handler for marker creation status
  const handleMarkersCreated = (created: boolean) => {
    setMarkersCreated(created);
    console.log(`Markers created status: ${created}`);
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
