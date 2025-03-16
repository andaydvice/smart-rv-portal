
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ResponsiveMapIcon from './ResponsiveMapIcon';
import { createPortal } from 'react-dom';
import { applyCombinedAnimation } from '@/utils/mapIconAnimations';
import '@/styles/map-icon-animations.css';

interface MapLocation {
  id: string;
  coordinates: [number, number];
  details: string;
  icon: {
    src: string;
    alt: string;
  };
  marker: {
    src: string;
    alt: string;
  };
}

interface MapWithResponsiveIconsProps {
  locations: MapLocation[];
  mapToken?: string;
  center?: [number, number];
  zoom?: number;
  onLocationSelect?: (locationId: string) => void;
}

const MapWithResponsiveIcons: React.FC<MapWithResponsiveIconsProps> = ({
  locations,
  mapToken,
  center = [-100, 40],
  zoom = 3,
  onLocationSelect
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [markerElements, setMarkerElements] = useState<Map<string, HTMLDivElement>>(new Map());
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center,
      zoom,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Handle map load event
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Cleanup on unmount
    return () => {
      map.current?.remove();
    };
  }, [mapToken, center, zoom]);

  // Add markers when map is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Clear existing markers
    markerElements.forEach((element) => {
      element.remove();
    });
    
    const newMarkerElements = new Map<string, HTMLDivElement>();
    
    // Create markers for each location
    locations.forEach((location) => {
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'responsive-map-marker';
      markerElement.id = `marker-${location.id}`;
      
      // Add marker to map
      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: 'bottom',
      })
        .setLngLat(location.coordinates)
        .addTo(map.current!);
      
      // Store reference to marker element
      newMarkerElements.set(location.id, markerElement);
    });
    
    setMarkerElements(newMarkerElements);
    
    // Fit map to markers if multiple
    if (locations.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach(location => bounds.extend(location.coordinates));
      
      map.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 15
      });
    }
  }, [locations, mapLoaded]);

  // Handle location selection
  const handleLocationClick = (locationId: string) => {
    setSelectedLocationId(locationId === selectedLocationId ? null : locationId);
    
    // Find the selected location
    const location = locations.find(loc => loc.id === locationId);
    if (!location || !map.current) return;
    
    // Get marker element
    const markerElement = markerElements.get(locationId);
    if (!markerElement) return;
    
    // Find icon element within marker
    const iconElement = markerElement.querySelector('.map-icon') as HTMLElement;
    
    // Apply animations
    if (iconElement) {
      applyCombinedAnimation(markerElement, iconElement);
    }
    
    // Call onLocationSelect if provided
    if (onLocationSelect) {
      onLocationSelect(locationId);
    }
    
    // Center map on selected location
    map.current.flyTo({
      center: location.coordinates,
      zoom: Math.max(map.current.getZoom(), 10),
      duration: 1000,
      essential: true
    });
  };

  return (
    <div className="relative w-full h-[650px] rounded-lg overflow-hidden">
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      />
      
      {/* Render React components into marker elements */}
      {mapLoaded && Array.from(markerElements.entries()).map(([locationId, element]) => {
        const location = locations.find(loc => loc.id === locationId);
        if (!location) return null;
        
        return createPortal(
          <ResponsiveMapIcon
            icon={location.icon}
            marker={location.marker}
            details={location.details}
            isActive={selectedLocationId === locationId}
            onClick={() => handleLocationClick(locationId)}
            size="md"
          />,
          element
        );
      })}
    </div>
  );
};

export default MapWithResponsiveIcons;
