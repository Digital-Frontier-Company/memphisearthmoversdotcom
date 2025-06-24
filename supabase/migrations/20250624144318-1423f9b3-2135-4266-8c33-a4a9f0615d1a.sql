
-- Update the calculate_weekly_earnings function with proper search_path
CREATE OR REPLACE FUNCTION public.calculate_weekly_earnings(p_driver_id UUID, p_week_start DATE)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
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
  FROM drivers 
  WHERE id = p_driver_id;
  
  -- Calculate total hours for the week
  SELECT COALESCE(SUM(hours_worked), 0) INTO v_total_hours
  FROM time_entries
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
  INSERT INTO weekly_earnings (
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
