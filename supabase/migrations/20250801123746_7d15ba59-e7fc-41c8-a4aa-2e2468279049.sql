-- Clean up duplicate drivers, keeping only the most recent ones
-- First, let's see what we have and clean up duplicates

-- Delete duplicate Rico entries (keep the most recent one)
DELETE FROM public.drivers 
WHERE name = 'Rico' 
AND id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY created_at DESC) as rn
    FROM public.drivers 
    WHERE name = 'Rico'
  ) t WHERE rn = 1
);

-- Delete duplicate Derek entries (keep the most recent one)
DELETE FROM public.drivers 
WHERE name = 'Derek' 
AND id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY created_at DESC) as rn
    FROM public.drivers 
    WHERE name = 'Derek'
  ) t WHERE rn = 1
);

-- Delete duplicate David entries (keep the most recent one)
DELETE FROM public.drivers 
WHERE name = 'David' 
AND id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY created_at DESC) as rn
    FROM public.drivers 
    WHERE name = 'David'
  ) t WHERE rn = 1
);

-- Delete any other test users we don't need
DELETE FROM public.drivers 
WHERE name IN ('admin', 'David T', 'Derek Jackson', 'Transportation RM INC');

-- Update the remaining drivers to have the correct PINs
UPDATE public.drivers 
SET pin = '1234', hourly_rate = 26.00 
WHERE name = 'Rico';

UPDATE public.drivers 
SET pin = '5678', hourly_rate = 22.00 
WHERE name = 'Derek';

UPDATE public.drivers 
SET pin = '0000', hourly_rate = 30.00, role = 'admin' 
WHERE name = 'David';