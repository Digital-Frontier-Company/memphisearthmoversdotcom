-- Fix RLS issues and secure the drivers table
-- First, ensure RLS is enabled on all public tables that need it

-- Enable RLS on drivers table (should already be enabled, but ensuring it)
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;

-- Drop existing problematic policies and create secure ones
DROP POLICY IF EXISTS "Enable read access for all users" ON public.drivers;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.drivers;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.drivers;
DROP POLICY IF EXISTS "Drivers can view own data, admins can view all" ON public.drivers;

-- Create a security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
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

-- Create secure RLS policies for drivers table
CREATE POLICY "Drivers can view own record only" 
ON public.drivers 
FOR SELECT 
USING (
  id = (
    SELECT d.id FROM public.drivers d 
    WHERE d.id = drivers.id
    LIMIT 1
  )
  OR public.is_current_user_admin()
);

CREATE POLICY "Only admins can insert drivers" 
ON public.drivers 
FOR INSERT 
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Drivers can update own record, admins can update all" 
ON public.drivers 
FOR UPDATE 
USING (
  id = drivers.id
  OR public.is_current_user_admin()
)
WITH CHECK (
  id = drivers.id
  OR public.is_current_user_admin()
);

CREATE POLICY "Only admins can delete drivers" 
ON public.drivers 
FOR DELETE 
USING (public.is_current_user_admin());

-- Drop the security definer view and recreate it properly
DROP VIEW IF EXISTS public.admin_driver_overview;

-- Create a secure function instead of a security definer view
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

-- Add rate limiting table for failed login attempts
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id uuid REFERENCES public.drivers(id),
  ip_address inet,
  attempted_at timestamptz DEFAULT now(),
  success boolean DEFAULT false
);

-- Enable RLS on login_attempts
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy for login_attempts (only system can access)
CREATE POLICY "System only access" 
ON public.login_attempts 
FOR ALL 
USING (false)
WITH CHECK (false);

-- Add PIN hashing support (drivers will need to reset PINs)
ALTER TABLE public.drivers ADD COLUMN IF NOT EXISTS pin_hash text;
ALTER TABLE public.drivers ADD COLUMN IF NOT EXISTS pin_reset_required boolean DEFAULT true;

-- Create function to hash PINs
CREATE OR REPLACE FUNCTION public.hash_pin(pin_text text)
RETURNS text
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT crypt(pin_text, gen_salt('bf', 8));
$$;

-- Create function to verify PINs
CREATE OR REPLACE FUNCTION public.verify_pin(pin_text text, pin_hash text)
RETURNS boolean
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT pin_hash = crypt(pin_text, pin_hash);
$$;

-- Create function to check rate limiting
CREATE OR REPLACE FUNCTION public.check_rate_limit(p_driver_id uuid, p_ip_address inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create function to log login attempts
CREATE OR REPLACE FUNCTION public.log_login_attempt(
  p_driver_id uuid, 
  p_ip_address inet, 
  p_success boolean
)
RETURNS void
LANGUAGE SQL
SECURITY DEFINER
AS $$
  INSERT INTO public.login_attempts (driver_id, ip_address, success)
  VALUES (p_driver_id, p_ip_address, p_success);
$$;