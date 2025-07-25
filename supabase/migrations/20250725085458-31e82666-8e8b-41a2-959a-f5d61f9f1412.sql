-- Phase 1: Fix Critical Login Attempts Schema and Security Issues

-- First, drop the existing login_attempts table since it has fundamental security flaws
DROP TABLE IF EXISTS public.login_attempts CASCADE;

-- Recreate login_attempts table with proper schema matching the code expectations
CREATE TABLE public.login_attempts (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  failed_attempts integer NOT NULL DEFAULT 0,
  lockout_until timestamp with time zone,
  last_attempt_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (user_id)
);

-- Enable Row Level Security 
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Create secure RLS policies - users can only access their own login attempts
CREATE POLICY "Users can view their own login attempts"
  ON public.login_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own login attempts"
  ON public.login_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own login attempts"
  ON public.login_attempts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_login_attempts_user_id ON public.login_attempts(user_id);
CREATE INDEX idx_login_attempts_lockout_until ON public.login_attempts(lockout_until) WHERE lockout_until IS NOT NULL;