/**
 * RV Life Pro Hero Landing Page
 * Last deployed: 2025-10-27 05:15 UTC
 *
 * High-converting affiliate landing page with:
 * - Crisis-avoidance messaging (bridge strike story)
 * - Trust signals (NO fake testimonials)
 * - Feature-benefit mapping
 * - Social proof from real metrics
 * - SEO optimization
 * - Mobile-first responsive design
 * - Analytics tracking
 *
 * @author Smart RV Portal
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Shield,
  MapPin,
  Wifi,
  Cloud,
  Navigation,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Star,
  DollarSign,
  Calendar,
  Zap,
} from 'lucide-react';

// Component imports
import {
  RVLifeHeroSection,
  RVLifeCard,
  RVLifeCardGrid,
  RVLifeButton,
  RVLifeFeatureBlock,
  RVLifePricingCard,
  RVLifeFAQAccordion,
  TrustSignals,
  SafeTestimonialDisplay,
  ExitIntentModal,
  RVLifeAffiliateLink,
  RVLifeStatCard,
  RVLifeBenefitsList,
} from '@/components/affiliate/rv-life-pro';

// Hook imports
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';

// Data imports
import copyData from '@/data/affiliate/rv-life-pro-copy.json';

// Styles
import '@/styles/affiliate/rv-life-pro.css';

/**
 * RV Life Pro Hero Landing Page Component
 */
