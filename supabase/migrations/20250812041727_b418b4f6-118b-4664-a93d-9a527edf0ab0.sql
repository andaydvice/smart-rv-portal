-- Restrict access to browsing analytics (web_vitals)
ALTER TABLE public.web_vitals ENABLE ROW LEVEL SECURITY;

-- Remove permissive read policy
DROP POLICY IF EXISTS "Allow read access to web vitals" ON public.web_vitals;

-- Keep anonymous inserts for collection
DROP POLICY IF EXISTS "Allow anonymous inserts for web vitals" ON public.web_vitals;
CREATE POLICY "Allow anonymous inserts for web vitals"
ON public.web_vitals
FOR INSERT
TO anon
WITH CHECK (true);

-- Restrict reads to admins and moderators only
CREATE POLICY "Admins and moderators can read web_vitals"
ON public.web_vitals
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'moderator'::app_role)
);
