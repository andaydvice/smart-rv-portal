
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapLoadingProgress from './MapLoadingProgress';
import { cn } from '@/lib/utils';

interface MapboxReliableLoaderProps {
  mapToken: string;
  centerCoordinates?: [number, number];
  zoomLevel?: number;
  className?: string;
  onMapLoaded?: (map: mapboxgl.Map) => void;
  showControls?: boolean;
}

const MapboxReliableLoader: React.FC<MapboxReliableLoaderProps> = ({
  mapToken,
  centerCoordinates = [-98.5795, 39.8283], // Center of US
  zoomLevel = 3,
  className,
  onMapLoaded,
  showControls = true,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;
    
    // Set initial loading state
    setLoading(true);
    setLoadingPercent(5);
    
    // Initialize Mapbox GL
    mapboxgl.accessToken = mapToken;
    
    try {
      // Progress tracking
      setLoadingPercent(10);
      
      // Create map instance
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: centerCoordinates,
        zoom: zoomLevel,
        attributionControl: false,
        preserveDrawingBuffer: true,
        trackResize: true
      });
      
      map.current = mapInstance;
      setLoadingPercent(30);
      
      // Track more precise loading events
      const loadEvents = [
        'styledata',
        'sourcedata',
        'dataloading',
        'data',
        'render',
        'tile'
      ];
      
      // Track map loading progress through various events
      loadEvents.forEach(eventName => {
        mapInstance.on(eventName, () => {
          // Increment loading percentage gradually but don't reach 100% until 'load' event
          setLoadingPercent(prev => {
            // Cap progress at 90% until fully loaded
            return Math.min(prev + 2, 90);
          });
        });
      });
      
      // Force complete with a short delay after style.load
      mapInstance.once('style.load', () => {
        setLoadingPercent(95);
        
        // Force progress to 100% after a short delay to ensure UI looks smooth
        setTimeout(() => {
          setLoadingPercent(100);
        }, 300);
      });
      
      // Handle full map load completion
      mapInstance.once('load', () => {
        console.log('Map fully loaded');
        setLoadingPercent(100);
        
        // Hide loading screen with a slight delay to show 100%
        setTimeout(() => {
          setLoading(false);
          if (onMapLoaded) onMapLoaded(mapInstance);
        }, 500);
      });
      
      // Ensure loading completes even if events are missed
      const forceCompleteTimeout = setTimeout(() => {
        if (loadingPercent < 100) {
          console.log('Forcing load completion after timeout');
          setLoadingPercent(100);
          
          setTimeout(() => {
            setLoading(false);
            if (onMapLoaded) onMapLoaded(mapInstance);
          }, 500);
        }
      }, 8000); // Failsafe timeout
      
      // Add navigation controls if requested
      if (showControls) {
        mapInstance.addControl(
          new mapboxgl.NavigationControl(),
          'top-right'
        );
      }
      
      // Clean up on unmount
      return () => {
        clearTimeout(forceCompleteTimeout);
        loadEvents.forEach(event => {
          mapInstance.off(event);
        });
        
        if (map.current) {
          map.current.remove();
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      // On error, still hide the loading screen
      setLoadingPercent(100);
      setTimeout(() => setLoading(false), 500);
    }
  }, [mapToken, centerCoordinates, zoomLevel, onMapLoaded, showControls]);
  
  return (
    <div className={cn("relative w-full h-[600px] rounded-lg overflow-hidden", className)}>
      <div 
        ref={mapContainer} 
        className="w-full h-full" 
      />
      
      <MapLoadingProgress 
        percentLoaded={loadingPercent} 
        showProgress={loading} 
        forceComplete={true} 
      />
    </div>
  );
};

export default MapboxReliableLoader;
