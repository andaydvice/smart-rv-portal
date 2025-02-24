
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

    // Group facilities by their coordinates
    const coordGroups = facilities.reduce((groups: { [key: string]: StorageFacility[] }, facility) => {
      const key = `${facility.latitude.toFixed(6)},${facility.longitude.toFixed(6)}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(facility);
      return groups;
    }, {});

    // Add new markers with offset for duplicates
    Object.values(coordGroups).forEach((groupFacilities, groupIndex) => {
      groupFacilities.forEach((facility, index) => {
        // Calculate offset for facilities with same coordinates
        const offsetDistance = 0.004; // Increased to roughly 400 meters for better visibility
        const angle = (2 * Math.PI * index) / groupFacilities.length;
        
        const adjustedLng = facility.longitude + (groupFacilities.length > 1 ? Math.cos(angle) * offsetDistance : 0);
        const adjustedLat = facility.latitude + (groupFacilities.length > 1 ? Math.sin(angle) * offsetDistance : 0);

        const popup = new mapboxgl.Popup({
          offset: 25,
          maxWidth: '400px',
          className: 'storage-facility-popup'
        }).setHTML(createPopupHTML(facility));

        const marker = new mapboxgl.Marker({
          color: facility.id === highlightedFacility ? '#10B981' : '#60A5FA'
        })
          .setLngLat([adjustedLng, adjustedLat])
          .setPopup(popup)
          .addTo(map);

        marker.getElement().addEventListener('click', () => {
          onMarkerClick(facility.id);
        });

        markers.current.push(marker);
      });
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
    };
  }, [map, facilities, highlightedFacility, onMarkerClick]);

  return null;
};

export default FacilityMarkers;
