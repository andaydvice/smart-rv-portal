
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { useFacilityHighlight } from '../hooks/useFacilityHighlight';
import { useMapSetup } from '../hooks/useMapSetup';
import { enableEdgeAwareMarkers } from '@/utils/markers/forcing/edge-aware';

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
  // Ensure facilities is always an array even if undefined
  const validFacilities = facilities || [];
  
  // Use hooks for marker creation and facility highlighting - always call hooks
  const { markersCreated } = useMapMarkers(map, mapLoaded, validFacilities, selectedState, onMarkersCreated);
  
  // Setup map with facilities data
  useMapSetup(map, mapLoaded, validFacilities, selectedState);
  
  // Handle facility highlighting
  useFacilityHighlight(map, mapLoaded, validFacilities, highlightedFacility);
  
  // Make markers edge-aware to prevent truncation
  useEffect(() => {
    if (map && mapLoaded && markersCreated) {
      // Apply edge-aware behavior to all markers with a delay to ensure DOM is ready
      const timer = setTimeout(() => {
        enableEdgeAwareMarkers(map);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [map, mapLoaded, markersCreated]);
  
  // Setup key event listener to close popups with Escape key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close all popups
        document.querySelectorAll('.mapboxgl-popup, .direct-popup').forEach(popup => {
          if (popup instanceof HTMLElement) {
            popup.style.display = 'none';
            popup.style.visibility = 'hidden';
            if (popup.classList.contains('visible')) {
              popup.classList.remove('visible');
            }
            if (popup.classList.contains('clicked')) {
              popup.classList.remove('clicked');
            }
          }
        });
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  // Log status for debugging
  useEffect(() => {
    console.log(`MapInteractions: Markers created: ${markersCreated}`);
  }, [markersCreated]);

  // This component doesn't render any UI
  return null;
};

export default MapInteractions;
