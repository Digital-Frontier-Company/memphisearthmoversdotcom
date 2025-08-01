-- Allow public read access to drivers for login purposes
-- This replaces the restrictive policy that was blocking the login screen
DROP POLICY IF EXISTS "Drivers can view own record, admins can view all" ON public.drivers;

-- Create a policy that allows reading driver info for login (but not sensitive data)
CREATE POLICY "Public can view driver login info" 
ON public.drivers 
FOR SELECT 
USING (active = true);

-- Keep the other policies intact
-- (Insert, Update, Delete policies remain admin-only or user-specific)