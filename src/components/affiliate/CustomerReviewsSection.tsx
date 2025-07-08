import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, User, Calendar, Shield, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCustomerReviews, CustomerReview } from '@/hooks/useCustomerReviews';
import ReviewSubmissionForm from './ReviewSubmissionForm';

interface CustomerReviewsSectionProps {
  productCategory: string;
  affiliatePartner?: string;
  productName?: string;
  className?: string;
}

const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  productCategory,
  affiliatePartner,
  productName,
  className = ""
}) => {
  const { reviews, loading, markHelpful } = useCustomerReviews(productCategory, affiliatePartner);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');

  if (loading) {
    return (
      <Card className={`bg-[#151A22] border-gray-700 ${className}`}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card className={`bg-[#151A22] border-gray-700 ${className}`}>
        <CardHeader>
          <CardTitle className="text-white">Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">
            No reviews yet. Be the first to share your experience!
          </p>
          <div className="text-center">
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Write Review
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest': return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Card className={`bg-[#151A22] border-gray-700 ${className}`}>
        {/* Rating Summary */}
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-white">Customer Reviews</CardTitle>
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Write Review
            </Button>
          </div>

          <div className="flex items-center space-x-6 mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{averageRating.toFixed(1)}</div>
              {renderStars(averageRating, 'md')}
              <div className="text-gray-400 text-sm mt-1">
                Based on {totalReviews} reviews
              </div>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = (count / totalReviews) * 100;
                return (
                  <div key={rating} className="flex items-center space-x-2 mb-1">
                    <span className="text-gray-400 text-sm w-6">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Sort Controls */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium">Reviews ({totalReviews})</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#091020] border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {sortedReviews.slice(0, 5).map((review) => (
              <div key={review.id} className="bg-[#091020] rounded-lg p-4 border border-gray-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#5B9BD5] rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">
                          {review.reviewer_name || 'Anonymous'}
                        </span>
                        {review.verified_purchase && (
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 text-green-400 mr-1" />
                            <span className="text-green-400 text-xs">Verified</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-gray-400 text-sm">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                        {review.reviewer_location && (
                          <span className="text-gray-400 text-sm">• {review.reviewer_location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="text-white font-medium mb-2">{review.title}</h5>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{review.review_text}</p>

                {review.usage_duration && (
                  <div className="text-xs text-gray-400 mb-3">
                    Used for: {review.usage_duration}
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => markHelpful(review.id)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-[#5B9BD5] text-sm transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Helpful ({review.helpful_count})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-[#5B9BD5] text-sm transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalReviews > 5 && (
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                className="text-[#5B9BD5] hover:text-[#4B8FE3] border-[#5B9BD5]"
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Submission Form */}
      {showReviewForm && (
        <ReviewSubmissionForm
          productCategory={productCategory}
          affiliatePartner={affiliatePartner}
          productName={productName}
          onClose={() => setShowReviewForm(false)}
          onSubmit={() => {
            setShowReviewForm(false);
            // Refresh reviews would happen here
          }}
        />
      )}
    </>
  );
};

export default CustomerReviewsSection;