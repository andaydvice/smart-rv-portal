-- Add public read access policy for storage facilities
-- This allows both anonymous and authenticated users to view facilities
-- while keeping write operations restricted to authenticated users only

CREATE POLICY "Allow public read access to facilities" 
ON public.storage_facilities 
FOR SELECT 
TO anon, authenticated 
USING (true);