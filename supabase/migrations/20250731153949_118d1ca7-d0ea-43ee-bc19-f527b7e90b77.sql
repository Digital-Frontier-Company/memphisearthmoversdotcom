-- Fix search path security warnings by setting search_path on all functions
SET search_path = '';

-- Update all functions with proper search_path settings
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.drivers 
    WHERE id = (
      SELECT id FROM public.drivers 
      WHERE pin = current_setting('request.jwt.claims', true)::json->>'sub'
      LIMIT 1
    )
    AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.get_admin_driver_overview()
RETURNS TABLE (
  id uuid,
  name text,
  phone text,
  email text,
  pin text,
  truck_assigned text,
  hourly_rate numeric,
  active boolean,
  created_at timestamptz,
  current_week_hours numeric,
  current_week_earnings numeric,
  all_time_hours numeric,
  all_time_earnings numeric,
  last_activity timestamptz
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $$
  SELECT 
    d.id,
    d.name,
    d.phone,
    d.email,
    d.pin,
    d.truck_assigned,
    d.hourly_rate,
    d.active,
    d.created_at,
    COALESCE(we.total_hours, 0) as current_week_hours,
    COALESCE(we.total_earnings, 0) as current_week_earnings,
    COALESCE(
      (SELECT SUM(hours_worked) FROM time_entries WHERE driver_id = d.id), 0
    ) as all_time_hours,
    COALESCE(
      (SELECT SUM(we2.total_earnings) FROM weekly_earnings we2 WHERE we2.driver_id = d.id), 0
    ) as all_time_earnings,
    (SELECT MAX(created_at) FROM time_entries WHERE driver_id = d.id) as last_activity
  FROM public.drivers d
  LEFT JOIN public.weekly_earnings we ON d.id = we.driver_id 
    AND we.week_start_date = date_trunc('week', CURRENT_DATE)::date
  WHERE public.is_current_user_admin()
  ORDER BY d.name;
$$;

CREATE OR REPLACE FUNCTION public.hash_pin(pin_text text)
RETURNS text
LANGUAGE SQL
IMMUTABLE
SET search_path = 'public'
AS $$
  SELECT crypt(pin_text, gen_salt('bf', 8));
$$;

CREATE OR REPLACE FUNCTION public.verify_pin(pin_text text, pin_hash text)
RETURNS boolean
LANGUAGE SQL
IMMUTABLE
SET search_path = 'public'
AS $$
  SELECT pin_hash = crypt(pin_text, pin_hash);
$$;

CREATE OR REPLACE FUNCTION public.check_rate_limit(p_driver_id uuid, p_ip_address inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  failed_attempts integer;
BEGIN
  -- Count failed attempts in last 15 minutes
  SELECT COUNT(*) INTO failed_attempts
  FROM public.login_attempts
  WHERE driver_id = p_driver_id
    AND attempted_at > now() - interval '15 minutes'
    AND success = false;
  
  -- Allow if fewer than 5 failed attempts
  RETURN failed_attempts < 5;
END;
$$;

CREATE OR REPLACE FUNCTION public.log_login_attempt(
  p_driver_id uuid, 
  p_ip_address inet, 
  p_success boolean
)
RETURNS void
LANGUAGE SQL
SECURITY DEFINER
SET search_path = 'public'
AS $$
  INSERT INTO public.login_attempts (driver_id, ip_address, success)
  VALUES (p_driver_id, p_ip_address, p_success);
$$;