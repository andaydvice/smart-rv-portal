
-- Add unique constraint on name and address
ALTER TABLE storage_facilities
ADD CONSTRAINT unique_name_address UNIQUE (name, address);

-- Now insert the facilities
INSERT INTO storage_facilities (
    name, address, city, state, zip_code,
    features, price_range, contact_phone, contact_email
) VALUES 
(
    'Sunrise Boat & RV Storage',
    '5925 East Lake Mead Boulevard',
    'Las Vegas',
    'NV',
    '89156',
    '{"indoor": true, "24h_access": false, "security_system": true, "climate_controlled": false, "vehicle_washing": false}'::jsonb,
    '{"min": 162, "max": 162, "currency": "USD"}'::jsonb,
    '(702) 438-6655',
    null
),
(
    'Silver Lake Boat, Car & RV Storage',
    '9985 Moya Blvd',
    'Reno',
    'NV',
    '89506',
    '{"indoor": true, "24h_access": false, "security_system": true, "climate_controlled": true, "vehicle_washing": false}'::jsonb,
    '{"min": 0, "max": 0, "currency": "USD"}'::jsonb,
    '(775) 342-3334',
    'info@slboatstorage.com'
),
(
    'Longley Corners RV & Boat Storage',
    '5255 Longley Lane #150',
    'Reno',
    'NV',
    '89511',
    '{"indoor": true, "24h_access": false, "security_system": true, "climate_controlled": true, "vehicle_washing": true}'::jsonb,
    '{"min": 231, "max": 1900, "currency": "USD"}'::jsonb,
    '(775) 828-5255',
    'linda@longleycorners.com'
)
ON CONFLICT (name, address) DO NOTHING;

