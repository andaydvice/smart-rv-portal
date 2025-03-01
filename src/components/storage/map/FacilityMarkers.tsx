
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { 
  calculateMarkerOffset, 
  buildCoordinatesMap, 
  createFacilityMarker,
  hasValidCoordinates
} from './utils/markerUtils';
import {
  isNewYorkFacility,
  logNewYorkFacilityDetails,
  countNewYorkFacilities
} from './components/NewYorkFacilities';
import MarkerStats, { MarkerStatistics } from './components/MarkerStats';

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
  const [stats, setStats] = useState<MarkerStatistics>({
    markersCreated: 0,
    skippedFacilities: 0,
    processedNYFacilities: 0,
    totalFacilities: 0,
    totalNYFacilities: 0
  });

  useEffect(() => {
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    console.log(`Received ${facilities.length} facilities to display on map`);
    
    // Count New York facilities
    const nyFacilitiesCount = countNewYorkFacilities(facilities);
    console.log(`New York facilities count: ${nyFacilitiesCount}`);
    
    // Initialize statistics
    let processedNY = 0;
    let skipped = 0;

    // Build coordinates map to identify overlapping markers
    const coordinatesMap = buildCoordinatesMap(facilities);
    
    // Create markers for each facility
    facilities.forEach((facility, index) => {
      try {
        // Check if this is a New York facility
        const isNY = isNewYorkFacility(facility);
        if (isNY) {
          processedNY++;
        }
        
        // Skip facilities with missing coordinates
        if (!hasValidCoordinates(facility)) {
          console.warn(`⚠️ Skipping facility due to missing coordinates: ${facility.name}`);
          skipped++;
          return;
        }

        // Calculate marker coordinates with offset for overlapping markers
        const coordinates = calculateMarkerOffset(facility, coordinatesMap, facilities, index);
        
        // Log detailed information for New York facilities
        if (isNY) {
          logNewYorkFacilityDetails(facility, processedNY, coordinates);
        }
        
        // Create the marker
        const marker = createFacilityMarker(
          facility,
          coordinates,
          facility.id === highlightedFacility,
          onMarkerClick,
          map
        );

        // Track marker for later cleanup
        markers.current.push(marker);
      } catch (error) {
        console.error(`🚫 Error creating marker for ${facility.name}:`, error);
        skipped++;
      }
    });

    // Update statistics
    setStats({
      markersCreated: markers.current.length,
      skippedFacilities: skipped,
      processedNYFacilities: processedNY,
      totalFacilities: facilities.length,
      totalNYFacilities: nyFacilitiesCount
    });
    
    // Log summary
    console.log(`✅ Created ${markers.current.length} markers on the map out of ${facilities.length} facilities (${skipped} skipped)`);
    console.log(`✅ Processed ${processedNY} New York facilities out of ${nyFacilitiesCount} total NY facilities`);

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up markers');
      markers.current.forEach(marker => marker.remove());
    };
  }, [map, facilities, highlightedFacility, onMarkerClick]);

  return <MarkerStats stats={stats} />;
};

export default FacilityMarkers;
