
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';
import { useGoogleMapSetup } from './hooks/useGoogleMapSetup';

interface GoogleMapViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
  onMapLoad?: (map: google.maps.Map) => void;
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
}

const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey,
  onMapLoad,
  zoom: initialZoom = 4,
  onZoomChange
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  
  // Set up the map
  const { currentZoom, onMapLoad: setupMapLoad } = useGoogleMapSetup(map, facilities);
  
  // When zoom changes, call the onZoomChange callback
  useEffect(() => {
    if (onZoomChange && currentZoom) {
      onZoomChange(currentZoom);
    }
  }, [currentZoom, onZoomChange]);
  
  // Initialize the map
  useEffect(() => {
    if (!apiKey || !mapRef.current || map) return;
    
    // Load the Google Maps script
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);
    
    googleMapsScript.onload = () => {
      if (mapRef.current) {
        console.log('Google Maps script loaded successfully');
        
        // Create a new map
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: 39.8283, lng: -98.5795 }, // Center of US
          zoom: initialZoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#131a2a' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#000000' }, { lightness: 13 }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#0e1626' }]
            }
          ]
        });
        
        setMap(newMap);
        
        // Listen for zoom changes
        if (onZoomChange) {
          newMap.addListener('zoom_changed', () => {
            onZoomChange(newMap.getZoom());
          });
        }
        
        // Call the map load handler from props
        if (onMapLoad) {
          onMapLoad(newMap);
        }
        
        // Also call the internal map setup handler
        setupMapLoad(newMap);
      }
    };
    
    return () => {
      // Clean up
      const script = document.querySelector(`script[src*="maps.googleapis.com/maps/api"]`);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      setMap(null);
      setMarkers([]);
    };
  }, [apiKey, onMapLoad, setupMapLoad, initialZoom, onZoomChange]);
  
  // Add markers
  useEffect(() => {
    if (!map) return;
    
    console.log(`Creating ${facilities.length} markers on Google Map`);
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create new markers
    const newMarkers = facilities.map(facility => {
      if (!facility.latitude || !facility.longitude) return null;
      
      const isRecentlyViewed = recentlyViewedFacilityIds.includes(facility.id);
      
      // Create marker
      const marker = new google.maps.Marker({
        position: {
          lat: Number(facility.latitude),
          lng: Number(facility.longitude)
        },
        map,
        title: facility.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: isRecentlyViewed ? '#F59E0B' : '#5B9BD5',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          scale: isRecentlyViewed ? 8 : 7
        },
        optimized: false, // Important for marker visibility
        visible: true, // Explicitly set visible
        zIndex: isRecentlyViewed ? 2 : 1 // Higher z-index for recently viewed
      });
      
      // Add click handler
      marker.addListener('click', () => {
        if (onMarkerClick) {
          onMarkerClick(facility.id);
        }
        
        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="color: #fff; background-color: #151A22; padding: 8px; border-radius: 4px; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-size: 14px;">${facility.name}</h3>
              <p style="margin: 0; font-size: 12px;">${facility.city}, ${facility.state}</p>
            </div>
          `,
          pixelOffset: new google.maps.Size(0, -30)
        });
        
        infoWindow.open(map, marker);
      });
      
      return marker;
    }).filter(Boolean) as google.maps.Marker[];
    
    setMarkers(newMarkers);
    
    // Fit bounds if we have markers
    if (newMarkers.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition()!);
      });
      
      // Fix padding format
      map.fitBounds(bounds, {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
      });
    }
    
    // Force marker visibility
    setTimeout(() => {
      console.log('Force Google Map markers to be visible');
      
      // Try to find and force markers to be visible
      const markerElements = document.querySelectorAll('.gm-style [title], .gm-style-pbc [title]');
      markerElements.forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
          marker.style.display = 'block';
          marker.style.zIndex = '9999';
        }
      });
      
      // Also invoke any custom marker fix script if it exists
      if (window.forceGoogleMarkersVisible) {
        window.forceGoogleMarkersVisible();
      }
    }, 500);
    
  }, [facilities, map, onMarkerClick, recentlyViewedFacilityIds]);
  
  return (
    <Card className="h-full bg-connectivity-darkBg relative overflow-hidden border-gray-700">
      {!apiKey ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>Google Maps API key is required. Please provide a valid API key.</p>
        </div>
      ) : (
        <div ref={mapRef} className="w-full h-full" />
      )}
    </Card>
  );
};

export default GoogleMapView;
