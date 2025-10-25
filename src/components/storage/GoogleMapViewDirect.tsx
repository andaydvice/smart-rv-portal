import React, { useEffect, useRef, useState } from 'react';
import { StorageFacility } from './types';
import { useGoogleMapsScript } from '@/components/map/hooks/useGoogleMapsScript';

interface GoogleMapViewDirectProps {
  facilities: StorageFacility[];
  apiKey?: string;
  onMarkerClick?: (facilityId: string) => void;
}

const GoogleMapViewDirect: React.FC<GoogleMapViewDirectProps> = ({
  facilities,
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  onMarkerClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { isLoaded, error } = useGoogleMapsScript({ apiKey });

  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    // Initialize map
    const googleMap = new google.maps.Map(mapRef.current, {
      center: { lat: 39.8283, lng: -98.5795 },
      zoom: 4,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#746855" }]
        }
      ]
    });

    setMap(googleMap);
  }, [isLoaded, map]);

  useEffect(() => {
    if (!map || !facilities) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    facilities.forEach(facility => {
      if (!facility.latitude || !facility.longitude) return;

      const marker = new google.maps.Marker({
        position: {
          lat: Number(facility.latitude),
          lng: Number(facility.longitude)
        },
        map: map,
        title: facility.name,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.webp'
        }
      });

      marker.addListener('click', () => {
        if (onMarkerClick) {
          onMarkerClick(facility.id);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markersRef.current.forEach(marker => {
        const position = marker.getPosition();
        if (position) bounds.extend(position);
      });
      map.fitBounds(bounds);
    }
  }, [map, facilities, onMarkerClick]);

  if (error || !apiKey) {
    const errorMsg = !apiKey ? 'Google Maps API key missing from environment' : error;
    return (
      <div className="w-full h-[650px] flex items-center justify-center bg-[#080F1F] text-white rounded-lg">
        <div className="text-center space-y-4">
          <p className="text-red-400">{errorMsg}</p>
          <p className="text-sm text-gray-400">Set VITE_GOOGLE_MAPS_API_KEY environment variable</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[650px] flex items-center justify-center bg-[#080F1F] text-white rounded-lg">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border-t-2 border-r-2 border-[#5B9BD5] rounded-full animate-spin mx-auto"></div>
          <p>Loading Google Maps (Direct)...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[650px] rounded-lg"
      style={{ minHeight: '650px' }}
    />
  );
};

export default GoogleMapViewDirect;