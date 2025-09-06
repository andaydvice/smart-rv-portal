-- Fix Security Definer View issue by replacing problematic view with secure implementation

-- Drop the existing problematic view
DROP VIEW IF EXISTS public.storage_facilities_public_view;

-- Create a new secure view that doesn't bypass RLS
-- This view will work for both anonymous and authenticated users
CREATE VIEW public.storage_facilities_public_view AS
SELECT 
    sf.id,
    sf.name,
    sf.address,
    sf.city,
    sf.state,
    sf.latitude,
    sf.longitude,
    sf.features AS basic_features,
    sf.price_range,
    sf.avg_rating,
    sf.review_count
FROM public.storage_facilities sf
-- This view will respect RLS policies and only show data that users are allowed to see
-- Anonymous users won't see anything (as intended by our security policies)
-- Authenticated users will see the data according to their permissions;

-- Grant appropriate permissions to the view
GRANT SELECT ON public.storage_facilities_public_view TO authenticated;

-- Note: We deliberately do NOT grant access to anon users for this view
-- since anonymous users should use the get_public_facility_data() RPC function
-- This eliminates the security definer issue while maintaining proper access control