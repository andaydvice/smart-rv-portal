
import { useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';

export interface UseGoogleMapsProps {
  apiKey: string;
}

export const useGoogleMaps = ({ apiKey }: UseGoogleMapsProps) => {
  const [error, setError] = useState<string | null>(null);
  
  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Handle map errors
  useEffect(() => {
    if (loadError) {
      setError(`Error loading Google Maps: ${loadError.message}`);
    }
  }, [loadError]);

  return {
    isLoaded,
    error
  };
};
