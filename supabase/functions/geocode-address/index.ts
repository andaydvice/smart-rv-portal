
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, pragma, cache-control',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Public function: no auth required for token retrieval


    const mapboxToken = Deno.env.get('Mapbox');
    console.log('Getting Mapbox token...');
    
    if (!mapboxToken || typeof mapboxToken !== 'string' || !mapboxToken.startsWith('pk.')) {
      console.error('Invalid or missing Mapbox token in edge function secrets');
      return new Response(
        JSON.stringify({ error: 'Invalid or missing Mapbox token' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    const body = await req.json();
    
    // Handle token requests - public
    if (body.type === 'getToken') {
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
