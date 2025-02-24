
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import type { Feature, FeatureCollection, Point } from 'geojson';

interface ClusterLayerProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
}

const ClusterLayer: React.FC<ClusterLayerProps> = ({ map, facilities, highlightedFacility }) => {
  useEffect(() => {
    let isMounted = true;

    const initializeLayer = () => {
      try {
        // Remove existing source and layers if they exist
        if (map.getSource('facilities')) {
          if (map.getLayer('clusters')) map.removeLayer('clusters');
          if (map.getLayer('cluster-count')) map.removeLayer('cluster-count');
          map.removeSource('facilities');
        }

        // Create the GeoJSON data with proper typing
        const geojsonData: FeatureCollection<Point> = {
          type: "FeatureCollection",
          features: facilities.map((facility): Feature<Point> => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [facility.longitude, facility.latitude]
            },
            properties: {
              id: facility.id,
              isHighlighted: facility.id === highlightedFacility
            }
          }))
        };

        // Add cluster source
        map.addSource('facilities', {
          type: 'geojson',
          data: geojsonData,
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
      } catch (err) {
        console.error('Error initializing cluster layer:', err);
      }
    };

    const setupMap = () => {
      if (!map.isStyleLoaded()) {
        // Wait for the style to load before adding sources and layers
        map.once('style.load', () => {
          if (isMounted) {
            console.log('Style loaded, initializing layer');
            initializeLayer();
          }
        });
      } else {
        // Style is already loaded, initialize immediately
        console.log('Style already loaded, initializing layer');
        initializeLayer();
      }
    };

    setupMap();

    return () => {
      isMounted = false;
      try {
        // Check if map is still valid and has the layers/source before removing
        if (map && map.getStyle()) {
          if (map.getLayer('clusters')) {
            map.removeLayer('clusters');
          }
          if (map.getLayer('cluster-count')) {
            map.removeLayer('cluster-count');
          }
          if (map.getSource('facilities')) {
            map.removeSource('facilities');
          }
        }
      } catch (err) {
        console.error('Error during cleanup:', err);
      }
    };
  }, [map, facilities, highlightedFacility]);

  return null;
};

export default ClusterLayer;
