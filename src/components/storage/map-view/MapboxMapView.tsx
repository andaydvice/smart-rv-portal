
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
  onMapLoad?: (map: mapboxgl.Map) => void;
}

const MapboxMapView: React.FC<MapboxMapViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey,
  onMapLoad
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<{[key: string]: mapboxgl.Marker}>({});

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
      attributionControl: false,
      maxBounds: [[-180, 15], [-30, 72]], // Limit to continental US with padding
      renderWorldCopies: false
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Set up event listeners
    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Call the onMapLoad callback if provided
      if (onMapLoad && map.current) {
        onMapLoad(map.current);
      }
      
      // Dispatch custom event for global access if needed
      document.dispatchEvent(
        new CustomEvent('mapboxgl.map.created', { detail: { map: map.current } })
      );
      
      console.log('Mapbox map loaded successfully');
    });

    // Ensure markers remain visible after style changes or zoom
    map.current.on('zoom', () => {
      refreshMarkerVisibility();
    });

    map.current.on('style.load', () => {
      refreshMarkerVisibility();
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [apiKey, onMapLoad]);

  // Function to ensure all markers are visible
  const refreshMarkerVisibility = useCallback(() => {
    if (!map.current) return;
    
    Object.values(markersRef.current).forEach(marker => {
      const element = marker.getElement();
      if (element) {
        // Force the marker to be visible
        element.style.visibility = 'visible';
        element.style.opacity = '1';
      }
    });
  }, []);

  // Add markers when facilities data changes or map loads
  useEffect(() => {
    if (!map.current || !mapLoaded || facilities.length === 0) return;

    // Clear existing markers first
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Prepare bounds to fit all markers
    const bounds = new mapboxgl.LngLatBounds();
    let hasBounds = false;

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
      el.setAttribute('data-facility-id', facility.id);
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="color: white; padding: 5px;">
            <h3 style="margin: 0; font-size: 14px;">${facility.name}</h3>
            <p style="margin: 5px 0; font-size: 12px;">${facility.city}, ${facility.state}</p>
          </div>
        `);
      
      // Add marker to map
      const lng = Number(facility.longitude);
      const lat = Number(facility.latitude);
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Store marker reference for later use
      markersRef.current[facility.id] = marker;
      
      // Add click handler
      el.addEventListener('click', () => {
        if (onMarkerClick) {
          onMarkerClick(facility.id);
        }
      });

      // Extend bounds to include this marker
      bounds.extend([lng, lat]);
      hasBounds = true;
    });

    // Fit bounds if we have any markers
    if (hasBounds && facilities.length > 1) {
      map.current.fitBounds(bounds, {
        padding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        }
      });
    }

    // Force refresh of marker visibility
    setTimeout(refreshMarkerVisibility, 100);
  }, [facilities, recentlyViewedFacilityIds, mapLoaded, onMarkerClick, refreshMarkerVisibility]);

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
