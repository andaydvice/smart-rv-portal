
import React, { useRef, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { darkMapStyles } from '../utils/mapStyles';

interface GoogleMapContainerProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  onLoad?: (map: google.maps.Map) => void;
  children: React.ReactNode;
}

const mapContainerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '0.5rem',
};

const GoogleMapContainer: React.FC<GoogleMapContainerProps> = ({
  center,
  zoom,
  onLoad,
  children
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  
  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (onLoad) {
      onLoad(map);
    }
  }, [onLoad]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      onLoad={handleMapLoad}
      options={{
        styles: darkMapStyles,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      }}
    >
      {children}
    </GoogleMap>
  );
};

export default GoogleMapContainer;
