-- Remove the public read access policy that exposes sensitive business data
DROP POLICY IF EXISTS "Allow public read access to facilities" ON storage_facilities;

-- Drop the existing view to avoid conflicts
DROP VIEW IF EXISTS public.storage_facilities_public;

-- Create a secure public view that only exposes non-sensitive data for map display
CREATE VIEW public.storage_facilities_public AS
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
    avg_rating,
    review_count,
    created_at,
    updated_at,
    -- Create a price category based on price range without exposing exact prices
    CASE 
        WHEN (price_range->>'max')::numeric > 300 THEN 'premium'
        WHEN (price_range->>'max')::numeric > 150 THEN 'standard'
        ELSE 'budget'
    END as price_category,
    -- Extract only basic non-sensitive features
    jsonb_build_object(
        'indoor', COALESCE(features->>'indoor', 'false')::boolean,
        'climate_controlled', COALESCE(features->>'climate_controlled', 'false')::boolean,
        'security_system', COALESCE(features->>'security_system', 'false')::boolean
    ) as basic_features,
    -- Availability status without sensitive details
    CASE 
        WHEN (availability->>'available_spaces')::numeric > 0 THEN 'available'
        ELSE 'limited'
    END as availability_status
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

-- Add comments for clarity
COMMENT ON VIEW storage_facilities_public IS 'Public view of storage facilities with non-sensitive data only';
COMMENT ON FUNCTION get_public_facility_data() IS 'Returns non-sensitive facility data for public map display';