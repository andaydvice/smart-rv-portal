
import { useState, useEffect } from 'react';

export const useGoogleMapsKey = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get API key from environment variables
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (key) {
      setApiKey(key);
    } else {
      setError('Google Maps API key not found in environment variables');
      console.error('Missing VITE_GOOGLE_MAPS_API_KEY environment variable');
    }
  }, []);

  return { apiKey, error };
};
