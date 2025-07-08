-- Create customer_reviews table for testimonial management and affiliate social proof
CREATE TABLE public.customer_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  product_category TEXT NOT NULL, -- 'rv-apps', 'solar-equipment', 'emergency-gear', etc.
  affiliate_partner TEXT NOT NULL, -- 'amazon', 'renogy', 'rvlife', etc.
  affiliate_product_id TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  review_text TEXT NOT NULL,
  verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  reviewer_name TEXT, -- For anonymous reviews or custom names
  reviewer_location TEXT,
  purchase_date DATE,
  usage_duration TEXT, -- "6 months", "1 year", etc.
  recommended BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false, -- For highlighting best reviews
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  moderator_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for customer reviews
CREATE POLICY "Users can view approved reviews" 
ON public.customer_reviews 
FOR SELECT 
USING (status = 'approved');

CREATE POLICY "Users can create their own reviews" 
ON public.customer_reviews 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending reviews" 
ON public.customer_reviews 
FOR UPDATE 
USING (auth.uid() = user_id AND status = 'pending');

-- Create indexes for performance
CREATE INDEX idx_customer_reviews_product_category ON public.customer_reviews(product_category);
CREATE INDEX idx_customer_reviews_affiliate_partner ON public.customer_reviews(affiliate_partner);
CREATE INDEX idx_customer_reviews_rating ON public.customer_reviews(rating);
CREATE INDEX idx_customer_reviews_featured ON public.customer_reviews(featured);
CREATE INDEX idx_customer_reviews_status ON public.customer_reviews(status);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_customer_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_customer_reviews_updated_at
BEFORE UPDATE ON public.customer_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_customer_reviews_updated_at();

-- Insert sample reviews for affiliate products
INSERT INTO public.customer_reviews (
  product_name, product_category, affiliate_partner, rating, title, review_text, 
  verified_purchase, reviewer_name, reviewer_location, usage_duration, featured, status
) VALUES 
(
  'Renogy 400W Solar Panel Kit', 'solar-equipment', 'renogy', 5,
  'Perfect for our RV adventures',
  'We installed this solar kit on our Class A motorhome and it has been fantastic. Powers our fridge, lights, and even the microwave during sunny days. Installation was straightforward with the included instructions.',
  true, 'Mike & Sarah J.', 'Arizona', '8 months', true, 'approved'
),
(
  'RV LIFE Trip Wizard', 'rv-apps', 'rvlife', 4,
  'Great trip planning but could use improvement',
  'Really helpful for planning our cross-country trip. The campground database is extensive and the route planning considers RV restrictions. Interface could be more intuitive but overall very useful.',
  true, 'Jennifer M.', 'Texas', '1 year', true, 'approved'
),
(
  'Emergency Roadside Kit', 'emergency-gear', 'amazon', 5,
  'Essential for every RVer',
  'This kit saved us when we had a flat tire in the middle of nowhere. Quality tools and everything you need for basic roadside repairs. Highly recommend for peace of mind.',
  true, 'Robert C.', 'Colorado', '6 months', true, 'approved'
);