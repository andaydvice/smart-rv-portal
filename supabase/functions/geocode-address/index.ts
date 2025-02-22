
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
    // Simple test to check if we can access environment variables
    const mapboxToken = Deno.env.get('MAPBOX');
    console.log('Function started, checking for MAPBOX token');

    if (!mapboxToken) {
      throw new Error('Mapbox token not configured');
    }

    const body = await req.json() as GeocodeRequest;

    // Only handle token requests for now
    if (body.type === 'getToken') {
      return new Response(
        JSON.stringify({ token: mapboxToken }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid request type' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );

  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
})
