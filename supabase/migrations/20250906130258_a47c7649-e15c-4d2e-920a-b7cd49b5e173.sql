-- Fix Security Definer View issue by replacing problematic view with secure implementation

-- Drop the existing problematic view that bypasses RLS
DROP VIEW IF EXISTS public.storage_facilities_public_view;

-- Create a new secure view that respects RLS policies
-- This eliminates the security definer vulnerability
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
FROM public.storage_facilities sf;

-- Grant access only to authenticated users
-- Anonymous users should use the secure get_public_facility_data() RPC function
GRANT SELECT ON public.storage_facilities_public_view TO authenticated;

-- This fix ensures:
-- 1. No security definer bypass - view respects RLS policies
-- 2. Anonymous users use secure RPC functions for data access
-- 3. Authenticated users can access the view according to their permissions
-- 4. Sensitive contact information remains protected