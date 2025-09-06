-- Fix Security Definer View issues by removing problematic views
-- These views either use SECURITY DEFINER functions or bypass RLS policies

-- Remove storage_facilities_safe view which uses is_admin_or_moderator() 
-- (this acts like SECURITY DEFINER and is flagged by the linter)
DROP VIEW IF EXISTS public.storage_facilities_safe;

-- Remove storage_facilities_public view which may also be problematic
DROP VIEW IF EXISTS public.storage_facilities_public;

-- Keep storage_facilities_public_view as it's now secure (respects RLS policies)
-- and secure_spatial_ref_sys as it's a simple view without security definer functions

-- Note: The PostGIS system views (geography_columns, geometry_columns) that use 
-- has_table_privilege() are expected and required for spatial functionality.
-- These cannot be removed as they are part of the PostGIS extension.

-- Applications should use the secure RPC functions:
-- - get_public_facility_data() for anonymous/public access
-- - get_facility_details() for authenticated detailed access with role-based filtering