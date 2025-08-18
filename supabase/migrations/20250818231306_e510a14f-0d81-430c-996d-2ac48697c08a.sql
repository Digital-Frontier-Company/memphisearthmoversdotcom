-- Fix critical security vulnerability: Restrict truck_requests SELECT access to admin users only
-- Keep public INSERT access so customers can submit requests

-- Drop the existing dangerous admin policy that allows public access
DROP POLICY IF EXISTS "Allow admin access to truck_requests" ON public.truck_requests;

-- Create secure admin-only SELECT policy
CREATE POLICY "Admin can view truck requests"
ON public.truck_requests
FOR SELECT 
TO authenticated
USING (is_current_user_admin());

-- Create secure admin-only UPDATE policy
CREATE POLICY "Admin can update truck requests"
ON public.truck_requests
FOR UPDATE 
TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- Create secure admin-only DELETE policy  
CREATE POLICY "Admin can delete truck requests"
ON public.truck_requests
FOR DELETE 
TO authenticated
USING (is_current_user_admin());

-- Keep the existing public INSERT policy (customers need to submit requests)
-- This policy already exists: "Allow public insert on truck_requests"