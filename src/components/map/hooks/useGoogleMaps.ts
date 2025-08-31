
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
    // Add additional options
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
        apiKey: apiKey ? 'Present' : 'Missing'
      });
      
      // Handle different error types safely
      let errorMessage = 'Failed to load Google Maps';
      
      if (loadError instanceof Event) {
        // Script load error - likely network or API key issue
        errorMessage = 'Failed to load Google Maps script. Please check your connection and API key.';
      } else if (typeof loadError === 'object' && loadError !== null) {
        // Try to extract meaningful error info
        errorMessage = (loadError as any).message || 
                      (loadError as any).error || 
                      JSON.stringify(loadError);
      } else if (typeof loadError === 'string') {
        errorMessage = loadError;
      }
      
      setError(errorMessage);
    } else if (!apiKey) {
      setError('Google Maps API key is missing');
    }
  }, [loadError, apiKey]);

  return {
    isLoaded,
    error
  };
};
