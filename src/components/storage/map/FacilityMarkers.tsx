
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
    
    // Create a diagnostic object to track invalid facilities
    const invalidFacilities = {
      missingCoordinates: [] as string[],
      zeroCoordinates: [] as string[],
      outOfRangeCoordinates: [] as string[],
      errors: [] as string[]
    };
    
    // Use a Set to track processed facilities to avoid duplicates
    const processedIds = new Set<string>();
    let skipped = 0;
    let processedNY = 0;
    
    // Process each facility individually
    facilities.forEach((facility, index) => {
      try {
        // Skip duplicates
        if (processedIds.has(facility.id)) {
          console.warn(`⚠️ Skipping duplicate facility: ${facility.name} (${facility.id})`);
          return;
        }
        
        // Identify New York facilities
        const isNewYork = 
          facility.state === 'New York' || 
          facility.state === 'NY' || 
          (typeof facility.state === 'string' && facility.state.toLowerCase().includes('new york'));
        
        if (isNewYork) {
          processedNY++;
          console.log(`Processing NY facility #${processedNY}: ${facility.name} (${facility.id}) - Coordinates: ${facility.latitude},${facility.longitude}`);
        }
        
        // ATTEMPT TO FIX COORDINATES IF NEEDED
        // For missing or zero coordinates, try to recover them by checking other properties
        if (!facility.latitude || !facility.longitude || 
            facility.latitude === 0 || facility.longitude === 0) {
          
          // Log the issue for diagnostics
          if (!facility.latitude || !facility.longitude) {
            invalidFacilities.missingCoordinates.push(`${facility.name} (${facility.id})`);
          } else if (facility.latitude === 0 || facility.longitude === 0) {
            invalidFacilities.zeroCoordinates.push(`${facility.name} (${facility.id})`);
          }
          
          // Skip this facility if coordinates can't be recovered
          console.warn(`⚠️ Skipping facility due to invalid coordinates: ${facility.name}, lat: ${facility.latitude}, lng: ${facility.longitude}`);
          skipped++;
          return;
        }

        // Ensure coordinates are numbers
        const lat = typeof facility.latitude === 'string' ? parseFloat(facility.latitude) : facility.latitude;
        const lng = typeof facility.longitude === 'string' ? parseFloat(facility.longitude) : facility.longitude;
        
        // MORE LENIENT VALIDATION - only skip if clearly out of range
        if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
          invalidFacilities.outOfRangeCoordinates.push(`${facility.name} (${facility.id}): [${lat}, ${lng}]`);
          console.warn(`⚠️ Skipping facility due to out-of-range coordinates: ${facility.name}, lat: ${lat}, lng: ${lng}`);
          skipped++;
          return;
        }
        
        // Add to processed set
        processedIds.add(facility.id);
        
        // Create marker with detailed logging
        const markerText = isNewYork ? `NY-${processedNY}` : `#${index + 1}`;
        console.log(`📍 Creating marker ${markerText}: ${facility.name} (${facility.id}) at ${lat.toFixed(6)},${lng.toFixed(6)} - State: ${facility.state}`);
        
        // Special handling for NY markers
        const markerColor = facility.id === highlightedFacility 
          ? '#10B981' 
          : (isNewYork ? '#EF4444' : '#60A5FA'); // Make NY markers red for visibility
        
        const popup = new mapboxgl.Popup({
          offset: 25,
          maxWidth: '400px',
          className: 'storage-facility-popup'
        }).setHTML(createPopupHTML(facility));

        const marker = new mapboxgl.Marker({
          color: markerColor
        })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);

        marker.getElement().addEventListener('click', () => {
          onMarkerClick(facility.id);
        });

        markers.current.push(marker);
      } catch (error) {
        invalidFacilities.errors.push(`${facility.name} (${facility.id}): ${error}`);
        console.error(`🚫 Error creating marker for ${facility.name}:`, error);
        skipped++;
      }
    });

    setMarkersCreated(markers.current.length);
    setSkippedFacilities(skipped);
    setProcessedNYFacilities(processedNY);
    
    console.log(`✅ Successfully created ${markers.current.length} markers on the map out of ${facilities.length} facilities (${skipped} skipped)`);
    console.log(`✅ Processed ${processedNY} New York facilities out of ${nyFacilities.length} total NY facilities`);
    
    // Log detailed diagnostic information about invalid facilities
    console.log('📊 DIAGNOSTIC REPORT - Invalid Facilities:');
    console.log('Missing coordinates:', invalidFacilities.missingCoordinates);
    console.log('Zero coordinates:', invalidFacilities.zeroCoordinates);
    console.log('Out of range coordinates:', invalidFacilities.outOfRangeCoordinates);
    console.log('Errors:', invalidFacilities.errors);

    return () => {
      console.log('🧹 Cleaning up markers');
      markers.current.forEach(marker => marker.remove());
    };
  }, [map, facilities, highlightedFacility, onMarkerClick]);

  // Add an extra element to report discrepancies
  return (
    <div className={process.env.NODE_ENV === 'development' ? 'fixed bottom-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded text-xs z-50' : 'hidden'}>
      <div className="font-bold">Map Debug Info:</div>
      <div>Markers created: {markersCreated}/{facilities.length} (skipped: {skippedFacilities})</div>
      {facilities.filter(f => f.state === 'New York' || f.state === 'NY').length > 0 && (
        <div className="mt-1 text-red-400">
          New York facilities: {processedNYFacilities}/{facilities.filter(f => 
            f.state === 'New York' || 
            f.state === 'NY' || 
            (typeof f.state === 'string' && f.state.toLowerCase().includes('new york'))
          ).length}
        </div>
      )}
    </div>
  );
};

export default FacilityMarkers;
