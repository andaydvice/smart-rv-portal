
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import type { Feature, FeatureCollection, Point } from 'geojson';
import { toast } from "sonner";

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
          if (map.getLayer('unclustered-point')) map.removeLayer('unclustered-point');
          map.removeSource('facilities');
        }

        // Skip if no facilities
        if (!facilities || facilities.length === 0) {
          console.log('No facilities to add to cluster layer');
          return;
        }

        console.log(`Adding ${facilities.length} facilities to cluster layer`);

        // Create the GeoJSON data with proper typing
        const validFacilities = facilities.filter(facility => {
          const lat = Number(facility.latitude);
          const lng = Number(facility.longitude);
          return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
        });

        if (validFacilities.length === 0) {
          console.warn('No valid coordinates for cluster layer');
          return;
        }

        const geojsonData: FeatureCollection<Point> = {
          type: "FeatureCollection",
          features: validFacilities.map((facility): Feature<Point> => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [Number(facility.longitude), Number(facility.latitude)]
            },
            properties: {
              id: facility.id,
              name: facility.name,
              isHighlighted: facility.id === highlightedFacility
            }
          }))
        };

        // Add cluster source with clustering disabled to show individual points
        map.addSource('facilities', {
          type: 'geojson',
          data: geojsonData,
          cluster: false // Disable clustering to show individual points
        });

        // Add individual point layer
        map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'facilities',
          paint: {
            'circle-color': '#F97316',
            'circle-radius': 0, // Set to 0 to make invisible (we use custom markers)
            'circle-opacity': 0
          }
        });

        console.log('Cluster layer initialized successfully with clustering disabled');
      } catch (err) {
        console.error('Error initializing cluster layer:', err);
        toast.error(`Error initializing map clusters: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    const setupMap = () => {
      if (!map) {
        console.error('Map not available for cluster layer');
        return;
      }
      
      if (!map.isStyleLoaded()) {
        // Wait for the style to load before adding sources and layers
        console.log('Style not loaded yet, waiting...');
        map.once('style.load', () => {
          if (isMounted) {
            console.log('Style loaded, initializing cluster layer');
            initializeLayer();
          }
        });
      } else {
        // Style is already loaded, initialize immediately
        console.log('Style already loaded, initializing cluster layer');
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
          if (map.getLayer('unclustered-point')) {
            map.removeLayer('unclustered-point');
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
