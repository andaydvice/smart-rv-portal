
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StorageFacility } from './types';
import { createPopupHTML } from './popupUtils';

interface MapViewProps {
  mapToken: string;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

const MapView = ({ mapToken, facilities, highlightedFacility, onMarkerClick }: MapViewProps) => {
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

    return () => {
      map.current?.remove();
    };
  }, [mapToken]);

  useEffect(() => {
    if (!map.current || !facilities?.length) return;

    markers.current.forEach(marker => marker.remove());
    markers.current = [];

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

    if (markers.current.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      facilities.forEach(facility => {
        bounds.extend([facility.longitude, facility.latitude]);
      });
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [facilities, highlightedFacility, onMarkerClick]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapView;
