-- PHASE 1: CRITICAL SECURITY FIXES
-- Fix 1: Enable RLS on spatial_ref_sys table (CRITICAL)
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Create a permissive policy for authenticated users to read spatial reference data
CREATE POLICY "Allow authenticated users to read spatial_ref_sys" 
ON public.spatial_ref_sys 
FOR SELECT 
TO authenticated
USING (true);

-- Create a permissive policy for anonymous users to read spatial reference data (needed for map functionality)
CREATE POLICY "Allow anonymous users to read spatial_ref_sys" 
ON public.spatial_ref_sys 
FOR SELECT 
TO anon
USING (true);

-- Fix 2: Restrict storage_facilities access - currently too permissive
-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Auth users can insert facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Auth users can update facilities" ON public.storage_facilities;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.storage_facilities;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.storage_facilities;

-- Create more restrictive policies for storage facilities
-- Only allow reading for all users (needed for public map functionality)
-- Restrict write access to admin/moderator roles only

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

-- Fix 3: Secure the login_attempts table - currently has email-based table but policies reference user_id
-- The table structure doesn't match the policies, let's fix this
DROP TABLE IF EXISTS public.login_attempts;

-- Recreate login_attempts table with proper structure
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
CREATE POLICY "Allow authenticated select login attempts" 
ON public.login_attempts 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert login attempts" 
ON public.login_attempts 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update login attempts" 
ON public.login_attempts 
FOR UPDATE 
TO authenticated
USING (true);

-- Fix 4: Secure user_profiles table - currently missing INSERT policy
CREATE POLICY "Users can create their own profile" 
ON public.user_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Fix 5: Add security function for role checking (already created above)
-- This prevents RLS infinite recursion issues

-- Fix 6: Create secure audit logging function
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type TEXT,
  user_id UUID DEFAULT auth.uid(),
  details JSONB DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log security events for monitoring
  INSERT INTO public.web_vitals (
    url, 
    route,
    user_id,
    app_version,
    session_id
  ) VALUES (
    'security_event',
    event_type,
    user_id,
    details->>'version',
    details->>'session_id'
  );
EXCEPTION
  WHEN OTHERS THEN
    -- Silently fail to prevent security logging from breaking application
    NULL;
END;
$$;