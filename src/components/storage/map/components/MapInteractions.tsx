
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createDirectMarkers } from '../utils/directMarkerCreation';
import { removeViewDetailsButtons, hideAllPopups } from '@/utils/markers/forcing/uiManipulation';
import { enableEdgeAwareMarkers } from '@/utils/markers/forcing/preventEdgeCutoff';
import { toast } from "sonner";

interface MapInteractionsProps {
  map: mapboxgl.Map | null;
  mapLoaded: boolean;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  selectedState: string | null;
  onMarkersCreated: (created: boolean) => void;
}

/**
 * Handles map interactions, marker creation, and focus changes
 */
const MapInteractions: React.FC<MapInteractionsProps> = ({
  map,
  mapLoaded,
  facilities,
  highlightedFacility,
  selectedState,
  onMarkersCreated
}) => {
  // Create markers when map is ready
  useEffect(() => {
    if (!map || !mapLoaded) {
      console.log('Map not ready yet, will create markers when ready');
      return;
    }
    
    console.log('Map is ready, creating direct markers');
    
    // Create direct markers
    createDirectMarkers(facilities, map);
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
    
    // Apply edge-aware click handling to all markers
    setTimeout(() => {
      enableEdgeAwareMarkers(map);
    }, 1000);
    
    // Aggressively remove any "View Details" buttons
    removeViewDetailsButtons();
    
    // Hide all popups initially
    hideAllPopups();
    
    // Add global click handler to close popups when clicking outside
    const handleGlobalClick = (e: MouseEvent) => {
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
    
    document.addEventListener('click', handleGlobalClick);
    
    // Periodically force markers to be visible and popups to be hidden
    const forceMarkerStates = () => {
      // Force markers to be visible
      document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
        }
      });
      
      // Hide all popups by default, except for clicked ones
      document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
        if (popup instanceof HTMLElement && !popup.classList.contains('clicked') && !popup.classList.contains('visible')) {
          popup.style.display = 'none';
          popup.style.visibility = 'hidden';
          popup.style.opacity = '0';
          popup.style.zIndex = '-9999';
          popup.style.pointerEvents = 'none';
        }
      });
      
      // Remove any view details buttons
      removeViewDetailsButtons();
      
      // Re-apply edge-aware click handling periodically
      enableEdgeAwareMarkers(map);
    };
    
    // Run immediately and set interval
    forceMarkerStates();
    const intervalId = setInterval(forceMarkerStates, 1000);
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [map, mapLoaded, facilities, selectedState, onMarkersCreated]);
  
  // Focus on specific facility when highlighted
  useEffect(() => {
    if (!map || !mapLoaded || !highlightedFacility) return;
    
    const facility = facilities.find(f => f.id === highlightedFacility);
    if (facility && facility.latitude && facility.longitude) {
      const lat = parseFloat(String(facility.latitude));
      const lng = parseFloat(String(facility.longitude));
      
      if (!isNaN(lat) && !isNaN(lng)) {
        map.flyTo({
          center: [lng, lat],
          zoom: 14,
          essential: true
        });
        
        // Highlight the marker
        const marker = document.getElementById(`direct-marker-${facility.id}`);
        if (marker) {
          marker.style.backgroundColor = '#10B981';
          marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
          marker.style.zIndex = '10000';
          marker.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
          
          // Close all other popups first
          document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
            if (popup.id !== `direct-popup-${facility.id}`) {
              popup.classList.remove('clicked');
              popup.classList.remove('visible');
              (popup as HTMLElement).style.display = 'none';
              (popup as HTMLElement).style.visibility = 'hidden';
              (popup as HTMLElement).style.opacity = '0';
              (popup as HTMLElement).style.zIndex = '-9999';
              (popup as HTMLElement).style.pointerEvents = 'none';
            }
          });
          
          // Show the popup for the highlighted facility
          const popup = document.getElementById(`direct-popup-${facility.id}`);
          if (popup) {
            popup.style.display = 'block';
            popup.style.visibility = 'visible';
            popup.style.opacity = '1';
            popup.style.zIndex = '10000';
            popup.style.pointerEvents = 'auto';
            popup.classList.add('clicked');
            popup.classList.add('visible');
          }
        }
      }
    }
  }, [highlightedFacility, map, mapLoaded, facilities]);

  return null; // This component doesn't render any UI
};

export default MapInteractions;
