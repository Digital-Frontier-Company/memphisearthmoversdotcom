
-- Create a new admin user named "admin" with PIN 7789
INSERT INTO public.drivers (name, pin, role, active, hourly_rate) 
VALUES ('admin', '7789', 'admin', true, 0.00)
ON CONFLICT (name) DO UPDATE SET 
  pin = EXCLUDED.pin,
  role = EXCLUDED.role,
  active = EXCLUDED.active;
