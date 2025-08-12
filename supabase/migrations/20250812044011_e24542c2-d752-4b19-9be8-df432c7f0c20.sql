-- Step 1: Column-level protection for storage_facilities
BEGIN;
  REVOKE ALL ON TABLE public.storage_facilities FROM PUBLIC, anon, authenticated;
  GRANT SELECT ON TABLE public.storage_facilities TO anon;
  GRANT SELECT ON TABLE public.storage_facilities TO authenticated;
  REVOKE SELECT (contact_email, contact_phone) ON TABLE public.storage_facilities FROM anon;
COMMIT;

-- Step 2: Pin search_path for security-definer functions with error-safe guards
DO $$
BEGIN
  BEGIN
    ALTER FUNCTION public.has_role(uuid, public.app_role) SET search_path = 'public';
    ALTER FUNCTION public.has_role(uuid, public.app_role) SECURITY DEFINER;
  EXCEPTION WHEN undefined_function THEN
    RAISE NOTICE 'Function public.has_role(uuid, app_role) not found; skipping';
  END;

  BEGIN
    ALTER FUNCTION public.update_updated_at_column() SET search_path = 'public';
  EXCEPTION WHEN undefined_function THEN
    RAISE NOTICE 'Function public.update_updated_at_column() not found; skipping';
  END;
END$$;

-- Step 3: Lock down spatial reference metadata
ALTER TABLE IF EXISTS public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.spatial_ref_sys FROM PUBLIC, anon, authenticated;

ALTER TABLE IF EXISTS public.app_spatial_ref_sys ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "allow_read" ON public.app_spatial_ref_sys;
CREATE POLICY "Admins and moderators can read app_spatial_ref_sys"
  ON public.app_spatial_ref_sys
  FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'moderator'::app_role)
  );