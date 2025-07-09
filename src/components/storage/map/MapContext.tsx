
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { useMarkerErrorHandling } from './hooks/marker/useMarkerErrorHandling';

interface MapContextProps {
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
  markersRef: React.MutableRefObject<Record<string, mapboxgl.Marker>>;
  facilities: StorageFacility[];
  setFacilities: React.Dispatch<React.SetStateAction<StorageFacility[]>>;
  highlightedFacilityId: string | null;
  setHighlightedFacilityId: React.Dispatch<React.SetStateAction<string | null>>;
  markerErrorHandling?: ReturnType<typeof useMarkerErrorHandling>;
}

interface MapProviderProps {
  children: React.ReactNode;
  facilities?: StorageFacility[];
  mapToken?: string;
}

// Added interface for useMap hook return type
interface UseMapReturn {
  map: mapboxgl.Map | null;
  mapContainer: React.RefObject<HTMLDivElement>;
  mapLoaded: boolean;
  isInitializing: boolean;
  mapError: string | null;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<MapProviderProps> = ({ 
  children, 
  facilities: initialFacilities = [],
  mapToken 
}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const [facilities, setFacilities] = useState<StorageFacility[]>(initialFacilities);
  const [highlightedFacilityId, setHighlightedFacilityId] = useState<string | null>(null);
  
  // Add marker error handling
  const markerErrorHandling = useMarkerErrorHandling();

  // Initialize the map when the component mounts
  useEffect(() => {
    if (!mapToken) {
      return;
    }

    try {
      // Set Mapbox token
      mapboxgl.accessToken = mapToken;
    } catch (error) {
      // Token setting failed
    }
  }, [mapToken]);

  return (
    <MapContext.Provider
      value={{
        mapRef,
        markersRef,
        facilities,
        setFacilities,
        highlightedFacilityId,
        setHighlightedFacilityId,
        markerErrorHandling
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = (): MapContextProps => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};

// Implement the useMap hook that was previously missing
export const useMap = (): UseMapReturn => {
  const { mapRef } = useMapContext();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    if (!mapRef.current && mapContainer.current) {
      try {
        // Map will be initialized in MapContainer component
      } catch (error) {
        setMapError('Failed to initialize map');
      }
    }
  }, [mapContainer.current]);

  useEffect(() => {
    // Check if map is loaded
    if (mapRef.current) {
      const checkMapLoaded = () => {
        if (mapRef.current?.loaded()) {
          setMapLoaded(true);
          setIsInitializing(false);
          mapRef.current.off('render', checkMapLoaded);
        }
      };

      if (mapRef.current.loaded()) {
        setMapLoaded(true);
        setIsInitializing(false);
      } else {
        mapRef.current.on('render', checkMapLoaded);
        mapRef.current.on('load', () => {
          setMapLoaded(true);
          setIsInitializing(false);
        });
      }

      return () => {
        mapRef.current?.off('render', checkMapLoaded);
        mapRef.current?.off('load', () => {});
      };
    }
  }, [mapRef.current]);

  return {
    map: mapRef.current,
    mapContainer,
    mapLoaded,
    isInitializing,
    mapError
  };
};
