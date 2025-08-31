import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface SimplifiedMapboxProps {
  facilities: StorageFacility[];
  onMarkerClick?: (facilityId: string) => void;
  mapToken?: string;
}

export const SimplifiedMapbox: React.FC<SimplifiedMapboxProps> = ({
  facilities,
  onMarkerClick,
  mapToken
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Get token from props or environment
    const token = mapToken || import.meta.env.VITE_MAPBOX_TOKEN;
    
    if (!token || token === 'null' || token === 'undefined') {
      setMapError('Mapbox token not configured. Please add VITE_MAPBOX_TOKEN to your environment.');
      setIsLoading(false);
      return;
    }

    try {
      // Validate token format
      if (!token.startsWith('pk.')) {
        setMapError('Invalid Mapbox token format. Token must start with "pk."');
        setIsLoading(false);
        return;
      }

      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-98.5795, 39.8283], // Center of USA
        zoom: 4,
        attributionControl: true,
        logoPosition: 'bottom-left'
      });

      map.current.on('load', () => {
        console.log('Simplified Mapbox loaded successfully');
        setIsLoading(false);
        addFacilityMarkers();
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError(`Map error: ${e.error?.message || 'Unknown error'}`);
        setIsLoading(false);
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError(`Initialization error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
    }

    return () => {
      // Clear all markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      // Remove map
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapToken]);

  const addFacilityMarkers = () => {
    if (!map.current || !facilities.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const validFacilities = facilities.filter(
      facility => facility.latitude && facility.longitude
    );

    if (validFacilities.length === 0) {
      console.warn('No facilities with valid coordinates found');
      return;
    }

    // Add markers for each facility
    validFacilities.forEach(facility => {
      const marker = new mapboxgl.Marker({
        color: '#5B9BD5'
      })
        .setLngLat([facility.longitude, facility.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-semibold text-sm">${facility.name}</h3>
              <p class="text-xs text-gray-600">${facility.address}</p>
              <p class="text-xs text-gray-500 mt-1">${facility.city}, ${facility.state}</p>
            </div>
          `)
        );

      // Add click handler
      if (onMarkerClick) {
        marker.getElement().addEventListener('click', () => {
          onMarkerClick(facility.id);
        });
      }

      marker.addTo(map.current!);
      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (validFacilities.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      validFacilities.forEach(facility => {
        bounds.extend([facility.longitude, facility.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }

    console.log(`Added ${validFacilities.length} markers to Mapbox`);
  };

  // Update markers when facilities change
  useEffect(() => {
    if (map.current && !isLoading) {
      addFacilityMarkers();
    }
  }, [facilities]);

  if (mapError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Map Error:</strong> {mapError}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-[#080F1F] flex items-center justify-center z-10">
          <div className="text-white">Loading map...</div>
        </div>
      )}
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};