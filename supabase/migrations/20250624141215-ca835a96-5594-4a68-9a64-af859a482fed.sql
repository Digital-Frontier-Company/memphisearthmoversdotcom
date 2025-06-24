
-- Create drivers table
CREATE TABLE public.drivers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  pin TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  truck_assigned TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_sites table
CREATE TABLE public.job_sites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT NOT NULL,
  site_code TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time_entries table
CREATE TABLE public.time_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES public.drivers(id) NOT NULL,
  job_site_id UUID REFERENCES public.job_sites(id) NOT NULL,
  truck_number TEXT NOT NULL,
  clock_in_time TIMESTAMP WITH TIME ZONE NOT NULL,
  clock_out_time TIMESTAMP WITH TIME ZONE,
  hours_worked DECIMAL(5,2),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for drivers table
CREATE POLICY "Drivers can view their own data" 
  ON public.drivers 
  FOR SELECT 
  USING (true); -- Allow all drivers to see driver list for login

-- RLS Policies for job_sites table
CREATE POLICY "Anyone can view active job sites" 
  ON public.job_sites 
  FOR SELECT 
  USING (active = true);

-- RLS Policies for time_entries table
CREATE POLICY "Drivers can view their own time entries" 
  ON public.time_entries 
  FOR SELECT 
  USING (driver_id IN (SELECT id FROM public.drivers));

CREATE POLICY "Drivers can insert their own time entries" 
  ON public.time_entries 
  FOR INSERT 
  WITH CHECK (driver_id IN (SELECT id FROM public.drivers));

CREATE POLICY "Drivers can update their own time entries" 
  ON public.time_entries 
  FOR UPDATE 
  USING (driver_id IN (SELECT id FROM public.drivers));

-- Insert default job sites
INSERT INTO public.job_sites (site_name, site_code) VALUES
  ('Downtown Project', 'DT001'),
  ('Highway 40 Extension', 'HW040'),
  ('Airport Expansion', 'APT001'),
  ('Residential Development', 'RES001'),
  ('Commercial Plaza', 'COM001');

-- Insert sample drivers
INSERT INTO public.drivers (name, pin, email, phone) VALUES
  ('John Smith', '1234', 'john.smith@memphisearthmovers.com', '901-555-0101'),
  ('Mike Johnson', '5678', 'mike.johnson@memphisearthmovers.com', '901-555-0102'),
  ('Sarah Davis', '9012', 'sarah.davis@memphisearthmovers.com', '901-555-0103');
