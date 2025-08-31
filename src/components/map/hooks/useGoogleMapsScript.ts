import { useState, useEffect } from 'react';

export interface UseGoogleMapsScriptProps {
  apiKey: string;
}

// Alternative Google Maps loader that handles errors better
export const useGoogleMapsScript = ({ apiKey }: UseGoogleMapsScriptProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already loaded
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    if (!apiKey) {
      setError('Google Maps API key is missing');
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;

    // Handle successful load
    script.onload = () => {
      console.log('Google Maps script loaded successfully');
      setIsLoaded(true);
      setError(null);
    };

    // Handle load errors
    script.onerror = (event) => {
      console.error('Google Maps script load error:', event);
      // More specific error message
      setError('Failed to load Google Maps. The Maps JavaScript API may not be enabled for this project.');
      setIsLoaded(false);
      
      // Try to get more info about the error
      fetch(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`)
        .then(response => response.text())
        .then(text => {
          if (text.includes('ApiNotActivatedMapError')) {
            setError('Maps JavaScript API is not activated. Please enable it in Google Cloud Console.');
          } else if (text.includes('InvalidKeyMapError')) {
            setError('Invalid API key. Please check your Google Maps API key.');
          } else if (text.includes('RefererNotAllowedMapError')) {
            setError('This domain is not allowed. Please check API key restrictions.');
          }
        })
        .catch(() => {
          // Ignore fetch errors, keep original error message
        });
    };

    // Add script to document
    document.head.appendChild(script);

    // Cleanup
    return () => {
      // Don't remove script as it might be used by other components
      // document.head.removeChild(script);
    };
  }, [apiKey]);

  return {
    isLoaded,
    error
  };
};