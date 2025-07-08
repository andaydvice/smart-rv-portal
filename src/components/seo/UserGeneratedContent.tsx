import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, User, Calendar, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet';

interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface UGCProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  productName?: string;
  allowNewReviews?: boolean;
}

const UserGeneratedContent: React.FC<UGCProps> = ({
  reviews,
  averageRating,
  totalReviews,
  productName = "Smart RV Technology",
  allowNewReviews = true
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": totalReviews
    },
    "review": reviews.slice(0, 5).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.userName
      },
      "datePublished": review.date,
      "description": review.content,
      "name": review.title,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      }
    }))
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest': return new Date(a.date).getTime() - new Date(b.date).getTime();
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
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>

      <div className="bg-[#151A22] rounded-lg border border-gray-700 p-6">
        {/* Rating Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">Customer Reviews</h3>
            {allowNewReviews && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Write a Review
              </button>
            )}
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
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-6 bg-[#091020] rounded-lg p-4 border border-gray-600">
            <h4 className="text-white font-medium mb-3">Write Your Review</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-6 w-6 text-gray-600 hover:text-yellow-400 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Review Title</label>
                <input
                  type="text"
                  className="w-full bg-[#151A22] border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="Summarize your experience"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Your Review</label>
                <textarea
                  rows={4}
                  className="w-full bg-[#151A22] border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="Tell us about your experience with our RV technology"
                />
              </div>
              <div className="flex space-x-3">
                <button className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-4 py-2 rounded-lg text-sm">
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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
                      <span className="text-white font-medium">{review.userName}</span>
                      {review.verified && (
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
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="text-white font-medium mb-2">{review.title}</h5>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">{review.content}</p>

              {review.images && review.images.length > 0 && (
                <div className="flex space-x-2 mb-3">
                  {review.images.slice(0, 3).map((image, index) => (
                    <div key={index} className="w-16 h-16 bg-gray-700 rounded-lg" />
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-400 hover:text-[#5B9BD5] text-sm">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-400 hover:text-[#5B9BD5] text-sm">
                  <MessageSquare className="h-4 w-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalReviews > 5 && (
          <div className="text-center mt-6">
            <button className="text-[#5B9BD5] hover:text-[#4B8FE3] text-sm font-medium">
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserGeneratedContent;