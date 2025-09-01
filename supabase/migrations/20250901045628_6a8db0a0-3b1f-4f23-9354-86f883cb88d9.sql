-- Enable RLS on spatial_ref_sys table which is currently disabled
-- This addresses the security definer view issue by ensuring proper access control

-- First, enable RLS on the spatial_ref_sys table
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Create a read-only policy for authenticated and anonymous users
-- This allows normal spatial reference system lookups which are public data
CREATE POLICY "Allow public read access to spatial_ref_sys"
ON public.spatial_ref_sys
FOR SELECT
USING (true);

-- The secure_spatial_ref_sys view is already set to SECURITY INVOKER which is correct
-- It will now properly enforce RLS policies on the underlying table