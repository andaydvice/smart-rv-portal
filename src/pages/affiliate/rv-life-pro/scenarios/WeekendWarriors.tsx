/**
 * Weekend Warriors Use Case Scenario Page
 *
 * Persona: Patterson Family (35-55, families with children)
 * Scenario: "First Cross-Country Adventure: The Patterson Family Story"
 * Emotional Journey: Anxiety → Confidence → Joy
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
  Calendar,
  DollarSign,
  Home,
  Wifi,
  Heart,
  ArrowRight,
  Star,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      {/* Vertical line */}
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
            {/* Icon circle */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] flex items-center justify-center text-white shadow-lg">
                {event.icon}
              </div>
            </div>

            {/* Content */}
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
 * Weekend Warriors Scenario Page Component
 */
const WeekendWarriors: React.FC = () => {
  // Initialize tracking
  const { trackCTAClick, trackCustomEvent } = useRVLifeTracking({
    pageName: 'weekend-warriors-scenario',
    trackScrollDepth: true,
    trackTimeOnPage: true,
  });

  // Track page load
  useEffect(() => {
    trackCustomEvent('scenario_page_viewed', { persona: 'weekend-warriors' });
  }, [trackCustomEvent]);

  // Get copy data
  const useCase = copyData.useCaseScenarios[0]; // Weekend Warriors
  const features = copyData.featureBenefits;

  // Timeline events for the journey
  const journeyEvents: TimelineEvent[] = [
    {
      title: 'Day 1: Route Planning',
      description: 'Tom entered their caravan specifications (3.2m height, 6m length, 2,400kg). RV Life Pro calculated safe routes avoiding low bridges and tight streets, adding just 40 minutes but eliminating major risks.',
      icon: <Navigation className="w-6 h-6" />,
      outcome: '✓ Avoided 1 low bridge, 2 weight-restricted roads',
    },
    {
      title: 'Day 3: Family-Friendly Stops',
      description: 'Lisa filtered for campgrounds with playgrounds and pools. Found 12 perfect spots with recent reviews from other families describing kid activities and safety features.',
      icon: <Users className="w-6 h-6" />,
      outcome: '✓ Every campground exceeded expectations',
    },
    {
      title: 'Day 5: Budget Victory',
      description: 'By filtering for price ranges and using free rest areas for lunch, Lisa saved $80-100 that went toward a special dolphin-watching tour in Hervey Bay.',
      icon: <DollarSign className="w-6 h-6" />,
      outcome: '✓ Stayed under budget by $340',
    },
    {
      title: 'Day 7: Weather Warning',
      description: 'RV Life Pro alerted them to heavy rain forecast. They delayed departure by one day, avoiding a storm that caused three caravan accidents on their planned route.',
      icon: <AlertTriangle className="w-6 h-6" />,
      outcome: '✓ Crisis averted through weather awareness',
    },
    {
      title: 'Day 12: Urban Navigation',
      description: 'Approaching Brisbane, the app routed them around city centre, avoiding tunnels and heavy traffic. What Tom dreaded became surprisingly straightforward.',
      icon: <MapPin className="w-6 h-6" />,
      outcome: '✓ Stress-free urban driving experience',
    },
    {
      title: 'Day 21: Journey Complete',
      description: '3,200km completed without a single navigation issue or safety scare. Kids excitedly planning next adventure. Tom confident enough to plan a 4-week Tasmania trip.',
      icon: <Award className="w-6 h-6" />,
      outcome: '✓ Family now loves caravanning!',
    },
  ];

  return (
    <Layout>
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Weekend Family RV Adventure Story | RV Life Pro Success Stories</title>
        <meta
          name="description"
          content="How the Patterson family conquered their first 3,200km caravan trip with young kids using RV Life Pro. Family-friendly campgrounds, safe routes, and budget-friendly planning."
        />
        <meta name="keywords" content="family RV trip, caravan with kids, family camping, weekend warriors, RV trip planning, family-friendly campgrounds" />
        <link rel="canonical" href="https://smartrvportal.com.au/affiliate/rv-life-pro/scenarios/weekend-warriors" />

        {/* Open Graph */}
        <meta property="og:title" content="First Cross-Country Adventure: The Patterson Family Story" />
        <meta property="og:description" content="How a first time RV family completed 3,200km with three kids - stress-free, on budget, and creating memories that last a lifetime." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://smartrvportal.com.au/affiliate/rv-life-pro/scenarios/weekend-warriors" />
      </Helmet>

      {/* Exit Intent Modal */}
      <ExitIntentModal />

      {/* Hero Section */}
      <RVLifeHeroSection
        headline="First Cross-Country Adventure: The Patterson Family Story"
        subheadline="How a family with zero RV experience conquered 3,200km with three kids—and fell in love with caravanning"
        description={useCase.opening.text}
        backgroundImage="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1920&h=1080&fit=crop"
        backgroundOverlay={true}
        overlayOpacity={0.6}
        height="medium"
        cta={{
          primary: {
            text: 'Start Your Family Adventure',
            href: '#',
            onClick: () => trackCTAClick('Start Family Adventure', 'hero'),
          },
          secondary: {
            text: 'See How It Works',
            href: '#solution',
          },
        }}
        trustIndicators={[
          { icon: <Users className="w-5 h-5" />, text: 'Perfect for families', variant: 'light' as const },
          { icon: <CheckCircle className="w-5 h-5" />, text: '14-day free trial', variant: 'light' as const },
          { icon: <Star className="w-5 h-5" />, text: '4.8/5 rating', variant: 'light' as const },
        ]}
      />

      {/* Persona Stats */}
      <section className="rv-container py-12">
        <div className="rv-card-base p-8 bg-gradient-to-br from-[var(--rv-life-light-bg)] to-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">35-55</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Age Range</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">6m</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Caravan Length</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">3,200km</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Journey Distance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">3 weeks</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Trip Duration</div>
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
            {useCase.challenges.slice(0, 6).map((challenge, index) => (
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
                    "It's designed for exactly your situation—complete beginners planning their first big trip. I've been using it for two years without a single scare."
                    <footer className="text-sm mt-2 text-[var(--rv-text-muted)]">— Tom's Colleague</footer>
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
              How RV Life Pro solved every challenge and transformed their family adventure
            </p>
          </motion.div>

          <div className="space-y-16">
            {useCase.howAppHelps.specific_solutions.map((solution, index) => (
              <RVLifeFeatureBlock
                key={index}
                icon={index === 0 ? <Navigation className="w-8 h-8" /> :
                      index === 1 ? <Users className="w-8 h-8" /> :
                      index === 2 ? <DollarSign className="w-8 h-8" /> :
                      index === 3 ? <AlertTriangle className="w-8 h-8" /> :
                      index === 4 ? <MapPin className="w-8 h-8" /> :
                      <Shield className="w-8 h-8" />}
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
              Week by week, the Patterson family's confidence grew as RV Life Pro guided them safely to adventure
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

      {/* Family-Specific Features */}
      <section className="py-16">
        <div className="rv-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="rv-headline-primary mb-4">Perfect for Weekend Warriors</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
              Features specifically designed for families taking weekend and holiday trips
            </p>
          </motion.div>

          <RVLifeCardGrid columns={3}>
            <RVLifeCard
              icon={<Users className="w-6 h-6" />}
              headline="Family-Friendly Filters"
              body="Filter campgrounds by playgrounds, swimming pools, family activities, and safety features. Read reviews from other families to find perfect spots for kids."
              delay={0}
            />
            <RVLifeCard
              icon={<Calendar className="w-6 h-6" />}
              headline="Weekend Trip Planning"
              body="Plan quick 2-3 day trips with optimised routes. Find campgrounds within your travel radius and time constraints. Perfect for school holiday adventures."
              delay={0.1}
            />
            <RVLifeCard
              icon={<DollarSign className="w-6 h-6" />}
              headline="Budget Control"
              body="Filter by price range, find free rest areas, and track trip costs. Stay within budget while giving kids amazing experiences."
              delay={0.2}
            />
            <RVLifeCard
              icon={<Shield className="w-6 h-6" />}
              headline="Safety First"
              body="RV-safe routing protects your family from dangerous situations. Weather alerts prevent travel in unsafe conditions. Peace of mind for every journey."
              delay={0.3}
            />
            <RVLifeCard
              icon={<Heart className="w-6 h-6" />}
              headline="Kid-Friendly Amenities"
              body="Find campgrounds with amenities kids love: playgrounds, pools, bike paths, and safe swimming areas. Turn travel days into adventures."
              delay={0.4}
            />
            <RVLifeCard
              icon={<MapPin className="w-6 h-6" />}
              headline="Attraction Routing"
              body="Plan routes that include kid-friendly attractions, rest stops, and scenic viewpoints. Make the journey as exciting as the destination."
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
                Start Your Family's RV Adventure
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Join thousands of families creating lifelong memories with RV Life Pro
              </p>

              <div className="mb-8">
                <RVLifeAffiliateLink
                  campaign="weekend-warriors-scenario"
                  buttonText="Start Free 14-Day Trial"
                  variant="default"
                  size="lg"
                  trackingLabel="Weekend Warriors CTA"
                  className="bg-white text-[var(--rv-life-primary-blue)] hover:bg-gray-100 text-lg px-8 py-6"
                />
              </div>

              <div className="max-w-md mx-auto">
                <DiscountCodeBox
                  location="weekend-warriors-bottom-cta"
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
              headline="Full-Time Freedom: Grey Nomads"
              body="Discover how Robert & Jennifer transitioned to full time RV living and have travelled 47,000km across Australia without a single navigation issue."
              cta={{
                text: 'Read Their Story',
                href: '/affiliate/rv-life-pro/scenarios/grey-nomads',
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

export default WeekendWarriors;
