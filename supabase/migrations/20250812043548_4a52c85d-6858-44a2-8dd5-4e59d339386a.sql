-- Security hardening migration to address linter warnings
DO $$ BEGIN
  -- 1) Business Contact Information: restrict columns for anon, allow full for authenticated
  -- Revoke any existing broad grants first
  EXECUTE 'REVOKE ALL ON TABLE public.storage_facilities FROM PUBLIC, anon, authenticated';

  -- Grant anon only non-sensitive columns (no contact_email/contact_phone)
  EXECUTE $$GRANT SELECT (
    id,
    name,
    description,
    address,
    city,
    state,
    zip_code,
    latitude,
    longitude,
    website_url,
    images,
    features,
    amenities,
    availability,
    business_hours,
    price_range,
    security_details,
    insurance_requirements,
    additional_services,
    verified_fields,
    avg_rating,
    review_count,
    cancellation_policy,
    created_at,
    updated_at
  ) ON public.storage_facilities TO anon$$;

  -- Grant authenticated everything anon has plus contact details
  EXECUTE $$GRANT SELECT (
    id,
    name,
    description,
    address,
    city,
    state,
    zip_code,
    latitude,
    longitude,
    website_url,
    images,
    features,
    amenities,
    availability,
    business_hours,
    price_range,
    security_details,
    insurance_requirements,
    additional_services,
    verified_fields,
    avg_rating,
    review_count,
    cancellation_policy,
    created_at,
    updated_at,
    contact_email,
    contact_phone
  ) ON public.storage_facilities TO authenticated$$;

EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'Table public.storage_facilities not found; skipping grants';
END $$;

-- 2) Pin function search_path for security-definer functions
DO $$ BEGIN
  -- has_role(uuid, app_role)
  EXECUTE 'ALTER FUNCTION IF EXISTS public.has_role(uuid, public.app_role) SET search_path = ''public''';
  EXECUTE 'ALTER FUNCTION IF EXISTS public.has_role(uuid, public.app_role) SECURITY DEFINER';
EXCEPTION WHEN undefined_function THEN
  RAISE NOTICE 'Function public.has_role not found; skipping';
END $$;

DO $$ BEGIN
  -- update_updated_at_column() (if present)
  EXECUTE 'ALTER FUNCTION IF EXISTS public.update_updated_at_column() SET search_path = ''public''';
EXCEPTION WHEN undefined_function THEN
  RAISE NOTICE 'Function public.update_updated_at_column not found; skipping';
END $$;

-- 3) Lock down spatial reference metadata exposure
DO $$ BEGIN
  EXECUTE 'ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY';
  EXECUTE 'REVOKE ALL ON TABLE public.spatial_ref_sys FROM PUBLIC, anon, authenticated';
EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'Table public.spatial_ref_sys not found; skipping';
END $$;

DO $$ BEGIN
  EXECUTE 'ALTER TABLE public.app_spatial_ref_sys ENABLE ROW LEVEL SECURITY';
  -- Drop permissive policy if present
  EXECUTE 'DROP POLICY IF EXISTS "allow_read" ON public.app_spatial_ref_sys';
  -- Create restricted read policy for admins/moderators only
  EXECUTE $$CREATE POLICY "Admins and moderators can read app_spatial_ref_sys"
    ON public.app_spatial_ref_sys
    FOR SELECT
    TO authenticated
    USING (
      public.has_role(auth.uid(), ''admin''::app_role)
      OR public.has_role(auth.uid(), ''moderator''::app_role)
    )$$;
EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'Table public.app_spatial_ref_sys not found; skipping';
END $$;