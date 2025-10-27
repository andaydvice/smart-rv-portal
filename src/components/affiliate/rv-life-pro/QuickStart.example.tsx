/**
 * RV Life Pro Design System - Quick Start Example
 *
 * This file demonstrates how to quickly build a complete landing page
 * using the RV Life Pro design system components.
 *
 * Copy this file and customize it for your needs!
 */

import React from 'react';
import {
  RVLifeHeroSection,
  RVLifeCard,
  RVLifeCardGrid,
  RVLifeFeatureBlock,
  RVLifeTestimonialGrid,
  RVLifePricingCard,
  RVLifeFAQSection,
  RVLifeTrustBadgeGroup,
} from '@/components/affiliate/rv-life-pro';

// Import icons from lucide-react
import {
  Map,
  Compass,
  Wifi,
  Shield,
  Star,
  Users,
  Navigation,
  Phone,
  CheckCircle2,
} from 'lucide-react';

export default function RVLifeProQuickStartPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <RVLifeHeroSection
        headline="Your Ultimate RV Trip Planning Companion"
        subheadline="Access 14,000+ campgrounds, RV-specific GPS routing, and offline maps"
        description="Join over 50,000 RVers who trust RV Life Pro to plan their perfect adventures"
        cta={{
          primary: {
            text: 'Start Your Free 7-Day Trial',
            href: '#pricing',
          },
          secondary: {
            text: 'Watch Demo Video',
            onClick: () => console.log('Open video modal'),
          },
        }}
        backgroundImage="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1920"
        backgroundOverlay={true}
        overlayOpacity={0.7}
        trustIndicators={[
          { type: 'rating', rating: 4.8 },
          { type: 'users', text: '50,000+ Happy RVers' },
          { type: 'moneyback' },
        ]}
        height="large"
        alignment="center"
        showScrollIndicator={true}
      />

      {/* Trust Badges Section */}
      <section className="py-8 bg-[var(--rv-life-light-bg)]">
        <div className="rv-container">
          <RVLifeTrustBadgeGroup
            badges={[
              { type: 'secure', size: 'small' },
              { type: 'moneyback', size: 'small' },
              { type: 'support', size: 'small' },
              { type: 'satisfaction', size: 'small' },
            ]}
            layout="horizontal"
            centered
          />
        </div>
      </section>

      {/* Features Overview - Cards */}
      <section className="rv-section">
        <div className="rv-container">
          <h2 className="rv-headline-primary text-center mb-4">
            Everything You Need for the Perfect RV Trip
          </h2>
          <p className="rv-body-large text-center text-[var(--rv-text-secondary)] mb-12 max-w-3xl mx-auto">
            Comprehensive tools designed specifically for RV travelers
          </p>

          <RVLifeCardGrid columns={3}>
            <RVLifeCard
              icon={<Map />}
              iconBgColor="var(--rv-life-primary-blue)"
              headline="14,000+ Campgrounds"
              body="Access the most comprehensive RV campground database in North America with detailed reviews and amenities."
              cta={{
                text: 'Explore Campgrounds',
                href: '#campgrounds',
                variant: 'secondary',
              }}
            />

            <RVLifeCard
              icon={<Navigation />}
              iconBgColor="var(--rv-life-secondary-green)"
              headline="RV GPS Routing"
              body="Get turn-by-turn directions optimized for your RV's height, weight, and length. Avoid low bridges and tight turns."
              cta={{
                text: 'See Routing',
                href: '#routing',
                variant: 'secondary',
              }}
            />

            <RVLifeCard
              icon={<Wifi />}
              iconBgColor="var(--rv-life-accent-orange)"
              headline="Offline Maps"
              body="Download maps for offline use. Stay connected to your route even without cell service in remote areas."
              cta={{
                text: 'Download Maps',
                href: '#maps',
                variant: 'secondary',
              }}
              variant="highlighted"
            />
          </RVLifeCardGrid>
        </div>
      </section>

      {/* Detailed Feature Blocks */}
      <section className="rv-section bg-[var(--rv-life-off-white)]">
        <div className="rv-container space-y-24">
          <RVLifeFeatureBlock
            icon={<Compass />}
            iconColor="var(--rv-life-primary-blue)"
            title="Plan Your Perfect Route"
            description="Our advanced trip planning tools make it easy to discover new destinations and create unforgettable journeys."
            benefits={[
              'RV-specific routing that considers your vehicle dimensions',
              'Real-time traffic updates and road condition alerts',
              'Identify rest stops, dump stations, and fuel along your route',
              'Save multiple trip plans and share with family',
            ]}
            proofPoint={{
              text: 'Over 1 million trips planned',
              icon: <TrendingUp />,
            }}
            screenshot={{
              src: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800',
              alt: 'Trip planning interface screenshot',
            }}
            layout="right"
          />

          <RVLifeFeatureBlock
            icon={<Shield />}
            iconColor="var(--rv-life-secondary-green)"
            title="Stay Safe on the Road"
            description="Real-time weather alerts, road closures, and safety notifications keep you informed throughout your journey."
            benefits={[
              'Severe weather alerts for your route',
              'Road closure notifications',
              'Low clearance bridge warnings',
              'Emergency contact information',
            ]}
            proofPoint={{
              text: '99.9% uptime for critical alerts',
            }}
            screenshot={{
              src: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800',
              alt: 'Safety alerts interface',
            }}
            layout="left"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="rv-section">
        <div className="rv-container">
          <h2 className="rv-headline-primary text-center mb-4">
            Trusted by RVers Nationwide
          </h2>
          <p className="rv-body-large text-center text-[var(--rv-text-secondary)] mb-12">
            See what our community has to say
          </p>

          <RVLifeTestimonialGrid
            testimonials={[
              {
                quote:
                  "RV Life Pro completely changed how we plan our trips. The campground database is incredible and the offline maps have saved us countless times!",
                author: {
                  name: 'Sarah & Mike Johnson',
                  location: 'Denver, CO',
                  rvType: 'Class A Motorhome',
                },
                rating: 5,
                verified: true,
              },
              {
                quote:
                  "As full-time RVers, we rely on RV Life Pro every single day. The RV-specific routing has prevented us from getting into tight spots multiple times.",
                author: {
                  name: 'Tom Richards',
                  location: 'Austin, TX',
                  rvType: '5th Wheel',
                },
                rating: 5,
                verified: true,
              },
              {
                quote:
                  "The best investment we've made for our RV lifestyle. Support is amazing and new features are added regularly. Highly recommend!",
                author: {
                  name: 'Linda Martinez',
                  location: 'Phoenix, AZ',
                  rvType: 'Travel Trailer',
                },
                rating: 5,
                verified: true,
              },
            ]}
            layout="card"
            columns={3}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="rv-section bg-[var(--rv-life-light-bg)]">
        <div className="rv-container">
          <h2 className="rv-headline-primary text-center mb-4">
            Choose Your Plan
          </h2>
          <p className="rv-body-large text-center text-[var(--rv-text-secondary)] mb-12">
            Start your 7-day free trial, no credit card required
          </p>

          <div className="max-w-2xl mx-auto">
            <RVLifePricingCard
              name="RV Life Pro Annual"
              description="Everything you need for a full year of RV adventures"
              price={{
                original: 65,
                current: 52,
                currency: '$',
                period: 'year',
              }}
              discountCode={{
                code: 'SMARTRV20',
                savings: 'Save $13 instantly with this exclusive code!',
              }}
              features={[
                '14,000+ campground database with detailed reviews',
                'RV-specific GPS routing for your vehicle dimensions',
                'Offline map downloads for remote areas',
                'Trip planning tools with multiple saved routes',
                'Real-time weather alerts and road conditions',
                'Maintenance tracking and reminders',
                '24/7 customer support',
                'Free updates and new features',
              ]}
              cta={{
                text: 'Start Your Free 7-Day Trial',
                href: '/signup',
              }}
              trustBadges={[
                { type: 'moneyback' },
                { type: 'secure' },
                { type: 'satisfaction' },
              ]}
              featured={true}
              popularBadge={true}
              limitedTime={{
                text: 'Limited Time Offer - Ends Soon!',
                countdown: new Date('2024-12-31'),
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <RVLifeFAQSection
        faqs={[
          {
            question: 'How does the free trial work?',
            answer:
              'You get full access to all RV Life Pro features for 7 days absolutely free. No credit card required to start. After your trial, choose a plan that works for you.',
            category: 'general',
          },
          {
            question: 'Can I use the app offline?',
            answer:
              'Yes! Download maps and campground information while connected, then access everything offline during your travels. Perfect for remote areas without cell service.',
            category: 'product',
          },
          {
            question: 'Does it work with my RV type?',
            answer:
              "RV Life Pro works with all RV types including Class A, B, and C motorhomes, fifth wheels, travel trailers, and more. Input your RV's dimensions for customized routing.",
            category: 'product',
          },
          {
            question: 'What if I need help or have questions?',
            answer:
              'Our support team is available 24/7 via phone, email, or live chat. We also have extensive video tutorials and a helpful community forum.',
            category: 'support',
          },
          {
            question: 'Is my payment information secure?',
            answer:
              'Absolutely. We use industry-standard 256-bit SSL encryption for all transactions. Your payment information is never stored on our servers.',
            category: 'security',
          },
          {
            question: 'Can I cancel anytime?',
            answer:
              "Yes, you can cancel your subscription at any time with no penalties or fees. We also offer a 30-day money-back guarantee if you're not completely satisfied.",
            category: 'pricing',
          },
        ]}
        title="Common Questions"
        description="Find answers to frequently asked questions about RV Life Pro"
        showSearch={true}
        showCategories={true}
        defaultOpen={0}
        ctaText="Still have questions? Contact our support team"
        ctaHref="/contact"
      />

      {/* Final CTA Section */}
      <section className="rv-section bg-gradient-to-r from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white">
        <div className="rv-container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your RV Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 50,000+ RVers who trust RV Life Pro for their adventures
          </p>
          <a
            href="#pricing"
            className="rv-button-base bg-[var(--rv-life-accent-orange)] text-white px-8 py-4 text-lg hover:bg-[var(--rv-life-accent-orange-hover)] transition-colors"
          >
            Start Your Free Trial Now
          </a>
          <p className="mt-4 text-sm opacity-75">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </main>
  );
}

/**
 * CUSTOMIZATION TIPS:
 *
 * 1. Replace placeholder images with your actual images
 * 2. Update links (href values) to match your routing
 * 3. Customize colors in the CSS design system if needed
 * 4. Add your actual testimonials and FAQs
 * 5. Update pricing and discount codes
 * 6. Add analytics tracking to buttons and links
 * 7. Integrate with your actual signup flow
 * 8. Add more sections as needed using the component library
 *
 * All components are fully typed - use TypeScript autocomplete
 * to discover all available props and options!
 */
