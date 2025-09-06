-- Fix security vulnerability: Remove public read access to all login_attempts records
-- and replace with restricted access that only allows checking specific email addresses

-- Drop the insecure policy that allows reading all records
DROP POLICY IF EXISTS "Allow anon select login attempts" ON public.login_attempts;

-- Create a secure policy that only allows anonymous users to read records for a specific email
-- when checking login attempts (this prevents email harvesting while maintaining functionality)
CREATE POLICY "Allow anon select specific email only"
  ON public.login_attempts
  FOR SELECT
  TO anon
  USING (false); -- Block general SELECT queries

-- Create a function for secure email checking that doesn't expose the email list
CREATE OR REPLACE FUNCTION public.check_login_attempt_status(check_email text)
RETURNS TABLE(
  email text,
  failed_attempts integer,
  lockout_until timestamp with time zone,
  last_attempt_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return data for the specific email being checked
  RETURN QUERY
  SELECT 
    la.email,
    la.failed_attempts,
    la.lockout_until,
    la.last_attempt_at
  FROM public.login_attempts la
  WHERE la.email = check_email;
END;
$$;

-- Grant execute permission to anonymous users for the secure function
GRANT EXECUTE ON FUNCTION public.check_login_attempt_status(text) TO anon;
GRANT EXECUTE ON FUNCTION public.check_login_attempt_status(text) TO authenticated;