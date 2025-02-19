
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
    let isMounted = true;

    const initializeLayer = () => {
      // Remove existing source and layers if they exist
      if (map.getSource('facilities')) {
        if (map.getLayer('clusters')) map.removeLayer('clusters');
        if (map.getLayer('cluster-count')) map.removeLayer('cluster-count');
        map.removeSource('facilities');
      }

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
    };

    const waitForStyleAndInitialize = () => {
      if (!isMounted) return;

      if (map.isStyleLoaded()) {
        initializeLayer();
      } else {
        map.once('style.load', () => {
          if (isMounted) {
            initializeLayer();
          }
        });
      }
    };

    waitForStyleAndInitialize();

    return () => {
      isMounted = false;
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
