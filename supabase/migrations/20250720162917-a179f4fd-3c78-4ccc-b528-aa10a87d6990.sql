
-- Create a table to store truck requests as leads
CREATE TABLE public.truck_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  desired_date DATE NOT NULL,
  desired_time TIME NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to store gravel orders as leads
CREATE TABLE public.gravel_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  quantity TEXT NOT NULL,
  pickup_delivery TEXT NOT NULL CHECK (pickup_delivery IN ('pickup', 'delivery')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.truck_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gravel_orders ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insert (for form submissions)
CREATE POLICY "Allow public insert on truck_requests" 
  ON public.truck_requests 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert on gravel_orders" 
  ON public.gravel_orders 
  FOR INSERT 
  WITH CHECK (true);

-- Create policies for admin access (you can adjust these based on your admin setup)
CREATE POLICY "Allow admin access to truck_requests" 
  ON public.truck_requests 
  FOR ALL 
  USING (true);

CREATE POLICY "Allow admin access to gravel_orders" 
  ON public.gravel_orders 
  FOR ALL 
  USING (true);
