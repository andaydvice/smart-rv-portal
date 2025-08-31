-- Fix RLS policies for the views and tables that need public access

-- Enable RLS on the storage_facilities_public view/table
ALTER TABLE public.storage_facilities_public ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to storage_facilities_public
CREATE POLICY "Allow public read access to storage_facilities_public" 
ON public.storage_facilities_public 
FOR SELECT 
USING (true);

-- Make sure storage_facilities_public_view is accessible to everyone
-- (Views inherit permissions from underlying tables, but we need to ensure access)

-- Enable RLS on content_analysis and create public read policy (since it's used on public pages)
ALTER TABLE public.content_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to content analysis" 
ON public.content_analysis 
FOR SELECT 
USING (true);