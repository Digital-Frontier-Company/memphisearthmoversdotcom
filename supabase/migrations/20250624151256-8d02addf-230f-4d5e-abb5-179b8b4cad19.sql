
-- Update Transportation RM Inc's PIN to 1234
UPDATE public.drivers 
SET pin = '1234' 
WHERE name = 'Transportation RM Inc';

-- Ensure the driver is active
UPDATE public.drivers 
SET active = true 
WHERE name = 'Transportation RM Inc';
