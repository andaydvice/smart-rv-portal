/**
 * Grey Nomads Use Case Scenario Page
 *
 * Persona: Robert & Jennifer (55-75, retired, full-time living)
 * Scenario: "Full-Time Freedom: Robert & Jennifer's Transition"
 * Emotional Journey: Uncertainty → Planning → Freedom
 */

import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Shield,
  MapPin,
  Navigation,
  CheckCircle,
  AlertTriangle,
  Users,
  TrendingUp,
  Compass,
  CloudOff,
  Wrench,
  Route,
  Heart,
  ArrowRight,
  Star,
  Award,
  DollarSign,
  Home,
  Wifi,
} from 'lucide-react';

// Component imports
import {
  RVLifeHeroSection,
  RVLifeCard,
  RVLifeCardGrid,
  RVLifeFeatureBlock,
  TrustSignals,
  RVLifeAffiliateLink,
  DiscountCodeBox,
  ExitIntentModal,
} from '@/components/affiliate/rv-life-pro';

// Hook imports
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';

// Data imports
import copyData from '@/data/affiliate/rv-life-pro-copy.json';

// Styles
import '@/styles/affiliate/rv-life-pro.css';
import { cn } from '@/lib/utils';

/**
 * Timeline Component for Journey Section
 */
interface TimelineEvent {
  title: string;
  description: string;
  icon: React.ReactNode;
  outcome?: string;
}

const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <Layout>
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)]" />

      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="relative flex gap-6 items-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] flex items-center justify-center text-white shadow-lg">
                {event.icon}
              </div>
            </div>

            <div className="flex-1 rv-card-base p-6">
              <h4 className="rv-headline-tertiary mb-2">{event.title}</h4>
              <p className="rv-body-base text-[var(--rv-text-secondary)] mb-3">
                {event.description}
              </p>
              {event.outcome && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--rv-life-secondary-green)] bg-opacity-10 text-[var(--rv-life-secondary-green)] rounded-lg text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  {event.outcome}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    </Layout>
  );
};

/**
 * Grey Nomads Scenario Page Component
 */
