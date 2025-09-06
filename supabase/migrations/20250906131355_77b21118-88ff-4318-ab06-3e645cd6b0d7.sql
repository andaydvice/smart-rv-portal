-- Fix remaining security vulnerabilities

-- Phase 1: Enable RLS on spatial_ref_sys and fix secure access
-- Enable Row Level Security on the spatial_ref_sys table
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners (good practice)
ALTER TABLE public.spatial_ref_sys FORCE ROW LEVEL SECURITY;

-- Drop any existing policies to start fresh
DROP POLICY IF EXISTS "Allow public read access to spatial_ref_sys" ON public.spatial_ref_sys;

-- Create a restrictive RLS policy for authenticated users only
CREATE POLICY "authenticated_read_spatial_ref_sys"
ON public.spatial_ref_sys
FOR SELECT
TO authenticated
USING (true);

-- Drop the existing security definer view
DROP VIEW IF EXISTS public.secure_spatial_ref_sys;

-- Create a new security invoker view (safe)
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

-- Grant SELECT permission on the view to authenticated users only
GRANT SELECT ON public.secure_spatial_ref_sys TO authenticated;

-- Phase 2: Revoke public access to PostGIS system views that can't be modified
-- These are system views so we can't alter them, but we can control access

-- Revoke public access to geography_columns (if it exists)
DO $$
BEGIN
    -- Try to revoke public access - this may fail on some systems but we try
    BEGIN
        REVOKE ALL ON public.geography_columns FROM public;
        REVOKE ALL ON public.geography_columns FROM anon;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Could not revoke access to geography_columns: %', SQLERRM;
    END;
END $$;

-- Revoke public access to geometry_columns (if it exists)
DO $$
BEGIN
    -- Try to revoke public access - this may fail on some systems but we try
    BEGIN
        REVOKE ALL ON public.geometry_columns FROM public;
        REVOKE ALL ON public.geometry_columns FROM anon;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Could not revoke access to geometry_columns: %', SQLERRM;
    END;
END $$;

-- Create a secure function to access spatial reference data instead of direct table access
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
    ORDER BY s.srid;
$$;

-- Grant access to the secure function for authenticated users
GRANT EXECUTE ON FUNCTION public.get_spatial_ref_sys_data(integer) TO authenticated;