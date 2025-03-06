
import React, { useEffect, useRef, memo } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import type { Feature, FeatureCollection, Point } from 'geojson';
import { toast } from "sonner";

interface ClusterLayerProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
}

// Use React.memo to prevent unnecessary renders
const ClusterLayer: React.FC<ClusterLayerProps> = memo(({ map, facilities, highlightedFacility }) => {
  // Use ref to track initialization state
  const initializedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Debounce layer initialization for better performance
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Use a timeout to prevent too many rapid source updates
    timeoutRef.current = window.setTimeout(() => {
      if (!isMounted) return;
      
      // Skip if already initialized and no significant changes
      if (initializedRef.current && facilities.length > 100) {
        // For large datasets, only reinitialize on significant changes
        // like highlighting a facility
        return;
      }
      
      try {
        // Remove existing source and layers if they exist
        if (map.getSource('facilities')) {
          if (map.getLayer('unclustered-point')) map.removeLayer('unclustered-point');
          map.removeSource('facilities');
        }

        // Skip if no facilities or too many facilities (use markers instead)
        if (!facilities || facilities.length === 0 || facilities.length > 300) {
          return;
        }

        // Create the GeoJSON data with proper typing - only use valid coordinates
        const validFacilities = facilities.filter(facility => {
          const lat = Number(facility.latitude);
          const lng = Number(facility.longitude);
          return !isNaN(lat) && !isNaN(lng) && 
                 Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
        });

        if (validFacilities.length === 0) return;

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

        // Add source with clustering disabled to improve performance
        map.addSource('facilities', {
          type: 'geojson',
          data: geojsonData,
          cluster: false // Disable clustering
        });

        // Add invisible point layer - set radius to 0 so it doesn't interfere with markers
        map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'facilities',
          paint: {
            'circle-color': '#F97316',
            'circle-radius': 0, // Make invisible
            'circle-opacity': 0
          }
        });

        initializedRef.current = true;
      } catch (err) {
        console.error('Error initializing cluster layer:', err);
        // Only show error if development
        if (process.env.NODE_ENV === 'development') {
          toast.error(`Error initializing map clusters: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }
    }, 500); // Debounce for 500ms

    return () => {
      isMounted = false;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      try {
        // Cleanup resources
        if (map && map.getStyle()) {
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
}, (prevProps, nextProps) => {
  // Only re-render if these props change significantly
  return (
    prevProps.map === nextProps.map &&
    prevProps.highlightedFacility === nextProps.highlightedFacility &&
    prevProps.facilities.length === nextProps.facilities.length
  );
});

export default ClusterLayer;
