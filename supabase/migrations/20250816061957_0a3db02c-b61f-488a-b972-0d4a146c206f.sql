-- Fix security issues identified by the linter (handle existing policies)

-- Issue 1: Fix the function search path (this was successful)

-- Issue 2: Replace view with secure function (this was successful)

-- Issue 3: Fix policy conflicts by dropping and recreating
DROP POLICY IF EXISTS "Authenticated users can view facilities" ON storage_facilities;
DROP POLICY IF EXISTS "Authenticated users can create facilities" ON storage_facilities;
DROP POLICY IF EXISTS "Authenticated users can update facilities" ON storage_facilities;
DROP POLICY IF EXISTS "Authenticated users can view all facility details" ON storage_facilities;

-- Create clean, secure policies
CREATE POLICY "Auth users can view all facilities"
ON storage_facilities
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Auth users can insert facilities"
ON storage_facilities  
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Auth users can update facilities"
ON storage_facilities
FOR UPDATE  
TO authenticated
USING (true)
WITH CHECK (true);

-- Verify RLS is enabled (it should be, but double-check)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_class 
        WHERE relname = 'storage_facilities' 
        AND relrowsecurity = true
    ) THEN
        ALTER TABLE storage_facilities ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Add a final comment
COMMENT ON TABLE storage_facilities IS 'Storage facilities table with RLS enabled. Public access only through get_public_facilities() function. Full details require authentication.';