
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapContext } from './MapContext';
import { StorageFacility } from '../types';
import { calculateMapBounds } from './utils/mapBounds';
import { createMarkersForState, clearAllMarkers } from './services/markerCreationService';

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
  const { mapToken } = useMapContext();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const prevStateRef = useRef<string | null>(null);
  const prevFacilitiesCountRef = useRef<number>(0);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-95.7129, 37.0902], // Center on US
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      attributionControl: false
    });
    
    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Make map instance available globally for emergency scripts
      if (typeof window !== 'undefined') {
        window.mapInstance = map.current;
      }
      
      // Fire custom event to notify other components that map is ready
      const event = new CustomEvent('mapboxgl.map.created', {
        detail: { map: map.current }
      });
      document.dispatchEvent(event);
    });
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapToken]);
  
  // Calculate and set map bounds based on facilities and selected state
  useEffect(() => {
    if (!map.current || !mapLoaded || facilities.length === 0) return;
    
    const bounds = calculateMapBounds(facilities, selectedState);
    
    if (bounds) {
      map.current.fitBounds([
        [bounds.west, bounds.south],
        [bounds.east, bounds.north]
      ], {
        padding: 40,
        maxZoom: 12,
        duration: 1000
      });
    }
  }, [facilities, selectedState, mapLoaded]);
  
  // Handle marker creation and updates
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    const stateChanged = prevStateRef.current !== selectedState;
    const facilitiesCountChanged = prevFacilitiesCountRef.current !== facilities.length;
    const highlightChanged = true; // Always update for highlight changes
    
    // Check if we need to update markers
    if (stateChanged || facilitiesCountChanged || highlightChanged) {
      console.log(`Updating markers due to changes: ${stateChanged ? 'state ' : ''}${facilitiesCountChanged ? 'count ' : ''}${highlightChanged ? 'highlight' : ''}`);
      
      // Clear existing markers if state or facilities count changed
      if (stateChanged || facilitiesCountChanged) {
        clearAllMarkers();
        
        // Create markers for all facilities or just for selected state
        markersRef.current = createMarkersForState(
          facilities,
          map.current,
          highlightedFacility,
          onMarkerClick,
          selectedState
        );
      } else {
        // Just update highlighted marker
        markersRef.current.forEach(marker => {
          const el = marker.getElement();
          const facilityId = el.getAttribute('data-facility-id');
          
          if (facilityId) {
            const isHighlighted = facilityId === highlightedFacility;
            el.setAttribute('data-highlighted', isHighlighted ? 'true' : 'false');
            
            // Update styles
            if (isHighlighted) {
              el.style.backgroundColor = '#10B981';
              el.style.width = '28px';
              el.style.height = '28px';
              el.style.zIndex = '999';
              el.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
              el.style.transform = 'translate(-50%, -50%) scale(1.2)';
            } else {
              el.style.backgroundColor = '#F97316';
              el.style.width = '24px';
              el.style.height = '24px';
              el.style.zIndex = '99';
              el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
              el.style.transform = 'translate(-50%, -50%)';
            }
          }
        });
      }
      
      // Update refs
      prevStateRef.current = selectedState;
      prevFacilitiesCountRef.current = facilities.length;
    }
    
    // Make facilities available globally
    if (typeof window !== 'undefined') {
      window.mapFacilities = facilities;
    }
    
    // Event handler for popup close
    const handlePopupClose = () => {
      console.log('Popup closed');
      // Ensure markers are visible
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
        }
      });
    };
    
    // Set up event listener for popup close
    document.addEventListener('mapbox.popup.closed', handlePopupClose);
    
    return () => {
      document.removeEventListener('mapbox.popup.closed', handlePopupClose);
    };
  }, [facilities, highlightedFacility, mapLoaded, onMarkerClick, selectedState]);
  
  // Log some debug info
  useEffect(() => {
    if (facilities.length > 0) {
      console.log(`MapContainer received ${facilities.length} facilities to display`);
      if (selectedState) {
        const stateCount = facilities.filter(f => f.state === selectedState).length;
        console.log(`${stateCount} facilities in ${selectedState}`);
      }
    }
  }, [facilities, selectedState]);
  
  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      {/* Marker count debug indicator (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 z-50 bg-black/60 text-white text-xs p-2 rounded">
          {markersRef.current.length} markers | {facilities.length} facilities
          {selectedState && ` | ${selectedState}`}
        </div>
      )}
    </div>
  );
};

export default MapContainer;
