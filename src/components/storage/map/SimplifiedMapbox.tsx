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
    // Add global styles for popups
    const styleId = 'facility-popup-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .facility-popup .mapboxgl-popup-content {
          background: #131a2a !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
          border: 1px solid rgba(91, 155, 213, 0.3) !important;
          padding: 0 !important;
          min-width: 300px !important;
          max-width: 400px !important;
        }
        
        .facility-popup .mapboxgl-popup-close-button {
          background: #5B9BD5 !important;
          color: white !important;
          border-radius: 50% !important;
          width: 24px !important;
          height: 24px !important;
          font-size: 16px !important;
          top: 8px !important;
          right: 8px !important;
        }
        
        .facility-popup .mapboxgl-popup-tip {
          border-top-color: #131a2a !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

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
          new mapboxgl.Popup({ 
            offset: 25,
            maxWidth: '400px',
            className: 'facility-popup'
          }).setHTML(`
            <div class="facility-popup-content" style="min-width: 300px; max-width: 400px; padding: 16px;">
              <div style="border-bottom: 2px solid #5B9BD5; padding-bottom: 12px; margin-bottom: 12px;">
                <h3 style="font-size: 18px; font-weight: bold; color: #5B9BD5; margin: 0;">${facility.name}</h3>
              </div>
              
              <div style="margin-bottom: 8px;">
                <p style="margin: 0; color: #E2E8FF; font-size: 14px; line-height: 1.4;">📍 ${facility.address}</p>
              </div>
              
              <div style="margin-bottom: 12px;">
                <p style="margin: 0; color: #E2E8FF; font-size: 14px;">📍 ${facility.city}, ${facility.state}</p>
              </div>
              
              ${facility.features ? `
                <div style="margin-top: 16px;">
                  <h4 style="font-size: 12px; font-weight: bold; color: #5B9BD5; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Features</h4>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${Array.isArray(facility.features) ? 
                      facility.features.map(feature => 
                        `<span style="background: rgba(91, 155, 213, 0.2); color: #5B9BD5; padding: 4px 8px; border-radius: 12px; font-size: 11px; border: 1px solid rgba(91, 155, 213, 0.3);">${feature}</span>`
                      ).join('') : 
                      Object.entries(facility.features).filter(([key, value]) => value).map(([key, value]) => {
                        const featureNames = {
                          'indoor': 'Indoor',
                          'climate_controlled': 'Climate Controlled',
                          '24h_access': '24/7 Access',
                          'security_system': 'Security',
                          'vehicle_washing': 'Vehicle Washing'
                        };
                        return `<span style="background: rgba(91, 155, 213, 0.2); color: #5B9BD5; padding: 4px 8px; border-radius: 12px; font-size: 11px; border: 1px solid rgba(91, 155, 213, 0.3);">${featureNames[key] || key}</span>`;
                      }).join('')
                    }
                  </div>
                </div>
              ` : ''}
              
              <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(91, 155, 213, 0.2);">
                <button onclick="window.location.href='/storage-facilities/${facility.id}'" style="background: #5B9BD5; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer; width: 100%;">
                  View Details
                </button>
              </div>
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