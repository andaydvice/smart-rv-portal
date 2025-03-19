
import { useEffect, useState } from 'react';
import { StorageFacility } from '../../types';

export const useGoogleMapSetup = (
  mapRef: google.maps.Map | null,
  facilities: StorageFacility[],
  onZoomChange?: (zoom: number) => void,
  initialZoom: number = 4
) => {
  const [currentZoom, setCurrentZoom] = useState<number>(initialZoom);

  // Track zoom level changes
  useEffect(() => {
    if (!mapRef) return;
    
    const listener = mapRef.addListener('zoom_changed', () => {
      if (mapRef) {
        const newZoom = mapRef.getZoom() || initialZoom;
        setCurrentZoom(newZoom);
        
        // Call the onZoomChange callback if provided
        if (onZoomChange) {
          onZoomChange(newZoom);
        }
      }
    });
    
    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [mapRef, initialZoom, onZoomChange]);

  // Handle map load event
  const onMapLoad = (map: google.maps.Map) => {
    setCurrentZoom(map.getZoom() || initialZoom);
    
    // Create bounds to fit all markers
    if (facilities.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      facilities.forEach(facility => {
        bounds.extend({
          lat: Number(facility.latitude),
          lng: Number(facility.longitude),
        });
      });
      
      // Adjust the bounds fitting to avoid zooming too far in for single markers
      map.fitBounds(bounds, {
        top: 50, 
        right: 50, 
        bottom: 50, 
        left: 50
      });
      
      // Limit the maximum zoom level
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() && map.getZoom() > 15) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }
  };

  return {
    currentZoom,
    onMapLoad
  };
};
