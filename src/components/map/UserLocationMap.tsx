
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, MapPin } from 'lucide-react';
import StaticMapComponent from './StaticMapComponent';

interface UserLocationMapProps {
  mapToken: string;
  fallbackLocation?: { lat: number; lng: number };
  skipLocationCheck?: boolean; // New prop to skip location check
  googleMapsKey?: string; // Google Maps API key
  onMapLoad?: () => void; // Callback when map loads
}

const UserLocationMap: React.FC<UserLocationMapProps> = ({
  mapToken,
  fallbackLocation = { lat: 39.8283, lng: -98.5795 }, // Center of US as fallback
  skipLocationCheck = false, // Default to false to maintain current behavior
  googleMapsKey,
  onMapLoad
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!skipLocationCheck);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

  // If skipLocationCheck is true, use the static map component
  if (skipLocationCheck && googleMapsKey) {
    return (
      <StaticMapComponent
        apiKey={googleMapsKey}
        mapCenter={fallbackLocation}
        mapZoom={4}
        onMapLoad={onMapLoad}
      />
    );
  }

  // Get user's location
  useEffect(() => {
    if (skipLocationCheck) {
      setIsLoading(false);
      return;
    }

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setIsLoading(false);
    };

    const errorHandler = (err: GeolocationPositionError) => {
      if (err.code === 1) { // Permission denied
        setPermissionDenied(true);
      } else {
        setError(`Error getting location: ${err.message}`);
      }
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  }, [skipLocationCheck]);

  // Initialize map when the component mounts or when user location changes
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    // Use user location if available, otherwise use fallback
    const centerLocation = userLocation || fallbackLocation;

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [centerLocation.lng, centerLocation.lat],
      zoom: userLocation ? 12 : 4, // Zoom closer if we have user location
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

    // Add marker for user location
    if (userLocation) {
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.backgroundColor = '#5B9BD5'; // Ocean Blue brand color
      markerElement.style.width = '24px';
      markerElement.style.height = '24px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.border = '2px solid white';
      markerElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      
      // Create new marker
      marker.current = new mapboxgl.Marker(markerElement)
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(map.current);
        
      // Add popup with user location info
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        offset: 15,
        className: 'location-popup'
      })
      .setHTML(`
        <div class="p-3 text-white">
          <h3 class="text-lg font-semibold mb-1 text-[#60A5FA]">Your Current Location</h3>
          <p class="text-sm">Find nearby RV storage facilities</p>
        </div>
      `);
      
      marker.current.setPopup(popup);
    }

    // Call onMapLoad callback if provided
    if (onMapLoad && map.current) {
      map.current.on('load', onMapLoad);
    }

    // Cleanup on unmount
    return () => {
      if (marker.current) marker.current.remove();
      map.current?.remove();
    };
  }, [mapToken, userLocation, fallbackLocation, onMapLoad]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-[#091020] rounded-lg p-6 border border-[#1a202c] flex items-center justify-center h-[300px]">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#5B9BD5]" />
          <p className="text-gray-300">Getting your location...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-[#091020] rounded-lg p-6 border border-[#1a202c]">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="text-center text-gray-300">
          <p>Unable to access your location. We'll show storage facilities across the country instead.</p>
        </div>
      </div>
    );
  }

  // Render permission denied state
  if (permissionDenied && googleMapsKey) {
    // If Google Maps API key is provided, use StaticMapComponent instead of permission denied message
    return (
      <StaticMapComponent
        apiKey={googleMapsKey}
        mapCenter={fallbackLocation}
        mapZoom={4}
        onMapLoad={onMapLoad}
      />
    );
  } else if (permissionDenied) {
    return (
      <div className="bg-[#091020] rounded-lg p-6 border border-[#1a202c]">
        <div className="text-center space-y-4">
          <MapPin className="w-8 h-8 text-[#5B9BD5] mx-auto" />
          <h3 className="text-xl text-white font-semibold">Location Access Denied</h3>
          <p className="text-gray-300">
            To show nearby storage facilities, please enable location access in your browser settings.
          </p>
        </div>
      </div>
    );
  }

  // Render map
  return (
    <div className="bg-[#091020] rounded-lg p-4 border border-[#1a202c] w-full">
      <h3 className="text-xl text-white font-semibold mb-4">
        {userLocation ? 'Storage Facilities Near You' : 'Storage Facilities Map'}
      </h3>
      <div className="w-full overflow-hidden rounded-lg">
        <div 
          ref={mapContainer} 
          className="w-full h-[350px] relative overflow-visible"
          style={{ overflow: 'visible' }}
        />
      </div>
      <p className="mt-4 text-sm text-gray-400">
        {userLocation 
          ? 'Map shows your current location. Click on the marker for more information.' 
          : 'Map shows facilities across the United States. Enable location access for nearby results.'}
      </p>
    </div>
  );
};

export default UserLocationMap;
