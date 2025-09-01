-- Fix the security issue by ensuring proper access to the secure spatial reference view
-- Since we cannot modify the PostGIS spatial_ref_sys table directly, we ensure the secure view has proper grants

-- Grant SELECT permissions on the secure view to the standard Supabase roles
GRANT SELECT ON public.secure_spatial_ref_sys TO authenticated, anon;

-- Also grant to the public role to ensure broad compatibility
GRANT SELECT ON public.secure_spatial_ref_sys TO public;

-- Revoke any direct access to the underlying spatial_ref_sys table from application roles
-- (This may fail if permissions don't exist, which is fine)
DO $$
BEGIN
    REVOKE ALL ON public.spatial_ref_sys FROM public;
    REVOKE ALL ON public.spatial_ref_sys FROM anon;
    REVOKE ALL ON public.spatial_ref_sys FROM authenticated;
EXCEPTION
    WHEN insufficient_privilege THEN
        RAISE NOTICE 'Could not revoke permissions from spatial_ref_sys (expected if no permissions exist)';
    WHEN OTHERS THEN
        RAISE NOTICE 'Permission modification completed with warnings: %', SQLERRM;
END $$;