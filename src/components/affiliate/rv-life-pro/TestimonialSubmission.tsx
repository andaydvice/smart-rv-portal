import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Send,
  Upload,
  Check,
  AlertCircle,
  Star,
  Loader2,
  Shield,
  Mail,
  MapPin,
  Truck,
  User,
  MessageSquare
} from 'lucide-react';
import '@/styles/affiliate/rv-life-pro.css';

export interface TestimonialFormData {
  name: string;
  email: string;
  location: string;
  rvType: string;
  rating: number;
  testimonial: string;
  photo?: File | null;
  consent: boolean;
  verifiedPurchase: boolean;
  purchaseEmail?: string;
}

export interface TestimonialSubmissionProps {
  onSubmit: (data: TestimonialFormData) => Promise<void>;
  className?: string;
}

/**
 * TestimonialSubmission - Form for customers to submit real testimonials
 *
 * CRITICAL: This component collects REAL customer testimonials only.
 * NO fake testimonials should ever be created or displayed.
 *
 * Features:
 * - Complete form validation
 * - Photo upload with preview
 * - Email verification
 * - Consent checkbox (required)
 * - Star rating input
 * - Purchase verification option
 * - Accessible form controls
 * - Success/error states
 *
 * Data Flow:
 * 1. Customer fills form
 * 2. Submits to backend/email
 * 3. Admin reviews in TestimonialManager
 * 4. Approved testimonials appear in SafeTestimonialDisplay
 */
