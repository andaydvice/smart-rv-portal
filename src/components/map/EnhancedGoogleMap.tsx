import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Loader2, Star, Phone, MapPin } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Facility {
  name: string;
  rating?: number;
  address?: string;
  description?: string;
  phone?: string;
  features?: string[];
}

interface EnhancedGoogleMapProps {
  apiKey: string;
  location: { lat: number; lng: number };
  zoom?: number;
  facilities?: Facility[];
  onMapLoad?: () => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '0.5rem',
};

const EnhancedGoogleMap: React.FC<EnhancedGoogleMapProps> = ({
  apiKey,
  location,
  zoom = 14,
  facilities = [],
  onMapLoad
}) => {
  
  const [error, setError] = useState<string | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [markersActive, setMarkersActive] = useState<boolean>(true);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  
  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Handle map errors
  useEffect(() => {
    if (loadError) {
      setError(`Error loading Google Maps: ${loadError.message}`);
    }
  }, [loadError]);

  // Handle map load
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (onMapLoad) onMapLoad();
  };
  
  // Ensure markers remain visible even when info window is open
  useEffect(() => {
    if (selectedFacility) {
      // Force markers to remain visible when a popup is open
      const forceMarkersVisible = () => {
        markersRef.current.forEach(marker => {
          const markerIcon = marker.getIcon();
          if (markerIcon) {
            // Type guard to check if the icon is an object with a url property
            const iconUrl = typeof markerIcon === 'object' && 'url' in markerIcon 
              ? markerIcon.url as string 
              : null;
              
            if (iconUrl) {
              // Ensure marker visibility through DOM manipulation if needed
              const el = document.querySelector(`.gm-style img[src="${iconUrl}"]`);
              if (el instanceof HTMLElement) {
                el.style.visibility = 'visible';
                el.style.opacity = '1';
                el.style.display = 'block';
              }
            }
          }
        });
      };
      
      // Run immediately and set up recurring check
      forceMarkersVisible();
      const intervalId = setInterval(forceMarkersVisible, 300);
      
      return () => clearInterval(intervalId);
    }
  }, [selectedFacility]);

  // If no facilities are provided, create a default one at the location
  const displayFacilities = facilities.length > 0 ? facilities : [
    { 
      name: "Location", 
      address: "Pin location",
      description: "View details for this location"
    }
  ];

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

  // Render stars for rating
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

  // Render map with error handling
  return (
    <div className="bg-[#091020] rounded-lg p-4 border border-[#1a202c] w-full">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="w-full overflow-hidden rounded-lg relative">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={location}
          zoom={zoom}
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
              position={location}
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
              title={facility.name}
              onLoad={(marker) => {
                // Store reference to marker for visibility management
                markersRef.current.push(marker);
              }}
              // Force marker visibility to be always true
              visible={true}
              zIndex={1000}
            />
          ))}

          {/* Enhanced Info Window for selected facility */}
          {selectedFacility && (
            <InfoWindowF
              position={location}
              onCloseClick={() => setSelectedFacility(null)}
              options={{
                pixelOffset: new google.maps.Size(0, -10),
                maxWidth: 320,
                zIndex: 999
              }}
            >
              <div className="p-0 max-w-[300px] bg-[#131a2a] text-white rounded-lg">
                {/* Title with bold text and proper spacing */}
                <div className="bg-[#091020] px-5 py-5 rounded-t-lg">
                  <h3 className="text-xl font-bold text-[#5B9BD5] text-center">{selectedFacility.name}</h3>
                </div>
                
                <div className="px-5 pt-4 pb-5">
                  {selectedFacility.address && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-white font-medium text-center">{selectedFacility.address}</span>
                    </div>
                  )}
                  
                  {selectedFacility.phone && (
                    <div className="flex items-center justify-center gap-2 mb-5">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-white font-medium">{selectedFacility.phone}</span>
                    </div>
                  )}
                  
                  {selectedFacility.features && selectedFacility.features.length > 0 && (
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-gray-400 uppercase text-center mb-3">FACILITIES & AMENITIES</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedFacility.features.map((feature, idx) => (
                          <div key={idx} className="bg-[#1d2434] text-[#5B9BD5] text-sm font-medium px-3 py-2 rounded text-center">
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedFacility.description && (
                    <div className="border-l-2 border-[#5B9BD5] pl-3 italic text-gray-300 mb-2">
                      <p>{selectedFacility.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default EnhancedGoogleMap;
