-- Fix customer reviews security vulnerability with proper cleanup

-- First, drop ALL existing policies to start fresh
DO $$ 
DECLARE
    pol record;
BEGIN
    -- Drop all existing policies on customer_reviews
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'customer_reviews' 
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.customer_reviews', pol.policyname);
    END LOOP;
END $$;

-- Create new secure RLS policies

-- 1. Users can still create their own reviews
CREATE POLICY "user_insert_own_reviews"
ON public.customer_reviews
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. Users can update their own pending reviews
CREATE POLICY "user_update_own_pending_reviews"
ON public.customer_reviews
FOR UPDATE
TO authenticated
USING ((auth.uid() = user_id) AND (status = 'pending'::text))
WITH CHECK ((auth.uid() = user_id) AND (status = 'pending'::text));

-- 3. Authenticated users can view approved reviews (this replaces public access)
CREATE POLICY "authenticated_view_approved_reviews"
ON public.customer_reviews
FOR SELECT
TO authenticated
USING (status = 'approved'::text);

-- 4. Users can view their own reviews regardless of status
CREATE POLICY "user_view_own_reviews"
ON public.customer_reviews
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 5. Admins and moderators can view all reviews for moderation
CREATE POLICY "admin_view_all_reviews"
ON public.customer_reviews
FOR SELECT
TO authenticated
USING (is_admin_or_moderator());

-- 6. Admins and moderators can update any review (for moderation)
CREATE POLICY "admin_update_reviews"
ON public.customer_reviews
FOR UPDATE
TO authenticated
USING (is_admin_or_moderator())
WITH CHECK (is_admin_or_moderator());

-- Create a secure public function for anonymous access to non-sensitive review data
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
    -- This function excludes sensitive personal information:
    -- - reviewer_name (customer identity)
    -- - reviewer_location (geographic personal data)
    -- - purchase_date (personal purchase history)
    -- - user_id (internal user identifier)
    -- - images (may contain personal data)
    ORDER BY cr.created_at DESC;
$$;