
CREATE OR REPLACE FUNCTION batch_insert_nevada_facilities()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Las Vegas Area Facilities
    INSERT INTO storage_facilities (
        name, address, city, state, zip_code,
        features, price_range, contact_phone, contact_email
    ) VALUES 
    (
        '24/7 Indigo Storage',
        '4465 W. Russell Road',
        'Las Vegas',
        'NV',
        '89118',
        '{"indoor": true, "24h_access": true, "security_system": true, "climate_controlled": true, "vehicle_washing": true}'::jsonb,
        '{"min": 250, "max": 450, "currency": "USD"}'::jsonb,
        '(702) 269-1900',
        'info@24-7indoorstorage.com'
    ),
    (
        'National Indoor RV Centers - Las Vegas',
        '5555 Polaris Ave',
        'Las Vegas',
        'NV',
        '89118',
        '{"indoor": true, "24h_access": true, "security_system": true, "climate_controlled": true, "vehicle_washing": true}'::jsonb,
        '{"min": 350, "max": 600, "currency": "USD"}'::jsonb,
        '(702) 269-1900',
        'info@nirvc.com'
    ),
    (
        'Love''s Storage Solutions',
        '1500 N 215 Blvd',
        'Las Vegas',
        'NV',
        '89115',
        '{"indoor": true, "24h_access": true, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
        '{"min": 0, "max": 0, "currency": "USD"}'::jsonb,
        '(702) 649-5683',
        null
    ),
    (
        '24/7 Motorcoach Indoor Storage',
        '3930 W. Windmill Lane #130-A',
        'Las Vegas',
        'NV',
        '89139',
        '{"indoor": true, "24h_access": false, "security_system": true, "climate_controlled": true, "vehicle_washing": true}'::jsonb,
        '{"min": 0, "max": 0, "currency": "USD"}'::jsonb,
        '(702) 296-1515',
        null
    ),
    (
        'All In One RV Boat Vehicle Storage',
        '3775 E Sahara Ave',
        'Las Vegas',
        'NV',
        '89104',
        '{"indoor": true, "24h_access": false, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
        '{"min": 0, "max": 0, "currency": "USD"}'::jsonb,
        null,
        null
    ),
    -- Reno Area
    (
        'North Valley Self Storage',
        '9900 N. Virginia Street',
        'Reno',
        'NV',
        '89506',
        '{"indoor": true, "24h_access": true, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
        '{"min": 150, "max": 200, "currency": "USD"}'::jsonb,
        '(775) 826-8777',
        'info@northvalleystoragereno.com'
    ),
    (
        'Caughlin Ranch Storage',
        '10555 N. McCarran Blvd.',
        'Reno',
        'NV',
        '89523',
        '{"indoor": true, "24h_access": true, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
        '{"min": 175, "max": 175, "currency": "USD"}'::jsonb,
        '(775) 826-8777',
        null
    ),
    (
        'Northwest Self Storage',
        '1000 N. McCarran Blvd.',
        'Reno',
        'NV',
        '89502',
        '{"indoor": true, "24h_access": true, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
        '{"min": 0, "max": 0, "currency": "USD"}'::jsonb,
        '(775) 322-7867',
        null
    ),
    -- Other Nevada Locations
    (
        'BAM RV & Boat Storage',
        '3649 Arrowhead Dr',
        'Carson City',
        'NV',
        '89706',
        '{"indoor": true, "24h_access": true, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
        '{"min": 525, "max": 750, "currency": "USD"}'::jsonb,
        '(775) 883-2267',
        'info@bamrvboatstorage.com'
    ),
    (
        'Sam''s RV Storage',
        '1700 W Lake Mead Pkwy',
        'Henderson',
        'NV',
        '89015',
        '{"indoor": true, "24h_access": true, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
        '{"min": 150, "max": 150, "currency": "USD"}'::jsonb,
        '(702) 269-1900',
        null
    ),
    (
        'Elko East Mini Storage',
        '1000 E. Idaho St.',
        'Elko',
        'NV',
        '89801',
        '{"indoor": true, "24h_access": true, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
        '{"min": 0, "max": 0, "currency": "USD"}'::jsonb,
        '(775) 738-7867',
        null
    ),
    (
        'Elite Storage & RV – Elko',
        '1500 Opal Dr',
        'Elko',
        'NV',
        '89801',
        '{"indoor": true, "24h_access": false, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
        '{"min": 0, "max": 0, "currency": "USD"}'::jsonb,
        null,
        null
    )
    ON CONFLICT (name, address) DO NOTHING;
END;
$$;

-- Execute the function
SELECT batch_insert_nevada_facilities();
