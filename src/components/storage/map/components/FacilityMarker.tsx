
import React from 'react';
import { MarkerF } from '@react-google-maps/api';

interface FacilityMarkerProps {
  position: google.maps.LatLngLiteral;
  isHighlighted: boolean;
  currentZoom: number;
  onClick: () => void;
}

const FacilityMarker: React.FC<FacilityMarkerProps> = ({
  position,
  isHighlighted,
  currentZoom,
  onClick
}) => {
  const getMarkerColor = (isHighlighted: boolean, currentZoom: number) => {
    if (isHighlighted) return '#10B981';
    if (currentZoom > 10) return '#10B981';
    return '#F97316';
  };

  return (
    <MarkerF
      position={position}
      onClick={onClick}
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: isHighlighted || currentZoom > 10 ? 12 : 10,
        fillColor: getMarkerColor(isHighlighted, currentZoom),
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
      }}
      animation={google.maps.Animation.DROP}
    />
  );
};

export default FacilityMarker;
