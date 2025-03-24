
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapLoadingProgress from './MapLoadingProgress';
import { cn } from '@/lib/utils';

interface InfiniteLoadingMapProps {
  mapToken: string;
  centerCoordinates?: [number, number];
  zoomLevel?: number;
  className?: string;
  onMapLoaded?: () => void;
}

const InfiniteLoadingMap: React.FC<InfiniteLoadingMapProps> = ({
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
  
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;
    
    // Initialize Mapbox GL
    mapboxgl.accessToken = mapToken;
    
    try {
      // Create map instance
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: centerCoordinates,
        zoom: zoomLevel,
        attributionControl: false
      });
      
      map.current = mapInstance;
      
      // Track loading progress with more events
      let resourcesLoaded = 0;
      const totalResources = 20; // Arbitrary number for demonstration
      
      const loadEvents = ['styledata', 'sourcedata', 'dataloading', 'data', 'render'];
      
      // Listen to various events to track progress
      loadEvents.forEach(eventName => {
        mapInstance.on(eventName, () => {
          resourcesLoaded++;
          setLoadingPercent(Math.min((resourcesLoaded / totalResources) * 100, 95));
        });
      });
      
      // Map load events
      mapInstance.on('load', () => {
        console.log('Map loaded');
        
        // After map loads, explicitly set loading to 100%
        setLoadingPercent(100);
        
        // Then hide loading screen after a short delay to show 100%
        setTimeout(() => {
          setLoading(false);
          if (onMapLoaded) onMapLoaded();
        }, 800);
      });
      
      // Force completion after timeout
      const forceCompleteTimeout = setTimeout(() => {
        if (loadingPercent < 100) {
          console.log('Forcing load completion after timeout');
          setLoadingPercent(100);
          
          setTimeout(() => {
            setLoading(false);
            if (onMapLoaded) onMapLoaded();
          }, 500);
        }
      }, 8000);
      
      // Add navigation controls
      mapInstance.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      // Clean up on unmount
      return () => {
        clearTimeout(forceCompleteTimeout);
        if (map.current) {
          map.current.remove();
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setLoading(false);
    }
  }, [mapToken, centerCoordinates, zoomLevel, onMapLoaded]);
  
  return (
    <div className={cn("relative w-full h-[600px] rounded-lg overflow-hidden", className)}>
      <div 
        ref={mapContainer} 
        className="w-full h-full" 
      />
      
      <MapLoadingProgress 
        percentLoaded={loadingPercent} 
        showProgress={loading} 
        infiniteLoading={true}
        forceComplete={true}
      />
    </div>
  );
};

// Helper function to combine class names
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default InfiniteLoadingMap;
