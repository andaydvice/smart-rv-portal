
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { toast } from "sonner";

// Initialize function to prepare Mapbox
const initializeMapboxGL = () => {
  if (!mapboxgl.supported()) {
    console.error('Your browser does not support Mapbox GL');
    return false;
  }
  return true;
};

// Initialize Mapbox
initializeMapboxGL();

// Define the context type
type MapContextType = {
  map: mapboxgl.Map | null;
  mapContainer: React.RefObject<HTMLDivElement>;
  mapLoaded: boolean;
  isInitializing: boolean;
  mapError: string | null;
  activePopupRef: React.MutableRefObject<mapboxgl.Popup | null>;
  mapToken: string;
};

// Create context with default values
const MapContext = createContext<MapContextType | undefined>(undefined);

// Custom hook to use the map context
export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};

// Export alias for backward compatibility
export const useMapContext = useMap;

interface MapProviderProps {
  mapToken: string;
  children: React.ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ 
  mapToken, 
  children 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const activePopupRef = useRef<mapboxgl.Popup | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const initializeMap = async () => {
      try {
        if (map.current) {
          console.log('Removing existing map instance');
          map.current.remove();
          map.current = null;
        }

        console.log('Creating new map instance');
        
        // Set access token
        mapboxgl.accessToken = mapToken;
        
        // Create new map instance
        const newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [-95.7129, 37.0902], // Center on US
          zoom: 3,
          attributionControl: true,
          preserveDrawingBuffer: true
        });

        // Wait for map to load
        newMap.on('load', () => {
          console.log('Map loaded successfully');
          if (isMounted) {
            map.current = newMap;
            setMapError(null);
            setIsInitializing(false);
            setMapLoaded(true);
            toast.success('Map loaded successfully');
          }
        });
        
        // Enable interactions
        newMap.dragPan.enable();
        newMap.scrollZoom.enable();
        newMap.doubleClickZoom.enable();
        
        // Add navigation controls
        newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Set up error handling
        newMap.on('error', (e) => {
          console.error('Map error:', e);
          if (isMounted) {
            setMapError(`Map error: ${e.error?.message || 'Unknown error'}`);
            setIsInitializing(false);
            toast.error(`Map error: ${e.error?.message || 'Unknown error'}`);
          }
        });

      } catch (err) {
        console.error('Map initialization error:', err);
        if (isMounted && retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying map initialization (attempt ${retryCount}/${maxRetries})...`);
          setTimeout(initializeMap, 1000 * retryCount);
        } else if (isMounted) {
          setMapError(`Failed to initialize map: ${err instanceof Error ? err.message : 'Unknown error'}`);
          setIsInitializing(false);
          toast.error(`Failed to initialize map: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      if (map.current) {
        console.log('Cleaning up map instance');
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapToken]);

  // Provide the map context to children
  const contextValue = {
    map: map.current,
    mapContainer,
    mapLoaded,
    isInitializing,
    mapError,
    activePopupRef,
    mapToken
  };

  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
};
