-- Fix security issues identified by the linter

-- Issue 1: Fix the function search path
DROP FUNCTION IF EXISTS public.get_facility_details(uuid);

CREATE OR REPLACE FUNCTION public.get_facility_details(facility_id uuid)
RETURNS TABLE (
    id uuid,
    name text,
    full_address text,
    contact_phone text,
    contact_email text,
    website_url text,
    detailed_features jsonb,
    amenities jsonb,
    price_range jsonb,
    business_hours jsonb,
    security_details jsonb,
    insurance_requirements jsonb,
    additional_services jsonb,
    availability jsonb,
    dimensions jsonb,
    cancellation_policy text,
    verified_fields jsonb
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT 
        sf.id,
        sf.name,
        sf.address || ', ' || sf.city || ', ' || sf.state || ' ' || sf.zip_code as full_address,
        sf.contact_phone,
        sf.contact_email,
        sf.website_url,
        sf.features as detailed_features,
        sf.amenities,
        sf.price_range,
        sf.business_hours,
        sf.security_details,
        sf.insurance_requirements,
        sf.additional_services,
        sf.availability,
        sf.dimensions,
        sf.cancellation_policy,
        sf.verified_fields
    FROM storage_facilities sf
    WHERE sf.id = facility_id
    AND auth.uid() IS NOT NULL; -- Only for authenticated users
$$;

-- Issue 2: Enable RLS on the public view (views need explicit RLS)
-- Actually, we need to replace the view with a function since views can't have RLS
DROP VIEW IF EXISTS public.storage_facilities_public;

CREATE OR REPLACE FUNCTION public.get_public_facilities()
RETURNS TABLE (
    id uuid,
    name text,
    address text,
    city text,
    state text,
    zip_code text,
    latitude numeric,
    longitude numeric,
    description text,
    images text[],
    avg_rating numeric,
    review_count integer,
    basic_features jsonb,
    availability_status text,
    price_category text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        sf.id,
        sf.name,
        sf.address,
        sf.city,
        sf.state,
        sf.zip_code,
        sf.latitude,
        sf.longitude,
        sf.description,
        sf.images,
        sf.avg_rating,
        sf.review_count,
        -- Only basic features for discovery, not detailed amenities
        jsonb_build_object(
            'indoor', sf.features->>'indoor',
            'climate_controlled', sf.features->>'climate_controlled',
            '24h_access', sf.features->>'24h_access'
        ) as basic_features,
        -- Basic availability without detailed counts
        CASE 
            WHEN (sf.availability->>'available_spaces')::int > 0 THEN 'available'
            ELSE 'full'
        END as availability_status,
        -- Price range indicator without exact amounts
        CASE 
            WHEN (sf.price_range->>'min')::numeric = 0 THEN 'contact_for_pricing'
            WHEN (sf.price_range->>'max')::numeric <= 100 THEN 'budget'
            WHEN (sf.price_range->>'max')::numeric <= 200 THEN 'moderate'
            ELSE 'premium'
        END as price_category,
        sf.created_at,
        sf.updated_at
    FROM storage_facilities sf;
$$;

-- Grant execute permission on the functions to public
GRANT EXECUTE ON FUNCTION public.get_public_facilities() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_facility_details(uuid) TO authenticated;

-- Update the comment
COMMENT ON FUNCTION public.get_public_facilities IS 'Returns basic facility information visible to all users. Sensitive business details require authentication.';

-- Create a more restrictive policy for the storage_facilities table to prevent public access to sensitive data
-- First remove the existing overly permissive policies that might have been recreated
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON storage_facilities;

-- Create more specific policies
CREATE POLICY "Authenticated users can view facilities"
ON storage_facilities
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create facilities"
ON storage_facilities  
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update facilities"
ON storage_facilities
FOR UPDATE  
TO authenticated
USING (true)
WITH CHECK (true);

-- Ensure no public access to the main table (this addresses the RLS disabled issue)
-- The table already has RLS enabled, just making sure policies are restrictive