
import React, { useEffect, useRef, useState } from 'react';
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
  const [markersCreated, setMarkersCreated] = useState<number>(0);

  useEffect(() => {
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Debug - log the received facilities in full detail
    console.log(`Received ${facilities.length} facilities to display on map`);
    console.log('Full facilities data:', JSON.stringify(facilities, null, 2));
    
    // Process each facility individually without grouping
    facilities.forEach((facility, index) => {
      try {
        // Validate coordinates
        if (!facility.latitude || !facility.longitude || 
            isNaN(Number(facility.latitude)) || isNaN(Number(facility.longitude))) {
          console.warn(`⚠️ Skipping facility due to invalid coordinates: ${facility.name}, lat: ${facility.latitude}, lng: ${facility.longitude}`);
          return;
        }

        // Ensure coordinates are numbers
        const lat = Number(facility.latitude);
        const lng = Number(facility.longitude);
        
        // Create marker
        console.log(`📍 Creating marker #${index + 1}: ${facility.name} (${facility.id}) at ${lat.toFixed(4)},${lng.toFixed(4)}`);
        
        const popup = new mapboxgl.Popup({
          offset: 25,
          maxWidth: '400px',
          className: 'storage-facility-popup'
        }).setHTML(createPopupHTML(facility));

        const marker = new mapboxgl.Marker({
          color: facility.id === highlightedFacility ? '#10B981' : '#60A5FA'
        })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);

        marker.getElement().addEventListener('click', () => {
          onMarkerClick(facility.id);
        });

        markers.current.push(marker);
      } catch (error) {
        console.error(`🚫 Error creating marker for ${facility.name}:`, error);
      }
    });

    setMarkersCreated(markers.current.length);
    console.log(`✅ Successfully created ${markers.current.length} markers on the map out of ${facilities.length} facilities`);

    return () => {
      console.log('🧹 Cleaning up markers');
      markers.current.forEach(marker => marker.remove());
    };
  }, [map, facilities, highlightedFacility, onMarkerClick]);

  // Add an extra element to report discrepancies (hidden in production)
  return process.env.NODE_ENV === 'development' ? (
    <div className="hidden">
      Markers created: {markersCreated}/{facilities.length}
    </div>
  ) : null;
};

export default FacilityMarkers;
