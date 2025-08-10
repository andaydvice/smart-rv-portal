
import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindowF } from '@react-google-maps/api';
import { useGoogleMaps } from '@/components/map/hooks/useGoogleMaps';
import { StorageFacility } from '../types';
import FacilityMarker from './components/FacilityMarker';
import InfoWindow from './components/InfoWindow';
import MapControls from './components/MapControls';
import { stateCoordinates } from './utils/stateCoordinates';

interface GoogleMapViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  selectedState?: string | null;
}

const mapContainerStyle = {
  width: '100%',
  height: '650px',
  borderRadius: '0.5rem',
  overflow: 'hidden',
};

const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey = 'AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o',
  center = { lat: 39.8283, lng: -98.5795 },
  zoom = 4,
  onZoomChange,
  selectedState
}) => {
  const [selectedFacility, setSelectedFacility] = useState<StorageFacility | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(zoom);
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(zoom);

  const { isLoaded, error } = useGoogleMaps({ apiKey });

  // Update map center and zoom when selectedState changes
  useEffect(() => {
    if (selectedState && stateCoordinates[selectedState]) {
      const stateLocation = stateCoordinates[selectedState];
      setMapCenter({ lat: stateLocation.lat, lng: stateLocation.lng });
      setMapZoom(stateLocation.zoom);
      
      if (mapRef) {
        mapRef.panTo({ lat: stateLocation.lat, lng: stateLocation.lng });
        mapRef.setZoom(stateLocation.zoom);
      }
    } else if (!selectedState) {
      setMapCenter(center);
      setMapZoom(zoom);
      
      if (mapRef) {
        mapRef.panTo(center);
        mapRef.setZoom(zoom);
      }
    }
  }, [selectedState, mapRef]);

  const handleMarkerClick = (facility: StorageFacility) => {
    setSelectedFacility(facility);
    
    if (onMarkerClick) {
      onMarkerClick(facility.id);
    }

    if (mapRef) {
      const position = { lat: Number(facility.latitude), lng: Number(facility.longitude) };
      mapRef.panTo(position);
      
      setTimeout(() => {
        if (mapRef) {
          const currentCenter = mapRef.getCenter()?.toJSON();
          if (currentCenter) {
            mapRef.panTo({
              lat: currentCenter.lat - 0.015,
              lng: currentCenter.lng,
            });
          }
        }
      }, 50);
    }
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    setCurrentZoom(map.getZoom() || mapZoom);
    
    if (selectedState && stateCoordinates[selectedState]) {
      const stateLocation = stateCoordinates[selectedState];
      map.panTo({ lat: stateLocation.lat, lng: stateLocation.lng });
      map.setZoom(stateLocation.zoom);
    }
    else if (facilities.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      facilities.forEach(facility => {
        bounds.extend({
          lat: Number(facility.latitude),
          lng: Number(facility.longitude),
        });
      });
      
      map.fitBounds(bounds, {
        top: 50, 
        right: 50, 
        bottom: 50, 
        left: 50
      });
      
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() && map.getZoom() > 15) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#080F1F] text-white p-4 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[650px] flex items-center justify-center bg-[#080F1F] text-white rounded-lg">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border-t-2 border-r-2 border-[#5B9BD5] rounded-full animate-spin mx-auto"></div>
          <p>Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[650px] relative rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={onMapLoad}
        onClick={() => setSelectedFacility(null)}
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
          maxZoom: 18,
        }}
      >
        {facilities.map((facility) => (
          <FacilityMarker
            key={`marker-${facility.id}`}
            position={{
              lat: Number(facility.latitude),
              lng: Number(facility.longitude),
            }}
            isHighlighted={selectedFacility?.id === facility.id}
            currentZoom={currentZoom}
            onClick={() => handleMarkerClick(facility)}
          />
        ))}

        {selectedFacility && (
          <InfoWindowF
            position={{
              lat: Number(selectedFacility.latitude),
              lng: Number(selectedFacility.longitude),
            }}
            onCloseClick={() => setSelectedFacility(null)}
            options={{
              pixelOffset: new google.maps.Size(0, -30),
              maxWidth: 320,
            }}
          >
            <InfoWindow
              facility={selectedFacility}
              onClose={() => setSelectedFacility(null)}
            />
          </InfoWindowF>
        )}

        <MapControls
          currentZoom={currentZoom}
          selectedFacility={selectedFacility}
          isZoomedIn={currentZoom > 10}
        />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapView;
