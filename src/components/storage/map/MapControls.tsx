
import React from 'react';
import mapboxgl from 'mapbox-gl';

interface MapControlsProps {
  map: mapboxgl.Map;
}

const MapControls: React.FC<MapControlsProps> = ({ map }) => {
  React.useEffect(() => {
    map.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );
  }, [map]);

  return null;
};

export default MapControls;
