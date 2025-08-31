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
      setError('Failed to load Google Maps. Please check API key and domain restrictions.');
      setIsLoaded(false);
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