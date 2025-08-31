
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useMapToken = (enabled: boolean = true) => {
  const [mapToken, setMapToken] = useState<string>('');
  const [mapTokenError, setMapTokenError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState<number>(0);

  // Define fetchMapboxToken outside useEffect so it can be called by retryFetch
  const fetchMapboxToken = async (attempt = 1) => {
    try {
      console.log(`Fetching Mapbox token (attempt ${attempt})...`);
      setIsLoading(true);
      setMapTokenError('');
      
      const { data, error } = await supabase.functions.invoke('geocode-address', {
        body: { type: 'getToken' }
      });
      
      if (error || !data) {
        console.error('Error fetching token:', error);
        if (attempt < 3) {
          console.log(`Retrying token fetch in 2 seconds (attempt ${attempt + 1})...`);
          setTimeout(() => fetchMapboxToken(attempt + 1), 2000);
          return;
        }
        setMapTokenError('Failed to load map configuration after 3 attempts');
        setMapToken('');
        return;
      }
      
      if (!data.token || typeof data.token !== 'string' || !data.token.startsWith('pk.')) {
        console.error('Invalid token received:', data);
        setMapTokenError('Invalid map configuration received');
        setMapToken('');
        return;
      }
      
      console.log('Successfully received valid Mapbox token');
      setMapToken(data.token);
      setMapTokenError('');
      setRetryCount(0);
    } catch (err) {
      console.error(`Failed to fetch Mapbox token (attempt ${attempt}):`, err);
      if (attempt < 3) {
        console.log(`Retrying token fetch in 2 seconds (attempt ${attempt + 1})...`);
        setTimeout(() => fetchMapboxToken(attempt + 1), 2000);
        return;
      }
      setMapTokenError('Failed to load map configuration after 3 attempts');
      setMapToken('');
    } finally {
      if (attempt >= 3) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      setMapToken('');
      setMapTokenError('');
      return;
    }

    fetchMapboxToken();
  }, [enabled]);

  const retryFetch = () => {
    setRetryCount(prev => prev + 1);
    fetchMapboxToken();
  };

  return { mapToken, mapTokenError, isLoading, retryFetch };
};
