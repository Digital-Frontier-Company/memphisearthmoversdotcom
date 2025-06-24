
-- Disable RLS on drivers table to fix infinite recursion
ALTER TABLE public.drivers DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies that might be causing recursion
DROP POLICY IF EXISTS "drivers_policy" ON public.drivers;
DROP POLICY IF EXISTS "Users can view their own driver data" ON public.drivers;
DROP POLICY IF EXISTS "Drivers can view own data" ON public.drivers;
