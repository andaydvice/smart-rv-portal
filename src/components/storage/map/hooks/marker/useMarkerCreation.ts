
import { useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';
import { toast } from "sonner";
import { MarkerStatistics, UseMarkerCreationProps } from './types';
import { useMarkerVisibility } from './useMarkerVisibility';
import { useMarkerInitialization } from './useMarkerInitialization';
import { useMarkerStats } from './useMarkerStats';
import { useProcessExistingMarkers } from './useProcessExistingMarkers';
import { useCreateNewMarker } from './useCreateNewMarker';

export const useMarkerCreation = ({ 
  map, 
  facilities, 
  highlightedFacility, 
  onMarkerClick 
}: UseMarkerCreationProps) => {
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  // Use our new refactored hooks
  const { isMounted } = useMarkerInitialization();
  const { stats, updateStats } = useMarkerStats();
  const { processExistingMarker, markAsProcessed } = useProcessExistingMarkers();
  const { createMarker } = useCreateNewMarker();
  const { forceMarkerVisibility } = useMarkerVisibility({ map });

  // Function to create all markers with improved persistence
  const createMarkers = useCallback(() => {
    console.log(`Creating markers for ${facilities.length} facilities`);
    
    if (!map || !map.loaded()) {
      console.warn('Map not fully loaded yet, cannot create markers');
      return;
    }
    
    // Only show toast if we're actually creating new markers
    const newFacilities = facilities.filter(f => !window._persistentMarkers?.[f.id]);
    
    if (newFacilities.length > 0) {
      toast.info(`Loading ${newFacilities.length} facilities on map`);
    }
    
    // Initialize statistics
    let skipped = 0;
    let created = 0;

    // Create markers for each facility
    facilities.forEach((facility, index) => {
      // Check if we should process an existing marker instead of creating a new one
      if (processExistingMarker(facility, map)) {
        return;
      }
      
      // Create a new marker
      const marker = createMarker(
        facility,
        map,
        facility.id === highlightedFacility,
        onMarkerClick,
        facilities,
        index
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
    });

    // Update statistics
    if (isMounted.current) {
      updateStats({
        markersCreated: created,
        skippedFacilities: skipped,
        totalFacilities: facilities.length,
      });
      
      // Log summary
      console.log(`✅ Created ${created} markers on the map out of ${facilities.length} facilities`);
      
      if (created > 0) {
        toast.success(`Added ${created} storage facilities to map`);
      } else if (facilities.length > 0 && created === 0 && newFacilities.length > 0) {
        toast.error('Failed to display facilities on map');
      }
    }
    
    // Force all markers to be visible after creation
    setTimeout(forceMarkerVisibility, 100);
  }, [facilities, map, highlightedFacility, onMarkerClick, forceMarkerVisibility, updateStats]);

  return {
    markers,
    stats,
    createMarkers
  };
};
