-- Clear all login attempts for andrew@andrewredwards.com
DELETE FROM login_attempts WHERE email = 'andrew@andrewredwards.com';

-- Also clear any other potential blocking records
DELETE FROM login_attempts WHERE created_at < NOW() - INTERVAL '1 hour';