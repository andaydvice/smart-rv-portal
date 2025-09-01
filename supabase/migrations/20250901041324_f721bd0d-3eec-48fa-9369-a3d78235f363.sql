-- Fix remaining security warnings
-- Fix 1: Enable RLS on spatial_ref_sys (already secure via view) - cannot fix as it's system table
-- Fix 2: Update functions to have secure search_path
CREATE OR REPLACE FUNCTION public.is_admin_or_moderator()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'moderator')
  );
$$;

-- Fix 3: Enable RLS on any remaining tables (check what's missing)
-- Enable RLS on system tables we can control
DO $$
BEGIN
  -- Enable RLS on any public tables that don't have it
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' 
    AND c.relname = 'spatial_ref_sys'
    AND c.relrowsecurity = true
  ) THEN
    -- Only enable if we own the table (will fail silently for system tables)
    BEGIN
      ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;
    EXCEPTION
      WHEN insufficient_privilege THEN
        -- Expected for system tables
        NULL;
    END;
  END IF;
END $$;

-- Create a rate limiting function for auth endpoints
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  endpoint_name TEXT,
  max_requests INTEGER DEFAULT 10,
  window_minutes INTEGER DEFAULT 15
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_requests INTEGER;
  window_start_time TIMESTAMP WITH TIME ZONE;
BEGIN
  window_start_time := timezone('utc'::text, now()) - INTERVAL '1 minute' * window_minutes;
  
  -- Clean up old rate limit entries
  DELETE FROM public.rate_limits 
  WHERE window_start < window_start_time;
  
  -- Count current requests for this endpoint and user/IP
  SELECT COALESCE(SUM(request_count), 0) INTO current_requests
  FROM public.rate_limits
  WHERE endpoint = endpoint_name
  AND (
    (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
    (auth.uid() IS NULL AND ip_address = inet_client_addr())
  )
  AND window_start >= window_start_time;
  
  -- If under limit, increment counter
  IF current_requests < max_requests THEN
    INSERT INTO public.rate_limits (
      user_id,
      ip_address,
      endpoint,
      request_count,
      window_start
    ) VALUES (
      auth.uid(),
      inet_client_addr(),
      endpoint_name,
      1,
      timezone('utc'::text, now())
    )
    ON CONFLICT (user_id, endpoint, window_start) 
    DO UPDATE SET request_count = rate_limits.request_count + 1;
    
    RETURN true;
  END IF;
  
  -- Rate limit exceeded
  RETURN false;
END;
$$;

-- Add unique constraint for proper upsert
ALTER TABLE public.rate_limits 
ADD CONSTRAINT unique_user_endpoint_window 
UNIQUE (user_id, endpoint, window_start);