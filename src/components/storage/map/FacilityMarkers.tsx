
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
import { toast } from "sonner";

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

  // Use a reference to track if the component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!map || !map.loaded()) {
      console.warn('Map not fully loaded yet, delaying marker creation');
      const checkMapInterval = setInterval(() => {
        if (map && map.loaded()) {
          clearInterval(checkMapInterval);
          if (isMounted.current) createMarkers();
        }
      }, 200);
      
      return () => {
        clearInterval(checkMapInterval);
      };
    } else {
      createMarkers();
    }
    
    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up markers');
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [map, facilities, highlightedFacility, onMarkerClick]);

  const createMarkers = () => {
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    console.log(`Creating markers for ${facilities.length} facilities`);
    toast.info(`Loading ${facilities.length} facilities on map`);
    
    // Count New York facilities
    const nyFacilitiesCount = countNewYorkFacilities(facilities);
    
    // Initialize statistics
    let processedNY = 0;
    let skipped = 0;
    let created = 0;

    // Build coordinates map to identify overlapping markers
    const coordinatesMap = buildCoordinatesMap(facilities);
    
    // Force marker display by adding a small delay to ensure map is ready
    setTimeout(() => {
      if (!isMounted.current) return;
      
      // Create markers for each facility
      facilities.forEach((facility, index) => {
        try {
          // Check if facility has valid coordinates
          if (!hasValidCoordinates(facility)) {
            console.warn(`⚠️ Skipping facility due to missing coordinates: ${facility.name}`);
            skipped++;
            return;
          }

          // Check if this is a New York facility
          const isNY = isNewYorkFacility(facility);
          if (isNY) {
            processedNY++;
          }
          
          // Calculate marker coordinates with offset for overlapping markers
          const coordinates = calculateMarkerOffset(facility, coordinatesMap, facilities, index);
          
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
          created++;
        } catch (error) {
          console.error(`🚫 Error creating marker for ${facility.name}:`, error);
          skipped++;
        }
      });

      // Update statistics
      if (isMounted.current) {
        setStats({
          markersCreated: created,
          skippedFacilities: skipped,
          processedNYFacilities: processedNY,
          totalFacilities: facilities.length,
          totalNYFacilities: nyFacilitiesCount
        });
        
        // Log summary
        console.log(`✅ Created ${created} markers on the map out of ${facilities.length} facilities (${skipped} skipped)`);
        
        if (created > 0) {
          toast.success(`Added ${created} storage facilities to map`);
        } else if (facilities.length > 0 && created === 0) {
          toast.error('Failed to display facilities on map');
        }
      }
    }, 1000); // Increased delay to ensure map is fully loaded
  };

  return <MarkerStats stats={stats} />;
};

export default FacilityMarkers;
