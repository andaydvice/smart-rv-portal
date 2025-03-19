
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';
import { useGoogleMapSetup } from './hooks/useGoogleMapSetup';
import '../../styles/google-maps.css';

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
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  // Set up the map
  const { currentZoom, onMapLoad: setupMapLoad } = useGoogleMapSetup(map, facilities);
  
  // When zoom changes, call the onZoomChange callback
  useEffect(() => {
    if (onZoomChange && currentZoom) {
      onZoomChange(currentZoom);
    }
  }, [currentZoom, onZoomChange]);
  
  // Load Google Maps script
  useEffect(() => {
    if (!apiKey || !mapRef.current || isScriptLoaded) return;
    
    console.log('Loading Google Maps script with API key');
    
    // Check if the script is already loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
    if (existingScript) {
      console.log('Google Maps script already exists, not loading again');
      setIsScriptLoaded(true);
      return;
    }
    
    // Load the Google Maps script
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMap`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    
    // Define a global callback function
    window.initGoogleMap = () => {
      console.log('Google Maps script loaded via callback');
      setIsScriptLoaded(true);
    };
    
    // Handle script load error
    googleMapsScript.onerror = () => {
      console.error('Failed to load Google Maps script');
    };
    
    document.head.appendChild(googleMapsScript);
    
    return () => {
      // Clean up
      delete window.initGoogleMap;
      if (googleMapsScript.parentNode) {
        googleMapsScript.parentNode.removeChild(googleMapsScript);
      }
      setIsScriptLoaded(false);
      setMap(null);
      setMarkers([]);
    };
  }, [apiKey, mapRef.current]);
  
  // Initialize the map once script is loaded
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || map) return;
    
    console.log('Initializing Google Map after script load');
    
    try {
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
      
      console.log('Google Map initialized successfully');
    } catch (error) {
      console.error('Error initializing Google Map:', error);
    }
  }, [isScriptLoaded, initialZoom, onMapLoad, setupMapLoad, onZoomChange]);
  
  // Add markers
  useEffect(() => {
    if (!map || !facilities.length) return;
    
    console.log(`Creating ${facilities.length} markers on Google Map`);
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create new markers
    const newMarkers = facilities.map(facility => {
      if (!facility.latitude || !facility.longitude) return null;
      
      const isRecentlyViewed = recentlyViewedFacilityIds.includes(facility.id);
      
      try {
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
          zIndex: isRecentlyViewed ? 1000 : 999, // Higher z-index for better visibility
          clickable: true
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
      } catch (error) {
        console.error(`Error creating marker for facility ${facility.id}:`, error);
        return null;
      }
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
    
    // Load the marker visibility fix script
    loadMarkerVisibilityFixScript();
    
    // Force marker visibility
    forceMarkersVisible();
    
  }, [facilities, map, onMarkerClick, recentlyViewedFacilityIds]);
  
  // Helper function to load the marker visibility fix script
  const loadMarkerVisibilityFixScript = () => {
    if (document.getElementById('google-markers-fix-script')) return;
    
    const script = document.createElement('script');
    script.id = 'google-markers-fix-script';
    script.src = '/googleMarkersVisibilityFix.js';
    script.async = true;
    document.body.appendChild(script);
    
    console.log('Loaded Google Maps marker visibility fix script');
  };
  
  // Helper function to force markers to be visible
  const forceMarkersVisible = () => {
    console.log('Forcing Google Map markers to be visible');
    
    // Force visibility through direct DOM manipulation
    setTimeout(() => {
      console.log('Applying marker visibility fixes');
      
      // Target all potential marker elements
      const markerElements = document.querySelectorAll('.gm-style [title], .gm-style-pbc [title], .gm-style img[src*="marker"], .gm-style div[role="button"]');
      markerElements.forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
          marker.style.display = 'block';
          marker.style.zIndex = '9999';
        }
      });
      
      // Also invoke any custom marker fix script if it exists
      // Check if the function exists before calling it
      if (typeof window.forceGoogleMarkersVisible === 'function') {
        window.forceGoogleMarkersVisible();
      }
    }, 500);
    
    // Run again after a longer delay to catch late-loaded markers
    setTimeout(() => {
      const markerElements = document.querySelectorAll('.gm-style [title], .gm-style-pbc [title], .gm-style img[src*="marker"]');
      console.log(`Found ${markerElements.length} Google Map markers to force visible`);
      
      markerElements.forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
          marker.style.display = 'block';
          marker.style.zIndex = '9999';
        }
      });
    }, 2000);
  };
  
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
