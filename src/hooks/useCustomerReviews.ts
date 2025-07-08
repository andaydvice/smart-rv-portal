import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CustomerReview {
  id: string;
  product_name: string;
  product_category: string;
  affiliate_partner: string;
  rating: number;
  title: string;
  review_text: string;
  reviewer_name?: string;
  reviewer_location?: string;
  verified_purchase: boolean;
  helpful_count: number;
  images?: string[];
  created_at: string;
  usage_duration?: string;
  recommended?: boolean;
}

export const useCustomerReviews = (productCategory?: string, affiliatePartner?: string) => {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('customer_reviews')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (productCategory) {
          query = query.eq('product_category', productCategory);
        }

        if (affiliatePartner) {
          query = query.eq('affiliate_partner', affiliatePartner);
        }

        const { data, error } = await query;

        if (error) throw error;
        setReviews(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productCategory, affiliatePartner]);

  const submitReview = async (reviewData: Omit<CustomerReview, 'id' | 'created_at' | 'helpful_count'>) => {
    try {
      const { data, error } = await supabase
        .from('customer_reviews')
        .insert([{
          ...reviewData,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to submit review' 
      };
    }
  };

  const markHelpful = async (reviewId: string) => {
    try {
      // First get current helpful count
      const currentReview = reviews.find(r => r.id === reviewId);
      if (!currentReview) return;

      // Update the helpful count directly
      const { error } = await supabase
        .from('customer_reviews')
        .update({ helpful_count: currentReview.helpful_count + 1 })
        .eq('id', reviewId);

      if (error) throw error;
      
      // Update local state
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful_count: review.helpful_count + 1 }
          : review
      ));
    } catch (err) {
      console.error('Failed to mark review as helpful:', err);
    }
  };

  return {
    reviews,
    loading,
    error,
    submitReview,
    markHelpful
  };
};