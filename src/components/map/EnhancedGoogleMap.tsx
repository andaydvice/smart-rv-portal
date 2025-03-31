
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

interface Facility {
  name: string;
  address?: string;
  phone?: string;
  description?: string;
  features?: string[];
  rating?: number;
}

interface EnhancedGoogleMapProps {
  apiKey: string;
  location: {
    lat: number;
    lng: number;
  };
  facilities?: Facility[];
  onMapLoad?: () => void;
}

const EnhancedGoogleMap: React.FC<EnhancedGoogleMapProps> = ({
  apiKey,
  location,
  facilities = [],
  onMapLoad
}) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Force markers to be visible
  useEffect(() => {
    if (isLoaded && onMapLoad) {
      // Call the onMapLoad callback
      onMapLoad();
      
      // Additional forceful styling to ensure info window content doesn't get clipped
      const style = document.createElement('style');
      style.textContent = `
        .gm-style-iw.gm-style-iw-c {
          padding: 0 !important;
          max-height: none !important;
          max-width: 340px !important;
          width: auto !important;
          overflow: visible !important;
        }
        
        .gm-style-iw-d {
          overflow: visible !important;
          max-height: none !important;
        }
        
        .gm-style .gm-style-iw-c .facility-info h3,
        .gm-style .gm-style-iw-c .facility-info p {
          white-space: normal !important;
          overflow: visible !important;
          text-overflow: clip !important;
          word-break: break-word !important;
          max-width: 100% !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isLoaded, onMapLoad]);

  // Dark theme map styles
  const mapOptions = {
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
  };

  if (loadError) {
    return (
      <div className="bg-[#091020] p-4 rounded text-white">
        Error loading map: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center bg-[#091020] rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin text-[#5B9BD5]" />
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
        center={location}
        zoom={14}
        options={mapOptions}
        onLoad={() => onMapLoad?.()}
      >
        {facilities.map((facility, index) => (
          <Marker
            key={`facility-${index}`}
            position={location}
            onClick={() => setSelectedFacility(facility)}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: '#5B9BD5',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
            }}
          />
        ))}
        
        {selectedFacility && (
          <InfoWindow
            position={location}
            onCloseClick={() => setSelectedFacility(null)}
            options={{
              pixelOffset: new window.google.maps.Size(0, -30),
              maxWidth: 300
            }}
          >
            <div className="facility-info p-2 max-w-[280px]">
              <h3 className="text-lg font-semibold text-[#5B9BD5] break-words whitespace-normal"
                  style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>
                {selectedFacility.name}
              </h3>
              
              {selectedFacility.address && (
                <p className="text-sm mt-1 break-words">{selectedFacility.address}</p>
              )}
              
              {selectedFacility.phone && (
                <p className="text-sm mt-1 break-words">{selectedFacility.phone}</p>
              )}
              
              {selectedFacility.description && (
                <p className="text-sm mt-2 text-gray-600 break-words">{selectedFacility.description}</p>
              )}
              
              {selectedFacility.features && selectedFacility.features.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedFacility.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default EnhancedGoogleMap;