export const TestimonialSubmission: React.FC<TestimonialSubmissionProps> = ({
  onSubmit,
  className,
}) => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    email: '',
    location: '',
    rvType: '',
    rating: 5,
    testimonial: '',
    photo: null,
    consent: false,
    verifiedPurchase: false,
    purchaseEmail: '',
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Photo must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please upload an image file');
        return;
      }

      setFormData(prev => ({ ...prev, photo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name');
      return false;
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    if (!formData.location.trim()) {
      setErrorMessage('Please enter your location');
      return false;
    }

    if (!formData.rvType.trim()) {
      setErrorMessage('Please enter your RV type');
      return false;
    }

    if (!formData.testimonial.trim() || formData.testimonial.length < 50) {
      setErrorMessage('Please write a testimonial of at least 50 characters');
      return false;
    }

    if (!formData.consent) {
      setErrorMessage('You must consent to use of your testimonial');
      return false;
    }

    if (formData.verifiedPurchase && !formData.purchaseEmail?.trim()) {
      setErrorMessage('Please provide purchase email for verification');
      return false;
    }

    return true;
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(formData);
      setSubmitStatus('success');

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          location: '',
          rvType: '',
          rating: 5,
          testimonial: '',
          photo: null,
          consent: false,
          verifiedPurchase: false,
          purchaseEmail: '',
        });
        setPhotoPreview(null);
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating ?? formData.rating;

  return (
    <motion.div
      className={cn('rv-card-base p-6 md:p-8 max-w-2xl mx-auto', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] rounded-full mb-4">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h2 className="rv-headline-secondary mb-2">Share Your Experience</h2>
        <p className="rv-body-base text-[var(--rv-text-muted)]">
          Help other RV owners make informed decisions by sharing your real experience with RV Life Pro.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="flex items-center gap-2 rv-body-base font-semibold text-[var(--rv-text-primary)] mb-2">
            <User className="w-4 h-4" />
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--rv-life-primary-blue)] focus:outline-none transition-colors"
            placeholder="John Smith"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="flex items-center gap-2 rv-body-base font-semibold text-[var(--rv-text-primary)] mb-2">
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--rv-life-primary-blue)] focus:outline-none transition-colors"
            placeholder="john@example.com"
            required
          />
          <p className="text-sm text-[var(--rv-text-muted)] mt-1">
            We'll send a verification email. Your email won't be displayed publicly.
          </p>
        </div>

        {/* Location Field */}
        <div>
          <label htmlFor="location" className="flex items-center gap-2 rv-body-base font-semibold text-[var(--rv-text-primary)] mb-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--rv-life-primary-blue)] focus:outline-none transition-colors"
            placeholder="Melbourne, VIC"
            required
          />
        </div>

        {/* RV Type Field */}
        <div>
          <label htmlFor="rvType" className="flex items-center gap-2 rv-body-base font-semibold text-[var(--rv-text-primary)] mb-2">
            <Truck className="w-4 h-4" />
            RV Type
          </label>
          <input
            type="text"
            id="rvType"
            name="rvType"
            value={formData.rvType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--rv-life-primary-blue)] focus:outline-none transition-colors"
            placeholder="6.2m Caravan"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="flex items-center gap-2 rv-body-base font-semibold text-[var(--rv-text-primary)] mb-3">
            <Star className="w-4 h-4" />
            Your Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingClick(rating)}
                onMouseEnter={() => setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(null)}
                className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--rv-life-primary-blue)] rounded"
                aria-label={`Rate ${rating} stars`}
              >
                <Star
                  className={cn(
                    'w-10 h-10 transition-colors',
                    rating <= displayRating
                      ? 'fill-[var(--rv-life-accent-orange)] text-[var(--rv-life-accent-orange)]'
                      : 'fill-gray-200 text-gray-200'
                  )}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-[var(--rv-text-muted)] mt-2">
            {displayRating === 5 && 'Excellent!'}
            {displayRating === 4 && 'Very Good'}
            {displayRating === 3 && 'Good'}
            {displayRating === 2 && 'Fair'}
            {displayRating === 1 && 'Poor'}
          </p>
        </div>

        {/* Testimonial Text */}
        <div>
          <label htmlFor="testimonial" className="flex items-center gap-2 rv-body-base font-semibold text-[var(--rv-text-primary)] mb-2">
            <MessageSquare className="w-4 h-4" />
            Your Testimonial
          </label>
          <textarea
            id="testimonial"
            name="testimonial"
            value={formData.testimonial}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--rv-life-primary-blue)] focus:outline-none transition-colors resize-none"
            placeholder="Share your experience with RV Life Pro. How has it helped you? What features do you value most?"
            required
          />
          <p className="text-sm text-[var(--rv-text-muted)] mt-1">
            Minimum 50 characters ({formData.testimonial.length}/50)
          </p>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="flex items-center gap-2 rv-body-base font-semibold text-[var(--rv-text-primary)] mb-2">
            <Upload className="w-4 h-4" />
            Your Photo (Optional)
          </label>
          <div className="flex items-start gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[var(--rv-life-primary-blue)] transition-colors">
                <Upload className="w-8 h-8 text-[var(--rv-text-muted)] mx-auto mb-2" />
                <p className="text-sm text-[var(--rv-text-muted)]">
                  Click to upload photo (max 5MB)
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
            {photoPreview && (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-[var(--rv-life-light-bg)]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, photo: null }));
                    setPhotoPreview(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="Remove photo"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Verified Purchase Option */}
        <div className="bg-[var(--rv-life-light-bg)] p-4 rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="verifiedPurchase"
              checked={formData.verifiedPurchase}
              onChange={handleInputChange}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-[var(--rv-text-primary)] mb-1">
                <Shield className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                Verified Purchase
              </div>
              <p className="text-sm text-[var(--rv-text-muted)]">
                I can verify I'm a RV Life Pro customer. This adds a "Verified Purchase" badge to your testimonial.
              </p>
            </div>
          </label>

          {formData.verifiedPurchase && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <input
                type="email"
                name="purchaseEmail"
                value={formData.purchaseEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[var(--rv-life-primary-blue)] focus:outline-none transition-colors"
                placeholder="Email used for RV Life Pro purchase"
              />
            </motion.div>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="border-2 border-[var(--rv-life-accent-orange)] border-opacity-30 p-4 rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
            <div className="text-sm text-[var(--rv-text-secondary)]">
              <strong>Required:</strong> I consent to having my name, location, and testimonial displayed on this website.
              I understand my email will not be displayed publicly but may be used for verification purposes.
            </div>
          </label>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-3 bg-red-50 border-2 border-red-200 text-red-800 p-4 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-3 bg-green-50 border-2 border-green-200 text-green-800 p-4 rounded-lg"
            >
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Thank you for your testimonial!</p>
                <p className="text-sm">
                  We've received your submission and will review it shortly. You'll receive an email confirmation.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          className={cn(
            'w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300',
            'flex items-center justify-center gap-2',
            isSubmitting || submitStatus === 'success'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'rv-button-primary'
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : submitStatus === 'success' ? (
            <>
              <Check className="w-5 h-5" />
              Submitted!
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Testimonial
            </>
          )}
        </button>
      </form>

      {/* Privacy Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-[var(--rv-text-muted)]">
          <strong>Privacy Policy:</strong> Your email address will only be used for verification purposes and will never be displayed publicly or shared with third parties.
          All submitted testimonials are reviewed before publication to ensure authenticity.
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialSubmission;
