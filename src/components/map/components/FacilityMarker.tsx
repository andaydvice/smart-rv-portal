
import React from 'react';
import { MarkerF } from '@react-google-maps/api';

interface FacilityMarkerProps {
  position: google.maps.LatLngLiteral;
  title: string;
  onClick: () => void;
  onLoad?: (marker: google.maps.Marker) => void;
}

const FacilityMarker: React.FC<FacilityMarkerProps> = ({
  position,
  title,
  onClick,
  onLoad
}) => {
  return (
    <MarkerF
      position={position}
      onClick={onClick}
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#5B9BD5', // Ocean Blue brand color
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
      }}
      animation={google.maps.Animation.DROP}
      title={title}
      onLoad={onLoad}
      visible={true}
      zIndex={1000}
    />
  );
};

export default FacilityMarker;
