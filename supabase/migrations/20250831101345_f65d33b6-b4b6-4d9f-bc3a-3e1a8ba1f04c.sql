-- Enable RLS on storage_facilities table
ALTER TABLE public.storage_facilities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to storage facilities
CREATE POLICY "Allow public read access to storage facilities" 
ON public.storage_facilities 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to read all storage facilities
CREATE POLICY "Allow authenticated read access to storage facilities" 
ON public.storage_facilities 
FOR SELECT 
TO authenticated 
USING (true);

-- Enable RLS on other tables that might be causing issues
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storage_facility_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create basic public read policies for the tables that should be public
CREATE POLICY "Allow public read access to customer reviews" 
ON public.customer_reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to content analysis" 
ON public.content_analysis 
FOR SELECT 
USING (true);

-- User-specific policies for user data
CREATE POLICY "Users can manage their own saved searches" 
ON public.saved_searches 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own facility favorites" 
ON public.storage_facility_favorites 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own profile" 
ON public.user_profiles 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id);