
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { createPopupHTML } from '../popupUtils';

interface FacilityMarkersProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

const FacilityMarkers: React.FC<FacilityMarkersProps> = ({
  map,
  facilities,
  highlightedFacility,
  onMarkerClick
}) => {
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
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
        .addTo(map);

      marker.getElement().addEventListener('click', () => {
        onMarkerClick(facility.id);
      });

      markers.current.push(marker);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
    };
  }, [map, facilities, highlightedFacility, onMarkerClick]);

  return null;
};

export default FacilityMarkers;
