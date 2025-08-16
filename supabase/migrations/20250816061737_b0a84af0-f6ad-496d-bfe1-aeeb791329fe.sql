-- Fix storage facilities security vulnerability
-- Step 1: Remove overly permissive RLS policies

DROP POLICY IF EXISTS "Allow public read access to storage facilities" ON storage_facilities;
DROP POLICY IF EXISTS "Enable read access for all users" ON storage_facilities;

-- Step 2: Create a public view that exposes only basic facility information for discovery
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
    avg_rating,
    review_count,
    -- Only basic features for discovery, not detailed amenities
    jsonb_build_object(
        'indoor', features->>'indoor',
        'climate_controlled', features->>'climate_controlled',
        '24h_access', features->>'24h_access'
    ) as basic_features,
    -- Basic availability without detailed counts
    CASE 
        WHEN (availability->>'available_spaces')::int > 0 THEN 'available'
        ELSE 'full'
    END as availability_status,
    -- Price range indicator without exact amounts
    CASE 
        WHEN (price_range->>'min')::numeric = 0 THEN 'contact_for_pricing'
        WHEN (price_range->>'max')::numeric <= 100 THEN 'budget'
        WHEN (price_range->>'max')::numeric <= 200 THEN 'moderate'
        ELSE 'premium'
    END as price_category,
    created_at,
    updated_at
FROM storage_facilities;

-- Step 3: Create secure RLS policies for the main table

-- Allow authenticated users to see all facility details
CREATE POLICY "Authenticated users can view all facility details"
ON storage_facilities
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert facilities (for business owners)
CREATE POLICY "Authenticated users can create facilities"
ON storage_facilities  
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow facility owners to update their own facilities (if we had owner tracking)
-- For now, allow authenticated users to update (can be refined later)
CREATE POLICY "Authenticated users can update facilities"
ON storage_facilities
FOR UPDATE  
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 4: Grant public access to the public view
GRANT SELECT ON public.storage_facilities_public TO anon, authenticated;

-- Step 5: Create a function to get detailed facility info for authenticated users
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

-- Step 6: Create indexes for performance on the public view queries
CREATE INDEX IF NOT EXISTS idx_storage_facilities_location ON storage_facilities (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_storage_facilities_city_state ON storage_facilities (city, state);
CREATE INDEX IF NOT EXISTS idx_storage_facilities_rating ON storage_facilities (avg_rating DESC);

-- Step 7: Add comments for clarity
COMMENT ON VIEW public.storage_facilities_public IS 'Public view of storage facilities showing only basic discovery information. Sensitive business details require authentication.';
COMMENT ON FUNCTION public.get_facility_details IS 'Returns detailed facility information for authenticated users only. Used for showing full business details after user authentication.';