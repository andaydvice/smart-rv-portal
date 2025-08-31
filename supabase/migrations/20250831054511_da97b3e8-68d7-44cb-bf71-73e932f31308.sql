-- Fix RLS issues - enable RLS on tables that don't have it enabled

-- Check and enable RLS on storage_facilities_public table
ALTER TABLE public.storage_facilities_public ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to storage_facilities_public
CREATE POLICY "Allow public read access to storage_facilities_public" 
ON public.storage_facilities_public 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- Ensure all existing tables have appropriate RLS policies
-- Check newsletter_subscribers (it should already have policies)
-- Check if web_vitals needs adjustment for public inserts (it should allow anonymous inserts)

-- Grant necessary permissions for the public data function
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.storage_facilities_public TO anon;