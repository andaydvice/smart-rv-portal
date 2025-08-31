-- Create a simple view for public access without RLS
CREATE OR REPLACE VIEW public.storage_facilities_public_view AS
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

-- Grant select permissions on the view to anonymous users
GRANT SELECT ON public.storage_facilities_public_view TO anon, authenticated;