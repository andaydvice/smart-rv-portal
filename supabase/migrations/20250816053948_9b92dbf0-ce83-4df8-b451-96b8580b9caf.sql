-- Enable Row Level Security on spatial_ref_sys table
-- This is a PostGIS system table that needs RLS for security compliance

ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners (good practice)
ALTER TABLE public.spatial_ref_sys FORCE ROW LEVEL SECURITY;

-- Create a permissive policy for public read access
-- spatial_ref_sys is a reference table that should be readable by all users
CREATE POLICY "Allow public read access to spatial_ref_sys"
ON public.spatial_ref_sys
FOR SELECT
USING (true);

-- Add a comment for documentation
COMMENT ON TABLE public.spatial_ref_sys IS 
'PostGIS spatial reference systems table with RLS enabled for security compliance. Public read access allowed.';

-- Verify the RLS status
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = 'spatial_ref_sys') as policy_count
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'spatial_ref_sys';