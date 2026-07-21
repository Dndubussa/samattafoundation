-- Aggregate completed donations server-side (replaces client-side full-table fetch).
CREATE OR REPLACE FUNCTION public.get_total_donations()
RETURNS numeric
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(amount), 0)
  FROM public.donations
  WHERE payment_status = 'completed';
$$;

GRANT EXECUTE ON FUNCTION public.get_total_donations() TO anon, authenticated;

-- Row Level Security: public read for published content, controlled writes for forms.
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Published content: anonymous read
DROP POLICY IF EXISTS "Public read published blog posts" ON public.blog_posts;
CREATE POLICY "Public read published blog posts"
  ON public.blog_posts FOR SELECT TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "Public read published testimonials" ON public.testimonials;
CREATE POLICY "Public read published testimonials"
  ON public.testimonials FOR SELECT TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "Public read published events" ON public.events;
CREATE POLICY "Public read published events"
  ON public.events FOR SELECT TO anon, authenticated
  USING (is_published = true);

-- Form tables: allow anonymous inserts (fallback when edge function unavailable).
-- Production recommendation: revoke anon INSERT after edge function is deployed.
DROP POLICY IF EXISTS "Anon insert contact submissions" ON public.contact_submissions;
CREATE POLICY "Anon insert contact submissions"
  ON public.contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anon insert newsletter subscriptions" ON public.newsletter_subscriptions;
CREATE POLICY "Anon insert newsletter subscriptions"
  ON public.newsletter_subscriptions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anon update newsletter subscriptions" ON public.newsletter_subscriptions;
CREATE POLICY "Anon update newsletter subscriptions"
  ON public.newsletter_subscriptions FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anon insert volunteer registrations" ON public.volunteer_registrations;
CREATE POLICY "Anon insert volunteer registrations"
  ON public.volunteer_registrations FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anon insert program applications" ON public.program_applications;
CREATE POLICY "Anon insert program applications"
  ON public.program_applications FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anon insert donations" ON public.donations;
CREATE POLICY "Anon insert donations"
  ON public.donations FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Donations: public read of completed donation summaries only (for transparency widgets).
DROP POLICY IF EXISTS "Public read completed donations summary" ON public.donations;
CREATE POLICY "Public read completed donations summary"
  ON public.donations FOR SELECT TO anon, authenticated
  USING (payment_status = 'completed');
