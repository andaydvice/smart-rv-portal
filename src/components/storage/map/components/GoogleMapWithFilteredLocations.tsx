
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Card } from '@/components/ui/card';
import { Flag, MapPin, Navigation } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  icon: {
    url: string;
  };
}

interface GoogleMapWithFilteredLocationsProps {
  locations: Location[];
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  onLocationSelect?: (locationId: number) => void;
  className?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const GoogleMapWithFilteredLocations: React.FC<GoogleMapWithFilteredLocationsProps> = ({
  locations,
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  center = { lat: 39.8283, lng: -98.5795 }, // Center of the US
  zoom = 4,
  onLocationSelect,
  className = ''
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Function to handle location selection
  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    
    // Call the onLocationSelect callback if provided
    if (onLocationSelect) {
      onLocationSelect(location.id);
    }

    // If we have a map reference, adjust center to show the selected location
    if (mapRef) {
      mapRef.panTo({ lat: location.latitude, lng: location.longitude });
      mapRef.setZoom(Math.max(mapRef.getZoom() || zoom, 10));
    }
  };

  // Determine if an icon should be orange based on its URL
  const shouldBeOrange = (iconUrl: string): boolean => {
    const lowerUrl = iconUrl.toLowerCase();
    return lowerUrl.includes('orange') || lowerUrl.includes('red');
  };

  // Create a marker element for each location
  const getMarkerIcon = (location: Location) => {
    const isOrange = shouldBeOrange(location.icon.url);
    
    if (isOrange) {
      // Use an orange svg marker for orange or red icons
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#F97316', // Orange color
        fillOpacity: 1,
        scale: 10,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
      };
    }
    
    // Default marker for non-orange icons
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#3B82F6', // Blue color
      fillOpacity: 1,
      scale: 10,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
    };
  };

  // Create SVG marker icon
  const createSvgMarker = (iconPath: string, isOrange: boolean): google.maps.Symbol => {
    return {
      path: iconPath,
      fillColor: isOrange ? '#F97316' : '#3B82F6',
      fillOpacity: 1,
      scale: 1.5,
      strokeColor: '#FFFFFF',
      strokeWeight: 1,
      anchor: new google.maps.Point(12, 24),
    };
  };

  // Handle map load event
  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    
    // Create bounds to fit all markers
    if (locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      locations.forEach(location => {
        bounds.extend({
          lat: location.latitude,
          lng: location.longitude,
        });
      });
      
      // Adjust the bounds
      map.fitBounds(bounds, {
        top: 50, 
        right: 50, 
        bottom: 50, 
        left: 50
      });
    }
  };

  if (loadError) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <div className="w-full h-full flex items-center justify-center bg-[#080F1F] text-white p-4">
          <p>Error loading Google Maps. Please check your API key.</p>
        </div>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <div className="w-full h-full flex items-center justify-center bg-[#080F1F] text-white">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 border-t-2 border-r-2 border-[#5B9BD5] rounded-full animate-spin mx-auto"></div>
            <p>Loading Map...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="w-full h-full relative">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          onLoad={onMapLoad}
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
          }}
        >
          {/* Render Markers */}
          {locations.map((location) => {
            const isOrange = shouldBeOrange(location.icon.url);
            
            return (
              <MarkerF
                key={`marker-${location.id}`}
                position={{
                  lat: location.latitude,
                  lng: location.longitude,
                }}
                onClick={() => handleLocationClick(location)}
                icon={getMarkerIcon(location)}
                animation={google.maps.Animation.DROP}
                title={location.name}
              />
            );
          })}
        </GoogleMap>
        
        {/* Location highlight indicators below map */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full z-10">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${shouldBeOrange(selectedLocation.icon.url) ? 'bg-[#F97316]' : 'bg-[#3B82F6]'}`}></div>
              <span className="text-white text-sm">{selectedLocation.name}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GoogleMapWithFilteredLocations;
