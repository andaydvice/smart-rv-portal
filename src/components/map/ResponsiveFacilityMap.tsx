
import React, { useState, useEffect } from 'react';
import { useGoogleMaps } from './hooks/useGoogleMaps';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { TypographyH3 } from "@/components/ui/typography";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";

interface Location {
  lat: number;
  lng: number;
}

interface Feature {
  name: string;
  available: boolean;
}

interface ResponsiveFacilityMapProps {
  name: string;
  location: Location;
  address?: string;
  phoneNumber?: string;
  features?: Feature[];
  description?: string;
  apiKey?: string;
}

const ResponsiveFacilityMap: React.FC<ResponsiveFacilityMapProps> = ({
  name,
  location,
  address,
  phoneNumber,
  features = [],
  description,
  apiKey = "AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o" // Default API key
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const { isLoaded, error } = useGoogleMaps({ apiKey });

  const mapContainerStyle = {
    width: '100%',
    height: '350px',
    borderRadius: '0.5rem',
  };

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

  // Remove unwanted UI elements when map is loaded
  useEffect(() => {
    if (isLoaded) {
      const removeUnwantedElements = () => {
        document.querySelectorAll('.gm-ui-hover-effect, .gm-style img[src*="arrow"]').forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
          }
        });
      };

      // Run repeatedly to ensure the elements are removed
      const intervalId = setInterval(removeUnwantedElements, 300);
      
      // Initial run
      removeUnwantedElements();
      
      return () => clearInterval(intervalId);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="bg-[#091020] rounded-lg p-4 border border-[#1a202c] w-full">
        <div className="p-4 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#5B9BD5] mb-4" />
          <p className="text-gray-300">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#091020] rounded-lg p-4 border border-[#1a202c] w-full">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Error loading map: {error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <Container className="w-full max-w-5xl mx-auto">
      <div className="bg-[#091020] rounded-lg p-4 md:p-6 border border-[#1a202c] w-full">
        <div className="flex flex-col space-y-4">
          {/* Facility Name with Typography component - FIXED OVERFLOW ISSUE */}
          <div className="text-center mb-2">
            <TypographyH3 className="text-[#5B9BD5] break-words overflow-hidden px-2">
              {name}
            </TypographyH3>
          </div>
          
          {/* Facility details section */}
          {(address || phoneNumber) && (
            <div className="flex flex-col md:flex-row md:justify-center gap-2 md:gap-6 text-gray-300 mb-4">
              {address && (
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <p className="text-sm md:text-base break-words">{address}</p>
                </div>
              )}
              
              {phoneNumber && (
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <p className="text-sm md:text-base">{phoneNumber}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Features section */}
          {features.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {features
                .filter(feature => feature.available)
                .map((feature, index) => (
                  <span 
                    key={index} 
                    className="bg-[#131a2a] text-[#5B9BD5] text-xs px-2 py-1 rounded"
                  >
                    {feature.name}
                  </span>
                ))
              }
            </div>
          )}
          
          {/* Map container with enhanced styling */}
          <div className="w-full overflow-hidden rounded-lg relative">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location}
              zoom={14}
              options={mapOptions}
            >
              <Marker
                position={location}
                onClick={() => setShowInfo(!showInfo)}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 12,
                  fillColor: '#5B9BD5',
                  fillOpacity: 1,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2,
                }}
              />
              
              {showInfo && (
                <InfoWindow
                  position={location}
                  onCloseClick={() => setShowInfo(false)}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -30),
                    maxWidth: 300
                  }}
                >
                  <div className="p-2 max-w-[250px]">
                    <h3 className="text-lg font-semibold text-[#5B9BD5] break-words">{name}</h3>
                    {address && <p className="text-sm mt-1 break-words">{address}</p>}
                    {description && <p className="text-sm mt-2 text-gray-600 break-words">{description}</p>}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
          
          {/* Description section */}
          {description && (
            <div className="border-l-2 border-[#5B9BD5] pl-3 mt-4">
              <p className="text-gray-300 italic break-words">{description}</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ResponsiveFacilityMap;
