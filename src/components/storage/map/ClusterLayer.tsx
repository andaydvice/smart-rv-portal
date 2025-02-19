import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';

interface ClusterLayerProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
}

const ClusterLayer: React.FC<ClusterLayerProps> = ({ map, facilities, highlightedFacility }) => {
  useEffect(() => {
    const addLayersToMap = () => {
      try {
        // Remove existing source and layers if they exist
        if (map.getSource('facilities')) {
          if (map.getLayer('clusters')) map.removeLayer('clusters');
          if (map.getLayer('cluster-count')) map.removeLayer('cluster-count');
          map.removeSource('facilities');
        }

        console.log('Adding facilities source:', facilities.length, 'facilities');
        
        // Add cluster source
        map.addSource('facilities', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: facilities.map(facility => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [facility.longitude, facility.latitude]
              },
              properties: {
                id: facility.id,
                isHighlighted: facility.id === highlightedFacility
              }
            }))
          },
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        });

        console.log('Added facilities source');

        // Add cluster circles
        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'facilities',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': '#60A5FA',
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              10,
              30,
              50,
              40
            ]
          }
        });

        console.log('Added clusters layer');

        // Add cluster count text
        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'facilities',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          },
          paint: {
            'text-color': '#ffffff'
          }
        });

        console.log('Added cluster count layer');
      } catch (error) {
        console.error('Error adding layers:', error);
      }
    };

    // If style is loaded, add layers immediately
    if (map.isStyleLoaded()) {
      console.log('Style is loaded, adding layers');
      addLayersToMap();
    } else {
      // Otherwise wait for style to load
      console.log('Waiting for style to load');
      map.once('style.load', () => {
        console.log('Style loaded, now adding layers');
        addLayersToMap();
      });
    }

    // Cleanup function
    return () => {
      if (map.getSource('facilities')) {
        if (map.getLayer('clusters')) map.removeLayer('clusters');
        if (map.getLayer('cluster-count')) map.removeLayer('cluster-count');
        map.removeSource('facilities');
      }
    };
  }, [map, facilities, highlightedFacility]);

  return null;
};

export default ClusterLayer;
