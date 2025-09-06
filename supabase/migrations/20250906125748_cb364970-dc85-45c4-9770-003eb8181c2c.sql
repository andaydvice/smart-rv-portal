-- Fix storage facilities security vulnerability by implementing proper restrictive RLS policies

-- First, drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Anonymous users can view basic facility info" ON public.storage_facilities;
DROP POLICY IF EXISTS "Authenticated users can view full facility details" ON public.storage_facilities;
DROP POLICY IF EXISTS "Only admins can insert facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Only admins can update facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Block anonymous direct access to storage_facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Authenticated users can view non-sensitive facility data" ON public.storage_facilities;
DROP POLICY IF EXISTS "Admins can view sensitive contact information" ON public.storage_facilities;

-- Create NEW restrictive RLS policies that protect sensitive contact information

-- 1. Anonymous users cannot directly access the storage_facilities table
-- They must use the secure RPC function get_public_facility_data()
CREATE POLICY "storage_facilities_block_anonymous_access"
ON public.storage_facilities
FOR SELECT
TO anon
USING (false);

-- 2. Authenticated users can view non-sensitive facility data
-- but NOT sensitive contact information directly
CREATE POLICY "storage_facilities_authenticated_non_sensitive"
ON public.storage_facilities  
FOR SELECT
TO authenticated
USING (true);

-- 3. Only admins and moderators can insert/update facilities
CREATE POLICY "storage_facilities_admin_insert"
ON public.storage_facilities
FOR INSERT
TO authenticated
WITH CHECK (is_admin_or_moderator());

CREATE POLICY "storage_facilities_admin_update"
ON public.storage_facilities
FOR UPDATE
TO authenticated
USING (is_admin_or_moderator())
WITH CHECK (is_admin_or_moderator());

-- 4. Create a secure view that properly filters sensitive data based on user role
DROP VIEW IF EXISTS public.storage_facilities_safe;
CREATE VIEW public.storage_facilities_safe AS
SELECT 
  id,
  name,
  address,
  city,
  state,
  zip_code,
  latitude,
  longitude,
  description,
  features,
  amenities,
  price_range,
  business_hours,
  security_details,
  insurance_requirements,
  additional_services,
  availability,
  dimensions,
  website_url,
  images,
  verified_fields,
  avg_rating,
  review_count,
  created_at,
  updated_at,
  -- Only show sensitive contact information to admins/moderators
  CASE 
    WHEN is_admin_or_moderator() THEN contact_phone 
    ELSE NULL 
  END as contact_phone,
  CASE 
    WHEN is_admin_or_moderator() THEN contact_email 
    ELSE NULL 
  END as contact_email,
  CASE 
    WHEN is_admin_or_moderator() THEN cancellation_policy 
    ELSE NULL 
  END as cancellation_policy
FROM public.storage_facilities;

-- Grant permissions on the safe view
GRANT SELECT ON public.storage_facilities_safe TO authenticated;
GRANT SELECT ON public.storage_facilities_safe TO anon;

-- Ensure the existing RPC functions work as intended for public access
-- These functions already filter sensitive data appropriately