
-- Add hourly_rate column to drivers table
ALTER TABLE public.drivers 
ADD COLUMN hourly_rate DECIMAL(8,2);

-- Update the existing drivers with their rates
UPDATE public.drivers 
SET hourly_rate = 22.00 
WHERE name = 'Derek Jackson';

UPDATE public.drivers 
SET hourly_rate = 26.00 
WHERE name = 'Transportation RM INC';

-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('driver', 'admin');

-- Add role column to drivers table
ALTER TABLE public.drivers 
ADD COLUMN role public.user_role DEFAULT 'driver';

-- Insert admin user David T
INSERT INTO public.drivers (name, pin, email, phone, active, role, hourly_rate) 
VALUES ('David T', '9999', 'david.t@memphisearthmovers.com', '901-555-0999', true, 'admin', 0.00);

-- Create weekly_earnings table to permanently store earnings data
CREATE TABLE public.weekly_earnings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES public.drivers(id) NOT NULL,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  total_hours DECIMAL(6,2) NOT NULL DEFAULT 0,
  regular_hours DECIMAL(6,2) NOT NULL DEFAULT 0,
  overtime_hours DECIMAL(6,2) NOT NULL DEFAULT 0,
  total_earnings DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(driver_id, week_start_date)
);

-- Enable RLS on all tables for security
ALTER TABLE public.weekly_earnings ENABLE ROW LEVEL SECURITY;

-- Update RLS policies for drivers table
DROP POLICY IF EXISTS "Drivers can view their own data" ON public.drivers;

-- Drivers can only see their own data, admins can see all
CREATE POLICY "Drivers can view own data, admins can view all" 
  ON public.drivers 
  FOR SELECT 
  USING (
    (role = 'driver' AND id IN (
      SELECT d.id FROM public.drivers d WHERE d.id = drivers.id
    )) OR 
    (role = 'admin')
  );

-- RLS policies for weekly_earnings
CREATE POLICY "Drivers can view own earnings, admins can view all" 
  ON public.weekly_earnings 
  FOR SELECT 
  USING (
    driver_id IN (
      SELECT id FROM public.drivers 
      WHERE (role = 'driver' AND id = driver_id) OR role = 'admin'
    )
  );

CREATE POLICY "System can insert weekly earnings" 
  ON public.weekly_earnings 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "System can update weekly earnings" 
  ON public.weekly_earnings 
  FOR UPDATE 
  USING (true);

-- Create function to calculate and store weekly earnings
CREATE OR REPLACE FUNCTION public.calculate_weekly_earnings(p_driver_id UUID, p_week_start DATE)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total_hours DECIMAL(6,2) := 0;
  v_regular_hours DECIMAL(6,2) := 0;
  v_overtime_hours DECIMAL(6,2) := 0;
  v_hourly_rate DECIMAL(8,2) := 0;
  v_total_earnings DECIMAL(10,2) := 0;
  v_week_end DATE;
BEGIN
  -- Calculate week end date
  v_week_end := p_week_start + INTERVAL '6 days';
  
  -- Get driver's hourly rate
  SELECT hourly_rate INTO v_hourly_rate 
  FROM public.drivers 
  WHERE id = p_driver_id;
  
  -- Calculate total hours for the week
  SELECT COALESCE(SUM(hours_worked), 0) INTO v_total_hours
  FROM public.time_entries
  WHERE driver_id = p_driver_id 
    AND date >= p_week_start 
    AND date <= v_week_end
    AND hours_worked IS NOT NULL;
  
  -- Calculate regular and overtime hours
  v_regular_hours := LEAST(v_total_hours, 40);
  v_overtime_hours := GREATEST(v_total_hours - 40, 0);
  
  -- Calculate total earnings (overtime at 1.5x rate)
  v_total_earnings := (v_regular_hours * v_hourly_rate) + (v_overtime_hours * v_hourly_rate * 1.5);
  
  -- Insert or update weekly earnings
  INSERT INTO public.weekly_earnings (
    driver_id, week_start_date, week_end_date, 
    total_hours, regular_hours, overtime_hours, total_earnings
  )
  VALUES (
    p_driver_id, p_week_start, v_week_end,
    v_total_hours, v_regular_hours, v_overtime_hours, v_total_earnings
  )
  ON CONFLICT (driver_id, week_start_date)
  DO UPDATE SET
    total_hours = EXCLUDED.total_hours,
    regular_hours = EXCLUDED.regular_hours,
    overtime_hours = EXCLUDED.overtime_hours,
    total_earnings = EXCLUDED.total_earnings,
    updated_at = now();
END;
$$;
