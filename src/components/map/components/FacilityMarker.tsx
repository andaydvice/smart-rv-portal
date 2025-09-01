
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
  // Only access google.maps objects when component renders, not at module load time
  const getMarkerIcon = () => {
    if (typeof google === 'undefined' || !google.maps) {
      return undefined;
    }
    
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 12,
      fillColor: '#5B9BD5', // Ocean Blue brand color
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
    };
  };

  const getAnimation = () => {
    if (typeof google === 'undefined' || !google.maps) {
      return undefined;
    }
    return google.maps.Animation.DROP;
  };

  return (
    <MarkerF
      position={position}
      onClick={onClick}
      icon={getMarkerIcon()}
      animation={getAnimation()}
      title={title}
      onLoad={onLoad}
      visible={true}
      zIndex={1000}
    />
  );
};

export default FacilityMarker;
