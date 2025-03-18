
import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Card } from '@/components/ui/card';
import { Facility } from './types';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const containerStyle = {
  width: '100%',
  height: '650px'
};

// Default center at a US central location
const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795
};

interface GoogleMapFacilitiesViewProps {
  facilities: Facility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick: (facilityId: string) => void;
  apiKey: string;
  highlightedFacility?: string | null;
}

const GoogleMapFacilitiesView: React.FC<GoogleMapFacilitiesViewProps> = ({ 
  facilities, 
  recentlyViewedFacilityIds, 
  onMarkerClick,
  apiKey,
  highlightedFacility
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });
  
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Google Map loaded');
    setMap(map);
    
    if (facilities.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      facilities.forEach(facility => {
        if (facility.latitude && facility.longitude) {
          bounds.extend({
            lat: parseFloat(facility.latitude),
            lng: parseFloat(facility.longitude)
          });
        }
      });
      
      map.fitBounds(bounds);
      
      // Set a minimum zoom level to prevent excessive zoom on small datasets
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() > 12) {
          map.setZoom(12);
        }
        google.maps.event.removeListener(listener);
      });
    }
  }, [facilities]);
  
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  
  // Set the selectedFacility when highlightedFacility changes
  React.useEffect(() => {
    if (highlightedFacility) {
      const facility = facilities.find(f => f.id === highlightedFacility);
      if (facility) {
        setSelectedFacility(facility);
        
        // Center the map on the highlighted facility
        if (map && facility.latitude && facility.longitude) {
          map.panTo({
            lat: parseFloat(facility.latitude),
            lng: parseFloat(facility.longitude)
          });
          
          if (map.getZoom() < 10) {
            map.setZoom(10);
          }
        }
      }
    } else {
      setSelectedFacility(null);
    }
  }, [highlightedFacility, facilities, map]);
  
  const handleMarkerClick = (facility: Facility) => {
    setSelectedFacility(facility);
    onMarkerClick(facility.id);
  };
  
  const handleInfoWindowClose = () => {
    setSelectedFacility(null);
  };
  
  if (loadError) {
    return (
      <Card className="h-[650px] flex items-center justify-center bg-[#080F1F] border-gray-700 relative overflow-hidden">
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading Google Maps: {loadError.message}
          </AlertDescription>
        </Alert>
      </Card>
    );
  }
  
  if (!isLoaded) {
    return (
      <Card className="h-[650px] flex items-center justify-center bg-[#080F1F] border-gray-700">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading Google Maps...</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="h-[650px] bg-[#080F1F] border-gray-700 overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {facilities.map(facility => {
          if (!facility.latitude || !facility.longitude) return null;
          
          const isRecent = recentlyViewedFacilityIds.includes(facility.id);
          const isHighlighted = facility.id === highlightedFacility;
          
          return (
            <Marker
              key={facility.id}
              position={{
                lat: parseFloat(facility.latitude),
                lng: parseFloat(facility.longitude)
              }}
              onClick={() => handleMarkerClick(facility)}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: isHighlighted ? 10 : isRecent ? 8 : 6,
                fillColor: isHighlighted ? '#F97316' : isRecent ? '#5B9BD5' : '#8B5CF6',
                fillOpacity: 0.9,
                strokeWeight: 2,
                strokeColor: '#FFFFFF',
              }}
              zIndex={isHighlighted ? 1000 : isRecent ? 100 : 1}
            />
          );
        })}
        
        {selectedFacility && selectedFacility.latitude && selectedFacility.longitude && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedFacility.latitude),
              lng: parseFloat(selectedFacility.longitude)
            }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="bg-white p-2 rounded max-w-xs">
              <h3 className="font-bold text-gray-900">{selectedFacility.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedFacility.street}, {selectedFacility.city}, {selectedFacility.state} {selectedFacility.zip}
              </p>
              {selectedFacility.rating && (
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-sm mr-0.5">
                      {i < selectedFacility.rating! ? '★' : '☆'}
                    </span>
                  ))}
                  <span className="text-xs ml-1">({selectedFacility.rating.toFixed(1)})</span>
                </div>
              )}
              <div className="mt-1 text-xs text-blue-600">
                {selectedFacility.phone && (
                  <div>{selectedFacility.phone}</div>
                )}
                {selectedFacility.website && (
                  <a href={selectedFacility.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </Card>
  );
};

export default GoogleMapFacilitiesView;
