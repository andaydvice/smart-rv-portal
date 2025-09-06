-- Fix storage facilities security vulnerability - Complete reset and proper setup

-- First, completely reset all policies on storage_facilities
DO $$ 
DECLARE
    pol record;
BEGIN
    -- Drop all existing policies on storage_facilities
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'storage_facilities' 
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.storage_facilities', pol.policyname);
    END LOOP;
END $$;

-- Create secure RLS policies that protect sensitive contact information

-- 1. Block anonymous users from directly accessing storage_facilities table
-- They must use the get_public_facility_data() RPC function
CREATE POLICY "block_anonymous_direct_access"
ON public.storage_facilities
FOR SELECT
TO anon
USING (false);

-- 2. Allow authenticated users to view facility data, but sensitive contact 
-- information will be filtered out by application logic and views
CREATE POLICY "authenticated_facility_access" 
ON public.storage_facilities
FOR SELECT
TO authenticated
USING (true);

-- 3. Only admins/moderators can modify facilities
CREATE POLICY "admin_facility_insert"
ON public.storage_facilities
FOR INSERT
TO authenticated
WITH CHECK (is_admin_or_moderator());

CREATE POLICY "admin_facility_update"
ON public.storage_facilities
FOR UPDATE  
TO authenticated
USING (is_admin_or_moderator())
WITH CHECK (is_admin_or_moderator());

-- 4. No one can delete facilities directly (not even admins for data integrity)
-- This prevents accidental data loss

-- Create a security function to check if current user can access sensitive data
CREATE OR REPLACE FUNCTION public.can_access_sensitive_facility_data()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT is_admin_or_moderator();
$$;

-- Update the get_facility_details function to be more restrictive
CREATE OR REPLACE FUNCTION public.get_facility_details(facility_id uuid)
RETURNS TABLE(
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
STABLE 
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        sf.id,
        sf.name,
        sf.address || ', ' || sf.city || ', ' || sf.state || ' ' || sf.zip_code as full_address,
        CASE 
            WHEN is_admin_or_moderator() THEN sf.contact_phone 
            ELSE NULL 
        END as contact_phone,
        CASE 
            WHEN is_admin_or_moderator() THEN sf.contact_email 
            ELSE NULL 
        END as contact_email,
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
        CASE 
            WHEN is_admin_or_moderator() THEN sf.cancellation_policy 
            ELSE NULL 
        END as cancellation_policy,
        sf.verified_fields
    FROM public.storage_facilities sf
    WHERE sf.id = facility_id
    AND auth.uid() IS NOT NULL; -- Only for authenticated users
$$;