-- Fix security warnings by adding proper search paths to functions
CREATE OR REPLACE FUNCTION validate_time_entry()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Ensure clock_out_time is after clock_in_time when both are set
  IF NEW.clock_out_time IS NOT NULL AND NEW.clock_in_time IS NOT NULL THEN
    IF NEW.clock_out_time <= NEW.clock_in_time THEN
      RAISE EXCEPTION 'Clock out time must be after clock in time';
    END IF;
  END IF;
  
  -- Ensure date is not in the future
  IF NEW.date > CURRENT_DATE THEN
    RAISE EXCEPTION 'Cannot create time entries for future dates';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION calculate_hours_worked()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Calculate hours when both clock_in_time and clock_out_time are set
  IF NEW.clock_in_time IS NOT NULL AND NEW.clock_out_time IS NOT NULL THEN
    NEW.hours_worked := EXTRACT(EPOCH FROM (NEW.clock_out_time - NEW.clock_in_time)) / 3600.0;
  ELSE
    NEW.hours_worked := NULL;
  END IF;
  
  RETURN NEW;
END;
$$;