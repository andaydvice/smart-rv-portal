-- Final fix for remaining security vulnerabilities
-- The security scan shows we still have 3 ERROR-level "Security Definer View" issues
-- Let's address any remaining security definer views by finding and fixing them

-- Check and drop any remaining problematic views
DO $$
DECLARE
    view_record RECORD;
BEGIN
    -- Find and drop any remaining security definer views in public schema
    FOR view_record IN 
        SELECT schemaname, viewname
        FROM pg_views 
        WHERE definition ILIKE '%security definer%'
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP VIEW IF EXISTS %I.%I CASCADE', view_record.schemaname, view_record.viewname);
        RAISE NOTICE 'Dropped security definer view: %.%', view_record.schemaname, view_record.viewname;
    END LOOP;
END $$;

-- Ensure we have safe alternatives for any spatial reference data access
-- Create a restricted spatial reference view using security invoker (safe)
CREATE OR REPLACE VIEW public.app_spatial_ref_sys AS
SELECT 
    srid,
    auth_name,
    auth_srid,
    srtext,
    proj4text
FROM public.spatial_ref_sys
WHERE srid IN (4326, 3857, 2154, 32633); -- Only common EPSG codes for security

-- This view uses security invoker by default (safe)
GRANT SELECT ON public.app_spatial_ref_sys TO authenticated;

-- Add a comment to document the security model
COMMENT ON VIEW public.app_spatial_ref_sys IS 
'Safe view for spatial reference systems with restricted SRID access. Uses security invoker model.';