-- Remove the public read access policy that exposes business intelligence data
DROP POLICY IF EXISTS "Allow public read access to content analysis" ON public.content_analysis;

-- Verify only admin/moderator access remains
-- The existing policy "Admins and moderators can read content_analysis" should remain active