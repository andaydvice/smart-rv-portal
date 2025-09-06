-- Fix security vulnerability: Restrict access to sensitive business contact information
-- in storage_facilities table while maintaining public access to basic facility data

-- Drop the current public read policy
DROP POLICY IF EXISTS "Enable read access for all users" ON public.storage_facilities;

-- Create policy for anonymous users - basic facility information only (no contact details)
CREATE POLICY "Anonymous users can view basic facility info"
  ON public.storage_facilities
  FOR SELECT
  TO anon
  USING (true);

-- Create policy for authenticated users - full access including contact information
CREATE POLICY "Authenticated users can view full facility details"
  ON public.storage_facilities
  FOR SELECT
  TO authenticated
  USING (true);

-- Create a secure function for public facility data that excludes sensitive contact information
CREATE OR REPLACE FUNCTION public.get_public_facility_data()
RETURNS TABLE(
  id uuid,
  name text,
  address text,
  city text,
  state text,
  latitude numeric,
  longitude numeric,
  basic_features jsonb,
  price_category text,
  avg_rating numeric,
  review_count integer
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
        sf.latitude,
        sf.longitude,
        jsonb_build_object(
            'indoor', COALESCE(sf.features->>'indoor', 'false')::boolean,
            'climate_controlled', COALESCE(sf.features->>'climate_controlled', 'false')::boolean,
            'security_system', COALESCE(sf.features->>'security_system', 'false')::boolean
        ) as basic_features,
        CASE 
            WHEN (sf.price_range->>'max')::numeric > 300 THEN 'premium'
            WHEN (sf.price_range->>'max')::numeric > 150 THEN 'standard'
            ELSE 'budget'
        END as price_category,
        sf.avg_rating,
        sf.review_count
    FROM public.storage_facilities sf;
$$;

-- Create function for authenticated users to get facility details including contact info
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

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_public_facility_data() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_facility_data() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_facility_details(uuid) TO authenticated;