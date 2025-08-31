-- Enable RLS on remaining tables that need it for security

-- Enable RLS on content_analysis (this was flagged in security linter)
ALTER TABLE public.content_analysis ENABLE ROW LEVEL SECURITY;

-- Create public read policy for content_analysis if needed for public pages
CREATE POLICY "Allow public read access to content analysis" 
ON public.content_analysis 
FOR SELECT 
USING (true);