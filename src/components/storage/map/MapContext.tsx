
import React, { createContext, useContext, useRef, useState } from 'react';
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

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{
  children: React.ReactNode;
  facilities: StorageFacility[];
}> = ({ children, facilities: initialFacilities }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const [facilities, setFacilities] = useState<StorageFacility[]>(initialFacilities);
  const [highlightedFacilityId, setHighlightedFacilityId] = useState<string | null>(null);
  
  // Add marker error handling
  const markerErrorHandling = useMarkerErrorHandling();

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
