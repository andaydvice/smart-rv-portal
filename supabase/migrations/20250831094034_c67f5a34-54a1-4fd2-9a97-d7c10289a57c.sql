-- Fix RLS policies for storage_facilities table to allow public SELECT access
-- The main storage_facilities table should already have RLS enabled, let's ensure proper public access

-- Drop existing policy to recreate it with proper permissions
DROP POLICY IF EXISTS "Allow public read access for storage facilities" ON storage_facilities;

-- Create comprehensive public read policy
CREATE POLICY "Allow public read access for storage facilities" 
ON storage_facilities 
FOR SELECT 
USING (true);