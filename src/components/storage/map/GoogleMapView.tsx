
import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: '#080F1F', // Add background color to the map container
};

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795, // Center of the US
};

const defaultOptions = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#000000' }, { lightness: 13 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#144b53' }, { lightness: 14 }, { weight: 1.4 }],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [{ color: '#08304b' }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#0c4152' }, { lightness: 5 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#0b434f' }, { lightness: 25 }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#0b3d51' }, { lightness: 16 }],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [{ color: '#146474' }],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [{ color: '#021019' }],
    },
  ],
};

interface Facility {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  rating?: number;
  priceRange?: string;
  features?: string[];
}

interface GoogleMapViewProps {
  facilities: Facility[];
  onLoad?: () => void;
  onError?: (error: string) => void;
}

const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  facilities,
  onLoad,
  onError,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o', // Use the API key from the HTML file
    id: 'google-map-script'
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [mapLoadCalled, setMapLoadCalled] = useState(false);

  // Handle map load event
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoadCalled(true);
    if (onLoad) {
      onLoad();
    }
    
    // Force the map to be fully visible
    setTimeout(() => {
      map.setCenter(defaultCenter);
      map.setZoom(4); // Set initial zoom
    }, 100);
  };
  
  // Handle load error
  useEffect(() => {
    if (loadError) {
      console.error('Error loading Google Maps:', loadError);
      if (onError) {
        onError(`Failed to load Google Maps: ${loadError.message}`);
      }
    }
  }, [loadError, onError]);
  
  // Add background color directly using CSS
  useEffect(() => {
    // Force dark background
    const mapContainers = document.querySelectorAll('.map-container');
    mapContainers.forEach(container => {
      if (container instanceof HTMLElement) {
        container.style.backgroundColor = '#080F1F';
      }
    });
    
    // Add CSS to ensure markers are visible
    const style = document.createElement('style');
    style.textContent = `
      .gm-style {
        background-color: #080F1F !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle marker click
  const handleMarkerClick = (facility: Facility) => {
    setSelectedFacility(facility);
  };

  // Handle info window close
  const handleInfoWindowClose = () => {
    setSelectedFacility(null);
  };
  
  // Handle facilities change - adjust map bounds
  useEffect(() => {
    if (isLoaded && mapRef.current && facilities.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      facilities.forEach((facility) => {
        bounds.extend(new google.maps.LatLng(
          facility.location.lat,
          facility.location.lng
        ));
      });
      
      // Only fit bounds if we have multiple facilities
      if (facilities.length > 1) {
        mapRef.current.fitBounds(bounds);
      } else if (facilities.length === 1) {
        mapRef.current.setCenter({
          lat: facilities[0].location.lat,
          lng: facilities[0].location.lng,
        });
        mapRef.current.setZoom(12);
      }
    }
  }, [facilities, isLoaded]);

  // Indicate still loading if API not loaded yet
  if (!isLoaded) {
    return <div className="h-full w-full bg-[#080F1F] flex items-center justify-center text-white">Loading Map...</div>;
  }

  return (
    <div className="h-full w-full bg-[#080F1F] map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={4}
        options={defaultOptions}
        onLoad={handleMapLoad}
      >
        {/* Render markers */}
        {facilities.map((facility) => (
          <Marker
            key={facility.id}
            position={{
              lat: facility.location.lat,
              lng: facility.location.lng,
            }}
            onClick={() => handleMarkerClick(facility)}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new google.maps.Size(40, 40),
            }}
          />
        ))}

        {/* Info Window for selected facility */}
        {selectedFacility && (
          <InfoWindow
            position={{
              lat: selectedFacility.location.lat,
              lng: selectedFacility.location.lng,
            }}
            onCloseClick={handleInfoWindowClose}
            options={{
              pixelOffset: new google.maps.Size(0, -40)
            }}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-gray-900">{selectedFacility.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{selectedFacility.address}</p>
              {selectedFacility.rating && (
                <div className="flex items-center mb-1">
                  <span className="text-amber-500 mr-1">★</span>
                  <span className="text-xs text-gray-700">{selectedFacility.rating}</span>
                </div>
              )}
              {selectedFacility.priceRange && (
                <p className="text-xs text-gray-800">Price: {selectedFacility.priceRange}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapView;
