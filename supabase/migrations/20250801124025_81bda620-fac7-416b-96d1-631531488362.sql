-- Clean up only today's duplicate drivers while preserving all drivers with time entry history
-- Keep all drivers that have any time entries, regardless of when they were created

-- First, delete today's duplicates for names that already exist in historical data
DELETE FROM public.drivers 
WHERE created_at >= '2025-08-01'::date 
AND name IN (
  SELECT DISTINCT d.name 
  FROM public.drivers d
  JOIN public.time_entries te ON d.id = te.driver_id
  WHERE d.created_at < '2025-08-01'::date
);

-- Then clean up remaining duplicates from today, keeping only one of each
DELETE FROM public.drivers a
WHERE created_at >= '2025-08-01'::date
AND EXISTS (
  SELECT 1 FROM public.drivers b
  WHERE b.name = a.name 
  AND b.created_at >= '2025-08-01'::date
  AND b.id < a.id  -- Keep the one with smaller ID (created first)
);