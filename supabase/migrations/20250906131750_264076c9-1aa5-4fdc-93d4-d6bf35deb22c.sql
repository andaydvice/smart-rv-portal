-- Drop any remaining problematic views and recreate them safely

-- Drop existing safe views if they exist
DROP VIEW IF EXISTS public.safe_geometry_columns CASCADE;
DROP VIEW IF EXISTS public.safe_geography_columns CASCADE;

-- Create safe, non-security-definer views
CREATE VIEW public.safe_geometry_columns AS
SELECT 
    c.table_schema::text as f_table_schema,
    c.table_name::text as f_table_name,
    c.column_name::text as f_geometry_column,
    NULL::integer as coord_dimension,
    NULL::integer as srid,
    c.udt_name::text as type
FROM information_schema.columns c
WHERE c.udt_name = 'geometry'
AND c.table_schema = 'public';

-- Grant access to authenticated users only
GRANT SELECT ON public.safe_geometry_columns TO authenticated;

-- Create safe geography columns view  
CREATE VIEW public.safe_geography_columns AS
SELECT 
    c.table_schema::text as f_table_schema,
    c.table_name::text as f_table_name,
    c.column_name::text as f_geography_column,
    NULL::integer as coord_dimension,
    NULL::integer as srid,
    c.udt_name::text as type
FROM information_schema.columns c
WHERE c.udt_name = 'geography'
AND c.table_schema = 'public';

-- Grant access to authenticated users only
GRANT SELECT ON public.safe_geography_columns TO authenticated;