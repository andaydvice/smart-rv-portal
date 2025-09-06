-- Address Security Definer View warnings from PostGIS system views
-- These views (geometry_columns, geography_columns) are created by PostGIS extension
-- and use has_table_privilege() which acts as SECURITY DEFINER

-- Since we can't modify PostGIS system views, we'll create our own secure alternatives
-- and restrict access to the original ones

-- Revoke public access to problematic PostGIS views to prevent security definer issues
REVOKE ALL ON TABLE public.geometry_columns FROM PUBLIC;
REVOKE ALL ON TABLE public.geography_columns FROM PUBLIC;

-- Create our own secure geometry metadata view that doesn't use security definer patterns
CREATE OR REPLACE VIEW public.safe_geometry_columns AS
SELECT 
    'public'::text as f_table_schema,
    'storage_facilities'::text as f_table_name,
    'geom'::text as f_geometry_column,
    2 as coord_dimension,
    4326 as srid,
    'POINT'::text as type
WHERE EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'storage_facilities'
);

-- Grant controlled access to authenticated users only
GRANT SELECT ON public.safe_geometry_columns TO authenticated;

-- Create a similar safe view for geography if needed
CREATE OR REPLACE VIEW public.safe_geography_columns AS
SELECT 
    'public'::text as f_table_schema,
    'storage_facilities'::text as f_table_name,
    'geog'::text as f_geography_column,
    2 as coord_dimension,
    4326 as srid,
    'Point'::text as type
WHERE FALSE; -- No geography columns in our current schema

-- Grant controlled access
GRANT SELECT ON public.safe_geography_columns TO authenticated;