
-- Set all existing drivers to active status
UPDATE public.drivers 
SET active = true 
WHERE active IS NULL OR active = false;
