
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapLoadingProgress from './MapLoadingProgress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface MapboxReliableLoaderProps {
  mapToken: string;
  centerCoordinates?: [number, number];
  zoomLevel?: number;
  className?: string;
  onMapLoaded?: () => void;
}

const MapboxReliableLoader: React.FC<MapboxReliableLoaderProps> = ({
  mapToken,
  centerCoordinates = [-98.5795, 39.8283], // Center of US
  zoomLevel = 3,
  className,
  onMapLoaded
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  
  // Tracks failed attempts to load the map
  const loadAttempts = useRef(0);
  const MAX_LOAD_ATTEMPTS = 3;
  
  // Function to initialize the map with better error handling
  const initializeMap = () => {
    // Clear any previous errors
    setLoadingError(null);
    
    if (!mapContainer.current || !mapToken) {
      setLoadingError("Map container or token not available");
      return;
    }
    
    try {
      // Initialize Mapbox GL
      mapboxgl.accessToken = mapToken;
      
      // Create map instance with error handling
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: centerCoordinates,
        zoom: zoomLevel,
        attributionControl: false
      });
      
      mapInstance.on('error', (e) => {
        console.error('Mapbox error:', e);
        setLoadingError(`Map error: ${e.error?.message || 'Unknown error'}`);
        
        // Try to recover
        if (loadAttempts.current < MAX_LOAD_ATTEMPTS) {
          loadAttempts.current++;
          setTimeout(() => {
            setLoadingPercent(0);
            initializeMap();
          }, 1000);
        }
      });
      
      // Store map instance
      map.current = mapInstance;
      
      // Track loading progress with multiple event types
      let resourcesLoaded = 0;
      const totalResources = 20; // Arbitrary number for reliable progress tracking
      
      // Progress tracking events
      const trackProgress = () => {
        resourcesLoaded++;
        setLoadingPercent(prev => {
          // Cap at 95% until we know it's fully loaded
          const newVal = Math.min(Math.floor((resourcesLoaded / totalResources) * 100), 95);
          return Math.max(newVal, prev); // Never go backwards in progress
        });
      };
      
      // Register for all important events
      ['styledata', 'sourcedata', 'dataloading', 'data', 'render'].forEach(event => {
        mapInstance.on(event, trackProgress);
      });
      
      // Set up a guaranteed progress increment every 500ms
      const progressInterval = setInterval(() => {
        if (loadingPercent < 95) {
          setLoadingPercent(prev => Math.min(prev + 1, 95));
        }
      }, 500);
      
      // Final 'load' event handler
      mapInstance.on('load', () => {
        console.log('Map successfully loaded');
        clearInterval(progressInterval);
        
        // Ensure we show 100% completion
        setLoadingPercent(100);
        
        // Delay to show 100% before hiding
        setTimeout(() => {
          setLoading(false);
          if (onMapLoaded) onMapLoaded();
        }, 500);
      });
      
      // Add timeout to force completion after 8 seconds
      const forceCompleteTimeout = setTimeout(() => {
        if (loadingPercent < 100) {
          console.log('Forcing load completion after timeout');
          clearInterval(progressInterval);
          setLoadingPercent(100);
          
          setTimeout(() => {
            setLoading(false);
            if (onMapLoaded) onMapLoaded();
          }, 300);
        }
      }, 8000);
      
      // Add navigation controls
      mapInstance.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      // Clean up on unmount
      return () => {
        clearInterval(progressInterval);
        clearTimeout(forceCompleteTimeout);
        if (map.current) {
          map.current.remove();
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setLoadingError(`Failed to initialize map: ${errorMessage}`);
      setLoading(false);
      toast.error("Failed to load map");
    }
  };
  
  // Initialize map on component mount
  useEffect(() => {
    const cleanup = initializeMap();
    return cleanup;
  }, [mapToken]); // Re-initialize if token changes
  
  return (
    <div className={cn("relative w-full rounded-lg overflow-hidden", className)}>
      <div 
        ref={mapContainer} 
        className="w-full h-full" 
      />
      
      <MapLoadingProgress 
        percentLoaded={loadingPercent} 
        showProgress={loading} 
        infiniteLoading={false}
        forceComplete={true}
      />
      
      {loadingError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-red-900/90 text-white p-4 rounded-md max-w-xs text-center">
            <p className="font-medium">Error Loading Map</p>
            <p className="text-sm mt-1">{loadingError}</p>
            <button 
              className="mt-3 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
              onClick={() => {
                setLoadingPercent(0);
                setLoading(true);
                initializeMap();
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxReliableLoader;
