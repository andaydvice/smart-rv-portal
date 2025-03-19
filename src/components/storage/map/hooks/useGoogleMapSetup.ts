
import { useState, useEffect, useCallback } from 'react';
import { StorageFacility } from '../../types';

interface UseGoogleMapSetupResult {
  currentZoom: number;
  onMapLoad: (map: google.maps.Map) => void;
}

export const useGoogleMapSetup = (
  mapRef: google.maps.Map | null,
  facilities: StorageFacility[],
  onZoomChange?: (zoom: number) => void,
  initialZoom: number = 4
): UseGoogleMapSetupResult => {
  const [currentZoom, setCurrentZoom] = useState<number>(initialZoom);
  
  // Set up the zoom change listener
  useEffect(() => {
    if (!mapRef) return;
    
    // Handler for zoom changes
    const handleZoomChange = () => {
      const newZoom = mapRef.getZoom() || initialZoom;
      setCurrentZoom(newZoom);
      
      if (onZoomChange) {
        onZoomChange(newZoom);
      }
      
      // Force marker visibility on zoom changes
      const markers = document.querySelectorAll('.gm-style [title], .gm-style-pbc [title]');
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
        }
      });
      
      console.log(`Google Map zoom changed to ${newZoom}`);
    };
    
    // Add the zoom changed listener
    mapRef.addListener('zoom_changed', handleZoomChange);
    
    // Also listen for bounds changes to ensure markers are visible
    mapRef.addListener('bounds_changed', () => {
      console.log('Map bounds changed, ensuring marker visibility');
      
      setTimeout(() => {
        // Force marker visibility
        const markers = document.querySelectorAll('.gm-style [title], .gm-style-pbc [title]');
        markers.forEach(marker => {
          if (marker instanceof HTMLElement) {
            marker.style.visibility = 'visible';
            marker.style.opacity = '1';
          }
        });
      }, 100);
    });
    
    // Log current bounds
    console.log(`Current map bounds: ${mapRef.getBounds()?.toString()}`);
    console.log(`Current markers expected: ${facilities.length}`);
    
    return () => {
      if (mapRef) {
        // Remove the listeners on cleanup
        google.maps.event.clearListeners(mapRef, 'zoom_changed');
        google.maps.event.clearListeners(mapRef, 'bounds_changed');
      }
    };
  }, [mapRef, onZoomChange, initialZoom, facilities.length]);
  
  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    console.log('Google Map loaded successfully');
    
    // Initial zoom settings
    const zoom = map.getZoom() || initialZoom;
    setCurrentZoom(zoom);
    
    // Add a small delay to ensure the map is fully initialized
    setTimeout(() => {
      // Create bounds to fit all markers if we have facilities
      if (facilities.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        let validBounds = false;
        
        facilities.forEach(facility => {
          if (facility.latitude && facility.longitude) {
            bounds.extend({
              lat: Number(facility.latitude),
              lng: Number(facility.longitude),
            });
            validBounds = true;
          }
        });
        
        // Fit bounds if we have valid coordinates
        if (validBounds && facilities.length > 1) {
          // Fix padding format: Use top, right, bottom, left properties instead of padding
          map.fitBounds(bounds, {
            top: 50,
            right: 50,
            bottom: 50, 
            left: 50
          });
        }
      }
      
      // Monitor for marker visibility issues and force visibility if needed
      setInterval(() => {
        const markers = document.querySelectorAll('.gm-style [title], .gm-style-pbc [title]');
        if (markers.length === 0) {
          console.warn('No markers found in Google Map, attempting to force refresh');
          
          // Pan the map slightly to force a redraw
          map.panBy(1, 0);
          setTimeout(() => map.panBy(-1, 0), 50);
        }
      }, 2000);
      
    }, 500);
    
    return map;
  }, [facilities, initialZoom]);
  
  return {
    currentZoom,
    onMapLoad,
  };
};
