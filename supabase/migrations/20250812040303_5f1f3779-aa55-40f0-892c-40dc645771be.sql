-- Mitigate exposure: revoke all privileges from API roles on spatial_ref_sys
DO $$
BEGIN
  -- Ignore errors if roles don't have privileges
  BEGIN
    REVOKE ALL ON TABLE public.spatial_ref_sys FROM anon;
  EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN
    REVOKE ALL ON TABLE public.spatial_ref_sys FROM authenticated;
  EXCEPTION WHEN OTHERS THEN NULL; END;
END$$;

-- Harden role-check function: set search_path for SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  );
$$;