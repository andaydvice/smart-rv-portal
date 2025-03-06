
import React from 'react';
import mapboxgl from 'mapbox-gl';

interface MapControlsProps {
  map: mapboxgl.Map;
}

const MapControls: React.FC<MapControlsProps> = ({ map }) => {
  React.useEffect(() => {
    // Only try to add controls if map is properly initialized
    if (map && map.loaded()) {
      try {
        map.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );
        console.log('Navigation controls added successfully');
      } catch (error) {
        console.error('Failed to add map controls:', error);
      }
    } else {
      // If map isn't loaded yet, wait for it to load
      const handleMapLoad = () => {
        try {
          map.addControl(
            new mapboxgl.NavigationControl({
              visualizePitch: true,
            }),
            'top-right'
          );
          console.log('Navigation controls added after map load');
          // Clean up the event listener
          map.off('load', handleMapLoad);
        } catch (error) {
          console.error('Failed to add map controls after load:', error);
        }
      };
      
      // Add event listener for map load
      if (map) {
        map.on('load', handleMapLoad);
      }
    }
    
    // Cleanup function
    return () => {
      if (map) {
        map.off('load', () => {});
      }
    };
  }, [map]);

  return null;
};

export default MapControls;
