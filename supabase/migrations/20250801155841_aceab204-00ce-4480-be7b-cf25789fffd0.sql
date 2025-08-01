-- Create tasks table
CREATE TABLE public.tasks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    assigned_driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
    created_by_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
    due_date DATE,
    truck_number TEXT,
    job_address TEXT,
    job_site_id UUID REFERENCES public.job_sites(id) ON DELETE SET NULL,
    estimated_hours DECIMAL(5,2),
    actual_hours DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks
CREATE POLICY "Drivers can view assigned tasks and admins can view all"
ON public.tasks
FOR SELECT
USING (
    assigned_driver_id = auth.uid() OR 
    EXISTS (
        SELECT 1 FROM public.drivers 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Admins can insert tasks"
ON public.tasks
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.drivers 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Admins and assigned drivers can update tasks"
ON public.tasks
FOR UPDATE
USING (
    assigned_driver_id = auth.uid() OR 
    EXISTS (
        SELECT 1 FROM public.drivers 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Only admins can delete tasks"
ON public.tasks
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM public.drivers 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create activity_logs table for tracking actions
CREATE TABLE public.activity_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    actor_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
    actor_name TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL, -- 'task', 'driver', 'time_entry'
    target_id UUID,
    target_name TEXT,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for activity logs
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all activity logs"
ON public.activity_logs
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.drivers 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "System can insert activity logs"
ON public.activity_logs
FOR INSERT
WITH CHECK (true);

-- Create function to log activities
CREATE OR REPLACE FUNCTION public.log_activity(
    p_actor_id UUID,
    p_actor_name TEXT,
    p_action TEXT,
    p_target_type TEXT,
    p_target_id UUID DEFAULT NULL,
    p_target_name TEXT DEFAULT NULL,
    p_description TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT NULL
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
    INSERT INTO public.activity_logs (
        actor_id, actor_name, action, target_type, 
        target_id, target_name, description, metadata
    )
    VALUES (
        p_actor_id, p_actor_name, p_action, p_target_type,
        p_target_id, p_target_name, p_description, p_metadata
    );
$$;