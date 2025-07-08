-- Create content_analysis table for tracking affiliate content performance and optimization
CREATE TABLE public.content_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL, -- 'blog_post', 'product_page', 'review_section', 'affiliate_link'
  content_id TEXT NOT NULL, -- identifier for the specific content piece
  affiliate_partner TEXT NOT NULL, -- 'amazon', 'renogy', 'rvlife', etc.
  product_category TEXT NOT NULL, -- 'rv-apps', 'solar-equipment', 'emergency-gear', etc.
  page_url TEXT NOT NULL,
  seo_metrics JSONB DEFAULT '{
    "keyword_rankings": {},
    "organic_traffic": 0,
    "search_impressions": 0,
    "average_position": 0,
    "click_through_rate": 0
  }'::jsonb,
  engagement_metrics JSONB DEFAULT '{
    "page_views": 0,
    "unique_visitors": 0,
    "time_on_page": 0,
    "scroll_depth": 0,
    "bounce_rate": 0,
    "exit_rate": 0
  }'::jsonb,
  conversion_metrics JSONB DEFAULT '{
    "affiliate_clicks": 0,
    "conversion_rate": 0,
    "revenue_generated": 0,
    "cost_per_acquisition": 0,
    "return_on_investment": 0
  }'::jsonb,
  ab_test_data JSONB DEFAULT '{
    "test_variant": null,
    "test_results": {},
    "winning_variant": null,
    "confidence_level": 0
  }'::jsonb,
  optimization_score INTEGER DEFAULT 0 CHECK (optimization_score >= 0 AND optimization_score <= 100),
  recommendations TEXT[] DEFAULT ARRAY[]::TEXT[],
  performance_trend TEXT DEFAULT 'stable' CHECK (performance_trend IN ('improving', 'declining', 'stable')),
  last_analyzed TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE public.content_analysis ENABLE ROW LEVEL SECURITY;

-- Create policies for content analysis
CREATE POLICY "Anyone can view content analysis data" 
ON public.content_analysis 
FOR SELECT 
USING (true);

CREATE POLICY "System can insert content analysis data" 
ON public.content_analysis 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update content analysis data" 
ON public.content_analysis 
FOR UPDATE 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_content_analysis_affiliate_partner ON public.content_analysis(affiliate_partner);
CREATE INDEX idx_content_analysis_product_category ON public.content_analysis(product_category);
CREATE INDEX idx_content_analysis_content_type ON public.content_analysis(content_type);
CREATE INDEX idx_content_analysis_optimization_score ON public.content_analysis(optimization_score);
CREATE INDEX idx_content_analysis_last_analyzed ON public.content_analysis(last_analyzed);
CREATE UNIQUE INDEX idx_content_analysis_unique_content ON public.content_analysis(content_type, content_id, affiliate_partner);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_content_analysis_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_content_analysis_updated_at
BEFORE UPDATE ON public.content_analysis
FOR EACH ROW
EXECUTE FUNCTION public.update_content_analysis_updated_at();

-- Insert sample content analysis data for affiliate revenue optimization
INSERT INTO public.content_analysis (
  content_type, content_id, affiliate_partner, product_category, page_url,
  seo_metrics, engagement_metrics, conversion_metrics, optimization_score,
  recommendations, performance_trend
) VALUES 
(
  'blog_post', 'solar-power-guide', 'renogy', 'solar-equipment', '/solar-power-guide',
  '{"keyword_rankings": {"solar panels for RV": 3, "RV solar setup": 5}, "organic_traffic": 1250, "search_impressions": 15000, "average_position": 4.2, "click_through_rate": 8.3}'::jsonb,
  '{"page_views": 2150, "unique_visitors": 1890, "time_on_page": 245, "scroll_depth": 78, "bounce_rate": 25, "exit_rate": 30}'::jsonb,
  '{"affiliate_clicks": 127, "conversion_rate": 5.9, "revenue_generated": 890.50, "cost_per_acquisition": 12.50, "return_on_investment": 340}'::jsonb,
  85,
  ARRAY['Add more customer testimonials in the first section', 'Optimize affiliate link placement', 'Include comparison table'],
  'improving'
),
(
  'product_page', 'rv-apps-hub', 'rvlife', 'rv-apps', '/rv-apps-hub',
  '{"keyword_rankings": {"RV trip planning app": 2, "best RV apps": 7}, "organic_traffic": 890, "search_impressions": 12000, "average_position": 3.8, "click_through_rate": 7.4}'::jsonb,
  '{"page_views": 1650, "unique_visitors": 1420, "time_on_page": 180, "scroll_depth": 65, "bounce_rate": 35, "exit_rate": 40}'::jsonb,
  '{"affiliate_clicks": 95, "conversion_rate": 6.7, "revenue_generated": 425.30, "cost_per_acquisition": 8.90, "return_on_investment": 280}'::jsonb,
  72,
  ARRAY['Improve page load speed', 'Add video demonstrations', 'Include user reviews section'],
  'stable'
),
(
  'review_section', 'emergency-gear-reviews', 'amazon', 'emergency-gear', '/rv-emergency-center',
  '{"keyword_rankings": {"RV emergency kit": 4, "roadside assistance RV": 6}, "organic_traffic": 650, "search_impressions": 8500, "average_position": 5.1, "click_through_rate": 7.6}'::jsonb,
  '{"page_views": 980, "unique_visitors": 850, "time_on_page": 210, "scroll_depth": 82, "bounce_rate": 28, "exit_rate": 32}'::jsonb,
  '{"affiliate_clicks": 78, "conversion_rate": 9.2, "revenue_generated": 320.75, "cost_per_acquisition": 6.80, "return_on_investment": 420}'::jsonb,
  90,
  ARRAY['Feature more verified purchase badges', 'Add seasonal emergency preparedness content'],
  'improving'
);