
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StorageFacility } from './types';
import MapControls from './map/MapControls';
import ClusterLayer from './map/ClusterLayer';
import FacilityMarkers from './map/FacilityMarkers';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

// Prevent WebGL context errors in Firefox
if (!mapboxgl.supported()) {
  alert('Your browser does not support Mapbox GL');
} else {
  // Pre-initialize WebGL context
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl', {
    failIfMajorPerformanceCaveat: false,
    preserveDrawingBuffer: true,
    antialias: false // Disable antialiasing to reduce context loss
  });
  if (gl) {
    gl.getExtension('OES_element_index_uint');
    // Clear any existing context
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
  // Warm up the GL context
  mapboxgl.prewarm();
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
  
  // Debug output - log facilities count whenever it changes
  useEffect(() => {
    console.log(`MapView received ${facilities.length} facilities to display`);
    if (facilities.length > 0) {
      console.log('First facility:', facilities[0]);
      console.log('Last facility:', facilities[facilities.length - 1]);
    }
  }, [facilities]);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

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

        // Create map with optimized settings
        const newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [-98.5795, 39.8283],
          zoom: 3,
          preserveDrawingBuffer: true,
          antialias: false, // Disable antialiasing
          trackResize: true,
          attributionControl: true,
          renderWorldCopies: false, // Disable world copies to reduce rendering load
          failIfMajorPerformanceCaveat: false,
          maxZoom: 17, // Limit max zoom to reduce tile requests
          minZoom: 2, // Set minimum zoom
          hash: false, // Disable hash
          refreshExpiredTiles: false // Disable tile refresh
        });

        // Wait for style to load
        await new Promise<void>((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error('Map style load timeout'));
          }, 10000);

          newMap.once('style.load', () => {
            clearTimeout(timeoutId);
            resolve();
          });
        });

        if (!isMounted) return;

        // Enable essential interactions only
        newMap.dragPan.enable();
        newMap.scrollZoom.enable();
        newMap.doubleClickZoom.enable();

        // Force a resize
        setTimeout(() => newMap.resize(), 0);

        // Set up error handling
        newMap.on('error', (e) => {
          console.error('Map error:', e);
          if (isMounted) {
            setMapError(`Map error: ${e.error?.message || 'Unknown error'}`);
            setIsInitializing(false);
          }
        });

        // Complete initialization
        if (isMounted) {
          map.current = newMap;
          setMapError(null);
          setIsInitializing(false);
          setMapLoaded(true);
          
          // If we have a selected state, adjust the map view
          if (selectedState && facilities.length > 0) {
            try {
              // Calculate bounds of all facilities
              const bounds = new mapboxgl.LngLatBounds();
              facilities.forEach(facility => {
                if (facility.longitude && facility.latitude) {
                  bounds.extend([facility.longitude, facility.latitude]);
                }
              });
              
              // Fit map to these bounds if we have valid coordinates
              if (!bounds.isEmpty()) {
                newMap.fitBounds(bounds, {
                  padding: 50,
                  maxZoom: 10
                });
              }
            } catch (error) {
              console.error('Error setting map bounds:', error);
            }
          }
        }

      } catch (err) {
        console.error('Map initialization error:', err);
        if (isMounted && retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying map initialization (attempt ${retryCount}/${maxRetries})...`);
          setTimeout(initializeMap, 1000 * retryCount);
        } else if (isMounted) {
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
  }, [mapToken, selectedState]);

  return (
    <div className="relative w-full h-full">
      {mapError && (
        <Alert variant="destructive" className="absolute top-4 left-4 right-4 z-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{mapError}</AlertDescription>
        </Alert>
      )}
      
      {/* Show the facilities count in a small overlay (in dev mode only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 z-50 bg-gray-800 text-white px-2 py-1 rounded text-xs">
          Facilities: {facilities.length}
        </div>
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
          {/* Disable clustering temporarily for debugging */}
          {/* <ClusterLayer
            map={map.current}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
          /> */}
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
