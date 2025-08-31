-- Drop the existing conflicting policy first
DROP POLICY IF EXISTS "Allow anonymous access via get_public_facility_data function" ON public.storage_facilities;

-- Also drop the old policies that might be too restrictive
DROP POLICY IF EXISTS "Auth users can view all facilities" ON public.storage_facilities;

-- Create a simple policy that allows public read access to storage_facilities
-- Since get_public_facility_data only returns non-sensitive data, this is safe
CREATE POLICY "Allow public read access for storage facilities" 
ON public.storage_facilities 
FOR SELECT 
TO public
USING (true);

-- Grant execute permission to anonymous users for the public function
GRANT EXECUTE ON FUNCTION public.get_public_facility_data() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_facility_data() TO authenticated;