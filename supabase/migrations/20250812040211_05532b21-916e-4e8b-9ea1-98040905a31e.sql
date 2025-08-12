-- Enable RLS on spatial_ref_sys to satisfy linter and harden exposure
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

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