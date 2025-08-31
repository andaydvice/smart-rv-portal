-- Fix RLS policies to allow public access to storage facilities data

-- Enable RLS on storage_facilities table and create public read policy
ALTER TABLE public.storage_facilities ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public read access to storage facilities" ON public.storage_facilities;

-- Create public read policy for storage facilities
CREATE POLICY "Allow public read access to storage facilities" 
ON public.storage_facilities 
FOR SELECT 
USING (true);

-- Drop the existing view and recreate it with the correct column names
DROP VIEW IF EXISTS public.storage_facilities_public_view;

CREATE VIEW public.storage_facilities_public_view AS
SELECT 
    id,
    name,
    address,
    city,
    state,
    latitude,
    longitude,
    jsonb_build_object(
        'indoor', COALESCE(features->>'indoor', 'false')::boolean,
        'climate_controlled', COALESCE(features->>'climate_controlled', 'false')::boolean,
        'security_system', COALESCE(features->>'security_system', 'false')::boolean
    ) as basic_features,
    price_range,
    avg_rating,
    review_count
FROM public.storage_facilities;

-- Grant access to the view
GRANT SELECT ON public.storage_facilities_public_view TO anon;
GRANT SELECT ON public.storage_facilities_public_view TO authenticated;