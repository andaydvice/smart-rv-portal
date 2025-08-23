-- Remove the public read access policy that exposes sensitive business data
DROP POLICY IF EXISTS "Allow public read access to facilities" ON storage_facilities;

-- Create a secure public view that only exposes non-sensitive data for map display
CREATE OR REPLACE VIEW public.storage_facilities_public AS
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
    images,
    basic_features,
    price_category,
    availability_status,
    avg_rating,
    review_count,
    created_at,
    updated_at
FROM storage_facilities;

-- Grant read access to the public view for map functionality
GRANT SELECT ON storage_facilities_public TO anon, authenticated;

-- Create a function to get non-sensitive facility data for public map display
CREATE OR REPLACE FUNCTION get_public_facility_data()
RETURNS TABLE (
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
LANGUAGE SQL
SECURITY DEFINER
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
    FROM storage_facilities sf;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_public_facility_data() TO anon, authenticated;

-- Create a secure function for authenticated users to get full facility details
CREATE OR REPLACE FUNCTION get_facility_details_secure(facility_id uuid)
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
LANGUAGE SQL
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

-- Grant execute permission on the secure function
GRANT EXECUTE ON FUNCTION get_facility_details_secure(uuid) TO authenticated;

-- Add comments for clarity
COMMENT ON VIEW storage_facilities_public IS 'Public view of storage facilities with non-sensitive data only';
COMMENT ON FUNCTION get_public_facility_data() IS 'Returns non-sensitive facility data for public map display';
COMMENT ON FUNCTION get_facility_details_secure(uuid) IS 'Returns full facility details for authenticated users only';