
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from './MapContext';
import { StorageFacility } from '../types';
import MapLoadingState from './MapLoadingState';
import { toast } from "sonner";

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
  const [visibleMarkerCount, setVisibleMarkerCount] = useState<number>(0);
  
  // Track and manage markers
  const markersRef = React.useRef<{[id: string]: mapboxgl.Marker}>({});
  
  // Log props for debugging
  useEffect(() => {
    console.log(`MapContainer received ${facilities.length} facilities`);
    console.log(`Selected state: ${selectedState || 'none'}`);
    console.log(`Map loaded: ${mapLoaded}, Map initialized: ${!isInitializing}`);
    
    if (map && facilities.length > 0) {
      console.log('Map is ready and has facilities to display');
    }
  }, [facilities, selectedState, mapLoaded, isInitializing, map]);

  // Clear and create markers when dependencies change
  useEffect(() => {
    if (!map || isInitializing || !mapLoaded) {
      console.log('Map not ready yet, skipping marker creation');
      return;
    }
    
    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => {
      marker.remove();
    });
    markersRef.current = {};
    
    console.log(`Creating markers for ${facilities.length} facilities${selectedState ? ` in ${selectedState}` : ''}`);
    
    // Track valid markers
    let validMarkerCount = 0;
    
    // Create markers for all facilities
    facilities.forEach(facility => {
      if (!facility.latitude || !facility.longitude) {
        console.warn(`Facility ${facility.id} has invalid coordinates`);
        return;
      }
      
      const lat = parseFloat(String(facility.latitude));
      const lng = parseFloat(String(facility.longitude));
      
      if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
        console.warn(`Facility ${facility.id} has invalid coordinates: ${lat}, ${lng}`);
        return;
      }

      // Create marker element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      
      // Set styling based on highlight state
      const isHighlighted = facility.id === highlightedFacility;
      el.style.cssText = `
        background-color: ${isHighlighted ? '#10B981' : '#F97316'};
        width: ${isHighlighted ? '28px' : '24px'};
        height: ${isHighlighted ? '28px' : '24px'};
        border-radius: 50%;
        border: 2px solid white;
        cursor: pointer;
        box-shadow: ${isHighlighted ? '0 0 20px rgba(16, 185, 129, 0.8)' : '0 0 10px rgba(0,0,0,0.3)'};
        transform: translate(-50%, -50%) ${isHighlighted ? 'scale(1.2)' : ''};
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 999 !important;
        visibility: visible !important;
        display: block !important;
      `;
      
      // Create popup
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px',
        offset: 15,
        className: 'facility-popup'
      });
      
      // Set popup content
      popup.setHTML(`
        <div class="facility-popup-content">
          <h3 class="text-lg font-semibold mb-1">${facility.name}</h3>
          <p class="text-sm mb-1">${facility.city}, ${facility.state}</p>
          <p class="text-sm mb-2">${facility.address}</p>
          ${facility.price_range ? 
            `<p class="text-sm text-gray-300">Price: $${facility.price_range.min} - $${facility.price_range.max}</p>` : ''}
        </div>
      `);
      
      // Create marker
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);
      
      // Add click event
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onMarkerClick(facility.id);
      });
      
      // Store marker reference
      markersRef.current[facility.id] = marker;
      validMarkerCount++;
    });
    
    setVisibleMarkerCount(validMarkerCount);
    
    // Update progress
    if (validMarkerCount > 0) {
      setMarkersCreated(true);
      toast.success(`Showing ${validMarkerCount} locations${selectedState ? ` in ${selectedState}` : ''}`);
    } else if (facilities.length > 0) {
      toast.error(`No valid locations found${selectedState ? ` in ${selectedState}` : ''}`);
    }
    
    // Fit bounds if we have markers
    if (validMarkerCount > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      Object.values(markersRef.current).forEach(marker => {
        bounds.extend(marker.getLngLat());
      });
      
      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 15
      });
    }
    
    // Helper function to make markers visible
    const forceMarkersVisible = () => {
      const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
      console.log(`Found ${markers.length} markers - applying visibility fixes`);
      
      markers.forEach(marker => {
        (marker as HTMLElement).style.visibility = 'visible';
        (marker as HTMLElement).style.display = 'block';
        (marker as HTMLElement).style.opacity = '1';
        (marker as HTMLElement).style.zIndex = '999';
      });
    };
    
    // Apply visibility fixes after a short delay
    setTimeout(forceMarkersVisible, 500);
    
    // Apply fixes again after map movements
    map.on('moveend', forceMarkersVisible);
    map.on('zoomend', forceMarkersVisible);
    
    return () => {
      // Clean up event listeners
      map.off('moveend', forceMarkersVisible);
      map.off('zoomend', forceMarkersVisible);
    };
  }, [facilities, map, mapLoaded, isInitializing, highlightedFacility, onMarkerClick, selectedState]);
  
  // Focus on specific facility when highlighted
  useEffect(() => {
    if (!map || !mapLoaded || !highlightedFacility) return;
    
    const marker = markersRef.current[highlightedFacility];
    if (marker) {
      map.flyTo({
        center: marker.getLngLat(),
        zoom: 14,
        essential: true
      });
      
      // Open popup for highlighted facility
      marker.togglePopup();
    }
  }, [highlightedFacility, map, mapLoaded]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      
      {/* Loading and error states */}
      <MapLoadingState 
        isInitializing={isInitializing} 
        mapError={mapError} 
        mapLoaded={mapLoaded} 
        facilitiesCount={facilities.length}
      />
      
      {/* Debug overlay */}
      <div className="absolute top-2 left-2 z-50 bg-black/60 text-white text-xs p-2 rounded">
        {visibleMarkerCount} visible markers | {facilities.length} total facilities
        {selectedState && ` | ${selectedState}`}
      </div>
    </div>
  );
};

export default MapContainer;
