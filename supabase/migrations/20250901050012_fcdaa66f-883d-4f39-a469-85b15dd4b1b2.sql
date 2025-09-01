-- Enable RLS on the spatial_ref_sys table to fix the security linter warning
-- This is safe since we use the secure_spatial_ref_sys view for actual access

-- Enable Row Level Security on the spatial_ref_sys table  
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Force RLS even for table owners (best practice)
ALTER TABLE public.spatial_ref_sys FORCE ROW LEVEL SECURITY;

-- Create a read-only policy that allows SELECT operations
-- This allows the secure_spatial_ref_sys view to work properly while maintaining security
CREATE POLICY "Allow read access to spatial_ref_sys for secure view"
ON public.spatial_ref_sys
FOR SELECT
USING (true);

-- Verify the secure view is properly configured
-- (This is just a comment - the view should already be SECURITY INVOKER)
-- The secure_spatial_ref_sys view acts as the proper interface with caller permissions