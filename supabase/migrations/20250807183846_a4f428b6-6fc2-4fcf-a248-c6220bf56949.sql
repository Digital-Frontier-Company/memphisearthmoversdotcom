-- Add indexes for better performance on frequently queried columns
CREATE INDEX IF NOT EXISTS idx_time_entries_driver_date ON time_entries(driver_id, date);
CREATE INDEX IF NOT EXISTS idx_time_entries_driver_clock_in ON time_entries(driver_id, clock_in_time);
CREATE INDEX IF NOT EXISTS idx_weekly_earnings_driver_week ON weekly_earnings(driver_id, week_start_date);

-- Create trigger function to validate clock times
CREATE OR REPLACE FUNCTION validate_time_entry()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Create trigger for time entry validation
DROP TRIGGER IF EXISTS validate_time_entry_trigger ON time_entries;
CREATE TRIGGER validate_time_entry_trigger
  BEFORE INSERT OR UPDATE ON time_entries
  FOR EACH ROW
  EXECUTE FUNCTION validate_time_entry();

-- Create trigger function to automatically calculate hours worked
CREATE OR REPLACE FUNCTION calculate_hours_worked()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate hours when both clock_in_time and clock_out_time are set
  IF NEW.clock_in_time IS NOT NULL AND NEW.clock_out_time IS NOT NULL THEN
    NEW.hours_worked := EXTRACT(EPOCH FROM (NEW.clock_out_time - NEW.clock_in_time)) / 3600.0;
  ELSE
    NEW.hours_worked := NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic hours calculation
DROP TRIGGER IF EXISTS calculate_hours_trigger ON time_entries;
CREATE TRIGGER calculate_hours_trigger
  BEFORE INSERT OR UPDATE ON time_entries
  FOR EACH ROW
  EXECUTE FUNCTION calculate_hours_worked();