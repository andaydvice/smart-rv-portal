
import { useRef, useCallback, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';
import { toast } from "sonner";
import { MarkerStatistics, UseMarkerCreationProps } from './types';
import { useMarkerVisibility } from './useMarkerVisibility';
import { useMarkerInitialization } from './useMarkerInitialization';
import { useMarkerStats } from './useMarkerStats';
import { useProcessExistingMarkers } from './useProcessExistingMarkers';
import { useCreateNewMarker } from './useCreateNewMarker';

// Helper function to adapt the StorageFacility type from markers utils to the full StorageFacility type
const adaptFacilityType = (facility: any): StorageFacility => {
  // Return as is - TypeScript will be satisfied but runtime behavior stays the same
  return facility as StorageFacility;
};

export const useMarkerCreation = ({ 
  map, 
  facilities, 
  highlightedFacility, 
  onMarkerClick 
}: UseMarkerCreationProps) => {
  const markers = useRef<mapboxgl.Marker[]>([]);
  const creationInProgress = useRef<boolean>(false);
  const lastFacilitiesLength = useRef<number>(0);
  const [stats, setStats] = useState<MarkerStatistics>({
    markersCreated: 0,
    skippedFacilities: 0,
    totalFacilities: 0,
    processedNYFacilities: 0,
    totalNYFacilities: 0,
    startTime: Date.now(),
    endTime: Date.now()
  });
  
  // Use our refactored hooks
  const { isMounted } = useMarkerInitialization();
  const { processExistingMarker, markAsProcessed } = useProcessExistingMarkers();
  const { createMarker, enhanceMarkerVisibility, clearExistingMarkers } = useCreateNewMarker();
  const { forceMarkerVisibility } = useMarkerVisibility({ map });

  const updateStats = useCallback((newStats: Partial<MarkerStatistics>) => {
    setStats(prevStats => ({
      ...prevStats,
      ...newStats,
      endTime: Date.now()
    }));
  }, []);

  // Effect to clean up markers when component unmounts
  useEffect(() => {
    return () => {
      // Clean up markers when component unmounts
      markers.current.forEach(marker => {
        if (marker) marker.remove();
      });
      markers.current = [];
      
      // Also clear persistent markers
      if (window._persistentMarkers) {
        Object.values(window._persistentMarkers).forEach(marker => {
          marker.remove();
        });
        window._persistentMarkers = {};
      }
    };
  }, []);

  // Function to create all markers with improved persistence and performance
  const createMarkers = useCallback(() => {
    // Prevent multiple concurrent creation processes
    if (creationInProgress.current) {
      console.log('Marker creation already in progress, skipping');
      return;
    }
    
    creationInProgress.current = true;
    console.log(`Creating markers for ${facilities.length} facilities`);
    
    if (!map || !map.loaded()) {
      console.warn('Map not fully loaded yet, cannot create markers');
      creationInProgress.current = false;
      return;
    }
    
    // Check if facilities array has changed significantly
    const significantChange = Math.abs(facilities.length - lastFacilitiesLength.current) > 5;
    lastFacilitiesLength.current = facilities.length;
    
    // Clear existing markers if there's a significant change in facilities
    if (significantChange) {
      clearExistingMarkers();
    }
    
    // Only show toast if we're actually creating new markers
    const newFacilities = facilities.filter(f => !window._persistentMarkers?.[f.id]);
    
    if (newFacilities.length > 0) {
      // Only toast if we have a significant number of new facilities
      if (newFacilities.length > 5) {
        toast.info(`Loading ${newFacilities.length} facilities on map`);
      }
    }
    
    // Initialize statistics
    let skipped = 0;
    let created = 0;
    
    // Use batch processing for better performance - process markers in chunks
    const processFacilityChunk = (startIndex: number, chunkSize: number) => {
      const endIndex = Math.min(startIndex + chunkSize, facilities.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        const facility = adaptFacilityType(facilities[i]);
        
        // Check if we should process an existing marker instead of creating a new one
        if (processExistingMarker(facility, map)) {
          continue;
        }
        
        // Create a new marker using our refactored service
        const marker = createMarker(
          facility,
          map,
          facility.id === highlightedFacility,
          onMarkerClick,
          facilities.map(f => adaptFacilityType(f)),
          i
        );
        
        if (marker) {
          // Track marker for later management
          markers.current.push(marker);
          
          // Add to our processed set to avoid duplication
          markAsProcessed(facility.id);
          
          created++;
        } else {
          skipped++;
        }
      }
      
      // If we have more chunks to process, schedule the next chunk
      if (endIndex < facilities.length && isMounted.current) {
        setTimeout(() => {
          processFacilityChunk(endIndex, chunkSize);
        }, 0);
      } else {
        // All chunks processed, update statistics and finish
        if (isMounted.current) {
          updateStats({
            markersCreated: created,
            skippedFacilities: skipped,
            totalFacilities: facilities.length,
          });
          
          // Log summary
          console.log(`✅ Created ${created} markers on the map out of ${facilities.length} facilities`);
          
          if (created > 0 && created > 10) {
            toast.success(`Added ${created} storage facilities to map`);
          } else if (facilities.length > 0 && created === 0 && newFacilities.length > 10) {
            toast.error('Failed to display facilities on map');
          }
        }
        
        // Force all markers to be visible after creation
        setTimeout(forceMarkerVisibility, 100);
        
        // Reset creation flag
        creationInProgress.current = false;
      }
    };
    
    // Start processing facilities in chunks of 10 for smoother performance
    processFacilityChunk(0, 10);
    
  }, [facilities, map, highlightedFacility, onMarkerClick, forceMarkerVisibility, updateStats, isMounted, createMarker, markAsProcessed, processExistingMarker, clearExistingMarkers]);

  return {
    markers,
    stats,
    createMarkers
  };
};
