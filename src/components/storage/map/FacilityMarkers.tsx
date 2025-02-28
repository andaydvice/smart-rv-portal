
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

    // Log the number of facilities to be displayed
    console.log(`Creating markers for ${facilities.length} facilities`);
    console.log('Facilities data:', JSON.stringify(facilities.map(f => ({
      id: f.id,
      name: f.name,
      state: f.state,
      latitude: f.latitude,
      longitude: f.longitude
    })), null, 2));
    
    // Group facilities by their coordinates
    const coordGroups = facilities.reduce((groups: { [key: string]: StorageFacility[] }, facility) => {
      // Skip any facilities with invalid coordinates
      if (!facility.latitude || !facility.longitude || 
          isNaN(facility.latitude) || isNaN(facility.longitude)) {
        console.warn(`Skipping facility with invalid coordinates: ${facility.name}`);
        return groups;
      }
      
      const key = `${facility.latitude.toFixed(6)},${facility.longitude.toFixed(6)}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(facility);
      return groups;
    }, {});

    console.log(`Created ${Object.keys(coordGroups).length} coordinate groups`);

    // Add new markers with offset for duplicates
    Object.values(coordGroups).forEach((groupFacilities, groupIndex) => {
      console.log(`Processing group ${groupIndex} with ${groupFacilities.length} facilities`);
      
      groupFacilities.forEach((facility, index) => {
        try {
          // Calculate offset for facilities with same coordinates
          const offsetDistance = 0.004; // Roughly 400 meters for better visibility
          const angle = (2 * Math.PI * index) / groupFacilities.length;
          
          const adjustedLng = facility.longitude + (groupFacilities.length > 1 ? Math.cos(angle) * offsetDistance : 0);
          const adjustedLat = facility.latitude + (groupFacilities.length > 1 ? Math.sin(angle) * offsetDistance : 0);

          // Log individual marker creation for debugging
          console.log(`Creating marker for: ${facility.name}, ${facility.state} at ${adjustedLat},${adjustedLng}`);

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
        } catch (error) {
          console.error(`Error creating marker for ${facility.name}:`, error);
        }
      });
    });

    console.log(`Successfully created ${markers.current.length} markers on the map`);

    return () => {
      markers.current.forEach(marker => marker.remove());
    };
  }, [map, facilities, highlightedFacility, onMarkerClick]);

  return null;
};

export default FacilityMarkers;
