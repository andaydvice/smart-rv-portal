
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StorageFacility } from './types';
import MapControls from './map/MapControls';
import ClusterLayer from './map/ClusterLayer';
import FacilityMarkers from './map/FacilityMarkers';
import MapLoadingState from './map/MapLoadingState';
import { 
  initializeMapboxGL, 
  createMapInstance, 
  waitForMapStyleLoad,
  fitMapToBounds
} from './map/utils/mapboxInit';

// Initialize Mapbox
initializeMapboxGL();

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

        // Create new map instance
        const newMap = createMapInstance(mapContainer.current, mapToken);

        // Wait for style to load
        await waitForMapStyleLoad(newMap);
        
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
            fitMapToBounds(newMap, facilities);
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
  }, [mapToken, selectedState, facilities]);

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
    </div>
  );
};

export default MapView;
