
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StorageFacility } from './types';
import { createPopupHTML } from './popupUtils';
import { supabase } from '@/integrations/supabase/client';

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
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5795, 39.8283],
      zoom: 3
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add cluster source and layers when map loads
    map.current.on('load', () => {
      if (!map.current) return;

      // Add a data source with cluster properties
      map.current.addSource('facilities', {
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
      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'facilities',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#60A5FA',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,  // radius for point count 0-10
            10,  
            30,  // radius for point count 10-50
            50,  
            40   // radius for point count 50+
          ]
        }
      });

      // Add cluster count text
      map.current.addLayer({
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

      // Add unclustered point markers
      facilities.forEach(facility => {
        const popup = new mapboxgl.Popup({ 
          offset: 25,
          maxWidth: '400px',
          className: 'storage-facility-popup'
        }).setHTML(createPopupHTML(facility));

        const marker = new mapboxgl.Marker({ 
          color: facility.id === highlightedFacility ? '#10B981' : '#60A5FA'
        })
          .setLngLat([facility.longitude, facility.latitude])
          .setPopup(popup)
          .addTo(map.current!);

        marker.getElement().addEventListener('click', () => {
          onMarkerClick(facility.id);
        });

        markers.current.push(marker);
      });

      // Handle clicks on clusters
      map.current.on('click', 'clusters', (e) => {
        const features = map.current!.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        
        if (!features.length) return;
        
        const clusterId = features[0].properties!.cluster_id;
        const source = map.current!.getSource('facilities') as mapboxgl.GeoJSONSource;
        
        source.getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;

            const coordinates = (features[0].geometry as any).coordinates;
            
            map.current!.easeTo({
              center: coordinates,
              zoom: zoom
            });
          }
        );
      });

      // Change cursor on hover
      map.current.on('mouseenter', 'clusters', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer';
        }
      });
      
      map.current.on('mouseleave', 'clusters', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = '';
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [mapToken, facilities, highlightedFacility, onMarkerClick]);

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

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapView;
