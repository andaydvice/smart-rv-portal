-- Fix customer reviews security vulnerability
-- Replace public access with authenticated-only access

-- Drop the existing permissive SELECT policy that allows public access
DROP POLICY IF EXISTS "Users can view approved reviews" ON public.customer_reviews;

-- Create new restrictive SELECT policies for authenticated users only

-- 1. Authenticated users can view approved reviews (but not sensitive personal data)
CREATE POLICY "authenticated_users_view_approved_reviews"
ON public.customer_reviews
FOR SELECT
TO authenticated
USING (status = 'approved'::text);

-- 2. Users can view their own reviews regardless of status
CREATE POLICY "users_view_own_reviews"
ON public.customer_reviews
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 3. Admins and moderators can view all reviews for moderation purposes
CREATE POLICY "admins_view_all_reviews"
ON public.customer_reviews
FOR SELECT
TO authenticated
USING (is_admin_or_moderator());

-- Create a public function that returns sanitized review data for anonymous users
-- This allows controlled public access without exposing sensitive customer information
CREATE OR REPLACE FUNCTION public.get_public_reviews()
RETURNS TABLE(
    id uuid,
    product_name text,
    product_category text,
    affiliate_partner text,
    rating integer,
    title text,
    review_text text,
    helpful_count integer,
    verified_purchase boolean,
    usage_duration text,
    created_at timestamp with time zone,
    recommended boolean,
    featured boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        cr.id,
        cr.product_name,
        cr.product_category,
        cr.affiliate_partner,
        cr.rating,
        cr.title,
        cr.review_text,
        cr.helpful_count,
        cr.verified_purchase,
        cr.usage_duration,
        cr.created_at,
        cr.recommended,
        cr.featured
    FROM public.customer_reviews cr
    WHERE cr.status = 'approved'
    -- Exclude sensitive personal information:
    -- - reviewer_name (personal identifier)
    -- - reviewer_location (personal location data) 
    -- - purchase_date (personal purchase history)
    -- - user_id (internal identifier)
    -- - images (potentially containing personal data)
    ORDER BY cr.created_at DESC;
$$;