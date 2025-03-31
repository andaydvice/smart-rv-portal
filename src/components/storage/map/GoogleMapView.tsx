
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
  onZoomChange?: (zoom: number) => void;
  selectedState?: string | null;
}

const mapContainerStyle = {
  width: '100%',
  height: '650px',
  borderRadius: '0.5rem',
  overflow: 'hidden',
};

// Define a mapping of states to their approximate center coordinates
const stateCoordinates: Record<string, { lat: number; lng: number; zoom: number }> = {
  "Arizona": { lat: 34.0489, lng: -111.0937, zoom: 6 },
  "California": { lat: 36.7783, lng: -119.4179, zoom: 5.5 },
  "Colorado": { lat: 39.5501, lng: -105.7821, zoom: 6 },
  "Texas": { lat: 31.9686, lng: -99.9018, zoom: 5.5 },
  "Florida": { lat: 27.6648, lng: -81.5158, zoom: 6 },
  "Nevada": { lat: 38.8026, lng: -116.4194, zoom: 6 },
  "Georgia": { lat: 32.1656, lng: -82.9001, zoom: 6 },
  "Iowa": { lat: 41.8780, lng: -93.0977, zoom: 6 },
  "Minnesota": { lat: 46.7296, lng: -94.6859, zoom: 6 },
  "Wisconsin": { lat: 44.2563, lng: -89.6385, zoom: 6 },
  "Oregon": { lat: 43.8041, lng: -120.5542, zoom: 6 },
  "Pennsylvania": { lat: 41.2033, lng: -77.1945, zoom: 6 },
  "New York": { lat: 43.2994, lng: -74.2179, zoom: 6 },
  "Ohio": { lat: 40.4173, lng: -82.9071, zoom: 6 },
  "Indiana": { lat: 40.2672, lng: -86.1349, zoom: 6 }
};

const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey = 'AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o', // Use the provided API key as default
  center = { lat: 39.8283, lng: -98.5795 }, // Center of the US
  zoom = 4,
  onZoomChange,
  selectedState
}) => {
  const [selectedFacility, setSelectedFacility] = useState<StorageFacility | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(zoom);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(zoom);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Update map center and zoom when selectedState changes
  useEffect(() => {
    if (selectedState && stateCoordinates[selectedState]) {
      const stateLocation = stateCoordinates[selectedState];
      setMapCenter({ lat: stateLocation.lat, lng: stateLocation.lng });
      setMapZoom(stateLocation.zoom);
      
      // If map is already loaded, pan to the new location
      if (mapRef) {
        mapRef.panTo({ lat: stateLocation.lat, lng: stateLocation.lng });
        mapRef.setZoom(stateLocation.zoom);
      }
    } else if (!selectedState) {
      // Reset to default view when no state is selected
      setMapCenter(center);
      setMapZoom(zoom);
      
      if (mapRef) {
        mapRef.panTo(center);
        mapRef.setZoom(zoom);
      }
    }
  }, [selectedState, mapRef]);

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

  // Track zoom level changes
  useEffect(() => {
    if (!mapRef) return;
    
    const listener = mapRef.addListener('zoom_changed', () => {
      if (mapRef) {
        const newZoom = mapRef.getZoom() || zoom;
        setCurrentZoom(newZoom);
        
        // Call the onZoomChange callback if provided
        if (onZoomChange) {
          onZoomChange(newZoom);
        }
      }
    });
    
    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [mapRef, zoom, onZoomChange]);

  // Check if a facility is in the recently viewed list
  const isRecentlyViewed = (facilityId: string) => {
    return recentlyViewedFacilityIds.includes(facilityId);
  };
  
  // Determine marker color based on status and zoom level
  const getMarkerColor = (facilityId: string, isSelected: boolean) => {
    // If selected, always green
    if (isSelected) return '#10B981';
    // If recently viewed, always highlight color
    if (isRecentlyViewed(facilityId)) return '#10B981';
    // If current zoom is close-up (> 10), show green
    if (currentZoom > 10) return '#10B981';
    // Default color
    return '#F97316';
  };

  // Handle map load event
  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    setCurrentZoom(map.getZoom() || mapZoom);
    
    // Use state-specific coordinates if a state is selected
    if (selectedState && stateCoordinates[selectedState]) {
      const stateLocation = stateCoordinates[selectedState];
      map.panTo({ lat: stateLocation.lat, lng: stateLocation.lng });
      map.setZoom(stateLocation.zoom);
    }
    // Otherwise, if facilities are present, fit the map to them
    else if (facilities.length > 0) {
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

  // Helper function to render ratings stars
  const renderRatingStars = (rating?: number) => {
    if (!rating) return null;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300';
      stars.push(
        <span key={i} className={`${starClass} text-lg`}>★</span>
      );
    }
    
    return (
      <div className="flex items-center mt-1">
        {stars}
        <span className="ml-1 text-sm">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="w-full h-[650px] relative rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
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
              scale: isRecentlyViewed(facility.id) || selectedFacility?.id === facility.id || currentZoom > 10 ? 12 : 10,
              fillColor: getMarkerColor(facility.id, selectedFacility?.id === facility.id),
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
            <div className="facility-info-window max-w-[300px] bg-[#131a2a] text-white p-4 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-1 text-[#5B9BD5] break-words whitespace-normal max-w-full overflow-visible">{selectedFacility.name}</h3>
              
              {/* Rating display */}
              {renderRatingStars(selectedFacility.avg_rating as number)}
              
              {/* Review count */}
              {selectedFacility.review_count && selectedFacility.review_count > 0 && (
                <p className="text-xs text-gray-400 mb-2">
                  {selectedFacility.review_count} {selectedFacility.review_count === 1 ? 'review' : 'reviews'}
                </p>
              )}
              
              <div className="space-y-1 text-sm text-white">
                <p className="break-words">{selectedFacility.address}</p>
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
                <div className="mt-2 border-t border-gray-700 pt-2">
                  <p className="text-xs text-gray-400 mb-1">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedFacility.features.indoor && (
                      <span className="text-xs bg-[#1d2434] text-[#60A5FA] px-2 py-0.5 rounded">Indoor</span>
                    )}
                    {selectedFacility.features.climate_controlled && (
                      <span className="text-xs bg-[#1d2434] text-[#60A5FA] px-2 py-0.5 rounded">Climate Controlled</span>
                    )}
                    {selectedFacility.features["24h_access"] && (
                      <span className="text-xs bg-[#1d2434] text-[#60A5FA] px-2 py-0.5 rounded">24/7 Access</span>
                    )}
                    {selectedFacility.features.security_system && (
                      <span className="text-xs bg-[#1d2434] text-[#60A5FA] px-2 py-0.5 rounded">Security</span>
                    )}
                    {selectedFacility.features.vehicle_washing && (
                      <span className="text-xs bg-[#1d2434] text-[#60A5FA] px-2 py-0.5 rounded">Vehicle Washing</span>
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
            <div className={`w-3 h-3 rounded-full ${currentZoom > 10 ? 'bg-green-500' : isRecentlyViewed(selectedFacility.id) ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <span className="text-white text-sm">{selectedFacility.name}</span>
          </div>
        </div>
      )}
      
      {/* Zoom level indicator for debugging */}
      <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">
        Zoom: {currentZoom.toFixed(1)}
      </div>
    </div>
  );
};

export default GoogleMapView;
