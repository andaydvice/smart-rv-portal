
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

  // Effect to update markers when highlighted facility changes
  useEffect(() => {
    if (map && markers.current.length > 0) {
      markers.current.forEach((marker, index) => {
        if (index < facilities.length) {
          const facility = facilities[index];
          const isHighlighted = facility.id === highlightedFacility;
          
          // Update marker appearance based on highlight state
          const el = marker.getElement();
          if (el) {
            el.style.backgroundColor = isHighlighted ? '#10B981' : '#F97316';
            el.style.zIndex = isHighlighted ? '10000' : '9999';
            el.style.transform = `translate(-50%, -50%) scale(${isHighlighted ? 1.2 : 1})`;
            el.style.boxShadow = isHighlighted ? 
              '0 0 20px rgba(16, 185, 129, 0.8)' : 
              '0 0 20px rgba(0,0,0,0.9)';
            
            // Force visibility
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.display = 'block';
          }
          
          if (isHighlighted) {
            console.log(`Highlighted marker for facility: ${facility.name}`);
            // Open popup for highlighted facility
            if (!marker.getPopup().isOpen()) {
              marker.togglePopup();
            }
          }
        }
      });
    }
  }, [highlightedFacility, facilities, map]);

  useEffect(() => {
    const createMarkers = () => {
      console.log(`Creating markers for ${facilities.length} facilities`);
      
      // Clear existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      
      if (!map || !map.loaded()) {
        console.warn('Map not fully loaded yet, cannot create markers');
        return;
      }
      
      toast.info(`Loading ${facilities.length} facilities on map`);
      
      // Count New York facilities
      const nyFacilitiesCount = countNewYorkFacilities(facilities);
      
      // Initialize statistics
      let processedNY = 0;
      let skipped = 0;
      let created = 0;

      // Build coordinates map to identify overlapping markers
      const coordinatesMap = buildCoordinatesMap(facilities);
      
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

          // Force the marker to be visible
          const el = marker.getElement();
          if (el) {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.display = 'block';
            el.style.zIndex = '9999';
            el.style.pointerEvents = 'auto';
          }

          // Track marker for later cleanup
          markers.current.push(marker);
          created++;
          
          // Extra validation for debugging
          if (created % 5 === 0) {
            console.log(`✅ Created ${created} markers so far...`);
          }
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
        console.log(`✅ Created ${created} markers on the map out of ${facilities.length} facilities`);
        
        if (created > 0) {
          toast.success(`Added ${created} storage facilities to map`);
        } else if (facilities.length > 0 && created === 0) {
          toast.error('Failed to display facilities on map');
        }
      }
    };

    // Force marker creation after map is fully rendered
    const attemptMarkerCreation = () => {
      if (map && facilities.length > 0) {
        // Delay marker creation to ensure map is ready
        setTimeout(() => {
          if (isMounted.current) {
            createMarkers();
            
            // Add a safety timeout to ensure markers are created
            setTimeout(() => {
              if (isMounted.current && markers.current.length === 0) {
                console.log('No markers created on first attempt, trying again...');
                createMarkers();
                
                // Force marker visibility after creation
                setTimeout(() => {
                  document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
                    if (marker instanceof HTMLElement) {
                      marker.style.visibility = 'visible';
                      marker.style.opacity = '1';
                      marker.style.display = 'block';
                      marker.style.zIndex = '9999';
                    }
                  });
                }, 500);
              }
            }, 1000);
          }
        }, 500);
      }
    };
    
    attemptMarkerCreation();
    
    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up markers');
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [map, facilities, onMarkerClick, highlightedFacility]);

  return <MarkerStats stats={stats} />;
};

export default FacilityMarkers;
