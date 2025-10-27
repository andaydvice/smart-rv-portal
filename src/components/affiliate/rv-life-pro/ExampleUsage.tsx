/**
 * RV Life Pro Affiliate System - Complete Example
 *
 * This file demonstrates how to use all the affiliate tracking components
 * and utilities together in a real landing page scenario.
 *
 * Copy and adapt this example for your actual pages.
 */

import React, { useState } from 'react';
import {
  RVLifeAffiliateLink,
  DiscountCodeBox,
  ExitIntentModal,
} from '@/components/affiliate/rv-life-pro';
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';
import { RV_LIFE_PRO_CONFIG } from '@/config/affiliate/rvLifePro';
import { MapPin, Star, Shield, Smartphone, TrendingUp, Users } from 'lucide-react';

/**
 * Example RV Life Pro Landing Page
 *
 * Demonstrates:
 * - Hero section with primary CTA
 * - Feature grid with tracking
 * - Sidebar discount code box
 * - Video integration with tracking
 * - Exit intent modal
 * - Comprehensive analytics
 */
export const RVLifeProExamplePage: React.FC = () => {
  const [videoWatchTime, setVideoWatchTime] = useState(0);

  // Initialize tracking hook
  const {
    trackCTAClick,
    trackVideoPlay,
    trackVideoComplete,
    trackFeatureClick,
    trackCustomEvent,
  } = useRVLifeTracking({
    pageName: 'rv-life-pro-example',
    trackScrollDepth: true,
    trackTimeOnPage: true,
    scrollThresholds: [25, 50, 75, 100],
  });

  // Sample features
  const features = [
    {
      id: 'campgrounds',
      name: '14,000+ Campgrounds',
      description: 'Comprehensive database of RV parks and campgrounds',
      icon: MapPin,
      color: 'text-blue-500',
    },
    {
      id: 'reviews',
      name: 'Verified Reviews',
      description: 'Real reviews from fellow RVers',
      icon: Star,
      color: 'text-yellow-500',
    },
    {
      id: 'offline',
      name: 'Offline Access',
      description: 'Download maps and use without internet',
      icon: Smartphone,
      color: 'text-green-500',
    },
    {
      id: 'updates',
      name: 'Live Updates',
      description: 'Real-time campground availability',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
    {
      id: 'guarantee',
      name: '30-Day Guarantee',
      description: 'Risk-free trial with money-back guarantee',
      icon: Shield,
      color: 'text-red-500',
    },
    {
      id: 'community',
      name: 'Active Community',
      description: 'Join thousands of RV enthusiasts',
      icon: Users,
      color: 'text-indigo-500',
    },
  ];

  const handleVideoPlay = () => {
    trackVideoPlay('rv-life-demo', 'RV Life Pro Demo Video');
    setVideoWatchTime(0);
  };

  const handleVideoEnd = () => {
    trackVideoComplete('rv-life-demo', 'RV Life Pro Demo Video', videoWatchTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Your Perfect RV Adventure
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Access {RV_LIFE_PRO_CONFIG.features.campgroundCount.toLocaleString()}+
            campgrounds, offline maps, and premium features with RV Life Pro
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <RVLifeAffiliateLink
              campaign={RV_LIFE_PRO_CONFIG.campaigns.hero}
              buttonText={`Start ${RV_LIFE_PRO_CONFIG.features.freeTrialDays}-Day Free Trial`}
              variant="default"
              size="lg"
              trackingLabel="Hero Primary CTA"
              showDiscountTooltip={true}
            />
            <button
              onClick={() => {
                trackCustomEvent('learn_more_click', { location: 'hero' });
                // Scroll to features
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 border-2 border-gray-300 rounded-md font-semibold hover:border-gray-400 transition-colors"
            >
              Learn More
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span>4.8/5 from 2,500+ reviews</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Video Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                See RV Life Pro in Action
              </h2>
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                {/* Replace with actual video */}
                <div className="text-center">
                  <button
                    onClick={handleVideoPlay}
                    className="bg-white rounded-full p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <svg
                      className="w-12 h-12 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <p className="mt-4 text-gray-600">
                    Watch Demo Video (2:30)
                  </p>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section id="features">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need for RV Life
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      onClick={() => trackFeatureClick(feature.name, 'click')}
                      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 bg-gray-50 rounded-lg ${feature.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {feature.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Comparison Table */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose RV Life Pro?
              </h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Feature
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        Free Version
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-green-600 bg-green-50">
                        RV Life Pro
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Campground Database</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">5,000+</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                        14,000+
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Offline Maps</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Limited</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                        Unlimited
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Custom Placemarks</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">10</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                        Unlimited
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Live Updates</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">-</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                        ✓
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Elevate Your RV Experience?
              </h2>
              <p className="text-xl mb-6 text-blue-100">
                Join thousands of satisfied RVers using RV Life Pro
              </p>
              <RVLifeAffiliateLink
                campaign={RV_LIFE_PRO_CONFIG.campaigns.footer}
                buttonText="Get Started Now"
                variant="secondary"
                size="lg"
                trackingLabel="Bottom CTA"
                showDiscountTooltip={true}
                className="bg-white text-blue-600 hover:bg-gray-100"
              />
              <p className="text-sm text-blue-200 mt-4">
                {RV_LIFE_PRO_CONFIG.features.freeTrialDays}-day free trial •
                No credit card required •
                {RV_LIFE_PRO_CONFIG.features.moneyBackGuaranteeDays}-day money-back guarantee
              </p>
            </section>
          </div>

          {/* Sidebar (1/3) */}
          <aside className="space-y-6">
            {/* Discount Code Box */}
            <div className="sticky top-4">
              <DiscountCodeBox
                codeType="standard"
                expiryDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // 7 days from now
                showUrgency={true}
                location="sidebar"
              />

              {/* Quick CTA */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Start Your Free Trial
                </h3>
                <ul className="space-y-3 mb-6 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Access all {RV_LIFE_PRO_CONFIG.features.campgroundCount.toLocaleString()}+ campgrounds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Offline maps for your entire trip</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Unlimited custom placemarks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Cancel anytime, no questions asked</span>
                  </li>
                </ul>
                <RVLifeAffiliateLink
                  campaign={RV_LIFE_PRO_CONFIG.campaigns.sidebar}
                  buttonText="Try It Free"
                  variant="default"
                  size="lg"
                  trackingLabel="Sidebar CTA"
                  className="w-full"
                  showIcon={false}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Exit Intent Modal */}
      <ExitIntentModal
        disabled={false}
        initialDelay={5000}
        expiryDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // 7 days from now
      />
    </div>
  );
};

export default RVLifeProExamplePage;
