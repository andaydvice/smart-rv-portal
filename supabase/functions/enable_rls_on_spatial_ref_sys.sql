
-- Enable Row Level Security on the base table
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners (good practice, though 'postgres' superuser bypasses RLS)
ALTER TABLE public.spatial_ref_sys FORCE ROW LEVEL SECURITY;

-- Drop any existing policy with the old or new name to avoid conflict
DROP POLICY IF EXISTS "Allow public read access to spatial_ref_sys via secure view" ON public.spatial_ref_sys;
DROP POLICY IF EXISTS "Allow public read access to spatial_ref_sys" ON public.spatial_ref_sys;

-- Create a permissive RLS policy for SELECT on the base table.
-- This policy allows SELECT operations to pass through RLS check *at the table level*.
-- The actual access control for users happens via the SECURITY INVOKER view and its grants.
CREATE POLICY "Allow public read access to spatial_ref_sys"
ON public.spatial_ref_sys
FOR SELECT
USING (true); -- Allows all SELECT operations for roles that have SELECT grant on the table (directly or via view)

-- Drop the view first to ensure a clean creation with the new security model
DROP VIEW IF EXISTS public.secure_spatial_ref_sys;

-- Create the secure view with SECURITY INVOKER explicitly set during creation
CREATE VIEW public.secure_spatial_ref_sys
WITH (security_invoker = true) -- This is crucial for setting the view to use caller's permissions
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

-- Add comments for clarity (optional but good practice)
COMMENT ON VIEW public.secure_spatial_ref_sys IS
'Secure, RLS-aware view (SECURITY INVOKER) over spatial_ref_sys table. Application queries should use this view.';

DO $$
BEGIN
    EXECUTE 'COMMENT ON TABLE public.spatial_ref_sys IS ''SYSTEM TABLE: RLS enabled. Direct access not recommended for app users. Use secure_spatial_ref_sys view instead.''';
EXCEPTION
    WHEN insufficient_privilege THEN
        RAISE NOTICE 'Cannot modify system table comments for public.spatial_ref_sys, which is expected for non-superusers.';
    WHEN OTHERS THEN
        RAISE WARNING 'An error occurred while trying to comment on public.spatial_ref_sys: %', SQLERRM;
END $$;

RAISE NOTICE 'RLS and view configuration for spatial_ref_sys updated.';
RAISE NOTICE '--- Verification Step 1: RLS status on public.spatial_ref_sys ---';
SELECT
    'public.spatial_ref_sys' AS table_name,
    pc.relrowsecurity AS rls_enabled_on_table,
    pc.relforcerowsecurity AS rls_forced_on_table
FROM pg_class pc JOIN pg_namespace pn ON pn.oid = pc.relnamespace
WHERE pn.nspname = 'public' AND pc.relname = 'spatial_ref_sys';

RAISE NOTICE '--- Verification Step 2: Security model of public.secure_spatial_ref_sys ---';
SELECT
  c.relname AS view_name,
  CASE
    WHEN c.reloptions IS NOT NULL AND array_to_string(c.reloptions, ',') LIKE '%security_invoker=true%' THEN 'INVOKER'
    ELSE 'DEFINER'
  END AS security_type
FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'v' AND n.nspname = 'public' AND c.relname = 'secure_spatial_ref_sys';

RAISE NOTICE 'Please run the commented-out queries below in your SQL editor for more detailed verification if needed.';

-- For more detailed manual verification in Supabase SQL Editor:
/*
-- 1. Check RLS status on the table:
SELECT
    pc.relname AS table_name,
    pc.relrowsecurity AS rls_enabled_on_table, -- Expected: true
    pc.relforcerowsecurity AS rls_forced_on_table -- Expected: true
FROM
    pg_class pc
JOIN
    pg_namespace pn ON pn.oid = pc.relnamespace
WHERE
    pn.nspname = 'public' AND pc.relname = 'spatial_ref_sys';

-- 2. Check the RLS policy on the table:
SELECT
    policyname,         -- Expected: "Allow public read access to spatial_ref_sys"
    permissive,         -- Expected: PERMISSIVE
    cmd,                -- Expected: SELECT
    qual,               -- Expected: true
    with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'spatial_ref_sys';

-- 3. Check the security model of the view:
SELECT
  c.relname AS view_name,
  CASE
    WHEN c.reloptions IS NOT NULL AND array_to_string(c.reloptions, ',') LIKE '%security_invoker=true%' THEN 'INVOKER' -- Expected
    ELSE 'DEFINER'
  END AS security_type,
  pg_get_viewdef(c.oid, true) AS view_definition -- Check if WITH (security_invoker=true) is in definition
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'v' -- 'v' for view
  AND n.nspname = 'public'
  AND c.relname = 'secure_spatial_ref_sys';

-- 4. Check grants on the view:
SELECT
    grantee,            -- Expected: authenticated, anon (or public which includes them)
    privilege_type      -- Expected: SELECT
FROM information_schema.role_table_grants
WHERE table_schema = 'public' AND table_name = 'secure_spatial_ref_sys';
*/

