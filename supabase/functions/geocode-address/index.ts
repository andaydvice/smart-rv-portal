
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GeocodeRequest {
  type?: 'getToken';
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting geocode-address function...');
    
    const mapboxToken = Deno.env.get('MAPBOX');
    console.log('Attempting to get MAPBOX token...');
    
    if (!mapboxToken) {
      console.error('MAPBOX token not found in environment variables');
      throw new Error('Mapbox token not configured');
    }

    console.log('Successfully retrieved MAPBOX token');
    const body = await req.json() as GeocodeRequest;

    // Handle token requests
    if (body.type === 'getToken') {
      console.log('Returning MAPBOX token for getToken request');
      return new Response(
        JSON.stringify({ token: mapboxToken }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Handle geocoding requests
    const { address, city, state, zip } = body;
    if (!address || !city || !state || !zip) {
      throw new Error('Missing required address fields');
    }

    const fullAddress = `${address}, ${city}, ${state} ${zip}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&country=US`,
      { method: 'GET' }
    );

    const data = await response.json();
    
    if (!data.features?.length) {
      throw new Error('Address not found');
    }

    // Get coordinates from the first result
    const [longitude, latitude] = data.features[0].center;

    return new Response(
      JSON.stringify({ latitude, longitude }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in geocode-address function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
})
