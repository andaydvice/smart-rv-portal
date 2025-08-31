-- Fix RLS policies for storage_facilities table to allow public SELECT access
-- Enable RLS on storage_facilities if not already enabled
ALTER TABLE storage_facilities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to storage facilities
DROP POLICY IF EXISTS "Allow public read access for storage facilities" ON storage_facilities;
CREATE POLICY "Allow public read access for storage facilities" 
ON storage_facilities 
FOR SELECT 
USING (true);

-- Ensure other critical tables have proper RLS
ALTER TABLE storage_facilities_public ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to storage facilities public" 
ON storage_facilities_public 
FOR SELECT 
USING (true);

ALTER TABLE storage_facilities_public_view ENABLE ROW LEVEL SECURITY;