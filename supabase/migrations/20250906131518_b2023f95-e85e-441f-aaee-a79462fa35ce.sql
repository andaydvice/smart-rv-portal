-- Fix remaining security vulnerabilities - Corrected approach

-- Phase 1: Drop the problematic security definer view
DROP VIEW IF EXISTS public.secure_spatial_ref_sys;

-- Create a secure function to access spatial reference data (replaces direct table access)
CREATE OR REPLACE FUNCTION public.get_spatial_ref_sys_data(target_srid integer DEFAULT NULL)
RETURNS TABLE(
    srid integer,
    auth_name varchar,
    auth_srid integer,
    srtext varchar,
    proj4text varchar
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        s.srid,
        s.auth_name,
        s.auth_srid,
        s.srtext,
        s.proj4text
    FROM public.spatial_ref_sys s
    WHERE (target_srid IS NULL OR s.srid = target_srid)
    ORDER BY s.srid
    LIMIT 1000; -- Reasonable limit to prevent abuse
$$;

-- Grant access to the secure function for authenticated users only
GRANT EXECUTE ON FUNCTION public.get_spatial_ref_sys_data(integer) TO authenticated;

-- Phase 2: Create safe alternatives to PostGIS system views with corrected column names
-- Create a safe geometry columns view for application use
CREATE OR REPLACE VIEW public.safe_geometry_columns AS
SELECT 
    c.table_schema as f_table_schema,
    c.table_name as f_table_name,
    c.column_name as f_geometry_column,
    NULL::integer as coord_dimension,
    NULL::integer as srid,
    c.udt_name as type
FROM information_schema.columns c
WHERE c.udt_name = 'geometry'
AND c.table_schema NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
AND c.table_schema = 'public';

-- Grant access to authenticated users only
GRANT SELECT ON public.safe_geometry_columns TO authenticated;

-- Create a safe geography columns view for application use  
CREATE OR REPLACE VIEW public.safe_geography_columns AS
SELECT 
    c.table_schema as f_table_schema,
    c.table_name as f_table_name,
    c.column_name as f_geography_column,
    NULL::integer as coord_dimension,
    NULL::integer as srid,
    c.udt_name as type
FROM information_schema.columns c
WHERE c.udt_name = 'geography'
AND c.table_schema NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
AND c.table_schema = 'public';

-- Grant access to authenticated users only
GRANT SELECT ON public.safe_geography_columns TO authenticated;