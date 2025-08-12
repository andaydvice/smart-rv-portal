
-- 1) Protect sensitive business contact data (storage_facilities)
begin;

-- Remove any broad table grants
REVOKE ALL ON TABLE public.storage_facilities FROM anon, authenticated;

-- Grant anon only the non-sensitive columns (everything except contact_email/contact_phone)
GRANT SELECT (
  zip_code,
  city,
  name,
  address,
  review_count,
  additional_services,
  dimensions,
  availability,
  amenities,
  verified_fields,
  avg_rating,
  security_details,
  insurance_requirements,
  latitude,
  id,
  business_hours,
  images,
  website_url,
  cancellation_policy,
  description,
  state,
  updated_at,
  created_at,
  price_range,
  features,
  longitude
) ON public.storage_facilities TO anon;

-- Grant authenticated the same columns plus contact details
GRANT SELECT (
  zip_code,
  city,
  name,
  address,
  review_count,
  additional_services,
  dimensions,
  availability,
  amenities,
  verified_fields,
  avg_rating,
  security_details,
  insurance_requirements,
  latitude,
  id,
  business_hours,
  images,
  website_url,
  cancellation_policy,
  description,
  contact_email,
  contact_phone,
  state,
  updated_at,
  created_at,
  price_range,
  features,
  longitude
) ON public.storage_facilities TO authenticated;

commit;

-- 2) Pin function search_path for the only custom function still mutable
alter function public.update_updated_at_column() SET search_path TO 'public';

-- 3) Lock down spatial reference metadata

-- 3a) Prevent exposure of extension table via API
-- Enable RLS so it’s not flagged by the linter (table will have no policies -> no access)
alter table public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- Ensure app roles can’t read it via table privileges either
REVOKE ALL ON TABLE public.spatial_ref_sys FROM anon, authenticated;

-- 3b) Restrict reads on app_spatial_ref_sys to privileged users only
alter table public.app_spatial_ref_sys ENABLE ROW LEVEL SECURITY;

drop policy if exists "allow_read" on public.app_spatial_ref_sys;

create policy "Admins and moderators can read app_spatial_ref_sys"
on public.app_spatial_ref_sys
for select
to authenticated
using (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'moderator'::app_role)
);
