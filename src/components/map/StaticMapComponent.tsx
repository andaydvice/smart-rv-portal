
import React, { useRef, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

interface StaticMapComponentProps {
  apiKey: string;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  onMapLoad?: () => void;
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
  onMapLoad
}) => {
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Handle map load event
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    
    // Call the onMapLoad callback if provided
    if (onMapLoad) {
      onMapLoad();
    }
  };

  // Handle map errors
  useEffect(() => {
    if (loadError) {
      setError(`Error loading Google Maps: ${loadError.message}`);
    }
  }, [loadError]);

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
          <MarkerF
            position={mapCenter}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: '#5B9BD5', // Ocean Blue brand color
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
            }}
          />
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
