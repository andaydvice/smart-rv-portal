
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { StorageFacility } from '../types';
import { getMarkerColor } from './utils/markerUtils';
import FacilityInfoWindow from './components/FacilityInfoWindow';
import MapLoadingState from './components/MapLoadingState';
import MapErrorState from './components/MapErrorState';
import HighlightIndicator from './components/HighlightIndicator';
import ZoomIndicator from './components/ZoomIndicator';
import { useGoogleMapSetup } from './hooks/useGoogleMapSetup';

interface GoogleMapViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  onMapLoad?: (map: google.maps.Map) => void; // Add the missing prop
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
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  center = { lat: 39.8283, lng: -98.5795 }, // Center of the US
  zoom = 4,
  onZoomChange,
  onMapLoad,
}) => {
  const [selectedFacility, setSelectedFacility] = useState<StorageFacility | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [markersRendered, setMarkersRendered] = useState(false);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Use custom hook for map setup
  const { currentZoom, onMapLoad: hookMapLoad } = useGoogleMapSetup(
    mapRef,
    facilities,
    onZoomChange,
    zoom
  );

  // Function to handle marker click
  const handleMarkerClick = (facility: StorageFacility) => {
    setSelectedFacility(facility);
    
    // Call the onMarkerClick callback if provided
    if (onMarkerClick) {
      onMarkerClick(facility.id);
    }

    // If we have a map reference, adjust the center to show the info window properly
    if (mapRef) {
      const position = { lat: Number(facility.latitude), lng: Number(facility.longitude) };
      mapRef.panTo(position);
      
      // Add slight offset to ensure infowindow is fully visible
      setTimeout(() => {
        if (mapRef) {
          const currentCenter = mapRef.getCenter()?.toJSON();
          if (currentCenter) {
            mapRef.panTo({
              lat: currentCenter.lat - 0.015, // Slight offset upward
              lng: currentCenter.lng,
            });
          }
        }
      }, 50);
    }
  };

  // Close info window when clicking on the map
  const onMapClick = () => {
    setSelectedFacility(null);
  };

  // Effect to ensure markers re-render when facilities or map changes
  useEffect(() => {
    if (mapRef && facilities.length > 0) {
      // Force markers to update by setting this state
      setMarkersRendered(true);
      
      // Log for debugging
      console.log(`Rendering ${facilities.length} markers on Google Map`);
      
      // Create bounds to fit all markers if we have facilities
      const bounds = new google.maps.LatLngBounds();
      let validBounds = false;
      
      facilities.forEach(facility => {
        if (facility.latitude && facility.longitude) {
          bounds.extend({
            lat: Number(facility.latitude),
            lng: Number(facility.longitude),
          });
          validBounds = true;
        }
      });
      
      // Fit bounds if we have valid coordinates
      if (validBounds && facilities.length > 1) {
        // Fix padding format
        mapRef.fitBounds(bounds, { 
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        });
      }
    }
  }, [facilities, mapRef]);

  if (loadError) {
    return <MapErrorState error="Error loading Google Maps. Please check your API key." />;
  }

  if (!isLoaded) {
    return <MapLoadingState />;
  }

  return (
    <div className="w-full h-[650px] relative rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={(map) => {
          setMapRef(map);
          hookMapLoad(map);
          // Call the parent's onMapLoad if provided
          if (onMapLoad) {
            onMapLoad(map);
          }
          console.log("Google Map loaded");
        }}
        onClick={onMapClick}
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
        {/* Render Markers with key based on facilities to force re-render */}
        {facilities.map((facility) => (
          <MarkerF
            key={`marker-${facility.id}-${markersRendered ? 'rendered' : 'initial'}`}
            position={{
              lat: Number(facility.latitude),
              lng: Number(facility.longitude),
            }}
            onClick={() => handleMarkerClick(facility)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 
                recentlyViewedFacilityIds.includes(facility.id) || 
                selectedFacility?.id === facility.id || 
                currentZoom > 10 ? 12 : 10,
              fillColor: getMarkerColor(
                facility.id, 
                selectedFacility?.id === facility.id,
                recentlyViewedFacilityIds,
                currentZoom
              ),
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
            }}
            animation={google.maps.Animation.DROP}
          />
        ))}

        {/* Info Window for Selected Facility */}
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
            <FacilityInfoWindow facility={selectedFacility} />
          </InfoWindowF>
        )}
      </GoogleMap>
      
      {/* Facility highlight indicator below map */}
      <HighlightIndicator 
        selectedFacility={selectedFacility} 
        currentZoom={currentZoom} 
        recentlyViewedFacilityIds={recentlyViewedFacilityIds}
      />
      
      {/* Zoom level indicator for debugging */}
      <ZoomIndicator zoom={currentZoom} />
    </div>
  );
};

export default GoogleMapView;
