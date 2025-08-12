-- Tighten access to marketing analytics in content_analysis
ALTER TABLE public.content_analysis ENABLE ROW LEVEL SECURITY;

-- Remove permissive policies
DROP POLICY IF EXISTS "Anyone can view content analysis data" ON public.content_analysis;
DROP POLICY IF EXISTS "System can insert content analysis data" ON public.content_analysis;
DROP POLICY IF EXISTS "System can update content analysis data" ON public.content_analysis;

-- Allow only admins and moderators to read
CREATE POLICY "Admins and moderators can read content_analysis"
ON public.content_analysis
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'moderator'::app_role)
);

-- Allow only admins and moderators to insert
CREATE POLICY "Admins and moderators can insert content_analysis"
ON public.content_analysis
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'moderator'::app_role)
);

-- Allow only admins and moderators to update
CREATE POLICY "Admins and moderators can update content_analysis"
ON public.content_analysis
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'moderator'::app_role)
);
