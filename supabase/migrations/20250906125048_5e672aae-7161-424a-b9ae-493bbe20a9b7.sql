-- Fix search path issues in database functions

-- Update get_public_facility_data function with proper search path
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

-- Update get_facility_details function with proper search path
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
    FROM public.storage_facilities sf
    WHERE sf.id = facility_id
    AND auth.uid() IS NOT NULL; -- Only for authenticated users
$$;