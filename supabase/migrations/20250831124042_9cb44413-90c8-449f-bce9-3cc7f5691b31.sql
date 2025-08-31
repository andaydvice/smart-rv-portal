-- Fix RLS policies for public access to storage facilities data

-- Ensure RLS is enabled on storage_facilities table
ALTER TABLE public.storage_facilities ENABLE ROW LEVEL SECURITY;

-- Drop conflicting policies and recreate clean ones
DROP POLICY IF EXISTS "Allow public read access for storage facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Allow public read access to storage facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.storage_facilities;

-- Create single, clear public read policy
CREATE POLICY "Enable read access for all users" ON public.storage_facilities
  FOR SELECT USING (true);

-- Create auth policies for data management
CREATE POLICY "Enable insert for authenticated users" ON public.storage_facilities
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.storage_facilities
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Ensure the public views have proper access
-- Check if storage_facilities_public_view exists and grant access
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_views WHERE schemaname = 'public' AND viewname = 'storage_facilities_public_view') THEN
    -- Grant usage on the view
    GRANT SELECT ON public.storage_facilities_public_view TO anon, authenticated;
  END IF;
END $$;

-- Grant access to the main table
GRANT SELECT ON public.storage_facilities TO anon, authenticated;

-- If storage_facilities_public view exists, grant access to it as well
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_views WHERE schemaname = 'public' AND viewname = 'storage_facilities_public') THEN
    GRANT SELECT ON public.storage_facilities_public TO anon, authenticated;
  END IF;
END $$;