
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from './MapContext';
import { StorageFacility } from '../types';
import MapLoadingState from './MapLoadingState';
import { toast } from "sonner";
import { createDirectMarkers } from './utils/directMarkerCreation';
import { removeViewDetailsButtons, hideAllPopups } from '@/utils/markers/forcing/uiManipulation';

interface MapContainerProps {
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
}

const MapContainer: React.FC<MapContainerProps> = ({
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState
}) => {
  const { mapContainer, mapLoaded, isInitializing, mapError, map } = useMap();
  const [markersCreated, setMarkersCreated] = useState<boolean>(false);
  
  // Log props for debugging
  useEffect(() => {
    console.log(`MapContainer received ${facilities.length} facilities`);
    console.log(`Selected state: ${selectedState || 'none'}`);
    console.log(`Map loaded: ${mapLoaded}, Map initialized: ${!isInitializing}`);
  }, [facilities, selectedState, mapLoaded, isInitializing]);

  // Create markers when map is ready
  useEffect(() => {
    if (!map || !mapLoaded) {
      console.log('Map not ready yet, will create markers when ready');
      return;
    }
    
    console.log('Map is ready, creating direct markers');
    
    // Create direct markers
    createDirectMarkers(facilities, map);
    setMarkersCreated(true);
    
    // Show toast with the correct number of locations
    if (facilities.length > 0) {
      toast.success(`Showing ${facilities.length} locations${selectedState ? ` in ${selectedState}` : ''}`);
    }
    
    // Fit bounds to show all markers with extra padding to prevent popup clipping
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
          padding: { top: 80, bottom: 80, left: 50, right: 50 }, // Increased top/bottom padding
          maxZoom: 15
        });
      }
    }
    
    // Add safety padding to the map container to prevent popup clipping
    const mapContainer = map.getContainer();
    if (mapContainer) {
      mapContainer.style.padding = '30px';
    }
    
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
    };
    
    // Run immediately and set interval
    forceMarkerStates();
    const intervalId = setInterval(forceMarkerStates, 1000);
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [map, mapLoaded, facilities, selectedState]);
  
  // Focus on specific facility when highlighted
  useEffect(() => {
    if (!map || !mapLoaded || !highlightedFacility) return;
    
    const facility = facilities.find(f => f.id === highlightedFacility);
    if (facility && facility.latitude && facility.longitude) {
      const lat = parseFloat(String(facility.latitude));
      const lng = parseFloat(String(facility.longitude));
      
      if (!isNaN(lat) && !isNaN(lng)) {
        // Check position relative to map bounds to determine best popup placement
        const mapBounds = map.getBounds();
        const mapCenter = map.getCenter();
        const isNearTop = lat > (mapBounds.getNorth() - (mapBounds.getNorth() - mapBounds.getSouth()) * 0.3);
        const isNearBottom = lat < (mapBounds.getSouth() + (mapBounds.getNorth() - mapBounds.getSouth()) * 0.3);
        
        // Adjust the center point to ensure popup has room to display
        // Fix: Define as tuple instead of array to match LngLatLike type
        const adjustedCenter: [number, number] = [lng, lat];
        
        // If near top edge, move the center down slightly
        if (isNearTop) {
          adjustedCenter[1] = lat - 0.02;
        } 
        // If near bottom edge, move the center up slightly
        else if (isNearBottom) {
          adjustedCenter[1] = lat + 0.02;
        }
        
        map.flyTo({
          center: adjustedCenter,
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

  return (
    <div className="w-full h-full relative">
      {/* Map container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-visible" 
        style={{ overflow: 'visible', minHeight: '600px' }}
      />
      
      {/* Loading and error states */}
      <MapLoadingState 
        isInitializing={isInitializing} 
        mapError={mapError} 
        mapLoaded={mapLoaded} 
        facilitiesCount={facilities.length}
      />
      
      {/* Debug overlay */}
      <div className="absolute top-2 left-2 z-50 bg-black/60 text-white text-xs p-2 rounded">
        {facilities.length} facilities
        {selectedState && ` | ${selectedState}`}
      </div>
    </div>
  );
};

export default MapContainer;
