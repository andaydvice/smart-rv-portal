-- Restrict public read access to user_profiles and allow only owners (and admins) to read
-- Ensure RLS is enabled
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.user_profiles;

-- Allow users to view only their own profile
CREATE POLICY "Users can view their own profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow admins to view all profiles (uses existing has_role function)
CREATE POLICY "Admins can view all profiles"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));