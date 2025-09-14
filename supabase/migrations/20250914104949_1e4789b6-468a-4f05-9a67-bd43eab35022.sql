-- Fix the remaining Security Definer View and RLS issues

-- Check if there's a storage_facilities_public_view that might be SECURITY DEFINER
DROP VIEW IF EXISTS public.storage_facilities_public_view;

-- Create a secure public view for storage facilities using SECURITY INVOKER
CREATE VIEW public.storage_facilities_public_view
WITH (security_invoker = true)
AS
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
    sf.price_range,
    sf.avg_rating,
    sf.review_count
FROM public.storage_facilities sf;

-- Grant SELECT permission on the view to standard Supabase roles
GRANT SELECT ON public.storage_facilities_public_view TO authenticated, anon;

-- Enable RLS on spatial_ref_sys table if it's not already enabled
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Create a permissive policy for spatial_ref_sys to allow public read access
CREATE POLICY "Allow public read access to spatial_ref_sys"
ON public.spatial_ref_sys
FOR SELECT
USING (true);

-- Also ensure geometry_columns and geography_columns have proper RLS if they're accessible
-- These are system tables but we should be safe
DO $$
BEGIN
    -- Check if geometry_columns table exists and enable RLS if needed
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'geometry_columns') THEN
        ALTER TABLE public.geometry_columns ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policy if it exists and create new one
        DROP POLICY IF EXISTS "Allow public read access to geometry_columns" ON public.geometry_columns;
        CREATE POLICY "Allow public read access to geometry_columns"
        ON public.geometry_columns
        FOR SELECT
        USING (true);
    END IF;
    
    -- Check if geography_columns table exists and enable RLS if needed
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'geography_columns') THEN
        ALTER TABLE public.geography_columns ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policy if it exists and create new one
        DROP POLICY IF EXISTS "Allow public read access to geography_columns" ON public.geography_columns;
        CREATE POLICY "Allow public read access to geography_columns"
        ON public.geography_columns
        FOR SELECT
        USING (true);
    END IF;
END $$;