
import React, { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Star } from 'lucide-react';
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useGoogleMaps } from '@/components/map/hooks/useGoogleMaps';

interface Facility {
  name: string;
  rating?: number;
  address?: string;
  description?: string;
}

interface StaticMapComponentProps {
  apiKey: string;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  onMapLoad?: () => void;
  facilities?: Facility[];
  title?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '0.5rem',
};

const StaticMapComponent: React.FC<StaticMapComponentProps> = ({
  apiKey,
  mapCenter,
  mapZoom,
  onMapLoad,
  facilities = [],
  title
}) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load Google Maps script via shared hook
  const { isLoaded, error: loadError } = useGoogleMaps({ apiKey });

  // Handle map load event
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    
    // Call the onMapLoad callback if provided
    if (onMapLoad) {
      onMapLoad();
    }
  };

  // Handle map errors
  React.useEffect(() => {
    if (loadError) {
      setError(loadError);
    }
  }, [loadError]);

  // If no facilities are provided, create a default one at the location
  const displayFacilities = facilities.length > 0 ? facilities : [
    { 
      name: title || "Location", 
      address: "Pin location",
      description: "View details for this location"
    }
  ];

  // Render rating stars
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
          />
        ))}
        <span className="ml-1 text-sm">({rating.toFixed(1)})</span>
      </div>
    );
  };

  // Render loading state
  if (!isLoaded) {
    return (
      <div className="bg-[#091020] rounded-lg p-6 border border-[#1a202c] flex items-center justify-center h-[350px]">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#5B9BD5]" />
          <p className="text-gray-300">Loading map...</p>
        </div>
      </div>
    );
  }

  // Render map with error handling
  return (
    <div className="bg-[#091020] rounded-lg p-4 border border-[#1a202c] w-full">
      <div className="w-full overflow-hidden rounded-lg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={mapZoom}
          onLoad={handleMapLoad}
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
          {/* Markers for each facility */}
          {displayFacilities.map((facility, index) => (
            <MarkerF
              key={`marker-${index}`}
              position={mapCenter}
              onClick={() => setSelectedFacility(facility)}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#5B9BD5', // Ocean Blue brand color
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
              }}
              animation={google.maps.Animation.DROP}
            />
          ))}

          {/* Info Window for selected facility */}
          {selectedFacility && (
            <InfoWindowF
              position={mapCenter}
              onCloseClick={() => setSelectedFacility(null)}
            >
              <div className="p-2 max-w-[250px]">
                <h3 className="text-lg font-semibold text-[#5B9BD5]">{selectedFacility.name}</h3>
                
                {selectedFacility.rating && (
                  renderRatingStars(selectedFacility.rating)
                )}
                
                {selectedFacility.address && (
                  <p className="text-sm mt-1">{selectedFacility.address}</p>
                )}
                
                {selectedFacility.description && (
                  <p className="text-sm mt-2 text-gray-600">{selectedFacility.description}</p>
                )}
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
      
      {error && (
        <div className="mt-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default StaticMapComponent;
