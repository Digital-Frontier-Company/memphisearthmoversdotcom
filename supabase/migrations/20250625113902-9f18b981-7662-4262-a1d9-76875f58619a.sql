
-- First, clean up any weekly_earnings records for duplicate David T entries
-- Keep only the weekly_earnings for the admin David T entry
WITH duplicate_davids AS (
  SELECT id 
  FROM public.drivers 
  WHERE name = 'David T' 
  AND id NOT IN (
    SELECT id 
    FROM public.drivers 
    WHERE name = 'David T' AND role = 'admin'
    ORDER BY created_at ASC
    LIMIT 1
  )
)
DELETE FROM public.weekly_earnings 
WHERE driver_id IN (SELECT id FROM duplicate_davids);

-- Now safely delete any duplicate David T entries
DELETE FROM public.drivers 
WHERE name = 'David T' 
AND id NOT IN (
  SELECT id 
  FROM public.drivers 
  WHERE name = 'David T' AND role = 'admin'
  ORDER BY created_at ASC
  LIMIT 1
);

-- Ensure the remaining David T entry has the correct settings
UPDATE public.drivers 
SET pin = '1234', 
    role = 'admin', 
    active = true,
    hourly_rate = 0.00
WHERE name = 'David T';

-- Create a comprehensive view for admin dashboard that shows all driver data
CREATE OR REPLACE VIEW admin_driver_overview AS
SELECT 
  d.id,
  d.name,
  d.pin,
  d.hourly_rate,
  d.truck_assigned,
  d.phone,
  d.email,
  d.active,
  d.created_at,
  COALESCE(current_week.total_hours, 0) as current_week_hours,
  COALESCE(current_week.total_earnings, 0) as current_week_earnings,
  COALESCE(all_time.total_hours, 0) as all_time_hours,
  COALESCE(all_time.total_earnings, 0) as all_time_earnings,
  last_entry.last_activity
FROM drivers d
LEFT JOIN LATERAL (
  SELECT 
    SUM(hours_worked) as total_hours,
    SUM(hours_worked * d.hourly_rate) as total_earnings
  FROM time_entries te
  WHERE te.driver_id = d.id 
    AND te.date >= date_trunc('week', CURRENT_DATE)
    AND te.date < date_trunc('week', CURRENT_DATE) + interval '7 days'
    AND te.hours_worked IS NOT NULL
) current_week ON true
LEFT JOIN LATERAL (
  SELECT 
    SUM(hours_worked) as total_hours,
    SUM(hours_worked * d.hourly_rate) as total_earnings
  FROM time_entries te
  WHERE te.driver_id = d.id 
    AND te.hours_worked IS NOT NULL
) all_time ON true
LEFT JOIN LATERAL (
  SELECT MAX(created_at) as last_activity
  FROM time_entries te
  WHERE te.driver_id = d.id
) last_entry ON true
WHERE d.role = 'driver'
ORDER BY d.name;
