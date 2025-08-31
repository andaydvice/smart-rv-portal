
import { useState, useEffect } from 'react';
import { useLoadScript, Libraries } from '@react-google-maps/api';

// Define libraries as a constant outside component to prevent re-renders
const libraries: Libraries = ['places', 'geometry'];

export interface UseGoogleMapsProps {
  apiKey: string;
}

export const useGoogleMaps = ({ apiKey }: UseGoogleMapsProps) => {
  const [error, setError] = useState<string | null>(null);
  
  // Load Google Maps script with additional libraries
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    libraries,
  });

  // Handle map errors
  useEffect(() => {
    if (loadError) {
      console.error('Google Maps Load Error:', loadError);
      // Handle different error types safely
      const errorMessage = loadError.message || 
                          loadError.toString() || 
                          'Failed to load Google Maps';
      setError(`Error loading Google Maps: ${errorMessage}`);
    } else if (!apiKey) {
      setError('Google Maps API key is missing');
    }
  }, [loadError, apiKey]);

  return {
    isLoaded,
    error
  };
};
