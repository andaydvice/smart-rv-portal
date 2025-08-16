-- Fix Security Definer View issues for the views we can control
-- Skip spatial_ref_sys as it's a PostGIS system table

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