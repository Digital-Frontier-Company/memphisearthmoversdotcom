
-- Update David T's PIN to 7789
UPDATE public.drivers 
SET pin = '7789' 
WHERE name = 'David T' AND role = 'admin';
