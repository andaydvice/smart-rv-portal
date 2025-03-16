
import { useEffect, useState, useCallback, useRef } from 'react';
import { StorageFacility } from '../../types';
import mapboxgl from 'mapbox-gl';
import { createDirectMarkers } from '../utils/direct-markers';
import { createEdgeAwareClickHandler } from '@/utils/markers/forcing/edge-aware';

/**
 * Hook for managing map markers for storage facilities
 */
export const useMapMarkers = (
  map: mapboxgl.Map | null,
  mapLoaded: boolean,
  facilities: StorageFacility[],
  selectedState: string | null,
  onMarkersCreated: (created: boolean) => void
) => {
  // Initialize state outside of any conditional logic
  const [markersCreated, setMarkersCreated] = useState(false);
  
  // Use a ref to track if we've already created markers in this render cycle
  const markersCreatedRef = useRef(false);
  
  // Create markers for all facilities
  useEffect(() => {
    // Reset the markersCreated flag when dependencies change
    setMarkersCreated(false);
    markersCreatedRef.current = false;
    
    if (!map || !mapLoaded || facilities.length === 0) {
      console.log("Map not ready or no facilities available");
      return;
    }
    
    console.log(`Creating markers for ${facilities.length} facilities`);
    
    // Filter facilities by selected state if applicable
    const filteredFacilities = selectedState 
      ? facilities.filter(f => f.state === selectedState)
      : facilities;
    
    console.log(`Creating ${filteredFacilities.length} markers after filtering`);
    
    // Create direct markers
    try {
      const markerCount = createDirectMarkers(filteredFacilities, map);
      console.log(`Created ${markerCount} markers`);
      
      // Add click handlers for any "View Details" buttons
      setTimeout(() => {
        document.querySelectorAll('.view-facility-btn').forEach(btn => {
          if (btn instanceof HTMLElement) {
            const facilityId = btn.getAttribute('data-facility-id');
            if (facilityId) {
              // Create a click handler that respects boundaries
              const handleClick = createEdgeAwareClickHandler(
                map,
                // Get the coordinates for this facility
                (() => {
                  const facility = filteredFacilities.find(f => f.id === facilityId);
                  if (facility && facility.latitude && facility.longitude) {
                    return [parseFloat(String(facility.longitude)), parseFloat(String(facility.latitude))];
                  }
                  return [0, 0]; // Default coordinates if not found
                })(),
                // Click handler
                (e: MouseEvent) => {
                  console.log(`View details clicked for facility ${facilityId}`);
                  e.preventDefault();
                  e.stopPropagation();
                  // Navigate or show details for this facility
                }
              );
              
              // Add click handler
              btn.addEventListener('click', handleClick);
            }
          }
        });
      }, 500);
      
      // Update state and ref
      if (!markersCreatedRef.current) {
        setMarkersCreated(true);
        markersCreatedRef.current = true;
        onMarkersCreated(true);
      }
    } catch (error) {
      console.error("Error creating markers:", error);
      setMarkersCreated(false);
      markersCreatedRef.current = false;
      onMarkersCreated(false);
    }
    
    // Cleanup function
    return () => {
      // Remove markers when component unmounts or when dependencies change
      document.querySelectorAll('.direct-marker, .direct-popup').forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, [map, mapLoaded, facilities, selectedState, onMarkersCreated]);
  
  return {
    markersCreated
  };
};
