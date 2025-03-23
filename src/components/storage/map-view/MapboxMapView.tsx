
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

    console.log('Initializing Mapbox map with API key:', apiKey.substring(0, 5) + '...');

    // Create new map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 3.5,
      attributionControl: false,
      maxBounds: [[-180, 15], [-30, 72]], // Limit to continental US with padding
      renderWorldCopies: false,
      preserveDrawingBuffer: true,
      failIfMajorPerformanceCaveat: false
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Set up event listeners
    map.current.on('load', () => {
      console.log('Mapbox map loaded successfully');
      setMapLoaded(true);
      
      // Force canvas to be visible
      const canvas = map.current?.getCanvas();
      if (canvas) {
        canvas.style.visibility = 'visible';
        canvas.style.display = 'block';
        canvas.style.opacity = '1';
      }
      
      // Call the onMapLoad callback if provided
      if (onMapLoad && map.current) {
        onMapLoad(map.current);
      }
      
      // Dispatch custom event for global access if needed
      document.dispatchEvent(
        new CustomEvent('mapboxgl.map.created', { detail: { map: map.current } })
      );
    });

    // Ensure markers remain visible after style changes or zoom
    map.current.on('zoom', () => {
      refreshMarkerVisibility();
    });

    map.current.on('style.load', () => {
      refreshMarkerVisibility();
    });

    // Error handler
    map.current.on('error', (e) => {
      console.error('Mapbox error:', e);
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
        element.style.display = 'block';
      }
    });
    
    // Also apply force visibility to all mapboxgl-markers
    document.querySelectorAll('.mapboxgl-marker, .custom-marker, .mapbox-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.visibility = 'visible';
        marker.style.opacity = '1';
        marker.style.display = 'block';
      }
    });
  }, []);

  // Add markers when facilities data changes or map loads
  useEffect(() => {
    if (!map.current || !mapLoaded) {
      console.log('Map not ready yet, waiting for load...');
      return;
    }
    
    if (facilities.length === 0) {
      console.log('No facilities to display on map');
      return;
    }

    console.log(`Adding ${facilities.length} markers to the map`);

    // Clear existing markers first
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Prepare bounds to fit all markers
    const bounds = new mapboxgl.LngLatBounds();
    let hasBounds = false;
    let validMarkerCount = 0;

    // Add markers for each facility
    facilities.forEach(facility => {
      if (!facility.latitude || !facility.longitude) {
        console.warn(`Facility ${facility.id} missing coordinates`);
        return;
      }

      try {
        const isRecentlyViewed = recentlyViewedFacilityIds.includes(facility.id);
        
        // Create marker element
        const el = document.createElement('div');
        el.className = 'mapbox-marker custom-marker';
        el.style.width = isRecentlyViewed ? '16px' : '14px';
        el.style.height = isRecentlyViewed ? '16px' : '14px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = isRecentlyViewed ? '#F59E0B' : '#5B9BD5';
        el.style.border = '2px solid white';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        el.style.visibility = 'visible';
        el.style.display = 'block';
        el.style.opacity = '1';
        el.style.position = 'absolute';
        el.style.zIndex = '999';
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
        
        // Validate coordinates again
        if (isNaN(lng) || isNaN(lat) || lng < -180 || lng > 180 || lat < -90 || lat > 90) {
          console.warn(`Invalid coordinates for facility ${facility.id}: ${lat}, ${lng}`);
          return;
        }
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map.current!);
        
        // Store marker reference for later use
        markersRef.current[facility.id] = marker;
        validMarkerCount++;
        
        // Add click handler
        el.addEventListener('click', () => {
          if (onMarkerClick) {
            onMarkerClick(facility.id);
          }
        });

        // Extend bounds to include this marker
        bounds.extend([lng, lat]);
        hasBounds = true;
      } catch (error) {
        console.error(`Error creating marker for facility ${facility.id}:`, error);
      }
    });

    console.log(`Successfully created ${validMarkerCount} markers`);

    // Fit bounds if we have any markers
    if (hasBounds && validMarkerCount > 1) {
      try {
        map.current.fitBounds(bounds, {
          padding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
          },
          maxZoom: 15
        });
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    } else if (validMarkerCount === 1) {
      // If only one facility, center on it
      const facility = facilities.find(f => f.latitude && f.longitude);
      if (facility) {
        map.current.flyTo({
          center: [Number(facility.longitude), Number(facility.latitude)],
          zoom: 10
        });
      }
    }

    // Force refresh of marker visibility with multiple attempts
    setTimeout(refreshMarkerVisibility, 100);
    setTimeout(refreshMarkerVisibility, 500);
    setTimeout(refreshMarkerVisibility, 1000);
  }, [facilities, recentlyViewedFacilityIds, mapLoaded, onMarkerClick, refreshMarkerVisibility]);

  return (
    <Card className="h-[650px] bg-[#080F1F] relative overflow-hidden border-gray-700">
      {!apiKey ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>Mapbox API key is required. Please provide a valid API key.</p>
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-full" style={{ overflow: 'visible' }} />
      )}
      
      {/* Marker count indicator */}
      {mapLoaded && facilities.length > 0 && (
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          Markers: {Object.keys(markersRef.current).length} / {facilities.length}
        </div>
      )}
    </Card>
  );
};

export default MapboxMapView;
