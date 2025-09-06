-- Fix storage facilities security vulnerability by implementing proper restrictive RLS policies

-- First, drop ALL existing policies on storage_facilities
DROP POLICY IF EXISTS "Anonymous users can view basic facility info" ON public.storage_facilities;
DROP POLICY IF EXISTS "Authenticated users can view full facility details" ON public.storage_facilities;
DROP POLICY IF EXISTS "Only admins can insert facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Only admins can update facilities" ON public.storage_facilities;

-- Create restrictive RLS policies that protect sensitive contact information

-- Anonymous users cannot directly access the storage_facilities table at all
-- They must use the secure RPC function get_public_facility_data()
CREATE POLICY "Block anonymous direct access to storage_facilities"
ON public.storage_facilities
FOR SELECT
TO anon
USING (false);

-- Authenticated users can only view non-sensitive public information directly
-- But contact information is restricted to admins/moderators only
CREATE POLICY "Authenticated users limited access to storage_facilities"
ON public.storage_facilities  
FOR SELECT
TO authenticated
USING (
  -- Only allow if user is admin/moderator OR if they're accessing non-sensitive data via secure functions
  is_admin_or_moderator()
);

-- Prevent any unauthorized modifications
CREATE POLICY "Admins can insert facilities"
ON public.storage_facilities
FOR INSERT
TO authenticated
WITH CHECK (is_admin_or_moderator());

CREATE POLICY "Admins can update facilities"
ON public.storage_facilities
FOR UPDATE
TO authenticated
USING (is_admin_or_moderator())
WITH CHECK (is_admin_or_moderator());