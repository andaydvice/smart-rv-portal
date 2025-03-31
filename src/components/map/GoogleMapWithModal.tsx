
import React, { useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export interface Location {
  id?: string;
  lat: number;
  lng: number;
  name: string;
  description: string;
  address?: string;
  features?: string[];
  price?: string;
  phone?: string;
}

interface GoogleMapWithModalProps {
  locations: Location[];
  apiKey?: string;
  mapCenter?: { lat: number; lng: number };
  mapZoom?: number;
  className?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.5rem',
};

const GoogleMapWithModal: React.FC<GoogleMapWithModalProps> = ({
  locations,
  apiKey = 'AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o', // Default API key
  mapCenter = { lat: 39.8283, lng: -98.5795 }, // Center of the US by default
  mapZoom = 4,
  className = '',
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Function to handle marker click
  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
    
    // If we have a map reference, pan to the location
    if (mapRef) {
      mapRef.panTo({ lat: location.lat, lng: location.lng });
      mapRef.setZoom(Math.max(mapRef.getZoom() || mapZoom, 10)); // Zoom in if not already zoomed
    }
  };

  // Handle map load event
  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    
    // If there are locations, fit bounds to show all markers
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

  // Render loading state
  if (loadError) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-[#131a2a] text-white p-4 rounded-lg">
        <p className="text-red-500">Error loading Google Maps. Please check your API key.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-[#131a2a] text-white rounded-lg">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p>Loading Map...</p>
        </div>
      </div>
    );
  }

  // Function to render features as pills
  const renderFeatures = (features?: string[]) => {
    if (!features || features.length === 0) return null;
    
    return (
      <div className="mt-4">
        <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Features</h4>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <span 
              key={index} 
              className="bg-[#1a2235] text-[#60A5FA] text-sm px-3 py-1 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative w-full ${className}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
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
        {locations.map((location, index) => (
          <MarkerF
            key={location.id || `marker-${index}`}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleMarkerClick(location)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#F97316',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
            }}
          />
        ))}
      </GoogleMap>

      {/* Location Details Modal - Using Dialog from shadcn/ui */}
      <Dialog open={!!selectedLocation} onOpenChange={(open) => !open && setSelectedLocation(null)}>
        <DialogContent className="bg-[#131a2a] text-white border-gray-700 p-0 max-w-md w-full max-h-[90vh] overflow-hidden map-dialog-content">
          {selectedLocation && (
            <>
              <div className="bg-[#091020] px-6 py-4 relative">
                <DialogTitle className="text-2xl font-bold text-[#5B9BD5]">
                  {selectedLocation.name}
                </DialogTitle>
                <button 
                  className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setSelectedLocation(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
                <div className="space-y-4">
                  {selectedLocation.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                      <span className="text-white">
                        {selectedLocation.address}
                      </span>
                    </div>
                  )}
                  
                  {selectedLocation.price && (
                    <div className="font-medium text-[#F97316] text-xl">
                      Price: {selectedLocation.price}
                    </div>
                  )}
                  
                  {selectedLocation.phone && (
                    <div className="text-gray-300">
                      Phone: {selectedLocation.phone}
                    </div>
                  )}
                  
                  {renderFeatures(selectedLocation.features)}
                  
                  {selectedLocation.description && (
                    <div className="mt-4">
                      <DialogDescription className="text-gray-300 whitespace-pre-line">
                        {selectedLocation.description}
                      </DialogDescription>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoogleMapWithModal;
