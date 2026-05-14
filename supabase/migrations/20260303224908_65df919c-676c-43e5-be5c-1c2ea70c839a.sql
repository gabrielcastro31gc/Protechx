ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

-- Set initial sort orders
UPDATE public.site_content SET sort_order = 0 WHERE section_key = 'hero';
UPDATE public.site_content SET sort_order = 1 WHERE section_key = 'impact';
UPDATE public.site_content SET sort_order = 2 WHERE section_key = 'positioning';
UPDATE public.site_content SET sort_order = 3 WHERE section_key = 'services';
UPDATE public.site_content SET sort_order = 4 WHERE section_key = 'diagnostic';
UPDATE public.site_content SET sort_order = 5 WHERE section_key = 'technology';
UPDATE public.site_content SET sort_order = 6 WHERE section_key = 'geography';
UPDATE public.site_content SET sort_order = 7 WHERE section_key = 'about';
UPDATE public.site_content SET sort_order = 8 WHERE section_key = 'work_with_us';
UPDATE public.site_content SET sort_order = 9 WHERE section_key = 'final_cta';
UPDATE public.site_content SET sort_order = 10 WHERE section_key = 'footer';
UPDATE public.site_content SET sort_order = -1 WHERE section_key = 'global_settings';