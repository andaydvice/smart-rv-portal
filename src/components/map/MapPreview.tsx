
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { enableEdgeAwareMarkers } from '@/utils/markers/forcing/edge-aware';

interface LocationDetails {
  lat: number;
  lng: number;
  details: string;
}

interface MapPreviewProps {
  location: LocationDetails;
  icon?: string;
  mapToken?: string;
  title?: string;
}

const MapPreview: React.FC<MapPreviewProps> = ({
  location,
  icon = 'map-pin',
  mapToken,
  title = 'Location Preview'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const popup = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [location.lng, location.lat],
      zoom: 12,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
        showCompass: true,
      }),
      'top-right'
    );

    // Handle map load event
    map.current.on('load', () => {
      setMapLoaded(true);
      // Map preview loaded successfully
      createMarker();
      
      // Enable edge-aware behavior for markers
      if (map.current) {
        enableEdgeAwareMarkers(map.current);
      }
    });

    // Cleanup on unmount
    return () => {
      if (marker.current) marker.current.remove();
      if (popup.current) popup.current.remove();
      map.current?.remove();
    };
  }, [mapToken, location]);

  // Create marker when map is loaded
  const createMarker = () => {
    if (!map.current || !mapLoaded) {
      // Track failed attempts
      setFailedAttempts(prev => prev + 1);
      // Failed attempt to create marker
      return;
    }

    try {
      // Remove existing marker if any
      if (marker.current) marker.current.remove();
      
      // Create popup
      popup.current = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px',
        offset: 15,
        className: 'location-popup'
      })
      .setHTML(`
        <div class="p-3 text-white">
          <h3 class="text-lg font-semibold mb-1 text-[#60A5FA]">${title}</h3>
          <p class="text-sm">${location.details}</p>
        </div>
      `);
      
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      
      // Create new marker
      marker.current = new mapboxgl.Marker(markerElement)
        .setLngLat([location.lng, location.lat])
        .setPopup(popup.current)
        .addTo(map.current);
        
      // Add click handler with edge aware positioning
      markerElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Ensure popup is visible by adjusting map view
        map.current?.flyTo({
          center: [location.lng, location.lat],
          offset: [0, -100], // Offset to ensure popup visibility
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          duration: 1000
        });
        
        // Open popup after map adjustment
        setTimeout(() => {
          marker.current?.togglePopup();
        }, 1000);
      });
      
      // Marker created successfully
    } catch (error) {
      console.error('Error creating marker:', error);
      setFailedAttempts(prev => prev + 1);
    }
  };

  // Retry creating marker if initial attempts failed
  useEffect(() => {
    if (failedAttempts > 0 && failedAttempts < 8 && mapLoaded) {
      const timer = setTimeout(() => {
        // Retry attempt
        createMarker();
      }, 500 * failedAttempts); // Increasing backoff
      
      return () => clearTimeout(timer);
    }
  }, [failedAttempts, mapLoaded]);

  return (
    <div className="map-preview-container w-full max-w-3xl mx-auto">
      {failedAttempts > 0 && (
        <div className="bg-red-900/50 text-white text-sm p-2 rounded-t-lg">
          <span className="font-medium">Loading issues: </span>
          <span>{failedAttempts} failed attempts</span>
          {failedAttempts >= 8 && <span> - Please refresh the page</span>}
        </div>
      )}
      
      <div className="responsive-map-container w-full overflow-hidden rounded-lg">
        <div 
          ref={mapContainer} 
          className="w-full h-[350px] md:h-[400px] relative overflow-visible"
          style={{ overflow: 'visible' }}
        />
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white">Loading map...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPreview;
