
import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StorageFacility } from './types';
import FacilityMarkers from './map/FacilityMarkers';
import { setupMapEventListeners } from './map/utils/mapEvents';
import { applyMapStyles } from './map/utils/mapConfiguration';
import { closeAllEmergencyPopups, setDetailPanelState } from '@/utils/markers/emergency';

// Types for the MapView component
interface MapViewProps {
  mapToken: string;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
  onCloseFacilityDetail?: () => void;
}

const MapView: React.FC<MapViewProps> = ({
  mapToken,
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState,
  onCloseFacilityDetail
}) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Setup the map when the component mounts
  useEffect(() => {
    if (!mapToken || !mapContainerRef.current) return;
    
    // Set Mapbox access token
    mapboxgl.accessToken = mapToken;
    
    // Create the map
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 3,
      attributionControl: true
    });
    
    // Add navigation controls
    newMap.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );
    
    // Set the map in the state when it's loaded
    newMap.on('load', () => {
      console.log('Map loaded');
      setMap(newMap);
      window.mapInstance = newMap;
      
      // Dispatch an event that the map has been created
      document.dispatchEvent(new CustomEvent('mapboxgl.map.created', {
        detail: { map: newMap }
      }));
      
      // Add map styles
      applyMapStyles();
      
      // Setup event listeners for the map
      setupMapEventListeners(newMap);
      
      // Add a close button click handler to the map
      newMap.on('click', (e) => {
        // If we detect we clicked directly on the map (not a marker),
        // and we have a detail panel open, close it
        if (e.originalEvent.target === newMap.getCanvas() && window.hasDetailPanelOpen && onCloseFacilityDetail) {
          console.log('Map clicked, closing detail panel');
          closeAllEmergencyPopups();
          onCloseFacilityDetail();
          setDetailPanelState(false);
        }
      });
    });
    
    // Clean up on unmount
    return () => {
      newMap.remove();
      window.mapInstance = undefined;
    };
  }, [mapToken, onCloseFacilityDetail]);
  
  // Focus the map on the selected state
  useEffect(() => {
    if (!map) return;
    
    // If we have a selected state, zoom to it
    if (selectedState && selectedState !== 'all') {
      const stateCoordinates: Record<string, [number, number]> = {
        'california': [-119.4179, 36.7783],
        'new_york': [-75.0095, 42.9538],
        'texas': [-99.9018, 31.9686],
        'florida': [-81.5158, 27.9944],
        'illinois': [-89.3985, 40.6331],
        // Add more states as needed
      };
      
      const coordinates = stateCoordinates[selectedState.toLowerCase()];
      if (coordinates) {
        map.flyTo({
          center: coordinates,
          zoom: 6,
          essential: true
        });
      }
    } else {
      // Reset to default view of US
      map.flyTo({
        center: [-98.5795, 39.8283],
        zoom: 3,
        essential: true
      });
    }
  }, [map, selectedState]);
  
  // Handle click events on the X button
  const handleCloseButtonClick = () => {
    if (onCloseFacilityDetail) {
      closeAllEmergencyPopups();
      onCloseFacilityDetail();
      setDetailPanelState(false);
    }
  };
  
  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="absolute inset-0" />
      
      {map && (
        <FacilityMarkers
          map={map}
          facilities={facilities}
          highlightedFacility={highlightedFacility}
          onMarkerClick={onMarkerClick}
        />
      )}
      
      {/* Close button for highlighted facility */}
      {highlightedFacility && (
        <button
          className="absolute top-4 right-4 bg-[#151A22] p-2 rounded-full z-30 hover:bg-gray-700"
          onClick={handleCloseButtonClick}
          aria-label="Close facility details"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default MapView;
