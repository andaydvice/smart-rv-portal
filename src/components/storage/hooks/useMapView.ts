
import { useState, useEffect, useCallback } from 'react';
import { toast } from "sonner";
import { useMapToken } from '../map-view/useMapToken';

// Create a helper hook to get Google Maps API key - hardcoded for reliability
const useGoogleMapsKey = () => {
  const [apiKey, setApiKey] = useState<string>('AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o');
  const [error, setError] = useState<string | null>(null);

  return { apiKey, error };
};

export const useMapView = () => {
  // State to toggle between map views
  const [useGoogleMaps, setUseGoogleMaps] = useState<boolean>(false);
  const { mapToken, mapTokenError } = useMapToken();
  const { apiKey: googleMapsKey, error: googleMapsError } = useGoogleMapsKey();

  // Toggle map view
  const toggleMapView = useCallback(() => {
    setUseGoogleMaps(prev => !prev);
    toast.info(`Switched to ${!useGoogleMaps ? 'Google Maps' : 'Mapbox'} view`);
  }, [useGoogleMaps]);

  // Ensure window state for integration with map scripts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.isStorageFacilitiesPage = true;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.isStorageFacilitiesPage = false;
      }
    };
  }, []);

  return {
    useGoogleMaps,
    toggleMapView,
    mapToken,
    mapTokenError,
    googleMapsKey,
    googleMapsError
  };
};
