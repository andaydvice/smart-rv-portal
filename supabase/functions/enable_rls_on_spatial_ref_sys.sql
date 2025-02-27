
-- Enable Row Level Security on spatial_ref_sys table
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow SELECT for authenticated users
CREATE POLICY "Allow select for authenticated users" 
ON public.spatial_ref_sys
FOR SELECT 
TO authenticated
USING (true);

-- Create a policy to allow SELECT for anon users (if needed for your app)
CREATE POLICY "Allow select for anonymous users" 
ON public.spatial_ref_sys
FOR SELECT 
TO anon
USING (true);

-- Policies for other operations (only if needed)
-- Typically, this table should be read-only for most users
-- Only administrators should be able to modify it

-- If you need admin users to modify the table:
CREATE POLICY "Allow all operations for service_role" 
ON public.spatial_ref_sys
TO service_role
USING (true)
WITH CHECK (true);
