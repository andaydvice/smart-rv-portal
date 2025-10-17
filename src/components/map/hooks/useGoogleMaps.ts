
import { useState, useEffect } from 'react';
import { useLoadScript, Libraries } from '@react-google-maps/api';

// Define libraries as a constant outside component to prevent re-renders
const libraries: Libraries = ['places', 'geometry'];

export interface UseGoogleMapsProps {
  apiKey: string;
}

export const useGoogleMaps = ({ apiKey }: UseGoogleMapsProps) => {
  const [error, setError] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<{
    message: string;
    type: string;
    hostname: string;
    apiKeyPresent: boolean;
  } | null>(null);
  
  // Listen for Google Maps API errors globally
  useEffect(() => {
    const handleGoogleMapsError = (event: ErrorEvent) => {
      if (event.message?.includes('Google Maps') || event.filename?.includes('maps.googleapis.com')) {
        console.error('Google Maps API Error Event:', event);
        setDetailedError({
          message: event.message || 'Google Maps failed to load',
          type: 'API Error',
          hostname: window.location.hostname,
          apiKeyPresent: !!apiKey
        });
      }
    };

    window.addEventListener('error', handleGoogleMapsError);
    return () => window.removeEventListener('error', handleGoogleMapsError);
  }, [apiKey]);
  
  // Load Google Maps script with additional libraries
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    libraries,
    preventGoogleFontsLoading: true,
    version: 'weekly',
    language: 'en',
    region: 'US'
  });

  // Handle map errors
  useEffect(() => {
    if (loadError) {
      console.error('Google Maps Load Error Details:', {
        error: loadError,
        type: typeof loadError,
        isEvent: loadError instanceof Event,
        apiKey: apiKey ? 'Present' : 'Missing',
        hostname: window.location.hostname
      });
      
      let errorMessage = 'Failed to load Google Maps';
      
      if (loadError instanceof Event) {
        errorMessage = 'Google Maps script failed to load. This usually means: API key restrictions, billing not enabled, or API not enabled.';
      } else if (typeof loadError === 'object' && loadError !== null) {
        errorMessage = (loadError as any).message || 
                      (loadError as any).error || 
                      'Google Maps configuration error';
      } else if (typeof loadError === 'string') {
        errorMessage = loadError;
      }
      
      setError(errorMessage);
      setDetailedError({
        message: errorMessage,
        type: 'Script Load Error',
        hostname: window.location.hostname,
        apiKeyPresent: !!apiKey
      });
    } else if (!apiKey) {
      const msg = 'Google Maps API key is missing';
      setError(msg);
      setDetailedError({
        message: msg,
        type: 'Configuration Error',
        hostname: window.location.hostname,
        apiKeyPresent: false
      });
    }
  }, [loadError, apiKey]);

  return {
    isLoaded,
    error,
    detailedError
  };
};
