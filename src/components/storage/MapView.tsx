
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StorageFacility } from './types';
import { supabase } from '@/integrations/supabase/client';
import MapControls from './map/MapControls';
import ClusterLayer from './map/ClusterLayer';
import FacilityMarkers from './map/FacilityMarkers';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface MapViewProps {
  mapToken: string;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
}

const MapView = ({
  mapToken,
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;
      
      // Clear any existing map
      if (map.current) {
        map.current.remove();
        map.current = null;
      }

      if (!mapToken) {
        console.log('No mapbox token available yet');
        setMapError('Waiting for map token...');
        setIsInitializing(false);
        return;
      }

      try {
        console.log('Initializing map with token');
        mapboxgl.accessToken = mapToken;

        const initMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [-98.5795, 39.8283],
          zoom: 3,
          attributionControl: true
        });

        initMap.once('load', () => {
          console.log('Map loaded successfully');
          setMapError(null);
          setIsInitializing(false);
          map.current = initMap;

          initMap.on('click', 'clusters', (e) => {
            const features = initMap.queryRenderedFeatures(e.point, {
              layers: ['clusters']
            });

            if (!features.length) return;

            const clusterId = features[0].properties!.cluster_id;
            const source = initMap.getSource('facilities') as mapboxgl.GeoJSONSource;

            source.getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;
              const coordinates = (features[0].geometry as any).coordinates;
              initMap.easeTo({ center: coordinates, zoom: zoom });
            });
          });

          initMap.on('mouseenter', 'clusters', () => {
            initMap.getCanvas().style.cursor = 'pointer';
          });

          initMap.on('mouseleave', 'clusters', () => {
            initMap.getCanvas().style.cursor = '';
          });
        });

        initMap.on('error', (e) => {
          console.error('Mapbox error:', e);
          setMapError('Failed to load map: ' + e.error.message);
          setIsInitializing(false);
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
        });

      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to initialize map: ' + (error as Error).message);
        setIsInitializing(false);
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapToken]);

  useEffect(() => {
    const updateMapBounds = async () => {
      if (!map.current || !selectedState) return;

      const { data: bounds } = await supabase
        .from('state_bounds')
        .select('*')
        .eq('state', selectedState)
        .single();

      if (bounds) {
        const mapBounds = new mapboxgl.LngLatBounds(
          [bounds.min_lng, bounds.min_lat],
          [bounds.max_lng, bounds.max_lat]
        );

        map.current.fitBounds(mapBounds, {
          padding: 50,
          maxZoom: 12
        });
      }
    };

    updateMapBounds();
  }, [selectedState]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-[#080F1F]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {mapError && (
        <Alert variant="destructive" className="absolute top-4 left-4 right-4 z-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{mapError}</AlertDescription>
        </Alert>
      )}
      <div 
        ref={mapContainer} 
        className="w-full h-full" 
        style={{ minHeight: '600px' }}
      />
      {map.current && (
        <>
          <MapControls map={map.current} />
          <ClusterLayer
            map={map.current}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
          />
          <FacilityMarkers
            map={map.current}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
            onMarkerClick={onMarkerClick}
          />
        </>
      )}
    </div>
  );
};

export default MapView;
