
-- Add job_address column to time_entries table
ALTER TABLE public.time_entries 
ADD COLUMN job_address TEXT;

-- Make job_site_id nullable since we're replacing it with job_address
ALTER TABLE public.time_entries 
ALTER COLUMN job_site_id DROP NOT NULL;
