
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
    
    // Debug - log the received facilities in full detail
    console.log(`Received ${facilities.length} facilities to display on map`);
    
    // Count New York facilities specifically and log them all
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
    
    let skipped = 0;
    let processedNY = 0;
    
    // Create a Set of NY facility IDs to track duplicates
    const processedNYIds = new Set();
    
    // Process each facility individually without grouping
    facilities.forEach((facility, index) => {
      try {
        // Identify New York facilities using multiple methods
        const isNewYork = 
          facility.state === 'New York' || 
          facility.state === 'NY' || 
          (typeof facility.state === 'string' && facility.state.toLowerCase().includes('new york'));
        
        if (isNewYork) {
          // Check for duplicate processing
          if (processedNYIds.has(facility.id)) {
            console.warn(`⚠️ Duplicate NY facility detected: ${facility.name} (${facility.id})`);
            return;
          }
          
          processedNYIds.add(facility.id);
          processedNY++;
          
          console.log(`Processing NY facility #${processedNY}: ${facility.name} (${facility.id}) - Coordinates: ${facility.latitude},${facility.longitude}`);
        }
        
        // Validate coordinates
        if (!facility.latitude || !facility.longitude || 
            isNaN(Number(facility.latitude)) || isNaN(Number(facility.longitude)) ||
            Number(facility.latitude) === 0 || Number(facility.longitude) === 0) {
          console.warn(`⚠️ Skipping facility due to invalid coordinates: ${facility.name}, lat: ${facility.latitude}, lng: ${facility.longitude}`);
          skipped++;
          return;
        }

        // Ensure coordinates are numbers
        const lat = Number(facility.latitude);
        const lng = Number(facility.longitude);
        
        // Extra validation for coordinates
        if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
          console.warn(`⚠️ Skipping facility due to out-of-range coordinates: ${facility.name}, lat: ${lat}, lng: ${lng}`);
          skipped++;
          return;
        }
        
        // Create marker
        const markerText = isNewYork ? `NY-${processedNY}` : `#${index + 1}`;
        console.log(`📍 Creating marker ${markerText}: ${facility.name} (${facility.id}) at ${lat.toFixed(4)},${lng.toFixed(4)} - State: ${facility.state}`);
        
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
        console.error(`🚫 Error creating marker for ${facility.name}:`, error);
        skipped++;
      }
    });

    setMarkersCreated(markers.current.length);
    setSkippedFacilities(skipped);
    setProcessedNYFacilities(processedNY);
    
    console.log(`✅ Successfully created ${markers.current.length} markers on the map out of ${facilities.length} facilities (${skipped} skipped)`);
    console.log(`✅ Processed ${processedNY} New York facilities out of ${nyFacilities.length} total NY facilities`);

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
