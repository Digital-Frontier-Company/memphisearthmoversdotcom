-- Only delete duplicate drivers created today that have no time entries
-- Keep all drivers that have historical time entries

-- Delete only the newer duplicates created today (keep the older drivers with history)
DELETE FROM public.drivers 
WHERE created_at >= '2025-08-01'::date 
AND id NOT IN (
  -- Keep one of each name from today's entries, but only if there are no older drivers with the same name who have time entries
  SELECT DISTINCT ON (d.name) d.id
  FROM public.drivers d
  LEFT JOIN public.time_entries te ON d.driver_id = te.driver_id
  WHERE d.created_at >= '2025-08-01'::date
  ORDER BY d.name, d.created_at ASC
)
AND name NOT IN (
  -- Don't delete if there's an older driver with the same name who has time entries
  SELECT DISTINCT d.name 
  FROM public.drivers d
  JOIN public.time_entries te ON d.id = te.driver_id
  WHERE d.created_at < '2025-08-01'::date
);

-- If we still have duplicates of names that exist in historical data, remove the new ones
DELETE FROM public.drivers 
WHERE created_at >= '2025-08-01'::date
AND name IN ('Derek', 'David')  -- These names exist in historical data
AND name IN (
  SELECT d.name 
  FROM public.drivers d
  JOIN public.time_entries te ON d.id = te.driver_id
  WHERE d.created_at < '2025-08-01'::date
);