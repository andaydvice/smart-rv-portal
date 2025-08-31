
import { useState, useEffect, useCallback } from 'react';
import { toast } from "sonner";
import { useMapToken } from '../map-view/useMapToken';

// SECURITY: Get Google Maps API key from environment only
const useGoogleMapsKey = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key not configured. Please set VITE_GOOGLE_MAPS_API_KEY environment variable.');
      console.warn('VITE_GOOGLE_MAPS_API_KEY not found in environment');
    } else {
      console.log('Google Maps API Key loaded from environment:', {
        hasKey: !!apiKey,
        keyPrefix: apiKey.substring(0, 10) + '...'
      });
    }
  }, [apiKey]);

  return { apiKey, error };
};

export const useMapView = () => {
  // Initialize provider from saved preference; default Mapbox
  const [useGoogleMaps, setUseGoogleMaps] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('map_provider');
    return saved === 'google';
  });
  const { mapToken, mapTokenError, isLoading: tokenLoading } = useMapToken(!useGoogleMaps);
  const { apiKey: googleMapsKey, error: googleMapsError } = useGoogleMapsKey();

  const toggleMapView = useCallback(() => {
    const nextUse = !useGoogleMaps;
    setUseGoogleMaps(nextUse);
    if (typeof window !== 'undefined') {
      localStorage.setItem('map_provider', nextUse ? 'google' : 'mapbox');
    }
    toast.info(`Switched to ${nextUse ? 'Google Maps' : 'Mapbox'} view`);
  }, [useGoogleMaps]);

  // Auto-fallback to Google Maps if Mapbox token fails or is missing
  useEffect(() => {
    if (!useGoogleMaps && !tokenLoading && (!mapToken || mapTokenError)) {
      setUseGoogleMaps(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('map_provider', 'google');
      }
      if (import.meta.env.DEV) {
        toast.warning('Using Google Maps fallback');
      }
    }
  }, [useGoogleMaps, tokenLoading, mapToken, mapTokenError]);

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
    isLoading: tokenLoading,
    googleMapsKey,
    googleMapsError
  };
};
