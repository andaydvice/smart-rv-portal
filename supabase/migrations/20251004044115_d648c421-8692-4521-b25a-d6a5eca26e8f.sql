-- Add first_name column to newsletter_subscribers table
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN first_name text;

-- Create tool_usage_metrics table for tracking tool usage
CREATE TABLE public.tool_usage_metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email text,
  tool_id text NOT NULL,
  tool_name text NOT NULL,
  query_count integer NOT NULL DEFAULT 1,
  completion_status text DEFAULT 'in_progress',
  time_spent_seconds integer DEFAULT 0,
  first_used_at timestamp with time zone NOT NULL DEFAULT timezone('utc', now()),
  last_used_at timestamp with time zone NOT NULL DEFAULT timezone('utc', now()),
  converted_to_subscriber boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc', now())
);

-- Enable RLS on tool_usage_metrics
ALTER TABLE public.tool_usage_metrics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert their own metrics
CREATE POLICY "Allow anonymous insert tool metrics"
ON public.tool_usage_metrics
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anonymous users to update their own metrics based on email
CREATE POLICY "Allow anonymous update own tool metrics"
ON public.tool_usage_metrics
FOR UPDATE
TO anon
USING (user_email = current_setting('request.headers', true)::json->>'user-email')
WITH CHECK (user_email = current_setting('request.headers', true)::json->>'user-email');

-- Admins can view all metrics
CREATE POLICY "Admins can view all tool metrics"
ON public.tool_usage_metrics
FOR SELECT
TO authenticated
USING (is_admin_or_moderator());

-- Create index for faster email lookups
CREATE INDEX idx_tool_usage_metrics_email ON public.tool_usage_metrics(user_email);
CREATE INDEX idx_tool_usage_metrics_tool_id ON public.tool_usage_metrics(tool_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_tool_usage_metrics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tool_usage_metrics_timestamp
BEFORE UPDATE ON public.tool_usage_metrics
FOR EACH ROW
EXECUTE FUNCTION public.update_tool_usage_metrics_updated_at();