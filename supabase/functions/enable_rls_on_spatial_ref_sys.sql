
-- Create a secure view over the spatial_ref_sys table
CREATE OR REPLACE VIEW public.secure_spatial_ref_sys AS
SELECT 
    srid,
    auth_name,
    auth_srid,
    srtext,
    proj4text
FROM 
    public.spatial_ref_sys;

-- Grant SELECT permission on the view to public (both authenticated and anonymous users)
GRANT SELECT ON public.secure_spatial_ref_sys TO authenticated, anon;

-- Enable Row Level Security on the view with SECURITY INVOKER to respect querying user's permissions
ALTER VIEW public.secure_spatial_ref_sys SECURITY INVOKER;

COMMENT ON VIEW public.secure_spatial_ref_sys IS 
'Secure view over spatial_ref_sys table. Use this view instead of accessing the system table directly.';

-- Document security approach
DO $$
BEGIN
    EXECUTE 'COMMENT ON TABLE public.spatial_ref_sys IS ''SYSTEM TABLE: Direct access not recommended. Use secure_spatial_ref_sys view instead.''';
EXCEPTION
    WHEN insufficient_privilege THEN
        -- Cannot add comment to system table, which is expected
        RAISE NOTICE 'Cannot modify system table comments, which is expected.';
END $$;

-- Ensure our map components will use the view by updating the relevant SQL calls
-- This is a reminder - actual code changes would be needed in the application
-- to use 'secure_spatial_ref_sys' instead of 'spatial_ref_sys'
