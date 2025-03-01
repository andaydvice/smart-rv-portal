
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useMapToken = () => {
  const [mapToken, setMapToken] = useState<string>('');
  const [mapTokenError, setMapTokenError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        console.log('Fetching Mapbox token...');
        setIsLoading(true);
        
        const { data, error } = await supabase.functions.invoke('geocode-address', {
          body: { type: 'getToken' }
        });
        
        if (error || !data) {
          console.error('Error fetching token:', error);
          setMapTokenError('Failed to load map configuration');
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
      } catch (err) {
        console.error('Failed to fetch Mapbox token:', err);
        setMapTokenError('Failed to load map configuration');
        setMapToken('');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapboxToken();
  }, []);

  return { mapToken, mapTokenError, isLoading };
};
