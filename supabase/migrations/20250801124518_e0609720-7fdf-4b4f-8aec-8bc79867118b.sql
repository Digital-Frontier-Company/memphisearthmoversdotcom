-- Delete specific drivers as requested
-- Delete "Derek" (keep "Derek Jackson")
DELETE FROM public.drivers WHERE id = 'f4537bef-d95b-45a4-8f5e-26a9ca7f9cf0';

-- Delete "David" (keep "David T")
DELETE FROM public.drivers WHERE id = '5c054472-4a64-4a80-bec1-5f662fa868fc';

-- Delete "Rico" (keep "Transportation RM INC")
DELETE FROM public.drivers WHERE id = '0294e7bb-bb47-4407-b282-8888a5d225cd';