import React, { useState } from 'react';
import { Star, X, Shield, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCustomerReviews } from '@/hooks/useCustomerReviews';
import { useToast } from '@/components/ui/use-toast';

interface ReviewSubmissionFormProps {
  productCategory: string;
  affiliatePartner?: string;
  productName?: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ReviewSubmissionForm: React.FC<ReviewSubmissionFormProps> = ({
  productCategory,
  affiliatePartner,
  productName,
  onClose,
  onSubmit
}) => {
  const { submitReview } = useCustomerReviews();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    product_name: productName || '',
    rating: 0,
    title: '',
    review_text: '',
    reviewer_name: '',
    reviewer_location: '',
    usage_duration: '',
    verified_purchase: false
  });
  
  const [submitting, setSubmitting] = useState(false);

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.title.trim() || !formData.review_text.trim()) {
      toast({
        title: "Required Fields",
        description: "Please fill in both the title and review text.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    const result = await submitReview({
      ...formData,
      product_category: productCategory,
      affiliate_partner: affiliatePartner || 'general',
      verified_purchase: formData.verified_purchase,
      recommended: formData.rating >= 4
    });

    if (result.success) {
      toast({
        title: "Review Submitted!",
        description: "Thank you for your review. It will be published after moderation.",
      });
      onSubmit();
    } else {
      toast({
        title: "Submission Error",
        description: result.error || "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    }
    
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="bg-[#151A22] border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Write Your Review</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Product Name</label>
              <Input
                value={formData.product_name}
                onChange={(e) => setFormData(prev => ({ ...prev, product_name: e.target.value }))}
                className="bg-[#091020] border-gray-600 text-white"
                placeholder="Enter the product you're reviewing"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Rating *</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="transition-colors"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= formData.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-600 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Review Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-[#091020] border-gray-600 text-white"
                placeholder="Summarize your experience"
                required
              />
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Your Review *</label>
              <Textarea
                rows={5}
                value={formData.review_text}
                onChange={(e) => setFormData(prev => ({ ...prev, review_text: e.target.value }))}
                className="bg-[#091020] border-gray-600 text-white"
                placeholder="Tell us about your experience with this product"
                required
              />
            </div>

            {/* Reviewer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Your Name</label>
                <Input
                  value={formData.reviewer_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, reviewer_name: e.target.value }))}
                  className="bg-[#091020] border-gray-600 text-white"
                  placeholder="Optional"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Location</label>
                <Input
                  value={formData.reviewer_location}
                  onChange={(e) => setFormData(prev => ({ ...prev, reviewer_location: e.target.value }))}
                  className="bg-[#091020] border-gray-600 text-white"
                  placeholder="City, State"
                />
              </div>
            </div>

            {/* Usage Duration */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">How long have you used this product?</label>
              <select
                value={formData.usage_duration}
                onChange={(e) => setFormData(prev => ({ ...prev, usage_duration: e.target.value }))}
                className="w-full bg-[#091020] border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="">Select duration</option>
                <option value="Less than 1 month">Less than 1 month</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="1-2 years">1-2 years</option>
                <option value="More than 2 years">More than 2 years</option>
              </select>
            </div>

            {/* Verified Purchase */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified_purchase}
                onChange={(e) => setFormData(prev => ({ ...prev, verified_purchase: e.target.checked }))}
                className="rounded border-gray-600 bg-[#091020]"
              />
              <label htmlFor="verified" className="text-gray-300 text-sm flex items-center">
                <Shield className="h-4 w-4 text-green-400 mr-2" />
                This is a verified purchase
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button 
                type="submit" 
                disabled={submitting}
                className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white flex-1"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSubmissionForm;