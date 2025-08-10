-- Create table for real-user web vitals
CREATE TABLE IF NOT EXISTS public.web_vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id UUID NULL,
  session_id TEXT NULL,
  url TEXT NOT NULL,
  route TEXT NULL,
  referrer TEXT NULL,
  lcp_ms INTEGER NULL,
  inp_ms INTEGER NULL,
  cls NUMERIC(6,3) NULL,
  fcp_ms INTEGER NULL,
  ttfb_ms INTEGER NULL,
  nav_type TEXT NULL,
  is_soft_nav BOOLEAN NULL,
  device_memory NUMERIC NULL,
  hardware_concurrency INTEGER NULL,
  effective_type TEXT NULL,
  downlink NUMERIC NULL,
  rtt INTEGER NULL,
  viewport_w INTEGER NULL,
  viewport_h INTEGER NULL,
  user_agent TEXT NULL,
  sample_rate NUMERIC NULL,
  build_id TEXT NULL,
  app_version TEXT NULL
);

-- Enable RLS
ALTER TABLE public.web_vitals ENABLE ROW LEVEL SECURITY;

-- Policies: allow anonymous inserts, allow reads for everyone
CREATE POLICY "Allow anonymous inserts for web vitals"
ON public.web_vitals
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow read access to web vitals"
ON public.web_vitals
FOR SELECT
TO anon, authenticated
USING (true);

-- Helpful index for route/time analytics
CREATE INDEX IF NOT EXISTS idx_web_vitals_route_time ON public.web_vitals (route, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_web_vitals_created_at ON public.web_vitals (created_at DESC);
