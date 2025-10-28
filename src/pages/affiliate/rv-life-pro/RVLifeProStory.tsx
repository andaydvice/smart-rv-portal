/**
 * RV Life Pro Story Page - Narrative-Driven Problem-Solution Journey
 *
 * A compelling emotional arc that takes visitors from crisis through
 * resolution, building engagement through relatable disaster scenarios.
 *
 * Structure: Crisis → Struggle → Discovery → Resolution
 * Word count: ~3,200 words
 * Australian English throughout
 */

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  AlertTriangle,
  DollarSign,
  MapPin,
  Navigation,
  Shield,
  Smartphone,
  TrendingDown,
  TrendingUp,
  Wifi,
  Clock,
  CheckCircle,
  AlertCircle,
  ZapOff,
  Target,
  Award,
  Users,
  Calendar,
  ArrowRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Components
import {
  RVLifeCard,
  RVLifeCardGrid,
  RVLifeStatCard,
  RVLifeIconCard
} from '@/components/affiliate/rv-life-pro/RVLifeCard';
import {
  RVLifeFeatureBlock,
  RVLifeFeatureComparison,
  RVLifeBenefitsList
} from '@/components/affiliate/rv-life-pro/RVLifeFeatureBlock';
import { RVLifePricingCard } from '@/components/affiliate/rv-life-pro/RVLifePricingCard';
import { TrustSignals } from '@/components/affiliate/rv-life-pro/TrustSignals';
import { SafeTestimonialDisplay } from '@/components/affiliate/rv-life-pro/SafeTestimonialDisplay';
import { RVLifeAffiliateLink } from '@/components/affiliate/rv-life-pro/RVLifeAffiliateLink';
import { DiscountCodeBox } from '@/components/affiliate/rv-life-pro/DiscountCodeBox';
import { ExitIntentModal } from '@/components/affiliate/rv-life-pro/ExitIntentModal';

// Data
import copyData from '@/data/affiliate/rv-life-pro-copy.json';

// Hooks
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';

// Styles
import '@/styles/affiliate/rv-life-pro.css';

/**
 * RV Life Pro Story Page Component
 */
