
-- Create archive table for time entries
CREATE TABLE public.time_entries_archive (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  original_entry_id UUID NOT NULL,
  driver_id UUID NOT NULL,
  driver_name TEXT NOT NULL,
  date DATE NOT NULL,
  clock_in_time TIMESTAMP WITH TIME ZONE NOT NULL,
  clock_out_time TIMESTAMP WITH TIME ZONE,
  hours_worked NUMERIC,
  truck_number TEXT NOT NULL,
  job_address TEXT,
  job_site_id UUID,
  archived_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create archive table for weekly earnings
CREATE TABLE public.weekly_earnings_archive (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  original_earnings_id UUID NOT NULL,
  driver_id UUID NOT NULL,
  driver_name TEXT NOT NULL,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  total_hours NUMERIC NOT NULL DEFAULT 0,
  regular_hours NUMERIC NOT NULL DEFAULT 0,
  overtime_hours NUMERIC NOT NULL DEFAULT 0,
  hourly_rate NUMERIC NOT NULL,
  total_earnings NUMERIC NOT NULL DEFAULT 0,
  archived_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  original_created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  original_updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create function to archive completed weeks
CREATE OR REPLACE FUNCTION public.archive_completed_weeks()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  cutoff_date DATE;
  week_record RECORD;
BEGIN
  -- Calculate cutoff date (2 weeks ago to ensure week is complete)
  cutoff_date := CURRENT_DATE - INTERVAL '14 days';
  
  -- Archive time entries for completed weeks
  INSERT INTO time_entries_archive (
    original_entry_id, driver_id, driver_name, date, clock_in_time, 
    clock_out_time, hours_worked, truck_number, job_address, job_site_id,
    week_start_date, week_end_date, created_at
  )
  SELECT 
    te.id,
    te.driver_id,
    d.name,
    te.date,
    te.clock_in_time,
    te.clock_out_time,
    te.hours_worked,
    te.truck_number,
    te.job_address,
    te.job_site_id,
    DATE_TRUNC('week', te.date)::DATE,
    (DATE_TRUNC('week', te.date) + INTERVAL '6 days')::DATE,
    te.created_at
  FROM time_entries te
  JOIN drivers d ON te.driver_id = d.id
  WHERE te.date < cutoff_date
    AND te.id NOT IN (SELECT original_entry_id FROM time_entries_archive);

  -- Archive weekly earnings for completed weeks
  INSERT INTO weekly_earnings_archive (
    original_earnings_id, driver_id, driver_name, week_start_date, 
    week_end_date, total_hours, regular_hours, overtime_hours, 
    hourly_rate, total_earnings, original_created_at, original_updated_at
  )
  SELECT 
    we.id,
    we.driver_id,
    d.name,
    we.week_start_date,
    we.week_end_date,
    we.total_hours,
    we.regular_hours,
    we.overtime_hours,
    d.hourly_rate,
    we.total_earnings,
    we.created_at,
    we.updated_at
  FROM weekly_earnings we
  JOIN drivers d ON we.driver_id = d.id
  WHERE we.week_start_date < cutoff_date
    AND we.id NOT IN (SELECT original_earnings_id FROM weekly_earnings_archive);

  -- Delete archived time entries from main table
  DELETE FROM time_entries 
  WHERE date < cutoff_date 
    AND id IN (SELECT original_entry_id FROM time_entries_archive);

  -- Delete archived weekly earnings from main table
  DELETE FROM weekly_earnings 
  WHERE week_start_date < cutoff_date 
    AND id IN (SELECT original_earnings_id FROM weekly_earnings_archive);

END;
$$;

-- Create indexes for better performance
CREATE INDEX idx_time_entries_archive_driver_date ON time_entries_archive(driver_id, date);
CREATE INDEX idx_time_entries_archive_week_start ON time_entries_archive(week_start_date);
CREATE INDEX idx_weekly_earnings_archive_driver_week ON weekly_earnings_archive(driver_id, week_start_date);

-- Enable RLS on archive tables
ALTER TABLE public.time_entries_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_earnings_archive ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for archive tables (admin access only)
CREATE POLICY "Admin can view time entries archive" 
  ON public.time_entries_archive 
  FOR SELECT 
  USING (true); -- Will be restricted by application logic

CREATE POLICY "Admin can view weekly earnings archive" 
  ON public.weekly_earnings_archive 
  FOR SELECT 
  USING (true); -- Will be restricted by application logic
