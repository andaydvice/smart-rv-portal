
import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { StorageFacility } from '../types';

interface GoogleMapViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
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
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  center = { lat: 39.8283, lng: -98.5795 }, // Center of the US
  zoom = 4,
}) => {
  const [selectedFacility, setSelectedFacility] = useState<StorageFacility | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Function to handle marker click
  const handleMarkerClick = (facility: StorageFacility) => {
    setSelectedFacility(facility);
    
    // Call the onMarkerClick callback if provided
    if (onMarkerClick) {
      onMarkerClick(facility.id);
    }

    // If we have a map reference, adjust the center to show the info window properly
    if (mapRef) {
      const position = { lat: Number(facility.latitude), lng: Number(facility.longitude) };
      mapRef.panTo(position);
      
      // Add slight offset to ensure infowindow is fully visible
      setTimeout(() => {
        if (mapRef) {
          const currentCenter = mapRef.getCenter()?.toJSON();
          if (currentCenter) {
            mapRef.panTo({
              lat: currentCenter.lat - 0.015, // Slight offset upward
              lng: currentCenter.lng,
            });
          }
        }
      }, 50);
    }
  };

  // Check if a facility is in the recently viewed list
  const isRecentlyViewed = (facilityId: string) => {
    return recentlyViewedFacilityIds.includes(facilityId);
  };

  // Handle map load event
  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    
    // Create bounds to fit all markers
    if (facilities.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      facilities.forEach(facility => {
        bounds.extend({
          lat: Number(facility.latitude),
          lng: Number(facility.longitude),
        });
      });
      
      // Adjust the bounds fitting to avoid zooming too far in for single markers
      map.fitBounds(bounds, {
        top: 50, 
        right: 50, 
        bottom: 50, 
        left: 50
      });
      
      // Limit the maximum zoom level
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() && map.getZoom() > 15) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }
  };

  // Close info window when clicking on the map
  const onMapClick = () => {
    setSelectedFacility(null);
  };

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#080F1F] text-white p-4 rounded-lg">
        <p>Error loading Google Maps. Please check your API key.</p>
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
        center={center}
        zoom={zoom}
        onLoad={onMapLoad}
        onClick={onMapClick}
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
        {/* Render Markers */}
        {facilities.map((facility) => (
          <MarkerF
            key={`marker-${facility.id}`}
            position={{
              lat: Number(facility.latitude),
              lng: Number(facility.longitude),
            }}
            onClick={() => handleMarkerClick(facility)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: isRecentlyViewed(facility.id) ? 12 : 10,
              fillColor: isRecentlyViewed(facility.id) ? '#10B981' : '#F97316',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
            }}
            animation={google.maps.Animation.DROP}
          />
        ))}

        {/* Info Window for Selected Facility */}
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
            <div className="facility-info-window max-w-[300px]">
              <h3 className="text-lg font-semibold mb-1 text-[#5B9BD5]">{selectedFacility.name}</h3>
              <div className="space-y-1 text-sm">
                <p>{selectedFacility.address}</p>
                <p>{selectedFacility.city}, {selectedFacility.state}</p>
                {selectedFacility.price_range && (
                  <p className="mt-2 font-semibold text-[#F97316]">
                    Price: ${selectedFacility.price_range.min} - ${selectedFacility.price_range.max}
                  </p>
                )}
                {selectedFacility.contact_phone && (
                  <p className="mt-1">Phone: {selectedFacility.contact_phone}</p>
                )}
              </div>
              
              {selectedFacility.features && Object.values(selectedFacility.features).some(v => v) && (
                <div className="mt-2 border-t border-gray-300 pt-2">
                  <p className="text-xs text-gray-600 mb-1">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedFacility.features.indoor && (
                      <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">Indoor</span>
                    )}
                    {selectedFacility.features.climate_controlled && (
                      <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">Climate Controlled</span>
                    )}
                    {selectedFacility.features["24h_access"] && (
                      <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">24/7 Access</span>
                    )}
                    {selectedFacility.features.security_system && (
                      <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">Security</span>
                    )}
                    {selectedFacility.features.vehicle_washing && (
                      <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">Vehicle Washing</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
      
      {/* Facility highlight indicators below map */}
      {selectedFacility && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full z-10">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isRecentlyViewed(selectedFacility.id) ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <span className="text-white text-sm">{selectedFacility.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapView;
