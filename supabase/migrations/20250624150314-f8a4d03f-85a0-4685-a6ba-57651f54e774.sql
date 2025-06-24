
-- Update Derek Jackson's PIN to 1234
UPDATE public.drivers 
SET pin = '1234' 
WHERE name = 'Derek Jackson';

-- Update Transportation RM Inc's PIN to 4321
UPDATE public.drivers 
SET pin = '4321' 
WHERE name = 'Transportation RM Inc';
