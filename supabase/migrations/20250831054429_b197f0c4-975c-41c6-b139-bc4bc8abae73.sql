-- Fix RLS policies for get_public_facility_data function
-- Make it accessible to anonymous users since it only returns non-sensitive data

-- Update the function to be security definer and allow public access
CREATE OR REPLACE FUNCTION public.get_public_facility_data()
RETURNS TABLE(id uuid, name text, address text, city text, state text, latitude numeric, longitude numeric, basic_features jsonb, price_category text, avg_rating numeric, review_count integer)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
    SELECT 
        sf.id,
        sf.name,
        sf.address,
        sf.city,
        sf.state,
        sf.latitude,
        sf.longitude,
        jsonb_build_object(
            'indoor', COALESCE(sf.features->>'indoor', 'false')::boolean,
            'climate_controlled', COALESCE(sf.features->>'climate_controlled', 'false')::boolean,
            'security_system', COALESCE(sf.features->>'security_system', 'false')::boolean
        ) as basic_features,
        CASE 
            WHEN (sf.price_range->>'max')::numeric > 300 THEN 'premium'
            WHEN (sf.price_range->>'max')::numeric > 150 THEN 'standard'
            ELSE 'budget'
        END as price_category,
        sf.avg_rating,
        sf.review_count
    FROM public.storage_facilities sf;
$$;

-- Grant execute permission to anonymous users for this function
GRANT EXECUTE ON FUNCTION public.get_public_facility_data() TO anon;

-- Create a policy to allow anonymous access to storage_facilities for this function
CREATE POLICY "Allow anonymous access via get_public_facility_data function" 
ON public.storage_facilities 
FOR SELECT 
TO anon 
USING (true);