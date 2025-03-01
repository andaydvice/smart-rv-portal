
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
    console.log('ALL New York facilities:', JSON.stringify(nyFacilities.map(f => ({
      id: f.id,
      name: f.name,
      coordinates: [f.longitude, f.latitude],
      state: f.state
    })), null, 2));
    
    // Track processed NY facilities
    let processedNY = 0;
    let skipped = 0;
    
    // CRITICAL FIX: Create ALL markers with minimal validation
    // We'll only skip entries with clearly invalid data
    facilities.forEach((facility, index) => {
      try {
        // Identify New York facilities
        const isNewYork = 
          facility.state === 'New York' || 
          facility.state === 'NY' || 
          (typeof facility.state === 'string' && facility.state.toLowerCase().includes('new york'));
        
        if (isNewYork) {
          processedNY++;
          console.log(`Processing NY facility #${processedNY}: ${facility.name} (${facility.id}) - Coordinates: ${facility.latitude},${facility.longitude}`);
        }
        
        // SUPER MINIMAL VALIDATION - only skip if completely missing coordinates
        // We'll treat 0,0 as valid for now to see if that's the issue
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
            parsedLng: lng,
            latType: typeof facility.latitude,
            lngType: typeof facility.longitude,
            isLatNaN: isNaN(lat),
            isLngNaN: isNaN(lng)
          });
        }
        
        // Even if coordinates are 0,0 or NaN, we'll render them to see what's happening
        // We'll log warnings instead of skipping
        if (isNaN(lat) || isNaN(lng)) {
          console.warn(`⚠️ Warning: Invalid numeric coordinates for ${facility.name}, using 0,0 instead`);
          lat = 0;
          lng = 0;
        }
        
        // Use same marker color for all pins, only highlight the selected one
        const markerColor = facility.id === highlightedFacility 
          ? '#10B981' 
          : '#60A5FA'; // Use the same blue color for all pins including NY
        
        const popup = new mapboxgl.Popup({
          offset: 25,
          maxWidth: '400px',
          className: 'storage-facility-popup'
        }).setHTML(createPopupHTML(facility));

        // Create marker and add to map
        const marker = new mapboxgl.Marker({
          color: markerColor
        })
          .setLngLat([lng, lat])
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
          console.log(`✅ NY #${processedNY} marker created successfully at [${lng}, ${lat}]`);
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