const RVLifeProHero: React.FC = () => {
  // Initialize tracking
  const { trackCTAClick, trackFeatureClick, trackCustomEvent } = useRVLifeTracking({
    pageName: 'rv-life-pro-hero',
    trackScrollDepth: true,
    trackTimeOnPage: true,
  });

  // Track page load
  useEffect(() => {
    trackCustomEvent('page_fully_loaded', { pageType: 'hero_landing' });
  }, [trackCustomEvent]);

  // Helper function to track and handle CTA clicks
  const handleCTAClick = (ctaName: string, location: string) => {
    trackCTAClick(ctaName, location);
  };

  // Get copy data
  const heroHeadline = copyData.heroHeadlines.find(h => h.id === 'h1')!;
  const heroSubheadline = copyData.subheadlines.find(s => s.id === 'sh1')!;
  const primaryCTA = copyData.ctaButtons.find(c => c.id === 'cta1')!;
  const secondaryCTA = copyData.ctaButtons.find(c => c.id === 'cta2')!;
  const problemNarrative = copyData.problemNarratives[0]; // Bridge strike story
  const featureBenefits = copyData.featureBenefits;

  return (
    <Layout>
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>RV Life Pro - Never Risk a $15,000 Bridge Strike Again | RV GPS Navigation</title>
        <meta
          name="description"
          content="Join 47,000+ Australian RV owners using RV Life Pro for safe GPS routing. Prevent bridge strikes, find 14,000+ campgrounds, and travel worry-free. 14-day free trial."
        />
        <meta
          name="keywords"
          content="RV GPS, caravan navigation, RV Life Pro, bridge strike prevention, RV safe routes, campground finder, Australia RV travel"
        />

        {/* Open Graph */}
        <meta property="og:title" content="RV Life Pro - RV-Safe GPS Navigation for Australia" />
        <meta
          property="og:description"
          content="Prevent costly bridge strikes and navigate safely with RV Life Pro. 14-day free trial, no credit card required."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/affiliate/rv-life-pro/hero-background.jpg" />

        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "RV Life Pro",
            "applicationCategory": "NavigationApplication",
            "operatingSystem": "iOS, Android",
            "offers": {
              "@type": "Offer",
              "price": "65",
              "priceCurrency": "AUD",
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "2300",
              "bestRating": "5",
              "worstRating": "1"
            },
            "description": "RV-safe GPS navigation preventing bridge strikes and dangerous routes for caravans and motorhomes in Australia and New Zealand."
          })}
        </script>
      </Helmet>

      {/* Main Content */}
      <main className="bg-[var(--rv-life-off-white)]">

        {/* 1. HERO SECTION */}
        <RVLifeHeroSection
          headline={heroHeadline.text}
          subheadline={heroSubheadline.text}
          backgroundImage="/images/affiliate/rv-life-pro/hero-background.jpg"
          backgroundOverlay={true}
          overlayOpacity={0.75}
          height="large"
          alignment="center"
          showScrollIndicator={true}
          cta={{
            primary: {
              text: primaryCTA.text,
              href: '#pricing',
              onClick: () => handleCTAClick(primaryCTA.text, 'hero')
            },
            secondary: {
              text: secondaryCTA.text,
              href: '#features',
              onClick: () => handleCTAClick(secondaryCTA.text, 'hero')
            }
          }}
          trustIndicators={[
            {
              icon: <Star className="w-5 h-5" />,
              text: '4.8/5 Rating',
              variant: 'rating'
            },
            {
              icon: <Users className="w-5 h-5" />,
              text: '47,000+ Users',
              variant: 'social-proof'
            },
            {
              icon: <Shield className="w-5 h-5" />,
              text: '14-Day Free Trial',
              variant: 'guarantee'
            }
          ]}
        />

        {/* Trust Signals Section (NOT fake testimonials) */}
        <section className="rv-section bg-white">
          <div className="rv-container">
            <TrustSignals layout="compact" showLinks={true} />
          </div>
        </section>

        {/* 2. PROBLEM SECTION - Crisis Narrative */}
        <section id="problem" className="rv-section bg-gradient-to-b from-white to-[var(--rv-life-light-bg)]">
          <div className="rv-container">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Crisis Badge */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--rv-life-warning-red)] bg-opacity-10 border-2 border-[var(--rv-life-warning-red)] rounded-full">
                  <AlertTriangle className="w-5 h-5 text-[var(--rv-life-warning-red)]" />
                  <span className="font-bold text-[var(--rv-life-warning-red)]">
                    Real Story From Australian RV Owners
                  </span>
                </div>
              </div>

              {/* Story Title */}
              <h2 className="rv-headline-primary text-center mb-6">
                {problemNarrative.title}
              </h2>

              {/* Crisis Story */}
              <div className="rv-card-base p-8 md:p-10 space-y-6 mb-8">
                <p className="rv-body-large text-[var(--rv-text-secondary)]">
                  {problemNarrative.story.opening}
                </p>

                <div className="p-6 bg-[var(--rv-life-warning-red)] bg-opacity-5 border-l-4 border-[var(--rv-life-warning-red)] rounded">
                  <p className="rv-body-large text-[var(--rv-text-secondary)] font-semibold">
                    {problemNarrative.story.crisis}
                  </p>
                </div>

                <p className="rv-body-large text-[var(--rv-text-secondary)]">
                  {problemNarrative.story.aftermath}
                </p>
              </div>

              {/* Cost Breakdown Infographic */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <RVLifeStatCard
                  stat="$17,400"
                  label="Total Damage Cost"
                  icon={<DollarSign className="w-8 h-8" />}
                  delay={0.1}
                />
                <RVLifeStatCard
                  stat="$5,000"
                  label="Insurance Excess"
                  icon={<AlertTriangle className="w-8 h-8" />}
                  delay={0.2}
                />
                <RVLifeStatCard
                  stat="6 Months"
                  label="Unused Caravan"
                  icon={<Calendar className="w-8 h-8" />}
                  delay={0.3}
                />
              </div>

              {/* Visual Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  className="rv-card-base p-6 border-2 border-[var(--rv-life-warning-red)]"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="/images/affiliate/rv-life-pro/damaged-rv.jpg"
                      alt="RV damaged from bridge strike"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--rv-life-warning-red)] mb-2">
                    ❌ Without RV-Safe GPS
                  </h3>
                  <p className="text-sm text-[var(--rv-text-muted)]">
                    $15,000+ in damage, ruined holidays, and shattered confidence
                  </p>
                </motion.div>

                <motion.div
                  className="rv-card-base p-6 border-2 border-[var(--rv-life-secondary-green)]"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="/images/affiliate/rv-life-pro/safe-route.png"
                      alt="Safe RV route with clearance warnings"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--rv-life-secondary-green)] mb-2">
                    ✅ With RV Life Pro
                  </h3>
                  <p className="text-sm text-[var(--rv-text-muted)]">
                    Safe routes, real-time warnings, and worry-free adventures
                  </p>
                </motion.div>
              </div>

              {/* Transition to Solution */}
              <div className="text-center">
                <p className="rv-body-large text-[var(--rv-text-secondary)] mb-6 italic">
                  "{problemNarrative.story.transition}"
                </p>

                <RVLifeButton
                  variant="primary"
                  size="large"
                  onClick={() => handleCTAClick('See How It Works', 'problem-section')}
                  href="#solution"
                >
                  See How RV Life Pro Prevents This
                </RVLifeButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. SOLUTION SECTION */}
        <section id="solution" className="rv-section bg-white">
          <div className="rv-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--rv-life-secondary-green)] bg-opacity-10 border-2 border-[var(--rv-life-secondary-green)] rounded-full mb-6">
                  <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                  <span className="font-bold text-[var(--rv-life-secondary-green)]">
                    The Complete Solution
                  </span>
                </div>

                <h2 className="rv-headline-primary mb-4">
                  How RV Life Pro Prevents Disasters
                </h2>
                <p className="rv-body-large text-[var(--rv-text-secondary)]">
                  Every route is calculated specifically for YOUR RV's height, weight, and length.
                  No more guessing. No more risk. Just safe, stress-free travel.
                </p>
              </motion.div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Bridge Strike Prevention',
                  description: 'Automatic height clearance checking on every route'
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: '14,000+ Campgrounds',
                  description: 'Find perfect overnight stops every time'
                },
                {
                  icon: <Cloud className="w-8 h-8" />,
                  title: 'Weather Aware',
                  description: 'Avoid dangerous wind and storm conditions'
                },
                {
                  icon: <Wifi className="w-8 h-8" />,
                  title: 'Works Offline',
                  description: 'Navigate remote Australia without reception'
                }
              ].map((benefit, index) => (
                <RVLifeCard
                  key={index}
                  icon={benefit.icon}
                  headline={benefit.title}
                  body={benefit.description}
                  hover={true}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* App Screenshot Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/images/affiliate/rv-life-pro/app-screenshot-1.png"
                  alt="RV Life Pro app showing route planning"
                  className="w-full rounded-lg shadow-2xl rv-lazy-image rv-loaded"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="rv-headline-secondary mb-6">
                  See Exactly How It Works
                </h3>
                <RVLifeBenefitsList
                  benefits={[
                    { text: 'Enter your RV specifications once (height, length, weight)' },
                    { text: 'Plan your route from driveway to destination' },
                    { text: 'RV Life Pro automatically avoids low bridges and restrictions' },
                    { text: 'Get real-time alerts if conditions change' },
                    { text: 'Find RV-friendly campgrounds along your route' },
                    { text: 'Navigate confidently, even offline in remote areas' }
                  ]}
                  iconColor="var(--rv-life-secondary-green)"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. FEATURES SHOWCASE */}
        <section id="features" className="rv-section bg-[var(--rv-life-light-bg)]">
          <div className="rv-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.h2
                className="rv-headline-primary mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Everything You Need for Safe RV Travel
              </motion.h2>
              <motion.p
                className="rv-body-large text-[var(--rv-text-secondary)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Six powerful features that protect your RV and make every journey stress-free
              </motion.p>
            </div>

            {/* Feature Blocks */}
            <div className="space-y-16">
              {featureBenefits.slice(0, 6).map((feature, index) => (
                <RVLifeFeatureBlock
                  key={feature.id}
                  icon={
                    index === 0 ? <Shield className="w-8 h-8" /> :
                    index === 1 ? <MapPin className="w-8 h-8" /> :
                    index === 2 ? <Cloud className="w-8 h-8" /> :
                    index === 3 ? <Zap className="w-8 h-8" /> :
                    index === 4 ? <Wifi className="w-8 h-8" /> :
                    <Navigation className="w-8 h-8" />
                  }
                  title={feature.featureName}
                  description={feature.detailedBenefit}
                  benefits={[
                    feature.benefitStatement,
                    feature.emotionalHook
                  ]}
                  proofPoint={{
                    text: feature.proofPoint,
                    icon: <TrendingUp className="w-5 h-5" />
                  }}
                  screenshot={{
                    src: `/images/affiliate/rv-life-pro/feature-${index + 1}.png`,
                    alt: `${feature.featureName} screenshot`
                  }}
                  layout={index % 2 === 0 ? 'right' : 'left'}
                  delay={0.2}
                />
              ))}
            </div>

            {/* Secondary CTA */}
            <div className="text-center mt-12">
              <RVLifeButton
                variant="primary"
                size="large"
                onClick={() => handleCTAClick('Start Free Trial Now', 'features-section')}
                href="#pricing"
              >
                Start Your Free 14-Day Trial
              </RVLifeButton>
            </div>
          </div>
        </section>

        {/* 5. TRUST BUILDING SECTION */}
        <section id="trust" className="rv-section bg-white">
          <div className="rv-container">
            {/* Safe Testimonial Display - Shows TrustSignals if no testimonials exist */}
            <SafeTestimonialDisplay
              testimonials={[]} // Empty array = shows fallback with trust signals
              layout="grid"
              showVerifiedBadge={true}
            />
          </div>
        </section>

        {/* 6. PRICING SECTION */}
        <section id="pricing" className="rv-section bg-gradient-to-b from-white to-[var(--rv-life-light-bg)]">
          <div className="rv-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.h2
                className="rv-headline-primary mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Protect Your Investment for $1.25 Per Week
              </motion.h2>
              <motion.p
                className="rv-body-large text-[var(--rv-text-secondary)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                One avoided bridge strike pays for 265 years of RV Life Pro
              </motion.p>
            </div>

            <div className="max-w-2xl mx-auto">
              <RVLifePricingCard
                name="RV Life Pro Annual"
                description="Everything you need for safe RV travel across Australia and New Zealand"
                price={{
                  original: 81.25,
                  current: 65,
                  currency: '$',
                  period: 'year'
                }}
                discountCode={{
                  code: 'SMARTRV20',
                  savings: 'Save 20% on your first year - $16.25 discount!'
                }}
                features={[
                  'RV Height, Weight & Length Routing',
                  '14,000+ RV-Friendly Campground Database',
                  'Real-Time Weather & Road Condition Alerts',
                  'Offline Maps for Remote Navigation',
                  'Propane & Hazmat Route Planning',
                  'Maintenance Tracking & Reminders',
                  '14-Day Free Trial - No Credit Card Required',
                  '30-Day Money-Back Guarantee',
                  'Unlimited Route Planning',
                  'Works on iOS and Android',
                  'Sync Across All Your Devices',
                  'Weekly Database Updates'
                ]}
                cta={{
                  text: 'Start Free Trial - No Credit Card Required',
                  onClick: () => handleCTAClick('Start Free Trial', 'pricing-section'),
                  href: 'https://rvlife.com/pro' // Replace with actual affiliate link
                }}
                trustBadges={[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    text: '30-Day Guarantee',
                    variant: 'guarantee'
                  },
                  {
                    icon: <Star className="w-5 h-5" />,
                    text: '4.8/5 Rating',
                    variant: 'rating'
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    text: '47,000+ Users',
                    variant: 'social-proof'
                  }
                ]}
                popularBadge={true}
                limitedTime={{
                  text: 'Limited Time: Extra 10% OFF with code SMARTRV20',
                }}
                delay={0.2}
              />
            </div>

            {/* Value Comparison */}
            <motion.div
              className="max-w-4xl mx-auto mt-12 rv-card-base p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="rv-headline-tertiary text-center mb-6">
                The Real Cost of NOT Having RV Life Pro
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[var(--rv-life-warning-red)] bg-opacity-5 rounded-lg border-2 border-[var(--rv-life-warning-red)]">
                  <h4 className="font-bold text-lg text-[var(--rv-life-warning-red)] mb-4">
                    Without RV Life Pro:
                  </h4>
                  <ul className="space-y-2 text-[var(--rv-text-secondary)]">
                    <li>❌ Bridge strike damage: $15,000 - $25,000</li>
                    <li>❌ Insurance premium increases: $500 - $2,000/year</li>
                    <li>❌ Wrong campground bookings: $50 - $150 wasted</li>
                    <li>❌ Fuel wasted on unsuitable routes: $100 - $300</li>
                    <li>❌ Stress, anxiety, and ruined holidays: Priceless</li>
                  </ul>
                </div>

                <div className="p-6 bg-[var(--rv-life-secondary-green)] bg-opacity-5 rounded-lg border-2 border-[var(--rv-life-secondary-green)]">
                  <h4 className="font-bold text-lg text-[var(--rv-life-secondary-green)] mb-4">
                    With RV Life Pro:
                  </h4>
                  <ul className="space-y-2 text-[var(--rv-text-secondary)]">
                    <li>✅ Annual subscription: Just $65</li>
                    <li>✅ Zero bridge strikes or damage</li>
                    <li>✅ Perfect campgrounds every time</li>
                    <li>✅ Optimized routes save fuel</li>
                    <li>✅ Complete peace of mind: Priceless</li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8 p-6 bg-gradient-to-r from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] rounded-lg">
                <p className="text-white text-2xl font-bold mb-2">
                  Break-Even Analysis
                </p>
                <p className="text-white text-lg">
                  Just ONE avoided $65 wrong turn pays for itself instantly.
                  One prevented bridge strike saves you $15,000+.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. FAQ PREVIEW SECTION */}
        <section id="faq" className="rv-section bg-white">
          <div className="rv-container">
            <RVLifeFAQAccordion
              title="Your Questions Answered"
              description="Everything you need to know about RV Life Pro"
              faqs={[
                // Technical FAQs
                {
                  question: copyData.faqs.technical[0].question,
                  answer: copyData.faqs.technical[0].answer,
                  category: 'general' as const
                },
                {
                  question: copyData.faqs.technical[1].question,
                  answer: copyData.faqs.technical[1].answer,
                  category: 'general' as const
                },
                // Pricing FAQs
                {
                  question: copyData.faqs.value_pricing[0].question,
                  answer: copyData.faqs.value_pricing[0].answer,
                  category: 'pricing' as const
                },
                {
                  question: copyData.faqs.value_pricing[2].question,
                  answer: copyData.faqs.value_pricing[2].answer,
                  category: 'pricing' as const
                },
                // Trust FAQs
                {
                  question: copyData.faqs.trust_security[0].question,
                  answer: copyData.faqs.trust_security[0].answer,
                  category: 'security' as const
                },
                {
                  question: copyData.faqs.trust_security[5].question,
                  answer: copyData.faqs.trust_security[5].answer,
                  category: 'support' as const
                }
              ]}
              showSearch={true}
              showCategories={true}
              allowMultiple={false}
            />

            <div className="text-center mt-12">
              <p className="rv-body-large mb-6 text-[var(--rv-text-secondary)]">
                Have more questions? We're here to help!
              </p>
              <RVLifeButton
                variant="secondary"
                size="medium"
                onClick={() => trackCustomEvent('view_full_faq_clicked')}
                href="#contact"
              >
                View All FAQs
              </RVLifeButton>
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA SECTION */}
        <section id="final-cta" className="rv-section bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white">
          <div className="rv-container">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="rv-headline-primary text-white mb-6">
                Join 47,000+ Australian RV Owners Travelling Safely
              </h2>
              <p className="rv-body-large text-white/90 mb-8">
                Start your 14-day free trial today. No credit card required.
                Cancel anytime. Zero risk.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <RVLifeAffiliateLink
                  campaign="hero-final-cta"
                  className="inline-block"
                >
                  <RVLifeButton
                    variant="primary"
                    size="large"
                    onClick={() => handleCTAClick('Start Free Trial', 'final-cta')}
                    className="bg-white text-[var(--rv-life-primary-blue)] hover:bg-gray-100"
                  >
                    Start Free Trial Now
                  </RVLifeButton>
                </RVLifeAffiliateLink>

                <RVLifeButton
                  variant="secondary"
                  size="large"
                  onClick={() => handleCTAClick('View Pricing', 'final-cta')}
                  href="#pricing"
                  className="border-white text-white hover:bg-white hover:text-[var(--rv-life-primary-blue)]"
                >
                  View Pricing Details
                </RVLifeButton>
              </div>

              {/* Final Trust Signals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">14 Days</div>
                  <div className="text-sm text-white/80">Free Trial Period</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">$0</div>
                  <div className="text-sm text-white/80">Credit Card Required</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">30 Days</div>
                  <div className="text-sm text-white/80">Money-Back Guarantee</div>
                </div>
              </div>

              {/* Last Chance Urgency */}
              <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg border-2 border-white/20">
                <p className="font-bold text-xl mb-2">
                  ⏰ Limited Time: Extra 10% OFF with code SMARTRV20
                </p>
                <p className="text-white/90">
                  Don't wait until after your first bridge strike or dangerous detour.
                  Protect your RV and your family today.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* 9. EXIT INTENT MODAL */}
      <ExitIntentModal
        disabled={false}
        initialDelay={5000}
      />
    </>

    </Layout>
  );
};

export default RVLifeProHero;
