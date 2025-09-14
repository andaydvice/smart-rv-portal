-- Fix Security Definer Views by converting them to Security Invoker

-- Drop the existing secure_spatial_ref_sys view and recreate it as SECURITY INVOKER
DROP VIEW IF EXISTS public.secure_spatial_ref_sys;

-- Create the secure view with SECURITY INVOKER explicitly set during creation
CREATE VIEW public.secure_spatial_ref_sys
WITH (security_invoker = true) -- This ensures the view uses caller's permissions
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

-- Add comments for clarity
COMMENT ON VIEW public.secure_spatial_ref_sys IS
'Secure, RLS-aware view (SECURITY INVOKER) over spatial_ref_sys table. Application queries should use this view.';

-- Also check if there are any other security definer views that need to be fixed
-- Convert any other SECURITY DEFINER views to SECURITY INVOKER if they exist

-- Fix any geometry/geography column views that might be SECURITY DEFINER
DROP VIEW IF EXISTS public.safe_geometry_columns;
CREATE VIEW public.safe_geometry_columns
WITH (security_invoker = true)
AS
SELECT
    f_table_schema::text,
    f_table_name::text,
    f_geometry_column::text,
    coord_dimension,
    srid,
    type::text
FROM
    public.geometry_columns;

GRANT SELECT ON public.safe_geometry_columns TO authenticated, anon;

DROP VIEW IF EXISTS public.safe_geography_columns;
CREATE VIEW public.safe_geography_columns
WITH (security_invoker = true)
AS
SELECT
    f_table_schema::text,
    f_table_name::text,
    f_geography_column::text,
    coord_dimension,
    srid,
    type::text
FROM
    public.geography_columns;

GRANT SELECT ON public.safe_geography_columns TO authenticated, anon;