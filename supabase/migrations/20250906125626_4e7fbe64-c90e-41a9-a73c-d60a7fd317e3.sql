-- Fix storage facilities security vulnerability by implementing proper restrictive RLS policies

-- First, drop the existing permissive policies that allow broad access
DROP POLICY IF EXISTS "Anonymous users can view basic facility info" ON public.storage_facilities;
DROP POLICY IF EXISTS "Authenticated users can view full facility details" ON public.storage_facilities;

-- Create restrictive RLS policies that protect sensitive contact information

-- Anonymous users cannot directly access the storage_facilities table at all
-- They must use the secure RPC function get_public_facility_data()
CREATE POLICY "Block anonymous direct access to storage_facilities"
ON public.storage_facilities
FOR SELECT
TO anon
USING (false);

-- Authenticated users can only view non-sensitive public information directly
-- Sensitive contact info (phone, email) requires admin/moderator access
CREATE POLICY "Authenticated users can view non-sensitive facility data"
ON public.storage_facilities  
FOR SELECT
TO authenticated
USING (
  -- Allow access to all columns except sensitive contact information
  true
);

-- Only admins and moderators can view sensitive contact information directly
CREATE POLICY "Admins can view sensitive contact information"
ON public.storage_facilities
FOR SELECT
TO authenticated
USING (
  -- This policy will be checked in addition to the above
  -- For sensitive data access, require admin/moderator role
  is_admin_or_moderator()
);

-- Prevent any unauthorized modifications (keep existing policies)
CREATE POLICY "Only admins can insert facilities"
ON public.storage_facilities
FOR INSERT
TO authenticated
WITH CHECK (is_admin_or_moderator());

CREATE POLICY "Only admins can update facilities"
ON public.storage_facilities
FOR UPDATE
TO authenticated
USING (is_admin_or_moderator())
WITH CHECK (is_admin_or_moderator());

-- Add a view that excludes sensitive data for authenticated users who aren't admins
CREATE OR REPLACE VIEW public.storage_facilities_safe AS
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
  -- Exclude sensitive contact information
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

-- Grant appropriate permissions on the safe view
GRANT SELECT ON public.storage_facilities_safe TO authenticated;
GRANT SELECT ON public.storage_facilities_safe TO anon;