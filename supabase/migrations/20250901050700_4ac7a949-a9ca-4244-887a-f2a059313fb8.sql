-- Fix storage_facilities_public_view to use SECURITY INVOKER instead of SECURITY DEFINER
-- This resolves the security warning while maintaining all existing functionality

-- Drop the existing view first
DROP VIEW IF EXISTS public.storage_facilities_public_view;

-- Recreate the view with SECURITY INVOKER explicitly set
CREATE VIEW public.storage_facilities_public_view
WITH (security_invoker = true) -- This is the key change for security
AS
SELECT 
    id,
    name,
    address,
    city,
    state,
    latitude,
    longitude,
    features as basic_features,
    price_range,
    avg_rating,
    review_count
FROM public.storage_facilities;

-- Grant SELECT permissions to the standard Supabase roles (preserving existing access)
GRANT SELECT ON public.storage_facilities_public_view TO authenticated, anon;

-- Add comment explaining the security model
COMMENT ON VIEW public.storage_facilities_public_view IS 
'Public view of storage facilities with SECURITY INVOKER. Uses caller permissions to access underlying storage_facilities table which has public read access via RLS.';

-- Verify the security model change
SELECT 
  c.relname AS view_name,
  CASE 
    WHEN c.reloptions IS NOT NULL AND array_to_string(c.reloptions, ',') LIKE '%security_invoker=true%' THEN 'INVOKER'
    ELSE 'DEFINER'
  END AS security_type
FROM pg_class c 
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'v' 
  AND n.nspname = 'public' 
  AND c.relname = 'storage_facilities_public_view';