
import React, { useState, useEffect, useRef } from 'react';
import { useGoogleMaps } from './hooks/useGoogleMaps';
import { GoogleMap, Marker } from '@react-google-maps/api';
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
  onMapLoad?: () => void;
}

const ResponsiveFacilityMap: React.FC<ResponsiveFacilityMapProps> = ({
  name,
  location,
  address,
  phoneNumber,
  features = [],
  description,
  apiKey = "AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o", // Default API key
  onMapLoad
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const { isLoaded, error } = useGoogleMaps({ apiKey });
  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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

  // Handle map loading and apply custom styles
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    
    // Call the external onMapLoad handler if provided
    if (onMapLoad) {
      onMapLoad();
    }
    
    // Create marker
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#5B9BD5',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
      }
    });
    markerRef.current = marker;
    
    // Add click handler
    marker.addListener('click', () => {
      setShowInfo(true);
      positionCustomInfoWindow();
    });
    
    // Apply essential styles for DOM-based info windows
    const style = document.createElement('style');
    style.id = 'responsive-map-styles';
    style.textContent = `
      .custom-info-window {
        z-index: 1000;
        position: absolute;
        transform: translate(-50%, -100%);
        background-color: #131a2a;
        color: white;
        border-radius: 8px;
        padding: 0;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        max-width: 300px;
        width: auto;
        pointer-events: auto;
      }
      
      .custom-info-window::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -10px;
        transform: translateX(-50%);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #131a2a;
      }
      
      .custom-info-window h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
        padding: 12px;
        background-color: #091020;
        color: #5B9BD5;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        word-wrap: break-word;
        word-break: break-word;
        white-space: normal;
        overflow-wrap: break-word;
        hyphens: auto;
      }
      
      .custom-info-window .info-content {
        padding: 12px;
      }
      
      .custom-info-window .close-btn {
        position: absolute;
        right: 8px;
        top: 8px;
        background: rgba(0,0,0,0.2);
        border: none;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
    `;
    document.head.appendChild(style);
    
    // Initial positioning of info window if showing
    if (showInfo) {
      positionCustomInfoWindow();
    }
    
    // Listen for map movements to reposition info window
    map.addListener('bounds_changed', () => {
      if (showInfo) {
        positionCustomInfoWindow();
      }
    });
    
    return () => {
      if (document.getElementById('responsive-map-styles')) {
        document.getElementById('responsive-map-styles')?.remove();
      }
    };
  };
  
  // Position custom info window based on marker position
  const positionCustomInfoWindow = () => {
    if (!mapRef.current || !infoWindowRef.current || !markerRef.current) return;
    
    const map = mapRef.current;
    const marker = markerRef.current;
    
    // Use overlay to get pixel coordinates
    const overlay = new google.maps.OverlayView();
    overlay.setMap(map);
    
    overlay.draw = () => {
      const projection = overlay.getProjection();
      if (!projection) return;
      
      const position = projection.fromLatLngToDivPixel(marker.getPosition() as google.maps.LatLng);
      if (!position || !infoWindowRef.current || !mapContainerRef.current) return;
      
      // Get map container bounds
      const mapBounds = mapContainerRef.current.getBoundingClientRect();
      
      // Position the info window above the marker
      infoWindowRef.current.style.left = `${position.x}px`;
      infoWindowRef.current.style.top = `${position.y - 15}px`;
    };
    
    overlay.draw();
    overlay.setMap(null); // Clean up overlay
  };

  // Remove unwanted UI elements when map is loaded
  useEffect(() => {
    if (isLoaded) {
      // Initial setup of the map
      if (showInfo) {
        positionCustomInfoWindow();
      }
      
      // Handle window resize
      const handleResize = () => {
        if (showInfo) {
          positionCustomInfoWindow();
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isLoaded, showInfo]);

  // Handle close info window
  const handleCloseInfoWindow = () => {
    setShowInfo(false);
  };

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
          <div className="text-center mb-2 px-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#5B9BD5] break-words whitespace-normal"
                style={{ 
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word',
                  wordBreak: 'break-word',
                  maxWidth: '100%',
                  overflow: 'visible'
                }}>
              {name}
            </h3>
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
          <div 
            className="w-full overflow-hidden rounded-lg relative"
            ref={mapContainerRef}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location}
              zoom={14}
              options={mapOptions}
              onLoad={handleMapLoad}
            >
              {/* We're not using the built-in InfoWindow, using DOM-based instead */}
            </GoogleMap>
            
            {/* Custom info window */}
            {showInfo && (
              <div 
                ref={infoWindowRef}
                className="custom-info-window"
              >
                <button 
                  className="close-btn"
                  onClick={handleCloseInfoWindow}
                  aria-label="Close"
                >
                  ×
                </button>
                <h3>{name}</h3>
                <div className="info-content">
                  {address && <p className="text-sm mb-2">{address}</p>}
                  {phoneNumber && <p className="text-sm mb-2">{phoneNumber}</p>}
                  
                  {features && features.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-400 uppercase mb-1">Facilities & Amenities</p>
                      <div className="flex flex-wrap gap-1">
                        {features
                          .filter(feature => feature.available)
                          .map((feature, idx) => (
                            <span key={idx} className="bg-[#1d2434] text-[#5B9BD5] text-xs px-2 py-1 rounded">
                              {feature.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {description && (
                    <p className="text-sm text-gray-300 mt-3 italic border-l-2 border-[#5B9BD5] pl-3">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}
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
