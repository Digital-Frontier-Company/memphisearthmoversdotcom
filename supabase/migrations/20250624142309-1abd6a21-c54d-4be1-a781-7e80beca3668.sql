
-- Delete the first 3 sample drivers
DELETE FROM public.drivers 
WHERE name IN ('John Smith', 'Mike Johnson', 'Sarah Davis');
