/**
 * Ethical Testimonial System - Usage Examples
 *
 * This file demonstrates how to implement the ethical testimonial system
 * that collects and displays ONLY real customer testimonials.
 *
 * DO NOT USE FAKE TESTIMONIALS - This system is designed to collect authentic reviews.
 */

import React, { useState, useEffect } from 'react';
import {
  TestimonialSubmission,
  TestimonialManager,
  SafeTestimonialDisplay,
  TrustSignals,
  TRUST_SIGNAL_PRESETS,
  type TestimonialFormData,
  type VerifiedTestimonial,
  type TestimonialSubmissionData,
} from './index';

// =============================================================================
// EXAMPLE 1: Public Testimonial Submission Page
// =============================================================================

/**
 * Add this component to a public page (e.g., /submit-review or /testimonials)
 * so customers can submit their real experiences
 */
export function PublicTestimonialSubmissionPage() {
  const handleSubmit = async (data: TestimonialFormData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('location', data.location);
      formData.append('rvType', data.rvType);
      formData.append('rating', data.rating.toString());
      formData.append('testimonial', data.testimonial);
      formData.append('consent', data.consent.toString());
      formData.append('verifiedPurchase', data.verifiedPurchase.toString());

      if (data.purchaseEmail) {
        formData.append('purchaseEmail', data.purchaseEmail);
      }

      if (data.photo) {
        formData.append('photo', data.photo);
      }

      // Submit to your API
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit testimonial');
      }

      // Success - component will show success message
    } catch (error) {
      // Component will show error message
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Share Your RV Life Pro Experience</h1>
          <p className="text-lg text-gray-600">
            Help fellow RV owners by sharing your honest review of RV Life Pro.
            Your feedback helps others make informed decisions.
          </p>
        </div>

        <TestimonialSubmission onSubmit={handleSubmit} />

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-bold text-lg mb-2">Why Your Review Matters</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ All testimonials are reviewed and verified before publication</li>
            <li>✓ Your email will never be displayed publicly</li>
            <li>✓ You can verify your purchase for a "Verified Customer" badge</li>
            <li>✓ Help the RV community make better decisions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// EXAMPLE 2: Admin Dashboard for Managing Testimonials
// =============================================================================

/**
 * Add this component to your admin dashboard (e.g., /admin/testimonials)
 * Requires authentication middleware
 */
export function AdminTestimonialDashboard() {
  const [testimonials, setTestimonials] = useState<TestimonialSubmissionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Your auth method
        },
      });

      if (!response.ok) throw new Error('Failed to load testimonials');

      const data = await response.json();
      setTestimonials(data.testimonials);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, notes?: string) => {
    try {
      await fetch(`/api/admin/testimonials/${id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ notes }),
      });

      // Reload testimonials
      await loadTestimonials();

      // Optionally send approval email to customer
      alert('Testimonial approved successfully!');
    } catch (error) {
      console.error('Error approving testimonial:', error);
      alert('Failed to approve testimonial');
    }
  };

  const handleReject = async (id: string, reason: string) => {
    try {
      await fetch(`/api/admin/testimonials/${id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ reason }),
      });

      // Reload testimonials
      await loadTestimonials();

      // Send rejection email with reason
      alert('Testimonial rejected. Customer will be notified.');
    } catch (error) {
      console.error('Error rejecting testimonial:', error);
      alert('Failed to reject testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      await loadTestimonials();
      alert('Testimonial deleted successfully');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  const handleVerifyPurchase = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}/verify-purchase`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      const data = await response.json();

      if (data.verified) {
        alert('Purchase verified successfully!');
        await loadTestimonials();
      } else {
        alert('Could not verify purchase. Please check manually.');
      }

      return data.verified;
    } catch (error) {
      console.error('Error verifying purchase:', error);
      alert('Verification failed');
      return false;
    }
  };

  const handleEdit = async (id: string, updates: Partial<TestimonialSubmissionData>) => {
    try {
      await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(updates),
      });

      await loadTestimonials();
      alert('Testimonial updated successfully');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('Failed to update testimonial');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading testimonials...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TestimonialManager
        testimonials={testimonials}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
        onVerifyPurchase={handleVerifyPurchase}
        onEdit={handleEdit}
      />
    </div>
  );
}

// =============================================================================
// EXAMPLE 3: Public Display of Verified Testimonials
// =============================================================================

/**
 * Display verified testimonials on your homepage or testimonials page
 * Automatically falls back to trust signals if no testimonials exist
 */
export function PublicTestimonialsDisplay() {
  const [testimonials, setTestimonials] = useState<VerifiedTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApprovedTestimonials();
  }, []);

  const loadApprovedTestimonials = async () => {
    try {
      // Fetch ONLY approved testimonials
      const response = await fetch('/api/testimonials?status=approved&limit=12');

      if (!response.ok) throw new Error('Failed to load testimonials');

      const data = await response.json();
      setTestimonials(data.testimonials);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      // Component will show fallback automatically
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading reviews...</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SafeTestimonialDisplay
          testimonials={testimonials}
          layout="grid"
          maxDisplay={6}
          showVerifiedBadge={true}
        />

        {/* Link to submit testimonial */}
        {testimonials.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Are you a RV Life Pro customer?
            </p>
            <a
              href="/submit-review"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Share Your Experience
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

// =============================================================================
// EXAMPLE 4: Trust Signals (Use when no testimonials exist)
// =============================================================================

/**
 * Display trust signals as an alternative or supplement to testimonials
 * Use verifiable data only
 */
export function TrustSignalsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Option 1: Default trust signals */}
        <TrustSignals layout="grid" showLinks={true} />

        {/* Option 2: Custom trust signals */}
        {/* <TrustSignals
          signals={[
            ...TRUST_SIGNAL_PRESETS.appRatings,
            ...TRUST_SIGNAL_PRESETS.userStats,
          ]}
          layout="horizontal"
          showLinks={true}
        /> */}
      </div>
    </section>
  );
}

// =============================================================================
// EXAMPLE 5: Combined Approach (Testimonials + Trust Signals)
// =============================================================================

/**
 * Show testimonials AND trust signals together
 * This provides multiple forms of social proof
 */
export function ComprehensiveSocialProof() {
  const [testimonials, setTestimonials] = useState<VerifiedTestimonial[]>([]);

  useEffect(() => {
    fetch('/api/testimonials?status=approved&limit=6')
      .then(res => res.json())
      .then(data => setTestimonials(data.testimonials))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-16">
      {/* Trust Signals - Always show */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <TrustSignals layout="grid" showLinks={true} />
        </div>
      </section>

      {/* Verified Testimonials - Show if available */}
      {testimonials.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <SafeTestimonialDisplay
              testimonials={testimonials}
              layout="grid"
              maxDisplay={6}
              showVerifiedBadge={true}
            />
          </div>
        </section>
      )}

      {/* Call to Action for Submissions */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Help other RV owners by sharing your honest review of RV Life Pro.
            All verified customers receive a special badge.
          </p>
          <a
            href="/submit-review"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Submit Your Review
          </a>
        </div>
      </section>
    </div>
  );
}

// =============================================================================
// EXAMPLE 6: Homepage Hero with Trust Signals
// =============================================================================

/**
 * Use trust signals in your hero section for immediate credibility
 */
export function HeroWithTrustSignals() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Never Risk a $15,000 Bridge Strike Again
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            RV-safe GPS routing preventing bridge strikes and dangerous routes
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Free 14-Day Trial
          </button>
        </div>

        {/* Compact trust signals */}
        <div className="max-w-4xl mx-auto">
          <TrustSignals layout="compact" showLinks={false} />
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get authentication token (replace with your auth method)
 */
function getAuthToken(): string {
  // Example: return localStorage.getItem('authToken') || '';
  return 'your-auth-token';
}

// =============================================================================
// API Implementation Examples (Backend)
// =============================================================================

/**
 * Example API Routes (Next.js API routes or Express.js)
 *
 * POST /api/testimonials
 * - Handles testimonial submission
 * - Uploads photo to storage
 * - Sends confirmation email
 * - Stores in database with status='pending'
 *
 * GET /api/testimonials?status=approved
 * - Returns approved testimonials only
 * - Public endpoint (no auth required)
 *
 * GET /api/admin/testimonials
 * - Returns all testimonials with filters
 * - Requires admin authentication
 *
 * POST /api/admin/testimonials/:id/approve
 * - Approves a testimonial
 * - Updates status to 'approved'
 * - Sends approval email
 *
 * POST /api/admin/testimonials/:id/reject
 * - Rejects a testimonial
 * - Updates status to 'rejected'
 * - Sends rejection email with reason
 *
 * POST /api/admin/testimonials/:id/verify-purchase
 * - Checks if customer purchased RV Life Pro
 * - Updates verified_purchase flag
 */

export default PublicTestimonialSubmissionPage;
