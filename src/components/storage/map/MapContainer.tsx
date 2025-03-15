
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from './MapContext';
import { StorageFacility } from '../types';
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
  const { mapToken } = useMap();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<{[id: string]: mapboxgl.Marker}>({});
  const [activeMarkers, setActiveMarkers] = useState<number>(0);
  
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
      maxZoom: 18
    });
    
    map.current.on('load', () => {
      setMapLoaded(true);
      console.log('Map loaded successfully');
    });
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapToken]);
  
  // Clear markers and create new ones when facilities or highlighted facility changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
    
    // Filter facilities by state if selected
    const facilitiesToShow = selectedState 
      ? facilities.filter(f => f.state === selectedState)
      : facilities;
    
    console.log(`Creating markers for ${facilitiesToShow.length} facilities${selectedState ? ` in ${selectedState}` : ''}`);
    
    // Create markers for filtered facilities
    let validMarkerCount = 0;
    
    facilitiesToShow.forEach(facility => {
      // Skip facilities without valid coordinates
      if (!facility.latitude || !facility.longitude) {
        console.warn(`Facility ${facility.id} has invalid coordinates`);
        return;
      }
      
      const lat = parseFloat(facility.latitude.toString());
      const lng = parseFloat(facility.longitude.toString());
      
      if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
        console.warn(`Facility ${facility.id} has invalid coordinates: ${lat}, ${lng}`);
        return;
      }
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      
      // Set marker style based on highlight state
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
      `;
      
      // Create popup with facility details
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px',
        offset: 15,
        className: 'facility-popup'
      });
      
      // Set popup content (without View Details button)
      popup.setHTML(`
        <div class="facility-popup-content">
          <h3 class="text-lg font-semibold mb-1">${facility.name}</h3>
          <p class="text-sm mb-1">${facility.city}, ${facility.state}</p>
          <p class="text-sm mb-2">${facility.address}</p>
          ${facility.price_range ? 
            `<p class="text-sm text-gray-300">Price: $${facility.price_range.min} - $${facility.price_range.max}</p>` : ''}
        </div>
      `);
      
      // Create and add marker to map
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map.current);
      
      // Add click handler
      el.addEventListener('click', () => {
        onMarkerClick(facility.id);
      });
      
      // Store marker reference for later cleanup
      markersRef.current[facility.id] = marker;
      validMarkerCount++;
    });
    
    // Update active markers count for display
    setActiveMarkers(validMarkerCount);
    
    // Set map bounds to show all markers
    if (validMarkerCount > 0) {
      // Calculate bounds
      const bounds = new mapboxgl.LngLatBounds();
      
      facilitiesToShow.forEach(facility => {
        if (facility.latitude && facility.longitude) {
          const lat = parseFloat(facility.latitude.toString());
          const lng = parseFloat(facility.longitude.toString());
          
          if (!isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
            bounds.extend([lng, lat]);
          }
        }
      });
      
      // Only fit bounds if we have valid coordinates
      if (!bounds.isEmpty()) {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 12
        });
      }
    }
    
    // Add CSS to fix popup positioning
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-popup {
        z-index: 10 !important;
      }
      .mapboxgl-popup-content {
        background-color: #151A22 !important;
        color: white !important;
        border-radius: 8px !important;
      }
      .mapboxgl-popup-close-button {
        color: white !important;
      }
      .view-facility-btn, .view-details {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    console.log(`Created ${validMarkerCount} markers out of ${facilitiesToShow.length} facilities`);
    
    if (validMarkerCount > 0) {
      toast.success(`Showing ${validMarkerCount} locations${selectedState ? ` in ${selectedState}` : ''}`);
    } else if (facilitiesToShow.length > 0) {
      toast.error(`No valid locations found${selectedState ? ` in ${selectedState}` : ''}`);
    }
    
  }, [facilities, highlightedFacility, map, mapLoaded, onMarkerClick, selectedState]);
  
  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      <div className="absolute top-2 left-2 z-50 bg-black/60 text-white text-xs p-2 rounded">
        {activeMarkers} visible markers | {facilities.length} total facilities
        {selectedState && ` | ${selectedState}`}
      </div>
    </div>
  );
};

export default MapContainer;
