
import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { X, MapPin, Phone } from 'lucide-react';

export interface LocationData {
  id?: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
  price: string;
  phone: string;
  features: string[];
  description?: string;
}

interface OpaqueMapModalProps {
  locations: LocationData[];
  apiKey: string;
  mapCenter?: { lat: number; lng: number };
  mapZoom?: number;
  className?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.5rem',
};

const OpaqueMapModal: React.FC<OpaqueMapModalProps> = ({
  locations,
  apiKey,
  mapCenter = { lat: 39.8283, lng: -98.5795 }, // Center of the US by default
  mapZoom = 4,
  className = '',
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Calculate modal position when a marker is clicked
  const calculateModalPosition = (
    marker: google.maps.Marker,
    map: google.maps.Map
  ) => {
    if (!mapContainerRef.current) return null;

    const markerPosition = marker.getPosition();
    if (!markerPosition) return null;

    const point = map.getProjection()?.fromLatLngToPoint(markerPosition);
    const mapDiv = map.getDiv();
    const mapRect = mapDiv.getBoundingClientRect();
    const containerRect = mapContainerRef.current.getBoundingClientRect();

    if (!point) return null;

    // Calculate position relative to the map container
    const pixelPosition = {
      x: (point.x * Math.pow(2, map.getZoom()!)) - (map.getCenter()!.lng() * Math.pow(2, map.getZoom()!)),
      y: (point.y * Math.pow(2, map.getZoom()!)) - (map.getCenter()!.lat() * Math.pow(2, map.getZoom()!))
    };

    // Adjust for map center and zoom
    const centerPoint = map.getProjection()?.fromLatLngToPoint(map.getCenter()!);
    if (!centerPoint) return null;

    const scale = Math.pow(2, map.getZoom()!);
    const worldPoint = new google.maps.Point(
      (point.x * scale) - (centerPoint.x * scale) + (mapRect.width / 2),
      (point.y * scale) - (centerPoint.y * scale) + (mapRect.height / 2)
    );

    // Position the modal above the marker
    return {
      top: worldPoint.y - 20,
      left: worldPoint.x
    };
  };

  // Function to handle marker click
  const handleMarkerClick = (
    location: LocationData,
    marker: google.maps.Marker,
    map: google.maps.Map
  ) => {
    setSelectedLocation(location);
    
    // Calculate the position for the modal
    const position = calculateModalPosition(marker, map);
    if (position) {
      setModalPosition(position);
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedLocation(null);
    setModalPosition(null);
  };

  // Adjust modal position to stay within viewport
  useEffect(() => {
    if (selectedLocation && modalRef.current && modalPosition) {
      const modalRect = modalRef.current.getBoundingClientRect();
      const parentRect = mapContainerRef.current!.getBoundingClientRect();
      
      let { top, left } = modalPosition;
      
      // Adjust if modal would go off the right edge
      if (left + modalRect.width > parentRect.width) {
        left = parentRect.width - modalRect.width - 20;
      }
      
      // Adjust if modal would go off the left edge
      if (left < 20) {
        left = 20;
      }
      
      // Adjust if modal would go off the top edge
      if (top < 20) {
        top = 20;
      }
      
      // Adjust if modal would go off the bottom edge
      if (top + modalRect.height > parentRect.height) {
        top = parentRect.height - modalRect.height - 20;
      }

      // Update position with adjusted values
      if (top !== modalPosition.top || left !== modalPosition.left) {
        setModalPosition({ top, left });
      }
    }
  }, [selectedLocation, modalPosition]);

  // Handle map load event
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    
    // Fit bounds to show all markers
    if (locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(new google.maps.LatLng(location.lat, location.lng));
      });
      map.fitBounds(bounds);
      
      // Don't zoom in too far on single locations
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() && map.getZoom() > 15) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }
  };

  // If there's a loading error
  if (loadError) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-[#131a2a] text-white p-4 rounded-lg">
        <p className="text-red-500">Error loading Google Maps. Please check your API key.</p>
      </div>
    );
  }

  // If the map is still loading
  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-[#131a2a] text-white rounded-lg">
        <div className="text-center">
          <div className="w-10 h-10 border-t-2 border-r-2 border-[#5B9BD5] rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`} ref={mapContainerRef}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={onMapLoad}
        onClick={() => handleCloseModal()}
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
        {locations.map((location, index) => {
          const markerRef = useRef<google.maps.Marker | null>(null);
          
          return (
            <MarkerF
              key={location.id || `marker-${index}`}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => {
                if (markerRef.current && mapRef.current) {
                  handleMarkerClick(location, markerRef.current, mapRef.current);
                }
              }}
              onLoad={(marker) => {
                markerRef.current = marker;
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#F97316', // Orange color
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
              }}
            />
          );
        })}
      </GoogleMap>

      {/* Fully Opaque Custom Modal */}
      {selectedLocation && modalPosition && (
        <div
          ref={modalRef}
          className="bg-white border-2 border-gray-300 shadow-lg z-50 absolute p-4 rounded-lg"
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            transform: 'translate(-50%, -100%)',
            maxWidth: '350px',
            minWidth: '280px',
            overflowY: 'auto',
            maxHeight: '500px'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute right-2 top-2 rounded-full bg-gray-100 p-1 hover:bg-gray-200 transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>

          {/* Modal Content */}
          <div className="pt-1">
            {/* Location Name */}
            <h3 className="text-xl font-bold text-gray-800 pr-6 mb-2">
              {selectedLocation.name}
            </h3>

            {/* Address */}
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700">{selectedLocation.address}</p>
            </div>

            {/* Price */}
            <div className="mb-3">
              <p className="text-lg font-semibold text-orange-500">
                Price: {selectedLocation.price}
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">{selectedLocation.phone}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* Features */}
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedLocation.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Description if available */}
            {selectedLocation.description && (
              <div className="mt-3 text-sm text-gray-600">
                <p>{selectedLocation.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OpaqueMapModal;
