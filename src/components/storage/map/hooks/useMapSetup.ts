
import { useEffect, useRef, useState } from 'react';
import { StorageFacility } from '../../types';
import { fitMapToBounds } from '../utils/mapBounds';

/**
 * Hook to handle map initialization and setup
 */
export const useMapSetup = (map: mapboxgl.Map | null, 
                            mapLoaded: boolean, 
                            validFacilities: StorageFacility[], 
                            selectedState: string | null) => {
  
  // Keep track of whether we've fitted the bounds
  const boundsSetRef = useRef(false);
  const [mapReady, setMapReady] = useState(false);
  
  // Make map instance globally available
  useEffect(() => {
    if (!map) return;
    
    // Store reference to map
    (window as any).mapInstance = map;
    document.dispatchEvent(new CustomEvent('mapboxgl.map.created', { detail: { map } }));
    
    // Force resize after a short delay to ensure proper rendering
    const resizeTimer = setTimeout(() => {
      if (map) {
        map.resize();
        console.log('Initial map resize triggered');
        
        // Mark map as ready after resize
        setMapReady(true);
      }
    }, 500);
    
    // Add event listener for map load event
    const handleMapLoad = () => {
      console.log('Map fully loaded via event');
      setMapReady(true);
    };
    
    map.on('load', handleMapLoad);
    
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
    
    return () => {
      clearTimeout(resizeTimer);
      (window as any).mapInstance = null;
      if (map) {
        map.off('popupclose');
        map.off('load', handleMapLoad);
      }
    };
  }, [map]);

  // Update map bounds when facilities change
  useEffect(() => {
    if (map && mapLoaded && validFacilities.length > 0 && !boundsSetRef.current) {
      console.log(`Fitting map to bounds with ${validFacilities.length} valid coordinates`);
      
      // Call fitMapToBounds with all required arguments
      fitMapToBounds(map, validFacilities, 50, 10);
      
      // Mark bounds as set to avoid repeated fitting
      boundsSetRef.current = true;
      
      // Force map re-render
      setTimeout(() => {
        if (map) {
          map.resize();
          console.log('Map bounds set and resize triggered');
          
          // Store facilities for emergency marker recreation
          (window as any).mapFacilities = validFacilities;
          
          // Set a flag to indicate facilities are loaded
          document.body.setAttribute('data-facilities-loaded', 'true');
        }
      }, 500);
    }
  }, [validFacilities, mapLoaded, map, selectedState]);

  return { map, mapReady };
};
