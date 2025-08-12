BEGIN;

-- 1) Business Contact Information: restrict anon from sensitive columns
REVOKE ALL ON TABLE public.storage_facilities FROM PUBLIC, anon, authenticated;

-- Allow reads for both roles at table level
GRANT SELECT ON TABLE public.storage_facilities TO anon;
GRANT SELECT ON TABLE public.storage_facilities TO authenticated;

-- Remove access to sensitive columns for anon (kept for authenticated)
REVOKE SELECT (contact_email, contact_phone) ON TABLE public.storage_facilities FROM anon;

COMMIT;

-- 2) Pin function search_path for security-definer functions
ALTER FUNCTION IF EXISTS public.has_role(uuid, public.app_role) SET search_path TO public;
ALTER FUNCTION IF EXISTS public.has_role(uuid, public.app_role) SECURITY DEFINER;
ALTER FUNCTION IF EXISTS public.update_updated_at_column() SET search_path TO public;

-- 3) Lock down spatial reference metadata exposure
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