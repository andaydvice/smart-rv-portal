
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';
import CustomInfoWindow from './components/CustomInfoWindow';

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
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Force styling and visibility
  useEffect(() => {
    if (isLoaded && onMapLoad) {
      // Call the onMapLoad callback
      onMapLoad();
      
      // Add DOM-based force styling
      const style = document.createElement('style');
      style.textContent = `
        /* Force custom info window visibility */
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
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isLoaded, onMapLoad]);

  // Position the custom info window
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !showInfoWindow || !infoWindowRef.current || !selectedFacility) return;
    
    // Use the projection to convert LatLng to pixel coordinates
    const overlay = new google.maps.OverlayView();
    overlay.setMap(mapRef.current);
    
    overlay.draw = () => {
      if (!mapRef.current || !infoWindowRef.current) return;
      
      // Get the pixel position
      const projection = overlay.getProjection();
      if (!projection) return;
      
      const position = projection.fromLatLngToDivPixel(
        new google.maps.LatLng(location.lat, location.lng)
      );
      
      if (position && infoWindowRef.current) {
        // Position the info window above the marker
        infoWindowRef.current.style.left = `${position.x}px`;
        infoWindowRef.current.style.top = `${position.y - 15}px`;
      }
    };
    
    // Trigger a redraw when the map moves
    const moveHandler = () => {
      overlay.draw();
    };
    
    mapRef.current.addListener('bounds_changed', moveHandler);
    
    // Initial draw
    overlay.draw();
    
    return () => {
      if (mapRef.current) {
        google.maps.event.clearListeners(mapRef.current, 'bounds_changed');
      }
      overlay.setMap(null);
    };
  }, [isLoaded, location, mapRef.current, showInfoWindow, selectedFacility, infoWindowRef.current]);

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

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (onMapLoad) {
      onMapLoad();
    }
  };
  
  const handleMarkerClick = (facility: Facility) => {
    setSelectedFacility(facility);
    setShowInfoWindow(true);
  };
  
  const handleCloseInfoWindow = () => {
    setShowInfoWindow(false);
    setSelectedFacility(null);
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
    <div className="w-full h-[300px] rounded-lg overflow-hidden relative">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
        center={location}
        zoom={14}
        options={mapOptions}
        onLoad={handleMapLoad}
      >
        {facilities.map((facility, index) => (
          <Marker
            key={`facility-${index}`}
            position={location}
            onClick={() => handleMarkerClick(facility)}
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
      </GoogleMap>
      
      {/* Custom Info Window */}
      {showInfoWindow && selectedFacility && (
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
          <h3>{selectedFacility.name}</h3>
          <div className="info-content">
            {selectedFacility.address && (
              <p className="text-sm mb-2">{selectedFacility.address}</p>
            )}
            {selectedFacility.phone && (
              <p className="text-sm mb-2">{selectedFacility.phone}</p>
            )}
            {selectedFacility.description && (
              <p className="text-sm text-gray-300 mt-3 italic border-l-2 border-[#5B9BD5] pl-3">{selectedFacility.description}</p>
            )}
            {selectedFacility.features && selectedFacility.features.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-400 uppercase mb-2">Facilities & Amenities</p>
                <div className="flex flex-wrap gap-1">
                  {selectedFacility.features.map((feature, idx) => (
                    <span key={idx} className="bg-[#1d2434] text-[#5B9BD5] text-xs px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedGoogleMap;
