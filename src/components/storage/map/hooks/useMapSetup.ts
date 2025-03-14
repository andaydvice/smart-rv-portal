
import { useEffect } from 'react';
import { StorageFacility } from '../../types';
import { fitMapToBounds } from '../utils/mapBounds';
import { ensureMarkersExist, removeViewDetailsButtons } from '@/utils/markers';

/**
 * Hook to handle map initialization and setup
 */
export const useMapSetup = (map: mapboxgl.Map | null, 
                            mapLoaded: boolean, 
                            validFacilities: StorageFacility[], 
                            selectedState: string | null) => {
  
  // Make map instance globally available
  useEffect(() => {
    if (map) {
      (window as any).mapInstance = map;
      document.dispatchEvent(new CustomEvent('mapboxgl.map.created', { detail: { map } }));
      
      // Explicitly set map container to visible
      const container = map.getContainer();
      if (container) {
        container.style.visibility = 'visible';
        container.style.opacity = '1';
        container.style.display = 'block';
      }
      
      // Add event listener for popup close events
      map.on('popupclose', () => {
        // Ensure map canvas is visible after popup closes
        const canvas = map.getCanvas();
        if (canvas) {
          canvas.style.visibility = 'visible';
          canvas.style.display = 'block';
          canvas.style.opacity = '1';
        }
        
        // Make sure all markers are visible
        document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
          if (marker instanceof HTMLElement) {
            marker.style.visibility = 'visible';
            marker.style.display = 'block';
            marker.style.opacity = '1';
          }
        });
        
        // Remove any view details buttons
        removeViewDetailsButtons();
      });
      
      // Store facilities in window for debugging
      if (validFacilities && validFacilities.length > 0) {
        (window as any).mapFacilities = validFacilities;
        console.log(`Stored ${validFacilities.length} facilities in window.mapFacilities`);
        
        // Try to create markers immediately after map creation
        setTimeout(() => {
          console.log(`Attempting to create ${validFacilities.length} markers on initial map setup`);
          ensureMarkersExist(map, validFacilities);
          removeViewDetailsButtons();
        }, 1000);
      }
    }
    
    return () => {
      (window as any).mapInstance = null;
      if (map) {
        map.off('popupclose');
      }
    };
  }, [map, validFacilities]);

  // Update map bounds when facilities change
  useEffect(() => {
    if (map && mapLoaded && validFacilities.length > 0) {
      console.log(`Fitting map to bounds with ${validFacilities.length} valid coordinates for state: ${selectedState || 'All States'}`);
      
      // Call resize() to ensure the map container is properly sized
      map.resize();
      
      // Create explicit variables for padding and zoom to ensure type safety
      const paddingValue: number = 50;
      const maxZoomValue: number = 10;
      
      // Make sure types are explicitly provided to avoid TypeScript errors
      fitMapToBounds(
        map,
        validFacilities as Array<{ longitude: number | string; latitude: number | string }>,
        paddingValue,
        maxZoomValue
      );
      
      // Log facility coordinates for debugging
      console.log('Facility coordinates to fit bounds:', validFacilities.map(f => ({
        id: f.id,
        name: f.name,
        lat: f.latitude,
        lng: f.longitude
      })));
      
      // Ensure markers exist for the filtered facilities
      setTimeout(() => {
        // Force clear existing markers first to ensure accurate count
        document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
          if (marker.parentNode) {
            marker.parentNode.removeChild(marker);
          }
        });
        
        const markerCount = ensureMarkersExist(map, validFacilities);
        console.log(`Created ${markerCount} markers after filtering to ${validFacilities.length} facilities`);
        
        // Remove any view details buttons
        removeViewDetailsButtons();
      }, 300);
    }
  }, [validFacilities, mapLoaded, map, selectedState]);

  return { map };
};
