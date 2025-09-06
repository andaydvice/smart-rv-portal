import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';

interface PublicReview {
  id: string;
  product_name: string;
  product_category: string;
  affiliate_partner: string;
  rating: number;
  title: string;
  review_text: string;
  helpful_count: number;
  verified_purchase: boolean;
  usage_duration: string;
  created_at: string;
  recommended: boolean;
  featured: boolean;
}

interface PublicReviewsListProps {
  limit?: number;
  productCategory?: string;
}

export const PublicReviewsList: React.FC<PublicReviewsListProps> = ({ 
  limit = 10, 
  productCategory 
}) => {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicReviews = async () => {
      try {
        setLoading(true);
        
        // Use the secure public function that excludes sensitive customer data
        const { data, error } = await supabase.rpc('get_public_reviews');
        
        if (error) throw error;
        
        let filteredReviews = data || [];
        
        // Filter by category if specified
        if (productCategory) {
          filteredReviews = filteredReviews.filter(
            (review: PublicReview) => review.product_category === productCategory
          );
        }
        
        // Apply limit
        filteredReviews = filteredReviews.slice(0, limit);
        
        setReviews(filteredReviews);
      } catch (err) {
        console.error('Error fetching public reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicReviews();
  }, [limit, productCategory]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center text-red-600">
        <p>{error}</p>
      </Card>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <p>No reviews available at this time.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        Customer Reviews ({reviews.length})
      </h3>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {review.product_name} • {review.product_category}
                </p>
                {renderStars(review.rating)}
              </div>
              
              <div className="flex flex-col items-end text-sm text-gray-500">
                {review.verified_purchase && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mb-1">
                    Verified Purchase
                  </span>
                )}
                {review.featured && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mb-1">
                    Featured
                  </span>
                )}
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{review.review_text}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                {review.usage_duration && (
                  <span>Used for: {review.usage_duration}</span>
                )}
                
                <div className="flex items-center gap-1">
                  <span className={review.recommended ? 'text-green-600' : 'text-gray-500'}>
                    {review.recommended ? '👍 Recommended' : '👎 Not Recommended'}
                  </span>
                </div>
              </div>
              
              {review.helpful_count > 0 && (
                <span>{review.helpful_count} found this helpful</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};