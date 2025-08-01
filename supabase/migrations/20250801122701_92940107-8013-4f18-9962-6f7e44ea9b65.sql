-- Fix infinite recursion in drivers RLS policies by updating the admin check function
-- Drop the existing function first
DROP FUNCTION IF EXISTS public.is_current_user_admin();

-- Create a proper security definer function that bypasses RLS
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.drivers 
    WHERE id = auth.uid()::uuid
    AND role = 'admin'
    AND active = true
  );
$$;

-- Also create a function to get current driver ID for policies
CREATE OR REPLACE FUNCTION public.get_current_driver_id()
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT id FROM public.drivers 
  WHERE id = auth.uid()::uuid
  AND active = true
  LIMIT 1;
$$;

-- Drop and recreate the problematic RLS policies
DROP POLICY IF EXISTS "Drivers can update own record, admins can update all" ON public.drivers;
DROP POLICY IF EXISTS "Drivers can view own record only" ON public.drivers;

-- Create new policies using the security definer functions
CREATE POLICY "Drivers can view own record, admins can view all" 
ON public.drivers 
FOR SELECT 
USING (
  public.is_current_user_admin() 
  OR id = auth.uid()::uuid
);

CREATE POLICY "Drivers can update own record, admins can update all" 
ON public.drivers 
FOR UPDATE 
USING (
  public.is_current_user_admin() 
  OR id = auth.uid()::uuid
)
WITH CHECK (
  public.is_current_user_admin() 
  OR id = auth.uid()::uuid
);