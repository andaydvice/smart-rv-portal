-- Fix remaining security vulnerabilities - Alternative approach for system tables

-- Phase 1: Since we can't modify spatial_ref_sys directly, create secure access functions
-- Drop the existing security definer view that's causing security warnings
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

-- Phase 2: Create secure alternatives to PostGIS system views
-- Since geography_columns and geometry_columns are system views, create our own safe versions

-- Create a safe geometry columns view for application use
CREATE OR REPLACE VIEW public.safe_geometry_columns AS
SELECT 
    f_table_schema,
    f_table_name,
    f_geometry_column,
    coord_dimension,
    srid,
    type
FROM information_schema.columns c
JOIN pg_class t ON t.relname = c.table_name
JOIN pg_namespace n ON n.oid = t.relnamespace
WHERE c.udt_name = 'geometry'
AND n.nspname NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
AND has_table_privilege(t.oid, 'SELECT');

-- Grant access to authenticated users only
GRANT SELECT ON public.safe_geometry_columns TO authenticated;

-- Create a safe geography columns view for application use  
CREATE OR REPLACE VIEW public.safe_geography_columns AS
SELECT 
    f_table_schema,
    f_table_name,
    f_geography_column,
    coord_dimension,
    srid,
    type
FROM information_schema.columns c
JOIN pg_class t ON t.relname = c.table_name
JOIN pg_namespace n ON n.oid = t.relnamespace
WHERE c.udt_name = 'geography'
AND n.nspname NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
AND has_table_privilege(t.oid, 'SELECT');

-- Grant access to authenticated users only
GRANT SELECT ON public.safe_geography_columns TO authenticated;

-- Phase 3: Revoke unnecessary public access where possible
-- Try to revoke public access to original PostGIS views (may fail, but we try)
DO $$
BEGIN
    -- Try to revoke public access to system views
    BEGIN
        EXECUTE 'REVOKE ALL ON public.geography_columns FROM public, anon';
    EXCEPTION WHEN insufficient_privilege THEN
        RAISE NOTICE 'Cannot revoke access to geography_columns (insufficient privileges)';
    WHEN undefined_table THEN
        RAISE NOTICE 'geography_columns table does not exist';
    WHEN OTHERS THEN
        RAISE NOTICE 'Could not revoke access to geography_columns: %', SQLERRM;
    END;

    BEGIN
        EXECUTE 'REVOKE ALL ON public.geometry_columns FROM public, anon';
    EXCEPTION WHEN insufficient_privilege THEN
        RAISE NOTICE 'Cannot revoke access to geometry_columns (insufficient privileges)';
    WHEN undefined_table THEN
        RAISE NOTICE 'geometry_columns table does not exist';
    WHEN OTHERS THEN
        RAISE NOTICE 'Could not revoke access to geometry_columns: %', SQLERRM;
    END;
END $$;