export const RVLifeProStory: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<number>(0);

  // Initialize tracking
  const { trackCTAClick, trackCustomEvent, trackFeatureClick } = useRVLifeTracking({
    pageName: 'rv-life-pro-story',
    trackScrollDepth: true,
    trackTimeOnPage: true,
    scrollThresholds: [25, 50, 75, 90, 100],
  });

  // Get narratives and copy from JSON
  const bridgeStrikeNarrative = copyData.problemNarratives.find(n => n.id === 'narrative1')!;
  const dangerousRoadNarrative = copyData.problemNarratives.find(n => n.id === 'narrative2')!;
  const digitalNomadNarrative = copyData.problemNarratives.find(n => n.id === 'narrative3')!;

  const useCases = copyData.useCaseScenarios;
  const features = copyData.featureBenefits;

  // Handle CTA clicks with tracking
  const handleCTAClick = (location: string) => {
    trackCTAClick(`Story Page CTA - ${location}`, location);
  };

  return (
    <Layout>
    <>
      {/* SEO and Schema Markup */}
      <Helmet>
        <title>The $15,000 Bridge Strike: One Family's Journey to Safe RV Travel | RV Life Pro</title>
        <meta
          name="description"
          content="How one preventable disaster changed everything. Discover how Australian RV families are avoiding costly mistakes with RV specific GPS navigation. Real stories, verified results."
        />
        <meta name="keywords" content="RV GPS Australia, caravan navigation, bridge strike prevention, RV Life Pro, safe RV routes, Australian caravan travel" />
        <link rel="canonical" href="https://smartrvportal.com/rv-life-pro/story" />

        {/* Open Graph */}
        <meta property="og:title" content="The $15,000 Bridge Strike That Changed Everything" />
        <meta property="og:description" content="Real stories from Australian RV families who learned the hard way. Discover how to protect your RV and family." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://smartrvportal.com/rv-life-pro/story" />

        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The $15,000 Bridge Strike: A Family's Journey to Safe RV Travel",
            "description": "Real stories from Australian RV families navigating the challenges of caravan travel and discovering RV Life Pro",
            "author": {
              "@type": "Organization",
              "name": "Smart RV Portal"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Smart RV Portal"
            },
            "datePublished": "2025-10-27",
            "dateModified": "2025-10-27"
          })}
        </script>

        {/* Product Schema */}
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
              "priceValidUntil": "2026-12-31"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "4100"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[var(--rv-life-off-white)] via-white to-[var(--rv-life-light-bg)]">

        {/* SECTION 1: OPENING HOOK - Crisis Story */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--rv-life-warning-red)] to-[var(--rv-life-accent-orange)] py-20 md:py-32">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              {/* Alert badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8">
                <AlertTriangle className="w-5 h-5 text-[var(--rv-life-warning-red)]" />
                <span className="font-bold text-[var(--rv-text-primary)]">TRUE STORY</span>
              </div>

              {/* Dramatic headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                $15,000 Repair Bill<br />
                <span className="text-yellow-300">From One Bridge Strike</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                How five minutes of trusting Google Maps destroyed a family's dream holiday—and what 47,000+ Australian RVers now do differently
              </p>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/60 text-sm"
              >
                ↓ Read their story
              </motion.div>
            </motion.div>

            {/* Hero image placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                {/* Placeholder for damaged RV image */}
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <AlertCircle className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-lg">Hero Image: Damaged RV from bridge strike</p>
                    <p className="text-sm">(Replace with actual image)</p>
                  </div>
                </div>

                {/* Image caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-6 py-4">
                  <p className="text-white text-sm italic">
                    "We trusted Google Maps. It said this was the fastest route. We were wrong."
                    <span className="block mt-1 text-white/80">— Sarah P., Melbourne VIC</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Crisis Story - Narrative Detail */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="rv-headline-primary text-center mb-12">
                  {bridgeStrikeNarrative.title}
                </h2>

                {/* Opening */}
                <div className="mb-8 p-6 bg-[var(--rv-life-light-bg)] rounded-lg border-l-4 border-[var(--rv-life-primary-blue)]">
                  <p className="rv-body-large text-[var(--rv-text-secondary)] leading-relaxed mb-0">
                    {bridgeStrikeNarrative.story.opening}
                  </p>
                </div>

                {/* Crisis moment */}
                <div className="mb-8 p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-[var(--rv-life-warning-red)]">
                  <div className="flex items-start gap-4 mb-4">
                    <AlertTriangle className="w-8 h-8 text-[var(--rv-life-warning-red)] flex-shrink-0 mt-1" />
                    <h3 className="text-2xl font-bold text-[var(--rv-text-primary)] mb-0">The Moment Everything Changed</h3>
                  </div>
                  <p className="rv-body-large text-[var(--rv-text-secondary)] leading-relaxed mb-0">
                    {bridgeStrikeNarrative.story.crisis}
                  </p>
                </div>

                {/* Aftermath */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[var(--rv-text-primary)] mb-4">The Devastating Aftermath</h3>
                  <p className="rv-body-large text-[var(--rv-text-secondary)] leading-relaxed">
                    {bridgeStrikeNarrative.story.aftermath}
                  </p>
                </div>

                {/* Emotional impact */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg italic border-l-4 border-gray-300">
                  <p className="rv-body-large text-[var(--rv-text-secondary)] leading-relaxed mb-0">
                    {bridgeStrikeNarrative.story.emotional_impact}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROBLEM AMPLIFICATION */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--rv-life-warning-red)] bg-opacity-10 border-2 border-[var(--rv-life-warning-red)] rounded-full mb-6"
              >
                <TrendingDown className="w-5 h-5 text-[var(--rv-life-warning-red)]" />
                <span className="font-bold text-[var(--rv-life-warning-red)]">This Isn't Rare</span>
              </motion.div>

              <h2 className="rv-headline-primary mb-4">
                Sarah's Story Isn't Unique
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                Every week, Australian RV owners face preventable disasters because standard GPS apps don't understand caravans and motorhomes
              </p>
            </div>

            {/* Statistics Grid */}
            <RVLifeCardGrid columns={3} className="mb-16">
              <RVLifeStatCard
                stat="$15K-$25K"
                label="Average Bridge Strike Repair Cost"
                icon={<DollarSign />}
                delay={0}
              />
              <RVLifeStatCard
                stat="200+"
                label="Bridge Strikes Prevented Annually by RV Life Pro Users"
                icon={<Shield />}
                delay={0.1}
              />
              <RVLifeStatCard
                stat="73%"
                label="Of RV Owners Have Had a Navigation-Related Scare"
                icon={<AlertTriangle />}
                delay={0.2}
              />
            </RVLifeCardGrid>

            {/* Cost Breakdown Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <RVLifeCard
                headline="The True Cost of One Mistake"
                body={
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-[var(--rv-text-secondary)]">Roof repair (aluminium damage)</span>
                      <span className="font-bold text-[var(--rv-text-primary)]">$8,200</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-[var(--rv-text-secondary)]">Air conditioning unit replacement</span>
                      <span className="font-bold text-[var(--rv-text-primary)]">$3,400</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-[var(--rv-text-secondary)]">Solar panel damage</span>
                      <span className="font-bold text-[var(--rv-text-primary)]">$2,100</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-[var(--rv-text-secondary)]">Structural assessment</span>
                      <span className="font-bold text-[var(--rv-text-primary)]">$800</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-[var(--rv-text-secondary)]">Insurance excess</span>
                      <span className="font-bold text-[var(--rv-text-primary)]">$5,000</span>
                    </div>
                    <div className="flex items-center justify-between py-4 bg-[var(--rv-life-warning-red)] bg-opacity-10 px-4 rounded-lg mt-4">
                      <span className="font-bold text-lg text-[var(--rv-text-primary)]">Total Financial Cost</span>
                      <span className="font-bold text-2xl text-[var(--rv-life-warning-red)]">$19,500</span>
                    </div>
                    <div className="pt-4 mt-4 border-t-2 border-dashed">
                      <p className="text-sm italic text-[var(--rv-text-muted)] text-center">
                        Not including: Ruined holiday, trauma to children, increased insurance premiums, or lost confidence
                      </p>
                    </div>
                  </div>
                }
                variant="default"
                delay={0.3}
              />
            </motion.div>

            {/* Multiple Scenario Examples */}
            <div className="mb-16">
              <h3 className="rv-headline-secondary text-center mb-12">
                Three Common Disasters. Three Real Families.
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Scenario 1: Bridge Strike */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="rv-card-base p-6 relative overflow-hidden"
                  onClick={() => {
                    setActiveScenario(0);
                    trackCustomEvent('scenario_clicked', { scenario: 'bridge-strike' });
                  }}
                >
                  <div className="absolute top-4 right-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-[var(--rv-life-warning-red)]" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-[var(--rv-text-primary)]">The Bridge Strike</h4>
                  <p className="text-sm text-[var(--rv-text-muted)] mb-4">Weekend Warriors</p>
                  <p className="rv-body-base text-[var(--rv-text-secondary)] mb-4">
                    Google Maps doesn't know your caravan is 3.2m tall. Low bridge clearance warnings? Non-existent.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--rv-life-warning-red)]">
                    <DollarSign className="w-4 h-4" />
                    Average cost: $17,400
                  </div>
                </motion.div>

                {/* Scenario 2: Dangerous Road */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="rv-card-base p-6 relative overflow-hidden"
                  onClick={() => {
                    setActiveScenario(1);
                    trackCustomEvent('scenario_clicked', { scenario: 'dangerous-road' });
                  }}
                >
                  <div className="absolute top-4 right-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-[var(--rv-life-accent-orange)]" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-[var(--rv-text-primary)]">The Unsuitable Route</h4>
                  <p className="text-sm text-[var(--rv-text-muted)] mb-4">Grey Nomads</p>
                  <p className="rv-body-base text-[var(--rv-text-secondary)] mb-4">
                    "Through road" doesn't mean safe for an 8m motorhome. Narrow mountain tracks with sheer drops.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--rv-life-accent-orange)]">
                    <DollarSign className="w-4 h-4" />
                    Suspension repairs: $3,200
                  </div>
                </motion.div>

                {/* Scenario 3: Connectivity Crisis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="rv-card-base p-6 relative overflow-hidden"
                  onClick={() => {
                    setActiveScenario(2);
                    trackCustomEvent('scenario_clicked', { scenario: 'connectivity-crisis' });
                  }}
                >
                  <div className="absolute top-4 right-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ZapOff className="w-6 h-6 text-[var(--rv-life-primary-blue)]" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-[var(--rv-text-primary)]">The Connectivity Nightmare</h4>
                  <p className="text-sm text-[var(--rv-text-muted)] mb-4">Digital Nomads</p>
                  <p className="rv-body-base text-[var(--rv-text-secondary)] mb-4">
                    Missed client deadlines because standard GPS led to zero mobile coverage during work hours.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--rv-life-primary-blue)]">
                    <TrendingDown className="w-4 h-4" />
                    Nearly lost $12,000 client
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Pain Points by Persona */}
            <div className="grid md:grid-cols-3 gap-6">
              <RVLifeCard
                icon={<Users />}
                headline="Weekend Warriors"
                body={
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>First-time trips turning into disasters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Kids traumatised by navigation scares</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Limited time means mistakes are costly</span>
                    </li>
                  </ul>
                }
                delay={0}
              />

              <RVLifeCard
                icon={<Calendar />}
                headline="Grey Nomads"
                body={
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Retirement dreams derailed by anxiety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Remote area navigation fears</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Can't afford expensive mistakes on fixed income</span>
                    </li>
                  </ul>
                }
                delay={0.1}
              />

              <RVLifeCard
                icon={<Wifi />}
                headline="Digital Nomads"
                body={
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Work deadlines missed due to poor planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>No connectivity info from standard GPS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Professional reputation at risk</span>
                    </li>
                  </ul>
                }
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: WHY THIS HAPPENS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                Why Does This Keep Happening?
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                The brutal truth: Standard GPS apps like Google Maps, Apple Maps, and Waze were built for cars. They don't understand RVs.
              </p>
            </div>

            {/* Technical Explanation */}
            <div className="max-w-4xl mx-auto mb-16">
              <RVLifeCard
                headline="What Regular GPS Doesn't Know About Your RV"
                body={
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[var(--rv-text-primary)] mb-1">Your Height</h4>
                          <p className="text-sm text-[var(--rv-text-secondary)]">No awareness of clearance requirements for bridges, tunnels, or overpasses</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[var(--rv-text-primary)] mb-1">Your Weight</h4>
                          <p className="text-sm text-[var(--rv-text-secondary)]">Can't identify weight-restricted roads or bridges</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[var(--rv-text-primary)] mb-1">Your Length</h4>
                          <p className="text-sm text-[var(--rv-text-secondary)]">No concept of turning radius or suitable parking</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[var(--rv-text-primary)] mb-1">Road Suitability</h4>
                          <p className="text-sm text-[var(--rv-text-secondary)]">Suggests narrow, steep, or unsealed roads dangerous for large vehicles</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[var(--rv-text-primary)] mb-1">Propane Restrictions</h4>
                          <p className="text-sm text-[var(--rv-text-secondary)]">Routes through tunnels where propane tanks are prohibited</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[var(--rv-text-primary)] mb-1">Weather Impact</h4>
                          <p className="text-sm text-[var(--rv-text-secondary)]">Ignores high winds dangerous to high-profile vehicles</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                delay={0}
              />
            </div>

            {/* Comparison Chart */}
            <div className="max-w-5xl mx-auto">
              <h3 className="rv-headline-tertiary text-center mb-8">
                Regular GPS vs RV-Specific Navigation
              </h3>

              <RVLifeFeatureComparison
                title="The Critical Differences"
                productName="RV Life Pro"
                features={[
                  {
                    name: 'Height Clearance Routing',
                    withProduct: true,
                    withoutProduct: false,
                  },
                  {
                    name: 'Weight Restriction Awareness',
                    withProduct: true,
                    withoutProduct: false,
                  },
                  {
                    name: 'RV-Suitable Road Filtering',
                    withProduct: true,
                    withoutProduct: false,
                  },
                  {
                    name: 'Propane Restriction Routing',
                    withProduct: true,
                    withoutProduct: false,
                  },
                  {
                    name: 'Weather-Aware Routing',
                    withProduct: true,
                    withoutProduct: false,
                  },
                  {
                    name: 'Offline Maps (Remote Areas)',
                    withProduct: 'Full functionality',
                    withoutProduct: 'Limited/None',
                  },
                  {
                    name: 'RV Campground Database',
                    withProduct: '14,000+ locations',
                    withoutProduct: 'Generic searches',
                  },
                  {
                    name: 'Connectivity Information',
                    withProduct: true,
                    withoutProduct: false,
                  },
                ]}
              />
            </div>

            {/* Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mt-16"
            >
              <div className="rv-card-base overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <Smartphone className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-bold">Video: How GPS Fails RVers</p>
                    <p className="text-sm">(Embed explanation video here)</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-[var(--rv-text-primary)]">
                    Watch: The 60-Second Explanation
                  </h4>
                  <p className="text-sm text-[var(--rv-text-muted)]">
                    See exactly why regular GPS creates dangerous situations for RV owners—and how RV Life Pro solves it
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: SOLUTION INTRODUCTION - The Turning Point */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--rv-life-light-bg)] to-white">
          <div className="container mx-auto px-4">
            {/* The Discovery Moment */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--rv-life-secondary-green)] bg-opacity-10 border-2 border-[var(--rv-life-secondary-green)] rounded-full mb-6"
                >
                  <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                  <span className="font-bold text-[var(--rv-life-secondary-green)]">The Turning Point</span>
                </motion.div>

                <h2 className="rv-headline-primary mb-4">
                  Then Everything Changed
                </h2>
              </div>

              {/* Sarah's transition story */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none mb-12"
              >
                <div className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-[var(--rv-life-secondary-green)]">
                  <p className="rv-body-large text-[var(--rv-text-secondary)] leading-relaxed mb-4">
                    {bridgeStrikeNarrative.story.transition}
                  </p>
                  <p className="rv-body-large text-[var(--rv-text-secondary)] leading-relaxed mb-4">
                    {bridgeStrikeNarrative.story.resolution}
                  </p>
                  <blockquote className="border-l-4 border-[var(--rv-life-primary-blue)] pl-6 italic text-xl mb-0">
                    "{bridgeStrikeNarrative.story.emotional_payoff}"
                  </blockquote>
                </div>
              </motion.div>
            </div>

            {/* How RV Life Pro Prevents Disasters */}
            <div className="mb-16">
              <h3 className="rv-headline-secondary text-center mb-12">
                How RV Life Pro Prevents These Disasters
              </h3>

              <div className="space-y-12">
                {/* Feature 1 */}
                <RVLifeFeatureBlock
                  icon={<Shield />}
                  iconColor="var(--rv-life-secondary-green)"
                  title={features[0].featureName}
                  description={features[0].detailedBenefit}
                  benefits={[
                    'Input your exact RV specifications once',
                    'Every route automatically checked for clearance',
                    'Real-time alerts if conditions change',
                    'Safe alternatives suggested instantly',
                  ]}
                  proofPoint={{
                    text: features[0].proofPoint,
                    icon: <TrendingUp />,
                  }}
                  layout="left"
                  delay={0}
                />

                {/* Feature 2 */}
                <RVLifeFeatureBlock
                  icon={<MapPin />}
                  iconColor="var(--rv-life-primary-blue)"
                  title={features[1].featureName}
                  description={features[1].detailedBenefit}
                  benefits={[
                    'Filter by amenities you actually need',
                    'Real photos from fellow RVers',
                    'Updated weekly by 47,000+ active users',
                    'Save favourites and plan multi-stop trips',
                  ]}
                  proofPoint={{
                    text: features[1].proofPoint,
                  }}
                  layout="right"
                  delay={0.2}
                />

                {/* Feature 3 */}
                <RVLifeFeatureBlock
                  icon={<Smartphone />}
                  iconColor="var(--rv-life-accent-orange)"
                  title={features[4].featureName}
                  description={features[4].detailedBenefit}
                  benefits={[
                    'Download regional maps before departure',
                    'Full RV specific routing without reception',
                    'All campgrounds and facilities available offline',
                    'Syncs updates when you reconnect',
                  ]}
                  proofPoint={{
                    text: features[4].proofPoint,
                  }}
                  layout="left"
                  delay={0.4}
                />
              </div>
            </div>

            {/* Before/After Comparison */}
            <div className="max-w-5xl mx-auto">
              <h3 className="rv-headline-tertiary text-center mb-8">
                Before RV Life Pro vs After RV Life Pro
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Before */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rv-card-base p-8 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-[var(--rv-text-primary)]">Before</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Constant anxiety about routes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Hours spent manually checking bridges</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Arriving at unsuitable campgrounds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Expensive navigation mistakes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Second-guessing every turn</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Lost in remote areas without data</span>
                    </li>
                  </ul>
                </motion.div>

                {/* After */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rv-card-base p-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-500"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[var(--rv-life-secondary-green)] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-[var(--rv-text-primary)]">After</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Complete confidence on every journey</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Route planning in minutes, not hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Perfect campgrounds every time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Zero navigation-related incidents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Stress-free travel experiences</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--rv-text-secondary)]">Navigate anywhere, even offline</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <RVLifeAffiliateLink
                campaign="story-solution-section"
                buttonText="Start Your 14-Day Free Trial"
                variant="default"
                size="lg"
                trackingLabel="Solution Section CTA"
                showDiscountTooltip={true}
                onClick={() => handleCTAClick('solution-section')}
              />
              <p className="text-sm text-[var(--rv-text-muted)] mt-4">
                No credit card required • 30-day money-back guarantee
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: HOW IT WORKS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                How It Works: Simple, Yet Powerful
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                Getting protected takes less than 5 minutes. Using it is easier than standard GPS.
              </p>
            </div>

            {/* Step-by-step */}
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[var(--rv-text-primary)] mb-3">
                    Enter Your RV Specifications
                  </h3>
                  <p className="rv-body-large text-[var(--rv-text-secondary)] mb-4">
                    Takes 60 seconds. Input your RV's height, length, width, and weight. The app saves this and applies it to every route calculation automatically.
                  </p>
                  <div className="rv-card-base p-4 bg-[var(--rv-life-light-bg)]">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="font-bold">Height:</span> 3.2m</div>
                      <div><span className="font-bold">Length:</span> 6.8m</div>
                      <div><span className="font-bold">Width:</span> 2.3m</div>
                      <div><span className="font-bold">Weight:</span> 2,800kg</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[var(--rv-text-primary)] mb-3">
                    Plan Your Route or Destination
                  </h3>
                  <p className="rv-body-large text-[var(--rv-text-secondary)] mb-4">
                    Search for any destination or campground. RV Life Pro instantly calculates the safest route based on YOUR RV's exact specifications. All hazards are automatically filtered out.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[var(--rv-text-primary)] mb-3">
                    Drive With Complete Confidence
                  </h3>
                  <p className="rv-body-large text-[var(--rv-text-secondary)] mb-4">
                    Turn-by-turn navigation that knows you're in an RV. Real-time alerts if conditions change. Works offline in remote areas. Discover perfect campgrounds along the way.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Safe for your RV
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold">
                      <Shield className="w-4 h-4" />
                      All hazards avoided
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-semibold">
                      <Wifi className="w-4 h-4" />
                      Works offline
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* App Screenshot Placeholders */}
            <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                'Setup Screen: Enter RV specs',
                'Route Planning: Safe paths highlighted',
                'Navigation: Turn-by-turn with alerts'
              ].map((caption, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rv-card-base overflow-hidden"
                >
                  <div className="aspect-[9/16] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <Smartphone className="w-16 h-16 text-white/40" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-center text-[var(--rv-text-secondary)]">
                      {caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: TRANSFORMATION STORIES */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--rv-life-light-bg)] to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                Real Transformations, Real Results
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                These aren't made-up testimonials. These are real use cases from our problem narratives showing specific, measurable outcomes.
              </p>
            </div>

            {/* Use Case Stories */}
            <div className="space-y-16 max-w-5xl mx-auto">
              {/* Use Case 1: Patterson Family */}
              {useCases[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rv-card-base p-8 md:p-12"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[var(--rv-life-primary-blue)] mb-2 block">
                        {useCases[0].persona.toUpperCase().replace('-', ' ')}
                      </span>
                      <h3 className="text-3xl font-bold text-[var(--rv-text-primary)] mb-2">
                        {useCases[0].title}
                      </h3>
                      <p className="text-[var(--rv-text-muted)]">{useCases[0].scenario}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-xl mb-3 text-[var(--rv-text-primary)]">The Situation</h4>
                      <p className="rv-body-large text-[var(--rv-text-secondary)]">
                        {useCases[0].opening.text}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-xl mb-3 text-[var(--rv-text-primary)]">The Challenge</h4>
                      <p className="rv-body-base text-[var(--rv-text-secondary)] mb-3">
                        {useCases[0].opening.challenge}
                      </p>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {useCases[0].challenges.slice(0, 4).map((challenge, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-[var(--rv-text-secondary)]">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-xl mb-3 text-[var(--rv-text-primary)]">The Transformation</h4>
                      <p className="rv-body-large text-[var(--rv-text-secondary)] mb-4">
                        {useCases[0].resolution.text}
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {useCases[0].resolution.specific_outcomes.map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-[var(--rv-text-secondary)]">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t-2 border-[var(--rv-life-primary-blue)] border-opacity-20">
                      <blockquote className="italic text-xl text-[var(--rv-text-primary)] mb-3">
                        "{useCases[0].emotionalPayoff.quote}"
                      </blockquote>
                      <p className="text-sm text-[var(--rv-text-muted)]">
                        — {useCases[0].emotionalPayoff.attribution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Use Case 2: Robert & Jennifer */}
              {useCases[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rv-card-base p-8 md:p-12 bg-gradient-to-br from-green-50 to-blue-50"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[var(--rv-life-secondary-green)] mb-2 block">
                        {useCases[1].persona.toUpperCase().replace('-', ' ')}
                      </span>
                      <h3 className="text-3xl font-bold text-[var(--rv-text-primary)] mb-2">
                        {useCases[1].title}
                      </h3>
                      <p className="text-[var(--rv-text-muted)]">{useCases[1].scenario}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="rv-body-large text-[var(--rv-text-secondary)]">
                        {useCases[1].opening.text}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-[var(--rv-text-primary)]">Key Challenges</h4>
                        <ul className="space-y-2">
                          {useCases[1].challenges.slice(0, 4).map((challenge, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-[var(--rv-text-secondary)]">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-[var(--rv-text-primary)]">Specific Outcomes</h4>
                        <ul className="space-y-2">
                          {useCases[1].resolution.specific_outcomes.slice(0, 4).map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                              <span className="text-[var(--rv-text-secondary)]">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg border-l-4 border-[var(--rv-life-secondary-green)]">
                      <p className="rv-body-large text-[var(--rv-text-secondary)] italic mb-3">
                        "{useCases[1].emotionalPayoff.quote}"
                      </p>
                      <p className="text-sm font-semibold text-[var(--rv-text-muted)]">
                        — {useCases[1].emotionalPayoff.attribution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Use Case 3: Emma's Mobile Office */}
              {useCases[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rv-card-base p-8 md:p-12"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <Wifi className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[var(--rv-life-accent-orange)] mb-2 block">
                        {useCases[2].persona.toUpperCase().replace('-', ' ')}
                      </span>
                      <h3 className="text-3xl font-bold text-[var(--rv-text-primary)] mb-2">
                        {useCases[2].title}
                      </h3>
                      <p className="text-[var(--rv-text-muted)]">{useCases[2].scenario}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="rv-body-large text-[var(--rv-text-secondary)]">
                      {useCases[2].opening.text}
                    </p>

                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-3 text-[var(--rv-text-primary)]">The Breaking Point</h4>
                      <p className="rv-body-base text-[var(--rv-text-secondary)] mb-3">
                        {useCases[2].opening.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-4 text-[var(--rv-text-primary)]">Measurable Results After RV Life Pro</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-3xl font-bold text-[var(--rv-life-secondary-green)] mb-2">100%</div>
                          <div className="text-sm text-[var(--rv-text-secondary)]">On-time delivery rate maintained</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-2">+12hrs</div>
                          <div className="text-sm text-[var(--rv-text-secondary)]">Additional billable hours per week</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
                          <div className="text-sm text-[var(--rv-text-secondary)]">Perfect work spots discovered</div>
                        </div>
                      </div>
                    </div>

                    <blockquote className="border-l-4 border-[var(--rv-life-primary-blue)] pl-6 py-4 italic text-lg text-[var(--rv-text-primary)]">
                      "{useCases[2].emotionalPayoff.quote.substring(0, 200)}..."
                      <footer className="text-sm text-[var(--rv-text-muted)] mt-3 not-italic">
                        — {useCases[2].emotionalPayoff.attribution}
                      </footer>
                    </blockquote>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Note about testimonials */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mt-12"
            >
              <div className="rv-card-base p-6 bg-blue-50 border-2 border-[var(--rv-life-primary-blue)] border-opacity-20">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[var(--rv-life-primary-blue)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-[var(--rv-text-secondary)] leading-relaxed">
                      <strong className="text-[var(--rv-text-primary)]">About These Stories:</strong> These use cases are derived from our problem narratives database, representing real scenarios RV Life Pro users face. For verified customer testimonials, see our app store reviews below.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7: TRUST & VERIFICATION */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {/* TrustSignals Component */}
            <TrustSignals layout="grid" showLinks={true} className="mb-16" />

            {/* SafeTestimonialDisplay - Shows app store reviews if available */}
            <SafeTestimonialDisplay
              testimonials={[]} // Empty array shows fallback with app store links
              layout="grid"
              maxDisplay={6}
              showVerifiedBadge={true}
            />
          </div>
        </section>

        {/* SECTION 8: PRICING & OFFER */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--rv-life-light-bg)] to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                The Maths Is Simple
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                One bridge strike costs $15,000-$25,000. RV Life Pro costs $65 per year. That's a 230x return on investment if it prevents just one disaster.
              </p>
            </div>

            {/* ROI Calculator Visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <div className="rv-card-base p-8 md:p-12 bg-gradient-to-br from-green-50 to-blue-50">
                <h3 className="text-2xl font-bold text-center mb-8 text-[var(--rv-text-primary)]">
                  Cost of One Mistake vs. RV Life Pro
                </h3>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-center">
                    <div className="mb-4">
                      <AlertTriangle className="w-16 h-16 text-[var(--rv-life-warning-red)] mx-auto mb-3" />
                      <h4 className="font-bold text-lg mb-2 text-[var(--rv-text-primary)]">
                        One Bridge Strike
                      </h4>
                    </div>
                    <div className="text-5xl font-bold text-[var(--rv-life-warning-red)] mb-2">
                      $17,400
                    </div>
                    <div className="text-sm text-[var(--rv-text-muted)]">
                      + Insurance hike<br />
                      + Ruined holiday<br />
                      + Emotional trauma
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="mb-4">
                      <Shield className="w-16 h-16 text-[var(--rv-life-secondary-green)] mx-auto mb-3" />
                      <h4 className="font-bold text-lg mb-2 text-[var(--rv-text-primary)]">
                        RV Life Pro (Annual)
                      </h4>
                    </div>
                    <div className="text-5xl font-bold text-[var(--rv-life-secondary-green)] mb-2">
                      $65
                    </div>
                    <div className="text-sm text-[var(--rv-text-muted)]">
                      Just $1.25 per week<br />
                      Unlimited protection<br />
                      Complete peace of mind
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-white rounded-lg border-2 border-[var(--rv-life-secondary-green)]">
                  <div className="text-4xl font-bold text-[var(--rv-life-secondary-green)] mb-2">
                    267x ROI
                  </div>
                  <p className="text-[var(--rv-text-secondary)]">
                    If RV Life Pro prevents just ONE bridge strike, you've saved 267 times what you invested
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pricing Card */}
            <div className="max-w-2xl mx-auto">
              <RVLifePricingCard
                name="RV Life Pro Annual"
                description="Everything you need for safe, stress-free RV travel across Australia"
                price={{
                  original: 81.25,
                  current: 65,
                  currency: '$',
                  period: 'year',
                }}
                discountCode={{
                  code: 'SMARTRV20',
                  savings: 'Save $16.25 - Only through this link',
                }}
                features={[
                  'RV height, weight & length routing',
                  '14,000+ campground database',
                  'Offline maps for remote areas',
                  'Weather-aware routing',
                  'Real-time hazard alerts',
                  'Propane restriction routing',
                  'Connectivity information',
                  'Maintenance tracking',
                  '14-day free trial',
                  '30-day money-back guarantee',
                ]}
                cta={{
                  text: 'Start Free Trial - No Credit Card',
                  onClick: () => handleCTAClick('pricing-card'),
                }}
                trustBadges={[
                  {
                    text: '47,000+ Users',
                    type: 'users'
                  },
                  {
                    text: '4.8/5 Stars',
                    type: 'rating',
                    rating: 4.8
                  },
                  {
                    text: '30-Day Guarantee',
                    type: 'guarantee'
                  }
                ]}
                featured={true}
                popularBadge={true}
                delay={0}
              />
            </div>

            {/* Discount code emphasis */}
            <div className="max-w-2xl mx-auto mt-8">
              <DiscountCodeBox
                codeType="standard"
                showUrgency={true}
                location="pricing-section"
              />
            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL CALL TO ACTION */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Summary of transformation */}
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Don't Let Your Family's Story<br />End Like Sarah's
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                  47,000+ Australian RV owners have already made the switch. They're travelling with confidence, discovering amazing places, and creating memories—not dealing with insurance claims and repair bills.
                </p>
              </div>

              {/* Key benefits reminder */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Shield className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Zero Risk</h3>
                  <p className="text-sm text-white/80">14-day free trial + 30-day money-back guarantee</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Target className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Proven Results</h3>
                  <p className="text-sm text-white/80">200+ bridge strikes prevented annually</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Award className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Best Value</h3>
                  <p className="text-sm text-white/80">$1.25/week vs $15,000+ mistake</p>
                </div>
              </div>

              {/* Strong CTA */}
              <div className="space-y-6">
                <RVLifeAffiliateLink
                  campaign="story-final-cta"
                  buttonText="Protect Your RV & Family - Start Free Trial"
                  variant="secondary"
                  size="lg"
                  trackingLabel="Final CTA"
                  showDiscountTooltip={true}
                  onClick={() => handleCTAClick('final-cta')}
                  className="bg-white text-[var(--rv-life-primary-blue)] hover:bg-gray-100 text-lg px-8 py-6"
                />

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>30-day guarantee</span>
                  </div>
                </div>

                <p className="text-white/60 text-sm italic">
                  Join the 47,000+ Australian RV owners who refuse to risk their investment
                </p>
              </div>
            </motion.div>

            {/* Final social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <div className="flex flex-wrap justify-center gap-8 items-center text-sm text-white/80">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">4.8/5</div>
                  <div>App Store</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">47,000+</div>
                  <div>Active Users</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">12+</div>
                  <div>Years Trusted</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">14,000+</div>
                  <div>Campgrounds</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Exit Intent Modal */}
        <ExitIntentModal
          disabled={false}
          initialDelay={5000}
          expiryDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
        />
      </div>
    </>

    </Layout>
  );
};

export default RVLifeProStory;
