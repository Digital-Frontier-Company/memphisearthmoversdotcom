-- First drop all policies that depend on the function
DROP POLICY IF EXISTS "Drivers can view own record only" ON public.drivers;
DROP POLICY IF EXISTS "Only admins can insert drivers" ON public.drivers;
DROP POLICY IF EXISTS "Drivers can update own record, admins can update all" ON public.drivers;
DROP POLICY IF EXISTS "Only admins can delete drivers" ON public.drivers;

-- Now drop the function
DROP FUNCTION IF EXISTS public.is_current_user_admin();

-- Create the proper security definer function
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

-- Recreate all the policies with the fixed function
CREATE POLICY "Drivers can view own record, admins can view all" 
ON public.drivers 
FOR SELECT 
USING (
  public.is_current_user_admin() 
  OR id = auth.uid()::uuid
);

CREATE POLICY "Only admins can insert drivers" 
ON public.drivers 
FOR INSERT 
WITH CHECK (public.is_current_user_admin());

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

CREATE POLICY "Only admins can delete drivers" 
ON public.drivers 
FOR DELETE 
USING (public.is_current_user_admin());