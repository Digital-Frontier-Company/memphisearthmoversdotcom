
-- Create a new admin user named "admin" with PIN 7789
-- First check if user exists, if not insert
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.drivers WHERE name = 'admin') THEN
        INSERT INTO public.drivers (name, pin, role, active, hourly_rate) 
        VALUES ('admin', '7789', 'admin', true, 0.00);
    ELSE
        UPDATE public.drivers 
        SET pin = '7789', role = 'admin', active = true
        WHERE name = 'admin';
    END IF;
END $$;
