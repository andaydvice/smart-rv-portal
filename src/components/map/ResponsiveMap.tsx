
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { enableEdgeAwareMarkers } from '@/utils/markers/forcing/edge-aware';

interface MapData {
  features: Array<{
    id: string;
    coordinates: [number, number];
    properties: Record<string, any>;
  }>;
}

interface ResponsiveMapProps {
  mapData: MapData;
  centerCoordinates: [number, number];
  zoomLevel: number;
  mapToken?: string;
  onMarkerClick?: (featureId: string) => void;
}

const ResponsiveMap: React.FC<ResponsiveMapProps> = ({
  mapData,
  centerCoordinates,
  zoomLevel,
  mapToken,
  onMarkerClick
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: centerCoordinates,
      zoom: zoomLevel,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
        showCompass: true,
      }),
      'top-right'
    );

    // Handle map load event
    map.current.on('load', () => {
      setMapLoaded(true);
      console.log('Map loaded successfully');
      
      // Enable edge-aware behavior for markers
      if (map.current) {
        enableEdgeAwareMarkers(map.current);
      }
    });

    // Cleanup on unmount
    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [mapToken, centerCoordinates, zoomLevel]);

  // Create markers when map is loaded and mapData changes
  useEffect(() => {
    if (!map.current || !mapLoaded || !mapData.features) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    mapData.features.forEach(feature => {
      const { id, coordinates, properties } = feature;
      
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.setAttribute('data-feature-id', id);
      
      // Create new marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(coordinates)
        .addTo(map.current!);
      
      // Add click handler
      markerElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (onMarkerClick) {
          onMarkerClick(id);
        }
      });
      
      markers.current.push(marker);
    });
    
    // Fit map to bounds if multiple markers
    if (mapData.features.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      
      mapData.features.forEach(feature => {
        bounds.extend(feature.coordinates);
      });
      
      map.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 15
      });
    }
    
  }, [mapData, mapLoaded, onMarkerClick]);

  return (
    <div className="responsive-map-container w-full max-w-7xl mx-auto overflow-hidden rounded-lg">
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] md:h-[600px] lg:h-[650px] relative overflow-visible"
        style={{ overflow: 'visible' }} // Important to prevent marker clipping
      />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">Loading map...</div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveMap;
