-- Update the calculate_weekly_earnings function to remove overtime calculations
CREATE OR REPLACE FUNCTION public.calculate_weekly_earnings(p_driver_id uuid, p_week_start date)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_total_hours DECIMAL(6,2) := 0;
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
  
  -- Calculate total earnings (no overtime, just regular hourly rate)
  v_total_earnings := v_total_hours * v_hourly_rate;
  
  -- Insert or update weekly earnings (no overtime tracking)
  INSERT INTO weekly_earnings (
    driver_id, week_start_date, week_end_date, 
    total_hours, regular_hours, overtime_hours, total_earnings
  )
  VALUES (
    p_driver_id, p_week_start, v_week_end,
    v_total_hours, v_total_hours, 0, v_total_earnings
  )
  ON CONFLICT (driver_id, week_start_date)
  DO UPDATE SET
    total_hours = EXCLUDED.total_hours,
    regular_hours = EXCLUDED.total_hours,
    overtime_hours = 0,
    total_earnings = EXCLUDED.total_earnings,
    updated_at = now();
END;
$function$