
import { useCallback, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createDirectMarkers } from '../utils/directMarkerCreation';
import { toast } from "sonner";
import { 
  removeViewDetailsButtons, 
  hideAllPopups,
  enableEdgeAwareMarkers
} from '@/utils/markers';

/**
 * Hook for handling map markers creation and management
 */
export const useMapMarkers = (
  map: mapboxgl.Map | null,
  mapLoaded: boolean,
  facilities: StorageFacility[],
  selectedState: string | null,
  onMarkersCreated: (created: boolean) => void
) => {
  // Create markers when map is ready
  useEffect(() => {
    if (!map || !mapLoaded) {
      console.log('Map not ready yet, will create markers when ready');
      return;
    }
    
    console.log('Map is ready, creating direct markers');
    
    // Create direct markers
    const markers = createDirectMarkers(facilities, map);
    onMarkersCreated(true);
    
    // Show toast with the correct number of locations
    if (facilities.length > 0) {
      toast.success(`Showing ${facilities.length} locations${selectedState ? ` in ${selectedState}` : ''}`);
    }
    
    // Fit bounds to show all markers
    if (facilities.length > 0 && map) {
      const bounds = new mapboxgl.LngLatBounds();
      
      facilities.forEach(facility => {
        if (facility.latitude && facility.longitude) {
          const lat = parseFloat(String(facility.latitude));
          const lng = parseFloat(String(facility.longitude));
          
          if (!isNaN(lat) && !isNaN(lng)) {
            bounds.extend([lng, lat]);
          }
        }
      });
      
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, {
          padding: { top: 70, bottom: 70, left: 50, right: 50 },
          maxZoom: 15
        });
      }
    }
    
    // Apply edge-aware handling to markers
    applyEdgeAwareHandling(map, facilities);
    
    // Set up periodic edge handling
    const intervalId = setInterval(() => applyEdgeAwareHandling(map, facilities), 2000);
    
    // Aggressively remove any "View Details" buttons
    removeViewDetailsButtons();
    
    // Hide all popups initially
    hideAllPopups();
    
    // Add global click handler to close popups when clicking outside
    const handleGlobalClick = setupGlobalClickHandler();
    document.addEventListener('click', handleGlobalClick);
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [map, mapLoaded, facilities, selectedState, onMarkersCreated]);

  /**
   * Applies edge-aware handling to markers
   */
  const applyEdgeAwareHandling = useCallback((
    map: mapboxgl.Map,
    facilities: StorageFacility[]
  ) => {
    console.log('Applying edge-aware handling to markers');
    enableEdgeAwareMarkers(map);
    
    // Also directly apply to all markers to ensure it works
    document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker').forEach(markerEl => {
      if (markerEl instanceof HTMLElement) {
        const facilityId = markerEl.getAttribute('data-facility-id');
        if (!facilityId) return;
        
        const facility = facilities.find(f => f.id === facilityId);
        if (!facility) return;
        
        // Get coordinates
        const lat = parseFloat(String(facility.latitude));
        const lng = parseFloat(String(facility.longitude));
        if (isNaN(lat) || isNaN(lng)) return;
        
        // Create edge-aware handler
        const edgeAwareHandler = createEdgeAwareHandler(map, lng, lat, facilityId);
        
        // Remove old handlers
        const oldHandler = markerEl.getAttribute('data-click-handler');
        if (oldHandler && (window as any)[oldHandler]) {
          markerEl.removeEventListener('click', (window as any)[oldHandler]);
        }
        
        // Add new edge-aware handler
        markerEl.addEventListener('click', edgeAwareHandler);
        
        // Store reference
        const handlerName = `edge_handler_${facilityId.replace(/[^a-zA-Z0-9]/g, '_')}`;
        (window as any)[handlerName] = edgeAwareHandler;
        markerEl.setAttribute('data-click-handler', handlerName);
        markerEl.setAttribute('data-edge-aware', 'true');
        
        console.log(`Applied edge-aware handler to marker ${facilityId}`);
      }
    });
  }, []);

  /**
   * Creates an edge-aware handler for a marker
   */
  const createEdgeAwareHandler = useCallback((
    map: mapboxgl.Map, 
    lng: number, 
    lat: number, 
    facilityId: string
  ) => {
    // Import here to avoid circular dependencies
    const { createEdgeAwareClickHandler } = require('@/utils/markers');
    
    return createEdgeAwareClickHandler(
      map,
      [lng, lat],
      (e) => {
        if (e) {
          e.stopPropagation();
          e.preventDefault();
        }
        
        // Show popup with delay to ensure map is repositioned first
        setTimeout(() => {
          // Find popup
          const popup = document.getElementById(`direct-popup-${facilityId}`);
          if (popup instanceof HTMLElement) {
            popup.style.display = 'block';
            popup.style.visibility = 'visible';
            popup.style.opacity = '1';
            popup.style.zIndex = '10000';
            popup.classList.add('visible');
            popup.classList.add('clicked');
          }
        }, 300);
      }
    );
  }, []);

  /**
   * Sets up global click handler to close popups when clicking outside
   */
  const setupGlobalClickHandler = useCallback(() => {
    return (e: MouseEvent) => {
      // Don't close popups if clicking on a marker or inside a popup
      if ((e.target as HTMLElement)?.closest('.mapboxgl-marker, .custom-marker, .direct-marker, .mapboxgl-popup, .direct-popup')) {
        return;
      }
      
      // Close all popups
      document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
        if (popup instanceof HTMLElement) {
          popup.style.display = 'none';
          popup.style.visibility = 'hidden';
          popup.style.opacity = '0';
          popup.style.zIndex = '-9999';
          popup.style.pointerEvents = 'none';
          popup.classList.remove('visible');
          popup.classList.remove('clicked');
        }
      });
    };
  }, []);
};
