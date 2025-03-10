
import { useEffect } from 'react';
import { StorageFacility } from '../../types';
import { fitMapToBounds } from '../utils/mapBounds';

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
      });
    }
    
    return () => {
      (window as any).mapInstance = null;
      if (map) {
        map.off('popupclose');
      }
    };
  }, [map]);

  // Update map bounds when facilities change
  useEffect(() => {
    if (map && mapLoaded && validFacilities.length > 0) {
      console.log(`Fitting map to bounds with ${validFacilities.length} valid coordinates`);
      
      // Fix: The map.resize() method doesn't take any arguments
      map.resize();
      
      // Fix: Pass the required arguments to fitMapToBounds
      fitMapToBounds(map, validFacilities, 50, 10);
    }
  }, [validFacilities, mapLoaded, map, selectedState]);

  return { map };
};
