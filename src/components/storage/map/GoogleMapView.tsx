
import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindowF } from '@react-google-maps/api';
import { useGoogleMaps } from '@/components/map/hooks/useGoogleMaps';
import { StorageFacility } from '../types';
import FacilityMarker from './components/FacilityMarker';
import InfoWindow from './components/InfoWindow';
import MapControls from './components/MapControls';
import { stateCoordinates } from './utils/stateCoordinates';

interface GoogleMapViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  selectedState?: string | null;
}

const mapContainerStyle = {
  width: '100%',
  height: '650px',
  borderRadius: '0.5rem',
  overflow: 'hidden',
};

const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  center = { lat: 39.8283, lng: -98.5795 },
  zoom = 4,
  onZoomChange,
  selectedState
}) => {
  const [selectedFacility, setSelectedFacility] = useState<StorageFacility | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(zoom);
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(zoom);

  // Debug API key and check for issues
  useEffect(() => {
    console.log('GoogleMapView - API Key:', apiKey ? 'Present' : 'Missing', apiKey?.substring(0, 10) + '...');
    
    // Check if running on localhost or production
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
    const isDevelopment = window.location.hostname.includes('lovable') || 
                         window.location.hostname.includes('preview');
    
    console.log('GoogleMapView - Environment:', {
      hostname: window.location.hostname,
      isLocalhost,
      isDevelopment,
      protocol: window.location.protocol
    });
  }, [apiKey]);
  
  const { isLoaded, error, detailedError } = useGoogleMaps({ apiKey });

  // Update map center and zoom when selectedState changes
  useEffect(() => {
    if (selectedState && stateCoordinates[selectedState]) {
      const stateLocation = stateCoordinates[selectedState];
      setMapCenter({ lat: stateLocation.lat, lng: stateLocation.lng });
      setMapZoom(stateLocation.zoom);
      
      if (mapRef) {
        mapRef.panTo({ lat: stateLocation.lat, lng: stateLocation.lng });
        mapRef.setZoom(stateLocation.zoom);
      }
    } else if (!selectedState) {
      setMapCenter(center);
      setMapZoom(zoom);
      
      if (mapRef) {
        mapRef.panTo(center);
        mapRef.setZoom(zoom);
      }
    }
  }, [selectedState, mapRef]);

  const handleMarkerClick = (facility: StorageFacility) => {
    setSelectedFacility(facility);
    
    if (onMarkerClick) {
      onMarkerClick(facility.id);
    }

    if (mapRef) {
      const position = { lat: Number(facility.latitude), lng: Number(facility.longitude) };
      mapRef.panTo(position);
      
      setTimeout(() => {
        if (mapRef) {
          const currentCenter = mapRef.getCenter()?.toJSON();
          if (currentCenter) {
            mapRef.panTo({
              lat: currentCenter.lat - 0.015,
              lng: currentCenter.lng,
            });
          }
        }
      }, 50);
    }
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    setCurrentZoom(map.getZoom() || mapZoom);
    
    if (selectedState && stateCoordinates[selectedState]) {
      const stateLocation = stateCoordinates[selectedState];
      map.panTo({ lat: stateLocation.lat, lng: stateLocation.lng });
      map.setZoom(stateLocation.zoom);
    }
    else if (facilities.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      facilities.forEach(facility => {
        bounds.extend({
          lat: Number(facility.latitude),
          lng: Number(facility.longitude),
        });
      });
      
      map.fitBounds(bounds, {
        top: 50, 
        right: 50, 
        bottom: 50, 
        left: 50
      });
      
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() && map.getZoom() > 15) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }
  };

  if (error || !apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#080F1F] text-white p-6 rounded-lg border-2 border-red-500/30">
        <div className="max-w-2xl space-y-6">
          {/* Error Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-2">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-400">Google Maps Failed to Load</h3>
            <p className="text-gray-300">{error || 'Unknown error occurred'}</p>
          </div>

          {/* Detailed Error Info */}
          {detailedError && (
            <div className="bg-[#151A22] rounded-lg p-4 space-y-3 border border-[#5B9BD5]/20">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400">Error Type:</span>
                  <span className="ml-2 text-white font-mono">{detailedError.type}</span>
                </div>
                <div>
                  <span className="text-gray-400">Current Domain:</span>
                  <span className="ml-2 text-white font-mono">{detailedError.hostname}</span>
                </div>
                <div>
                  <span className="text-gray-400">API Key:</span>
                  <span className="ml-2 text-white font-mono">
                    {detailedError.apiKeyPresent ? '✓ Present' : '✗ Missing'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">API Key Value:</span>
                  <span className="ml-2 text-white font-mono text-xs">
                    {apiKey ? apiKey.substring(0, 20) + '...' : 'Not set'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Solutions */}
          <div className="bg-[#151A22] rounded-lg p-4 space-y-3 border border-yellow-500/30">
            <h4 className="font-semibold text-yellow-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How to Fix This
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
              <li>
                <strong className="text-white">Enable Maps JavaScript API</strong>
                <p className="ml-5 mt-1 text-xs text-gray-400">
                  Go to APIs & Services → Library → Search "Maps JavaScript API" → Enable
                </p>
              </li>
              <li>
                <strong className="text-white">Add Domain to API Key Restrictions</strong>
                <p className="ml-5 mt-1 text-xs text-gray-400">
                  Add: <code className="bg-[#080F1F] px-1 py-0.5 rounded">*.lovable.app/*</code>, 
                  <code className="bg-[#080F1F] px-1 py-0.5 rounded ml-1">*.lovable.dev/*</code>, 
                  <code className="bg-[#080F1F] px-1 py-0.5 rounded ml-1">localhost:*</code>
                </p>
              </li>
              <li>
                <strong className="text-white">Enable Billing</strong>
                <p className="ml-5 mt-1 text-xs text-gray-400">
                  Google Maps requires billing to be enabled (includes free tier)
                </p>
              </li>
              <li>
                <strong className="text-white">Check API Quotas</strong>
                <p className="ml-5 mt-1 text-xs text-gray-400">
                  Verify you haven't exceeded daily API limits
                </p>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <a
              href="https://console.cloud.google.com/google/maps-apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white rounded-lg transition-colors font-medium"
            >
              Open Google Cloud Console
            </a>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-[#151A22] hover:bg-[#1d2434] text-white border border-[#5B9BD5]/40 rounded-lg transition-colors"
            >
              Retry Loading Map
            </button>
          </div>

          {/* Fallback Notice */}
          <div className="text-center text-xs text-gray-500">
            <p>The app will automatically use Mapbox as a fallback map provider</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[650px] flex items-center justify-center bg-[#080F1F] text-white rounded-lg">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border-t-2 border-r-2 border-[#5B9BD5] rounded-full animate-spin mx-auto"></div>
          <p>Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[650px] relative rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={onMapLoad}
        onClick={() => setSelectedFacility(null)}
        options={{
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#242f3e' }],
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#242f3e' }, { lightness: -80 }],
            },
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }, { lightness: 40 }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }],
            },
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          maxZoom: 18,
        }}
      >
        {facilities.map((facility) => (
          <FacilityMarker
            key={`marker-${facility.id}`}
            position={{
              lat: Number(facility.latitude),
              lng: Number(facility.longitude),
            }}
            isHighlighted={selectedFacility?.id === facility.id}
            currentZoom={currentZoom}
            onClick={() => handleMarkerClick(facility)}
          />
        ))}

        {selectedFacility && (
          <InfoWindowF
            position={{
              lat: Number(selectedFacility.latitude),
              lng: Number(selectedFacility.longitude),
            }}
            onCloseClick={() => setSelectedFacility(null)}
            options={{
              pixelOffset: new google.maps.Size(0, -30),
              maxWidth: 320,
            }}
          >
            <InfoWindow
              facility={selectedFacility}
              onClose={() => setSelectedFacility(null)}
            />
          </InfoWindowF>
        )}

        <MapControls
          currentZoom={currentZoom}
          selectedFacility={selectedFacility}
          isZoomedIn={currentZoom > 10}
        />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapView;
