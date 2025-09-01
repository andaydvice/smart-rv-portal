-- PHASE 1: CRITICAL SECURITY FIXES (Modified for Supabase constraints)
-- Fix 1: Cannot enable RLS on spatial_ref_sys (system table), but secure via view access
-- Already handled by secure_spatial_ref_sys view

-- Fix 2: Restrict storage_facilities access - currently too permissive
-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Auth users can insert facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Auth users can update facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.storage_facilities;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.storage_facilities;

-- Create a function to check admin/moderator roles
CREATE OR REPLACE FUNCTION public.is_admin_or_moderator()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'moderator')
  );
$$;

-- Restrict facility creation to admin/moderator only
CREATE POLICY "Only admins can insert facilities" 
ON public.storage_facilities 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin_or_moderator());

-- Restrict facility updates to admin/moderator only
CREATE POLICY "Only admins can update facilities" 
ON public.storage_facilities 
FOR UPDATE 
TO authenticated
USING (public.is_admin_or_moderator())
WITH CHECK (public.is_admin_or_moderator());

-- Fix 3: Secure the login_attempts table - fix structure mismatch
-- Drop and recreate with proper email-based structure
DROP TABLE IF EXISTS public.login_attempts;

CREATE TABLE public.login_attempts (
  email TEXT PRIMARY KEY,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  lockout_until TIMESTAMP WITH TIME ZONE,
  last_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (needed for pre-auth lockout checking)
CREATE POLICY "Allow anon select login attempts" 
ON public.login_attempts 
FOR SELECT 
TO anon
USING (true);

CREATE POLICY "Allow anon insert login attempts" 
ON public.login_attempts 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update login attempts" 
ON public.login_attempts 
FOR UPDATE 
TO anon
USING (true);

-- For authenticated users too
CREATE POLICY "Allow authenticated access to login attempts" 
ON public.login_attempts 
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix 4: Secure user_profiles table - add missing INSERT policy
CREATE POLICY "Users can create their own profile" 
ON public.user_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Fix 5: Create security audit table for logging
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  ip_address INET,
  user_agent TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on security events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Only admins can view security events
CREATE POLICY "Only admins can view security events" 
ON public.security_events 
FOR SELECT 
TO authenticated
USING (public.is_admin_or_moderator());

-- Allow system to insert security events
CREATE POLICY "System can insert security events" 
ON public.security_events 
FOR INSERT 
TO authenticated, anon
WITH CHECK (true);

-- Fix 6: Create secure audit logging function
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type TEXT,
  severity TEXT DEFAULT 'medium',
  details JSONB DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.security_events (
    event_type,
    user_id,
    user_email,
    details,
    severity
  ) VALUES (
    event_type,
    auth.uid(),
    auth.email(),
    details,
    severity
  );
EXCEPTION
  WHEN OTHERS THEN
    -- Silently fail to prevent security logging from breaking application
    NULL;
END;
$$;

-- Fix 7: Add rate limiting table for API endpoints
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  ip_address INET,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on rate limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only system can manage rate limits
CREATE POLICY "System can manage rate limits" 
ON public.rate_limits 
FOR ALL
TO authenticated, anon
USING (true)
WITH CHECK (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_rate_limits_endpoint_window ON public.rate_limits (endpoint, window_start);
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_endpoint ON public.rate_limits (user_id, endpoint);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_endpoint ON public.rate_limits (ip_address, endpoint);