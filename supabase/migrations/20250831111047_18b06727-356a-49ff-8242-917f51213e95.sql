-- Fix RLS policies to allow public access to storage facilities data

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to storage_facilities_public" ON public.storage_facilities_public;
DROP POLICY IF EXISTS "Allow public read access to content analysis" ON public.content_analysis;

-- Enable RLS on storage_facilities table and create public read policy
ALTER TABLE public.storage_facilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to storage facilities" 
ON public.storage_facilities 
FOR SELECT 
USING (true);

-- Create a proper public view if it doesn't exist
CREATE OR REPLACE VIEW public.storage_facilities_public_view AS
SELECT 
    id,
    name,
    address,
    city,
    state,
    latitude,
    longitude,
    features,
    price_range,
    avg_rating,
    review_count
FROM public.storage_facilities;

-- Grant access to the view
GRANT SELECT ON public.storage_facilities_public_view TO anon;
GRANT SELECT ON public.storage_facilities_public_view TO authenticated;