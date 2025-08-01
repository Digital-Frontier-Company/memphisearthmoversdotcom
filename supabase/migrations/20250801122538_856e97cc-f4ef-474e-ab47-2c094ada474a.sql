-- Create three driver profiles: Rico, Derek (drivers) and David (admin)
INSERT INTO public.drivers (name, pin, hourly_rate, role, active, pin_reset_required) 
VALUES 
  ('Rico', '1234', 26.00, 'driver', true, false),
  ('Derek', '5678', 22.00, 'driver', true, false),
  ('David', '0000', 30.00, 'admin', true, false);