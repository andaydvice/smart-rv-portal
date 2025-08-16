-- Fix Security Definer View issues and enable RLS on spatial_ref_sys
-- This addresses the security linter findings

-- Enable RLS on spatial_ref_sys table (this is a PostGIS system table)
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Create a permissive RLS policy for spatial_ref_sys to allow public read access
-- This is safe since spatial reference system data is public information
CREATE POLICY "Allow public read access to spatial_ref_sys"
ON public.spatial_ref_sys
FOR SELECT
USING (true);

-- Recreate the secure_spatial_ref_sys view with explicit SECURITY INVOKER
-- First drop the existing view
DROP VIEW IF EXISTS public.secure_spatial_ref_sys;

-- Recreate with explicit SECURITY INVOKER (not DEFINER)
CREATE VIEW public.secure_spatial_ref_sys
WITH (security_invoker = true)
AS
SELECT
    srid,
    auth_name,
    auth_srid,
    srtext,
    proj4text
FROM
    public.spatial_ref_sys;

-- Grant SELECT permission on the view to standard Supabase roles
GRANT SELECT ON public.secure_spatial_ref_sys TO authenticated, anon;

-- Add comment for clarity
COMMENT ON VIEW public.secure_spatial_ref_sys IS
'Secure, RLS-aware view (SECURITY INVOKER) over spatial_ref_sys table. Uses caller permissions instead of definer permissions.';

-- Update storage_facilities_public view to use SECURITY INVOKER
-- First drop the existing view
DROP VIEW IF EXISTS public.storage_facilities_public;

-- Recreate with SECURITY INVOKER for security compliance
CREATE VIEW public.storage_facilities_public
WITH (security_invoker = true)
AS
SELECT 
    id,
    name,
    address,
    city,
    state,
    zip_code,
    latitude,
    longitude,
    description,
    images,
    avg_rating,
    review_count,
    jsonb_build_object(
        'indoor', features->>'indoor',
        'climate_controlled', features->>'climate_controlled',
        '24h_access', features->>'24h_access'
    ) AS basic_features,
    CASE 
        WHEN (availability->>'available_spaces')::integer > 0 THEN 'available'
        ELSE 'full'
    END AS availability_status,
    CASE 
        WHEN (price_range->>'min')::numeric = 0 THEN 'contact_for_pricing'
        WHEN (price_range->>'min')::numeric < 100 THEN 'budget'
        WHEN (price_range->>'min')::numeric < 200 THEN 'moderate'
        ELSE 'premium'
    END AS price_category,
    created_at,
    updated_at
FROM public.storage_facilities;

-- Grant SELECT permission on the updated view
GRANT SELECT ON public.storage_facilities_public TO authenticated, anon;

-- Add comment for the updated view
COMMENT ON VIEW public.storage_facilities_public IS
'Public view of storage facilities with SECURITY INVOKER for proper RLS enforcement.';