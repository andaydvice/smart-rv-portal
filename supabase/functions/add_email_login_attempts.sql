
-- Update login_attempts table to use email as the primary key
CREATE TABLE IF NOT EXISTS public.login_attempts (
  email TEXT PRIMARY KEY,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  lockout_until TIMESTAMP WITH TIME ZONE,
  last_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security if it's not already enabled
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies
DROP POLICY IF EXISTS "Users can view their own login attempts" ON public.login_attempts;
DROP POLICY IF EXISTS "Users can update their own login attempts" ON public.login_attempts;
DROP POLICY IF EXISTS "Users can insert their own login attempts" ON public.login_attempts;

-- Create new policies that allow public access (since we're tracking before auth)
CREATE POLICY "Allow anon insert"
  ON public.login_attempts
  FOR INSERT
  TO anon
  WITH CHECK (true);
  
CREATE POLICY "Allow anon select"
  ON public.login_attempts
  FOR SELECT
  TO anon
  USING (true);
  
CREATE POLICY "Allow anon update"
  ON public.login_attempts
  FOR UPDATE
  TO anon
  USING (true);
  
-- For authenticated users too
CREATE POLICY "Allow authenticated insert"
  ON public.login_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
  
CREATE POLICY "Allow authenticated select"
  ON public.login_attempts
  FOR SELECT
  TO authenticated
  USING (true);
  
CREATE POLICY "Allow authenticated update"
  ON public.login_attempts
  FOR UPDATE
  TO authenticated
  USING (true);
