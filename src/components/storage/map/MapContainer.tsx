
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from './MapContext';
import { StorageFacility } from '../types';
import MapLoadingState from './MapLoadingState';
import { toast } from "sonner";
import { createDirectMarkers } from './utils/directMarkerCreation';

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
    
    // Create markers again when facilities change
    // this handles state filtering
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
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 15
        });
      }
    }
    
    // Periodically force markers to be visible
    const forceMarkersVisible = () => {
      document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
        }
      });
    };
    
    // Run immediately and set interval
    forceMarkersVisible();
    const intervalId = setInterval(forceMarkersVisible, 1000);
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
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
          
          // Show the popup
          const popup = document.getElementById(`direct-popup-${facility.id}`);
          if (popup) {
            popup.style.display = 'block';
            popup.style.visibility = 'visible';
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
        {facilities.length} facilities | 
        {document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker').length} markers
        {selectedState && ` | ${selectedState}`}
      </div>
    </div>
  );
};

export default MapContainer;
