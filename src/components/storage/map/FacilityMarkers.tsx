
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
  const [skippedFacilities, setSkippedFacilities] = useState<number>(0);
  const [processedNYFacilities, setProcessedNYFacilities] = useState<number>(0);

  useEffect(() => {
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    console.log(`Received ${facilities.length} facilities to display on map`);
    
    // Count and log New York facilities
    const nyFacilities = facilities.filter(f => 
      f.state === 'New York' || f.state === 'NY' || 
      (typeof f.state === 'string' && f.state.toLowerCase().includes('new york'))
    );
    
    console.log(`New York facilities count: ${nyFacilities.length}`);
    
    // Track processed NY facilities
    let processedNY = 0;
    let skipped = 0;

    // Create a map to track coordinates and count overlapping markers
    const coordinatesMap: Record<string, number> = {};
    
    // IMPROVED: First pass to identify overlapping coordinates
    facilities.forEach(facility => {
      if (facility.latitude !== null && facility.longitude !== null) {
        // Round to 5 decimal places for grouping nearby coordinates
        const roundedLat = Math.round(Number(facility.latitude) * 100000) / 100000;
        const roundedLng = Math.round(Number(facility.longitude) * 100000) / 100000;
        const coordKey = `${roundedLat},${roundedLng}`;
        
        // Count overlapping markers
        if (coordinatesMap[coordKey]) {
          coordinatesMap[coordKey]++;
        } else {
          coordinatesMap[coordKey] = 1;
        }
      }
    });
    
    // Now create markers with offsets for overlapping points
    facilities.forEach((facility, index) => {
      try {
        // Identify New York facilities
        const isNewYork = 
          facility.state === 'New York' || 
          facility.state === 'NY' || 
          (typeof facility.state === 'string' && facility.state.toLowerCase().includes('new york'));
        
        if (isNewYork) {
          processedNY++;
        }
        
        // SUPER MINIMAL VALIDATION - only skip if completely missing coordinates
        if (facility.latitude === null || facility.longitude === null || 
            facility.latitude === undefined || facility.longitude === undefined) {
          console.warn(`⚠️ Skipping facility due to missing coordinates: ${facility.name}`);
          skipped++;
          return;
        }

        // Convert coordinates to numbers no matter what
        let lat = 0, lng = 0;
        
        try {
          lat = typeof facility.latitude === 'string' ? parseFloat(facility.latitude) : Number(facility.latitude);
          lng = typeof facility.longitude === 'string' ? parseFloat(facility.longitude) : Number(facility.longitude);
        } catch (e) {
          console.warn(`⚠️ Error parsing coordinates for ${facility.name}: ${e}`);
          // Still attempt to use the coordinates directly
          lat = facility.latitude as any;
          lng = facility.longitude as any;
        }
        
        // Log detailed coordinate information for NY facilities
        if (isNewYork) {
          console.log(`NY #${processedNY} Coordinates detail:`, {
            facilityId: facility.id, 
            name: facility.name,
            rawLat: facility.latitude, 
            rawLng: facility.longitude,
            parsedLat: lat, 
            parsedLng: lng
          });
        }
        
        // Even if coordinates are 0,0 or NaN, we'll render them to see what's happening
        if (isNaN(lat) || isNaN(lng)) {
          console.warn(`⚠️ Warning: Invalid numeric coordinates for ${facility.name}, using 0,0 instead`);
          lat = 0;
          lng = 0;
        }
        
        // Add offset to overlapping markers
        const roundedLat = Math.round(lat * 100000) / 100000;
        const roundedLng = Math.round(lng * 100000) / 100000;
        const coordKey = `${roundedLat},${roundedLng}`;
        
        // Only add offset if there are multiple markers at this location
        let offsetLat = lat;
        let offsetLng = lng;
        
        if (coordinatesMap[coordKey] > 1) {
          // Get the marker index at this coordinate
          const markersAtCoord = coordinatesMap[coordKey];
          // Calculate the current marker's position in the stack
          const markerPosition = facilities.slice(0, index)
            .filter(f => {
              const fLat = Number(f.latitude);
              const fLng = Number(f.longitude);
              const fRoundedLat = Math.round(fLat * 100000) / 100000;
              const fRoundedLng = Math.round(fLng * 100000) / 100000;
              return `${fRoundedLat},${fRoundedLng}` === coordKey;
            }).length;
          
          // Apply spiral pattern offset to make overlapping markers visible
          // This creates a spiral pattern around the original point
          const angle = (markerPosition * (2 * Math.PI)) / markersAtCoord;
          const radius = 0.0003 * (markerPosition + 1); // Small offset in degrees (~30 meters)
          
          offsetLat = lat + radius * Math.sin(angle);
          offsetLng = lng + radius * Math.cos(angle);
          
          console.log(`Applied offset to overlapping marker: ${facility.name} (${markerPosition + 1} of ${markersAtCoord} at ${coordKey})`);
        }
        
        // Use same marker color for all pins, only highlight the selected one
        const markerColor = facility.id === highlightedFacility 
          ? '#10B981' 
          : '#60A5FA';
        
        const popup = new mapboxgl.Popup({
          offset: 25,
          maxWidth: '400px',
          className: 'storage-facility-popup'
        }).setHTML(createPopupHTML(facility));

        // Create marker with potentially offset coordinates
        const marker = new mapboxgl.Marker({
          color: markerColor
        })
          .setLngLat([offsetLng, offsetLat])
          .setPopup(popup)
          .addTo(map);

        // Add click event
        marker.getElement().addEventListener('click', () => {
          onMarkerClick(facility.id);
        });

        // Track marker for later cleanup
        markers.current.push(marker);
        
        // Log success for NY facilities
        if (isNewYork) {
          console.log(`✅ NY #${processedNY} marker created successfully at [${offsetLng}, ${offsetLat}]`);
        }
      } catch (error) {
        console.error(`🚫 Error creating marker for ${facility.name}:`, error);
        skipped++;
      }
    });

    setMarkersCreated(markers.current.length);
    setSkippedFacilities(skipped);
    setProcessedNYFacilities(processedNY);
    
    console.log(`✅ Created ${markers.current.length} markers on the map out of ${facilities.length} facilities (${skipped} skipped)`);
    console.log(`✅ Processed ${processedNY} New York facilities out of ${nyFacilities.length} total NY facilities`);

    return () => {
      console.log('🧹 Cleaning up markers');
      markers.current.forEach(marker => marker.remove());
    };
  }, [map, facilities, highlightedFacility, onMarkerClick]);

  // Return null to remove the debug notice
  return null;
};

export default FacilityMarkers;
