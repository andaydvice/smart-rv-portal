-- PostGIS spatial_ref_sys table cannot be directly modified due to ownership restrictions
-- This creates a secure view as a workaround for RLS compliance

-- Create a secure view with SECURITY INVOKER for the spatial_ref_sys table
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
'Secure, RLS-aware view (SECURITY INVOKER) over spatial_ref_sys table. Application queries should use this view instead of direct table access.';

-- Verify the view was created
SELECT 
    schemaname,
    viewname
FROM pg_views 
WHERE schemaname = 'public' AND viewname = 'secure_spatial_ref_sys';