const GreyNomads: React.FC = () => {
  const { trackCTAClick, trackCustomEvent } = useRVLifeTracking({
    pageName: 'grey-nomads-scenario',
    trackScrollDepth: true,
    trackTimeOnPage: true,
  });

  useEffect(() => {
    trackCustomEvent('scenario_page_viewed', { persona: 'grey-nomads' });
  }, [trackCustomEvent]);

  const useCase = copyData.useCaseScenarios[1]; // Grey Nomads

  const journeyEvents: TimelineEvent[] = [
    {
      title: 'Month 1: The Kimberley Challenge',
      description: 'Started their journey heading to the Kimberley. RV Life Pro flagged unsuitable tracks marked as "through roads" by standard GPS, preventing what could have been a dangerous mountain track situation.',
      icon: <AlertTriangle className="w-6 h-6" />,
      outcome: '✓ Avoided dangerous unsuitable route',
    },
    {
      title: 'Month 3: Mastering Offline Navigation',
      description: 'Downloaded complete offline maps before heading into remote areas. Lost mobile reception for five days straight but navigation continued flawlessly with all campground and service data available.',
      icon: <CloudOff className="w-6 h-6" />,
      outcome: '✓ Perfect navigation without reception',
    },
    {
      title: 'Month 6: Seasonal Route Adjustment',
      description: 'Community updates flagged track closures for wet season repairs. Rerouted using alternative routes with recent road condition photos from other users, avoiding a potential 400km detour.',
      icon: <Route className="w-6 h-6" />,
      outcome: '✓ Saved 3 days through community intel',
    },
    {
      title: 'Month 9: Preventative Maintenance',
      description: 'App reminded them of tyre rotation during their Nullarbor crossing. Quick service revealed one tyre running low—potentially dangerous at highway speeds with heavy loads.',
      icon: <Wrench className="w-6 h-6" />,
      outcome: '✓ Prevented potential blowout',
    },
    {
      title: 'Month 12: Weather Wisdom',
      description: 'High wind warnings for Nullarbor crossing. Delayed 24 hours based on app recommendation. Next day saw perfect conditions while radio reported multiple caravans blown over the previous day.',
      icon: <Shield className="w-6 h-6" />,
      outcome: '✓ Safety through weather awareness',
    },
    {
      title: 'Month 18: Full-Time Freedom Achieved',
      description: '47,000km travelled without a single dangerous incident. Discovered 23 secret camping spots, connected with 30+ regular travel companions, and living the dream they imagined.',
      icon: <Award className="w-6 h-6" />,
      outcome: '✓ Dream lifestyle fully realised!',
    },
  ];

  return (
    <Layout>
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Full-Time RV Living Success Story | Grey Nomads Journey with RV Life Pro</title>
        <meta
          name="description"
          content="How Robert & Jennifer sold their house, bought a motorhome, and travelled 47,000km across Australia full-time using RV Life Pro. Remote area navigation, seasonal planning, and community connection."
        />
        <meta name="keywords" content="full time RV living, grey nomads, retirement travel, motorhome Australia, remote area navigation, RV Life Pro" />
        <link rel="canonical" href="https://smartrvportal.com.au/affiliate/rv-life-pro/scenarios/grey-nomads" />

        <meta property="og:title" content="Full-Time Freedom: Robert & Jennifer's Transition" />
        <meta property="og:description" content="From house sale to 47,000km of Australian exploration - how retirees achieved their full time RV dream safely and successfully." />
        <meta property="og:type" content="article" />
      </Helmet>

      <ExitIntentModal />

      {/* Hero Section */}
      <RVLifeHeroSection
        headline="Full-Time Freedom: Robert & Jennifer's Transition"
        subheadline="How two retirees sold their house, bought an 8-metre motorhome, and safely travelled 47,000km across Australia"
        description={useCase.opening.text}
        backgroundImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop"
        backgroundOverlay={true}
        overlayOpacity={0.6}
        height="medium"
        cta={{
          primary: {
            text: 'Start Your Full-Time Journey',
            href: '#',
            onClick: () => trackCTAClick('Start Full-Time Journey', 'hero'),
          },
          secondary: {
            text: 'See Their Story',
            href: '#solution',
          },
        }}
        trustIndicators={[
          { icon: <Compass className="w-5 h-5" />, text: 'Full-time travellers', variant: 'light' as const },
          { icon: <CloudOff className="w-5 h-5" />, text: 'Works offline', variant: 'light' as const },
          { icon: <Star className="w-5 h-5" />, text: '47,000+ users', variant: 'light' as const },
        ]}
      />

      {/* Persona Stats */}
      <section className="rv-container py-12">
        <div className="rv-card-base p-8 bg-gradient-to-br from-[var(--rv-life-light-bg)] to-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">55-75</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Age Range</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">8.2m</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Motorhome Length</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">47,000km</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Distance Travelled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">18 months</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Journey Duration</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section id="challenge" className="py-16 bg-[var(--rv-life-off-white)]">
        <div className="rv-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="rv-headline-primary mb-4">The Challenge</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
              {useCase.opening.challenge}
            </p>
          </motion.div>

          <RVLifeCardGrid columns={3}>
            {useCase.challenges.map((challenge, index) => (
              <RVLifeCard
                key={index}
                icon={<AlertTriangle className="w-6 h-6" />}
                iconBgColor="var(--rv-life-warning-red)"
                headline={challenge.split(':')[0] || challenge}
                body={challenge}
                delay={index * 0.1}
              />
            ))}
          </RVLifeCardGrid>
        </div>
      </section>

      {/* The Discovery */}
      <section className="py-16">
        <div className="rv-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="rv-card-base p-8 md:p-12 bg-gradient-to-br from-blue-50 to-green-50"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--rv-life-primary-blue)] flex items-center justify-center text-white flex-shrink-0">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="rv-headline-secondary mb-4">The Discovery</h2>
                  <p className="rv-body-large text-[var(--rv-text-secondary)] mb-6">
                    {useCase.howAppHelps.introduction}
                  </p>
                  <blockquote className="border-l-4 border-[var(--rv-life-primary-blue)] pl-6 italic text-[var(--rv-text-secondary)]">
                    "You're using regular GPS? Mate, that'll get you killed out here. RV Life Pro knows which roads are actually suitable for big rigs. It's saved me dozens of times in seven years of full-timing."
                    <footer className="text-sm mt-2 text-[var(--rv-text-muted)]">— Malcolm, Experienced Full-Timer</footer>
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section id="solution" className="py-16 bg-[var(--rv-life-off-white)]">
        <div className="rv-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="rv-headline-primary mb-4">The Solution</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
              How RV Life Pro enabled their full-time dream and transformed uncertainty into confidence
            </p>
          </motion.div>

          <div className="space-y-16">
            {useCase.howAppHelps.specific_solutions.map((solution, index) => (
              <RVLifeFeatureBlock
                key={index}
                icon={index === 0 ? <Route className="w-8 h-8" /> :
                      index === 1 ? <CloudOff className="w-8 h-8" /> :
                      index === 2 ? <Compass className="w-8 h-8" /> :
                      index === 3 ? <Wrench className="w-8 h-8" /> :
                      index === 4 ? <MapPin className="w-8 h-8" /> :
                      index === 5 ? <Shield className="w-8 h-8" /> :
                      <Users className="w-8 h-8" />}
                title={solution.challenge}
                description={solution.solution}
                layout={index % 2 === 0 ? 'right' : 'left'}
                delay={0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Journey Timeline */}
      <section className="py-16">
        <div className="rv-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="rv-headline-primary mb-4">The Journey</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
              Month by month, Robert & Jennifer's retirement dream became their daily reality
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Timeline events={journeyEvents} />
          </div>
        </div>
      </section>

      {/* The Results */}
      <section className="py-16 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white">
        <div className="rv-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Transformation</h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              {useCase.resolution.text}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {useCase.resolution.specific_outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="w-8 h-8 mb-3 text-[var(--rv-life-accent-orange)]" />
                <p className="text-white">{outcome}</p>
              </motion.div>
            ))}
          </div>

          {/* Scenario Note - NOT a testimonial */}
          <motion.div
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-500/20 border border-blue-300/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-white/90 text-center">
                <strong>Note:</strong> This is an illustrative use case scenario based on common RVing experiences, not a verified customer testimonial.
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg text-white/90">
                Real reviews from verified customers are available on the App Store and Google Play.
              </p>
            </div>
            {/* Use TrustSignals instead of fake testimonial */}
            <div className="mt-8">
              <TrustSignals layout="compact" showLinks={true} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grey Nomad-Specific Features */}
      <section className="py-16">
        <div className="rv-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="rv-headline-primary mb-4">Perfect for Full-Time Travellers</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
              Features specifically designed for extended journeys and full time RV living
            </p>
          </motion.div>

          <RVLifeCardGrid columns={3}>
            <RVLifeCard
              icon={<Route className="w-6 h-6" />}
              headline="Long-Term Route Planning"
              body="Plan multi-month journeys with seasonal considerations. Track your route history and revisit favourite locations. Perfect for full time travellers exploring Australia."
              delay={0}
            />
            <RVLifeCard
              icon={<Compass className="w-6 h-6" />}
              headline="Seasonal Migration Routes"
              body="Follow the weather with seasonal route recommendations. Track optimal travel times for different regions. Join the grey nomad migration routes safely."
              delay={0.1}
            />
            <RVLifeCard
              icon={<DollarSign className="w-6 h-6" />}
              headline="Budget Tracking"
              body="Track fuel costs, campground fees, and maintenance expenses over time. Stay within your retirement budget while living your dream lifestyle."
              delay={0.2}
            />
            <RVLifeCard
              icon={<CloudOff className="w-6 h-6" />}
              headline="Offline Maps for Remote Areas"
              body="Download complete regional maps for offline use. Navigate confidently through the outback with zero mobile reception. Essential for remote area exploration."
              delay={0.3}
            />
            <RVLifeCard
              icon={<Wrench className="w-6 h-6" />}
              headline="Maintenance Tracking"
              body="Track service intervals, tyre rotations, and system checks. Prevent breakdowns with timely maintenance reminders. Find qualified technicians along your route."
              delay={0.4}
            />
            <RVLifeCard
              icon={<Users className="w-6 h-6" />}
              headline="Community Connection"
              body="Connect with other full-timers, join meetups, and share recommendations. Build friendships with fellow travellers living the same dream."
              delay={0.5}
            />
          </RVLifeCardGrid>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-[var(--rv-life-off-white)]">
        <div className="rv-container">
          <TrustSignals layout="grid" showLinks={true} />
        </div>
      </section>

      {/* Key Lessons */}
      <section className="py-16">
        <div className="rv-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="rv-headline-secondary mb-8 text-center">Key Lessons Learned</h2>
              <div className="space-y-4">
                {useCase.keyLessons.map((lesson, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg border-l-4 border-[var(--rv-life-secondary-green)]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-1" />
                    <p className="rv-body-base text-[var(--rv-text-secondary)]">{lesson}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)]">
        <div className="rv-container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Live Your Full-Time RV Dream
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Join thousands of grey nomads exploring Australia with confidence
              </p>

              <div className="mb-8">
                <RVLifeAffiliateLink
                  campaign="grey-nomads-scenario"
                  buttonText="Start Free 14-Day Trial"
                  variant="default"
                  size="lg"
                  trackingLabel="Grey Nomads CTA"
                  className="bg-white text-[var(--rv-life-primary-blue)] hover:bg-gray-100 text-lg px-8 py-6"
                />
              </div>

              <div className="max-w-md mx-auto">
                <DiscountCodeBox
                  location="grey-nomads-bottom-cta"
                  showUrgency={true}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-16">
        <div className="rv-container">
          <h2 className="rv-headline-secondary mb-8 text-center">
            See How Others Use RV Life Pro
          </h2>
          <RVLifeCardGrid columns={2}>
            <RVLifeCard
              icon={<Home className="w-6 h-6" />}
              headline="Weekend Adventures: Families"
              body="Discover how the Patterson family conquered their first 3,200km caravan trip with three young kids, staying within budget and creating lifelong memories."
              cta={{
                text: 'Read Their Story',
                href: '/affiliate/rv-life-pro/scenarios/weekend-warriors',
                variant: 'secondary',
              }}
            />
            <RVLifeCard
              icon={<Wifi className="w-6 h-6" />}
              headline="Mobile Office: Digital Nomads"
              body="Learn how Emma combines remote work with van life, maintaining 100% on-time delivery while travelling 12,000km up the east coast."
              cta={{
                text: 'Read Their Story',
                href: '/affiliate/rv-life-pro/scenarios/digital-nomads',
                variant: 'secondary',
              }}
            />
          </RVLifeCardGrid>
        </div>
      </section>
    </>

    </Layout>
  );
};

export default GreyNomads;
