
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GeocodeRequest {
  address: string;
  city: string;
  state: string;
  zip: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address, city, state, zip } = await req.json() as GeocodeRequest;
    const fullAddress = `${address}, ${city}, ${state} ${zip}`;
    
    const mapboxToken = Deno.env.get('MAPBOX_TOKEN');
    if (!mapboxToken) {
      throw new Error('Mapbox token not configured');
    }

    // Call Mapbox Geocoding API
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
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
})
