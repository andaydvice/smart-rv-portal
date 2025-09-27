-- Fix security issue: Customer Reviews Exposed Without User Consent
-- Add approval status and implement proper RLS policies

-- 1. Add status column for review moderation
ALTER TABLE public.storage_facility_reviews 
ADD COLUMN status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- 2. Add user_id column to track review ownership
ALTER TABLE public.storage_facility_reviews 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. Remove the overly permissive policy that exposes all data
DROP POLICY IF EXISTS "Enable read access for all users" ON public.storage_facility_reviews;

-- 4. Create proper RLS policies

-- Authenticated users can view only approved reviews
CREATE POLICY "authenticated_view_approved_facility_reviews" 
ON public.storage_facility_reviews 
FOR SELECT 
TO authenticated
USING (status = 'approved');

-- Users can view their own reviews regardless of status
CREATE POLICY "users_view_own_facility_reviews" 
ON public.storage_facility_reviews 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own reviews
CREATE POLICY "users_insert_own_facility_reviews" 
ON public.storage_facility_reviews 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending reviews
CREATE POLICY "users_update_own_pending_facility_reviews" 
ON public.storage_facility_reviews 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Admins and moderators can manage all reviews
CREATE POLICY "admin_manage_all_facility_reviews" 
ON public.storage_facility_reviews 
FOR ALL 
TO authenticated
USING (is_admin_or_moderator())
WITH CHECK (is_admin_or_moderator());

-- 5. Create a public function for safe access to approved reviews (without personal info)
CREATE OR REPLACE FUNCTION public.get_public_facility_reviews()
RETURNS TABLE(
  id uuid,
  facility_id uuid,
  rating integer,
  review_text text,
  created_at timestamp with time zone
) 
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    sfr.id,
    sfr.facility_id,
    sfr.rating,
    sfr.review_text,
    sfr.created_at
  FROM public.storage_facility_reviews sfr
  WHERE sfr.status = 'approved'
  ORDER BY sfr.created_at DESC;
$$;

-- 6. Update existing reviews to approved status (assuming they were manually vetted)
UPDATE public.storage_facility_reviews 
SET status = 'approved' 
WHERE status = 'pending';

-- 7. Create index for better performance
CREATE INDEX IF NOT EXISTS idx_storage_facility_reviews_status 
ON public.storage_facility_reviews(status);

CREATE INDEX IF NOT EXISTS idx_storage_facility_reviews_facility_id 
ON public.storage_facility_reviews(facility_id);

-- 8. Log security improvement
INSERT INTO public.security_events (
  event_type,
  details,
  severity
) VALUES (
  'security_policy_update',
  '{"table": "storage_facility_reviews", "action": "implemented_rls_policies", "description": "Fixed customer reviews exposure by implementing proper RLS policies and review approval system"}',
  'high'
);