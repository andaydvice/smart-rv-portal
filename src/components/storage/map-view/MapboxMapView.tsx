
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
}

const MapboxMapView: React.FC<MapboxMapViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map when component mounts
  useEffect(() => {
    if (!apiKey || map.current || !mapContainer.current) return;

    // Set Mapbox access token
    mapboxgl.accessToken = apiKey;

    // Create new map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 3.5,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Set up event listeners
    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Dispatch custom event for global access if needed
      document.dispatchEvent(
        new CustomEvent('mapboxgl.map.created', { detail: { map: map.current } })
      );
      
      console.log('Mapbox map loaded successfully');
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [apiKey]);

  // Add markers when facilities data changes or map loads
  useEffect(() => {
    if (!map.current || !mapLoaded || facilities.length === 0) return;

    // Clear existing markers first
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add markers for each facility
    facilities.forEach(facility => {
      if (!facility.latitude || !facility.longitude) return;

      const isRecentlyViewed = recentlyViewedFacilityIds.includes(facility.id);
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'mapbox-marker';
      el.style.width = isRecentlyViewed ? '16px' : '14px';
      el.style.height = isRecentlyViewed ? '16px' : '14px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = isRecentlyViewed ? '#F59E0B' : '#5B9BD5';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="color: white; padding: 5px;">
            <h3 style="margin: 0; font-size: 14px;">${facility.name}</h3>
            <p style="margin: 5px 0; font-size: 12px;">${facility.city}, ${facility.state}</p>
          </div>
        `);
      
      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([Number(facility.longitude), Number(facility.latitude)])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Add click handler
      el.addEventListener('click', () => {
        if (onMarkerClick) {
          onMarkerClick(facility.id);
        }
      });
    });
  }, [facilities, recentlyViewedFacilityIds, mapLoaded, onMarkerClick]);

  return (
    <Card className="h-[650px] bg-[#080F1F] relative overflow-hidden border-gray-700">
      {!apiKey ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>Mapbox API key is required. Please provide a valid API key.</p>
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-full" />
      )}
    </Card>
  );
};

export default MapboxMapView;
