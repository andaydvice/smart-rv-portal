-- Create saved_searches table
CREATE TABLE public.saved_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  query TEXT NOT NULL,
  filters JSONB DEFAULT '{}',
  category TEXT NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  last_used TIMESTAMP WITH TIME ZONE,
  use_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Create user_wishlists table
CREATE TABLE public.user_wishlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT NOT NULL,
  partner TEXT NOT NULL,
  affiliate_link TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_wishlists ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for saved_searches
CREATE POLICY "Users can view their own saved searches" 
ON public.saved_searches 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved searches" 
ON public.saved_searches 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved searches" 
ON public.saved_searches 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved searches" 
ON public.saved_searches 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for user_wishlists
CREATE POLICY "Users can view their own wishlist items" 
ON public.user_wishlists 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wishlist items" 
ON public.user_wishlists 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlist items" 
ON public.user_wishlists 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlist items" 
ON public.user_wishlists 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updated_at
CREATE TRIGGER update_saved_searches_updated_at
  BEFORE UPDATE ON public.saved_searches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_wishlists_updated_at
  BEFORE UPDATE ON public.user_wishlists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();