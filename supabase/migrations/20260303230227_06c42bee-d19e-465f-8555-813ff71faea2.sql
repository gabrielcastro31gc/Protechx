CREATE TABLE public.cta_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cta_name text NOT NULL,
  page_path text NOT NULL,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.cta_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log CTA clicks" ON public.cta_clicks
  FOR INSERT TO anon, authenticated
  WITH CHECK (cta_name IS NOT NULL AND page_path IS NOT NULL);

CREATE POLICY "Admins can view CTA clicks" ON public.cta_clicks
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));