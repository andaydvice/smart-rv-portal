
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StorageFacility } from './types';
import MapControls from './map/MapControls';
import ClusterLayer from './map/ClusterLayer';
import FacilityMarkers from './map/FacilityMarkers';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

// Force WebGL context initialization for Firefox
if (!mapboxgl.supported()) {
  console.error('Your browser does not support Mapbox GL');
} else {
  // Force WebGL context creation
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl', {
    failIfMajorPerformanceCaveat: false,
    preserveDrawingBuffer: true,
    antialias: true
  });
  if (gl) gl.getExtension('OES_element_index_uint');
  (mapboxgl as any).prewarm();
}

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

    let isMounted = true;

    const initializeMap = async () => {
      try {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }

        if (mapToken.includes('Error')) {
          throw new Error('Invalid Mapbox token received');
        }

        mapboxgl.accessToken = mapToken;

        // Create map with minimal initial options
        const newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [-98.5795, 39.8283],
          zoom: 3,
          preserveDrawingBuffer: true,
          antialias: true,
          trackResize: true,
          attributionControl: true,
          renderWorldCopies: true,
          failIfMajorPerformanceCaveat: false
        });

        // Wait for initial map ready state
        await new Promise<void>((resolve) => {
          newMap.once('style.load', () => resolve());
        });

        if (!isMounted) return;

        // Enable all interactions after style load
        newMap.boxZoom.enable();
        newMap.scrollZoom.enable();
        newMap.dragRotate.enable();
        newMap.dragPan.enable();
        newMap.keyboard.enable();
        newMap.doubleClickZoom.enable();
        newMap.touchZoomRotate.enable();

        // Force a resize to ensure proper canvas dimensions
        newMap.resize();

        // Set up event handlers
        newMap.on('error', (e) => {
          console.error('Map error:', e);
          if (isMounted) {
            setMapError(`Map error: ${e.error?.message || 'Unknown error'}`);
            setIsInitializing(false);
          }
        });

        // Final initialization
        if (isMounted) {
          map.current = newMap;
          setMapError(null);
          setIsInitializing(false);
          setMapLoaded(true);
        }

      } catch (err) {
        console.error('Map initialization error:', err);
        if (isMounted) {
          setMapError(`Failed to initialize map: ${err instanceof Error ? err.message : 'Unknown error'}`);
          setIsInitializing(false);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapToken]);

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
