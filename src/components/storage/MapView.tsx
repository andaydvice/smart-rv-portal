
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StorageFacility } from './types';
import MapControls from './map/MapControls';
import ClusterLayer from './map/ClusterLayer';
import FacilityMarkers from './map/FacilityMarkers';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

// Fix for Firefox missing icons
(mapboxgl as any).prewarm();

interface MapViewProps {
  mapToken: string;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
}

const MapView = ({
  mapToken,
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    try {
      // Cleanup previous map instance if it exists
      if (map.current) {
        map.current.remove();
        map.current = null;
      }

      // Validate mapToken
      if (mapToken.includes('Error')) {
        throw new Error('Invalid Mapbox token received');
      }

      console.log('Initializing map with token length:', mapToken.length);
      mapboxgl.accessToken = mapToken;

      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-98.5795, 39.8283],
        zoom: 3,
        maxZoom: 16,
        preserveDrawingBuffer: true,
        antialias: true,
        crossSourceCollisions: false, // Improve performance
        fadeDuration: 0, // Reduce animation lag
        logoPosition: 'bottom-left',
        refreshExpiredTiles: false // Improve performance
      });

      // Wait for both style and map to load
      newMap.on('style.load', () => {
        console.log('Style loaded');
        checkMapReady(newMap);
      });

      newMap.on('load', () => {
        console.log('Map loaded');
        checkMapReady(newMap);
      });

      // Handle map errors
      newMap.on('error', (e) => {
        console.error('Map error:', e);
        setMapError(`Map error: ${e.error?.message || 'Unknown error'}`);
        setIsInitializing(false);
      });

      // Enable map interactions once fully loaded
      const checkMapReady = (mapInstance: mapboxgl.Map) => {
        if (mapInstance.isStyleLoaded() && mapInstance.loaded()) {
          console.log('Map fully loaded and ready');
          setMapError(null);
          setIsInitializing(false);
          setMapLoaded(true);
          map.current = mapInstance;

          // Enable interactions
          mapInstance.scrollZoom.enable();
          mapInstance.dragRotate.enable();
          mapInstance.touchZoomRotate.enable();
          mapInstance.doubleClickZoom.enable();
          mapInstance.dragPan.enable();
        }
      };

      // Cleanup
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (err) {
      console.error('Map initialization error:', err);
      setMapError(`Failed to initialize map: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsInitializing(false);
    }
  }, [mapToken]);

  // Ensure proper cleanup on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {mapError && (
        <Alert variant="destructive" className="absolute top-4 left-4 right-4 z-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{mapError}</AlertDescription>
        </Alert>
      )}
      <div 
        ref={mapContainer} 
        className="w-full h-full" 
        style={{ 
          minHeight: '600px',
          opacity: mapLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      {map.current && mapLoaded && (
        <>
          <MapControls map={map.current} />
          <ClusterLayer
            map={map.current}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
          />
          <FacilityMarkers
            map={map.current}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
            onMarkerClick={onMarkerClick}
          />
        </>
      )}
      {isInitializing && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080F1F]/80">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-gray-400">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
