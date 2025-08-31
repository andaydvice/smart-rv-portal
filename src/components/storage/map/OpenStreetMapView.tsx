import React, { useEffect, useRef } from 'react';
import { StorageFacility } from '../types';

interface OpenStreetMapViewProps {
  facilities: StorageFacility[];
  onMarkerClick?: (facilityId: string) => void;
  selectedState?: string | null;
}

// Use CDN for Leaflet to avoid package issues
declare global {
  interface Window {
    L: any;
  }
}

const OpenStreetMapView: React.FC<OpenStreetMapViewProps> = ({
  facilities,
  onMarkerClick,
  selectedState
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Initialize map centered on USA
      const map = window.L.map(mapRef.current).setView([39.8283, -98.5795], 4);

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
      addMarkers();
    }

    function addMarkers() {
      if (!mapInstanceRef.current || !window.L) return;

      // Clear existing markers
      markersRef.current.forEach(marker => {
        mapInstanceRef.current.removeLayer(marker);
      });
      markersRef.current = [];

      // Add facility markers
      facilities.forEach(facility => {
        if (!facility.latitude || !facility.longitude) return;

        const marker = window.L.marker([
          Number(facility.latitude),
          Number(facility.longitude)
        ]).addTo(mapInstanceRef.current);

        // Create popup content
        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 8px;">${facility.name}</h3>
            <p style="color: #666; margin-bottom: 4px;">${facility.address}</p>
            <p style="color: #666; margin-bottom: 8px;">${facility.city}, ${facility.state}</p>
            ${facility.phone ? `<p style="color: #666;">📞 ${facility.phone}</p>` : ''}
            <button 
              onclick="window.dispatchEvent(new CustomEvent('facility-click', { detail: '${facility.id}' }))"
              style="margin-top: 8px; padding: 4px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
            >
              View Details
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);
        markersRef.current.push(marker);
      });

      // Fit bounds to show all markers
      if (markersRef.current.length > 0) {
        const group = window.L.featureGroup(markersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    }

    // Listen for facility click events from popups
    const handleFacilityClick = (event: CustomEvent) => {
      if (onMarkerClick) {
        onMarkerClick(event.detail);
      }
    };

    window.addEventListener('facility-click', handleFacilityClick as any);

    return () => {
      window.removeEventListener('facility-click', handleFacilityClick as any);
      // Don't destroy map on cleanup as it might be reused
    };
  }, [facilities, onMarkerClick]);

  // Update markers when facilities change
  useEffect(() => {
    if (mapInstanceRef.current && window.L) {
      // Clear existing markers
      markersRef.current.forEach(marker => {
        mapInstanceRef.current.removeLayer(marker);
      });
      markersRef.current = [];

      // Add new markers
      facilities.forEach(facility => {
        if (!facility.latitude || !facility.longitude) return;

        const marker = window.L.marker([
          Number(facility.latitude),
          Number(facility.longitude)
        ]).addTo(mapInstanceRef.current);

        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 8px;">${facility.name}</h3>
            <p style="color: #666; margin-bottom: 4px;">${facility.address}</p>
            <p style="color: #666; margin-bottom: 8px;">${facility.city}, ${facility.state}</p>
            ${facility.phone ? `<p style="color: #666;">📞 ${facility.phone}</p>` : ''}
            <button 
              onclick="window.dispatchEvent(new CustomEvent('facility-click', { detail: '${facility.id}' }))"
              style="margin-top: 8px; padding: 4px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
            >
              View Details
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);
        markersRef.current.push(marker);
      });

      // Fit bounds if we have markers
      if (markersRef.current.length > 0) {
        const group = window.L.featureGroup(markersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    }
  }, [facilities]);

  return (
    <div className="relative w-full h-[650px] bg-[#080F1F] rounded-lg overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ minHeight: '650px' }}
      />
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
        OpenStreetMap • {facilities.length} locations
      </div>
    </div>
  );
};

export default OpenStreetMapView;