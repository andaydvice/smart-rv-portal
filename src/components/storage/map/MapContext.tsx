import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { toast } from "sonner";
import { 
  initializeMapboxGL, 
  createMapInstance, 
  waitForMapStyleLoad,
  configureMapSettings,
  setupMapEventListeners,
  createMapClickHandler
} from './utils/mapboxInit';
import { useMapStyles } from './hooks/useMapStyles';
import { usePopupClickHandler } from './hooks/usePopupClickHandler';

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

  // Apply global styles for mapbox elements
  useMapStyles();
  
  // Set up global popup click handler
  usePopupClickHandler();

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

        if (mapToken.includes('Error')) {
          throw new Error('Invalid Mapbox token received');
        }

        console.log('Creating new map instance');
        
        // Reference the DOM element before using it
        const mapContainerEl = mapContainer.current;
        if (!mapContainerEl) {
          throw new Error('Map container element not found');
        }
        
        // Create new map instance with the existing ref
        const newMap = createMapInstance(mapContainerEl, mapToken);

        // Wait for style to load
        console.log('Waiting for map style to load');
        await waitForMapStyleLoad(newMap);
        
        if (!isMounted) return;

        console.log('Map style loaded successfully');
        
        // Configure map settings
        configureMapSettings(newMap);
        
        // Enable essential interactions
        newMap.dragPan.enable();
        newMap.scrollZoom.enable();
        newMap.doubleClickZoom.enable();

        // Set up event listeners
        setupMapEventListeners(newMap);
        
        // Add click handler to map container to prevent closing popups
        createMapClickHandler(newMap.getContainer());

        // Force a resize to ensure proper rendering
        setTimeout(() => newMap.resize(), 100);

        // Set up error handling
        newMap.on('error', (e) => {
          console.error('Map error:', e);
          if (isMounted) {
            setMapError(`Map error: ${e.error?.message || 'Unknown error'}`);
            setIsInitializing(false);
            toast.error(`Map error: ${e.error?.message || 'Unknown error'}`);
          }
        });

        // Complete initialization
        if (isMounted) {
          map.current = newMap;
          setMapError(null);
          setIsInitializing(false);
          setMapLoaded(true);
          toast.success('Map loaded successfully');
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
    activePopupRef
  };

  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
};
