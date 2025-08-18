-- Fix critical security vulnerability: Remove public access to drivers table
-- and implement proper role-based access control

-- Drop the existing dangerous public policy
DROP POLICY IF EXISTS "Public can view driver login info" ON public.drivers;

-- Create secure policies for drivers table access
-- 1. Drivers can view only their own record
CREATE POLICY "Drivers can view own record" 
ON public.drivers 
FOR SELECT 
TO authenticated
USING (id = auth.uid());

-- 2. Admins can view all driver records  
CREATE POLICY "Admins can view all drivers"
ON public.drivers
FOR SELECT 
TO authenticated
USING (is_current_user_admin());

-- Also ensure the login functionality still works by creating a dedicated function
-- for authentication that only returns minimal data needed for login validation
CREATE OR REPLACE FUNCTION public.authenticate_driver(driver_pin text)
RETURNS TABLE(
  driver_id uuid,
  driver_name text,
  driver_role text,
  is_active boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id as driver_id,
    d.name as driver_name,
    d.role::text as driver_role,
    d.active as is_active
  FROM drivers d
  WHERE d.pin = driver_pin 
    AND d.active = true
  LIMIT 1;
END;
$$;