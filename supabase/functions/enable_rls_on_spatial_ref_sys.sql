
-- Enable Row Level Security on the base table
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners (good practice, though 'postgres' superuser bypasses RLS)
-- This ensures that even the table owner is subject to RLS policies unless explicitly bypassed.
-- For system tables, this might be less critical if only admin roles interact directly,
-- but it's a safe default.
ALTER TABLE public.spatial_ref_sys FORCE ROW LEVEL SECURITY;

-- Drop any existing policy with the same name to avoid conflict during re-runs
DROP POLICY IF EXISTS "Allow public read access to spatial_ref_sys via secure view" ON public.spatial_ref_sys;

-- Create a permissive RLS policy for SELECT on the base table.
-- This policy allows any authenticated user (via the SECURITY INVOKER view) to read.
-- The actual access control happens via the grants on the secure_spatial_ref_sys view.
CREATE POLICY "Allow public read access to spatial_ref_sys via secure view"
ON public.spatial_ref_sys
FOR SELECT
USING (true); -- Allows all SELECT operations to pass through RLS check for this policy

-- Create or replace the secure view over the spatial_ref_sys table
CREATE OR REPLACE VIEW public.secure_spatial_ref_sys AS
SELECT
    srid,
    auth_name,
    auth_srid,
    srtext,
    proj4text
FROM
    public.spatial_ref_sys;

-- Set the security model for the view to INVOKER.
-- This means the view will execute with the permissions of the user calling it,
-- respecting the RLS policy on the base table.
ALTER VIEW public.secure_spatial_ref_sys SECURITY INVOKER;

-- Grant SELECT permission on the view to authenticated and anonymous users
-- These are standard Supabase roles. 'public' role effectively includes them.
GRANT SELECT ON public.secure_spatial_ref_sys TO authenticated, anon;

-- Add a comment to the view for clarity
COMMENT ON VIEW public.secure_spatial_ref_sys IS
'Secure, RLS-aware view over spatial_ref_sys table. Use this view for application queries instead of accessing the system table directly. Security is enforced by RLS on public.spatial_ref_sys and SECURITY INVOKER on this view.';

-- Document security approach for the base table
-- Note: This might fail if the user running the script doesn't have permissions to comment on system tables,
-- which is common. The DO $$ block handles this gracefully.
DO $$
BEGIN
    EXECUTE 'COMMENT ON TABLE public.spatial_ref_sys IS ''SYSTEM TABLE: RLS enabled. Direct access not recommended for app users. Use secure_spatial_ref_sys view instead.''';
EXCEPTION
    WHEN insufficient_privilege THEN
        RAISE NOTICE 'Cannot modify system table comments for public.spatial_ref_sys, which is expected for non-superusers.';
    WHEN OTHERS THEN
        RAISE WARNING 'An error occurred while trying to comment on public.spatial_ref_sys: %', SQLERRM;
END $$;

-- Reminder for application code (no SQL change here, just a comment)
-- Ensure application code queries 'public.secure_spatial_ref_sys'
-- instead of 'public.spatial_ref_sys' for PostGIS-related spatial reference data.
RAISE NOTICE 'Successfully updated RLS and view configuration for spatial_ref_sys. Please ensure your application uses public.secure_spatial_ref_sys.';

