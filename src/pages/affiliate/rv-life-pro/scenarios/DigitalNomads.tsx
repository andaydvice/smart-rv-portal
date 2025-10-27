/**
 * Digital Nomads Use Case Scenario Page
 *
 * Persona: Emma Rodriguez (28-45, remote worker, needs connectivity)
 * Scenario: "Mobile Office: Emma's Remote Work Revolution"
 * Emotional Journey: Trapped → Adventurous → Balanced
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
  Wifi,
  Laptop,
  Signal,
  Coffee,
  Battery,
  Zap,
  Heart,
  Star,
  Award,
  DollarSign,
  Home,
  Calendar,
  Target,
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
 * Digital Nomads Scenario Page Component
 */
const DigitalNomads: React.FC = () => {
  const { trackCTAClick, trackCustomEvent } = useRVLifeTracking({
    pageName: 'digital-nomads-scenario',
    trackScrollDepth: true,
    trackTimeOnPage: true,
  });

  useEffect(() => {
    trackCustomEvent('scenario_page_viewed', { persona: 'digital-nomads' });
  }, [trackCustomEvent]);

  const useCase = copyData.useCaseScenarios[2]; // Digital Nomads

  const journeyEvents: TimelineEvent[] = [
    {
      title: 'Week 1: Discovery Phase',
      description: 'Emma downloaded RV Life Pro and discovered connectivity filters. Could now search campgrounds by WiFi speed ratings and mobile coverage strength—game-changing for her work requirements.',
      icon: <Wifi className="w-6 h-6" />,
      outcome: '✓ Found work-suitable locations instantly',
    },
    {
      title: 'Week 4: First Major Deadline',
      description: 'Major client deadline approaching. Filtered route for locations with confirmed 5G coverage and co-working spaces. Found campground with fibre internet and beachside cafe for backup workspace.',
      icon: <Target className="w-6 h-6" />,
      outcome: '✓ 100% on-time delivery maintained',
    },
    {
      title: 'Month 2: Productivity Surge',
      description: 'Reduced workspace search time from 2-3 hours daily to 10 minutes weekly planning. Increased billable hours by 12 hours/week through better efficiency and less stress.',
      icon: <TrendingUp className="w-6 h-6" />,
      outcome: '✓ 12+ hours/week productivity gain',
    },
    {
      title: 'Month 3: Perfect Spots Discovered',
      description: 'Found clifftop rest area in Jervis Bay with full 5G coverage, campground in Coffs Harbour with fibre internet, and cafe in Byron Bay that became regular Tuesday office.',
      icon: <MapPin className="w-6 h-6" />,
      outcome: '✓ 15 perfect work spots catalogued',
    },
    {
      title: 'Month 5: Community Connection',
      description: 'Connected with 20+ other remote workers through app\'s digital nomad community. Shared favourite work spots, troubleshot technical issues, and coordinated co-working meetups.',
      icon: <Users className="w-6 h-6" />,
      outcome: '✓ $12,000+ in referral business',
    },
    {
      title: 'Month 6: Lifestyle Achieved',
      description: '12,000km travelled while hitting every client deadline. Work quality improved, income maintained, and found sustainable work-life balance that\'s superior to traditional office.',
      icon: <Award className="w-6 h-6" />,
      outcome: '✓ Dream lifestyle fully sustainable!',
    },
  ];

  return (
    <Layout>
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Remote Work + Van Life Success Story | Digital Nomad with RV Life Pro</title>
        <meta
          name="description"
          content="How Emma Rodriguez maintains her freelance design business while travelling 12,000km. Remote work locations, connectivity planning, and work-life balance on the road."
        />
        <meta name="keywords" content="digital nomad, van life, remote work, work from van, mobile office, RV Life Pro, connectivity, work travel balance" />
        <link rel="canonical" href="https://smartrvportal.com.au/affiliate/rv-life-pro/scenarios/digital-nomads" />

        <meta property="og:title" content="Mobile Office: Emma's Remote Work Revolution" />
        <meta property="og:description" content="From stressed freelancer to thriving digital nomad—how one remote worker made van life professionally sustainable." />
        <meta property="og:type" content="article" />
      </Helmet>

      <ExitIntentModal />

      {/* Hero Section */}
      <RVLifeHeroSection
        headline="Mobile Office: Emma's Remote Work Revolution"
        subheadline="How a freelance designer travels 12,000km while maintaining 100% on-time delivery and $85,000/year income"
        description={useCase.opening.text}
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop"
        backgroundOverlay={true}
        overlayOpacity={0.6}
        height="medium"
        cta={{
          primary: {
            text: 'Enable Your Mobile Office',
            href: '#',
            onClick: () => trackCTAClick('Enable Mobile Office', 'hero'),
          },
          secondary: {
            text: 'See How She Did It',
            href: '#solution',
          },
        }}
        trustIndicators={[
          { icon: <Wifi className="w-5 h-5" />, text: 'WiFi speed ratings', variant: 'light' as const },
          { icon: <Signal className="w-5 h-5" />, text: 'Coverage mapping', variant: 'light' as const },
          { icon: <Laptop className="w-5 h-5" />, text: 'Co-working spaces', variant: 'light' as const },
        ]}
      />

      {/* Persona Stats */}
      <section className="rv-container py-12">
        <div className="rv-card-base p-8 bg-gradient-to-br from-[var(--rv-life-light-bg)] to-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">28-45</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Age Range</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">5.8m</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Van Length</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">12,000km</div>
              <div className="text-sm text-[var(--rv-text-muted)]">Distance Travelled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">100%</div>
              <div className="text-sm text-[var(--rv-text-muted)]">On-Time Delivery</div>
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
                    "You need to stop using regular GPS. RV Life Pro isn't just about avoiding bridges—it shows you connectivity ratings, identifies rest areas with WiFi, and has filters for what amenities you actually need. It's designed for people like us who need to work on the road."
                    <footer className="text-sm mt-2 text-[var(--rv-text-muted)]">— Alex, Fellow Van-Lifer</footer>
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
              How RV Life Pro transformed chaotic van life into a sustainable professional practice
            </p>
          </motion.div>

          <div className="space-y-16">
            {useCase.howAppHelps.specific_solutions.map((solution, index) => (
              <RVLifeFeatureBlock
                key={index}
                icon={index === 0 ? <Wifi className="w-8 h-8" /> :
                      index === 1 ? <Target className="w-8 h-8" /> :
                      index === 2 ? <Coffee className="w-8 h-8" /> :
                      index === 3 ? <Signal className="w-8 h-8" /> :
                      index === 4 ? <MapPin className="w-8 h-8" /> :
                      index === 5 ? <Battery className="w-8 h-8" /> :
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
              Week by week, Emma's professional chaos transformed into sustainable success
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

      {/* Digital Nomad-Specific Features */}
      <section className="py-16">
        <div className="rv-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="rv-headline-primary mb-4">Perfect for Digital Nomads</h2>
            <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
              Features specifically designed for remote workers who need connectivity and productivity on the road
            </p>
          </motion.div>

          <RVLifeCardGrid columns={3}>
            <RVLifeCard
              icon={<Wifi className="w-6 h-6" />}
              headline="WiFi Speed Filtering"
              body="Filter campgrounds by verified WiFi speed ratings from actual users. Find locations with speeds suitable for video calls, large file transfers, and design work."
              delay={0}
            />
            <RVLifeCard
              icon={<Signal className="w-6 h-6" />}
              headline="Mobile Coverage Mapping"
              body="See Telstra, Optus, and Vodafone coverage overlay on your routes. Plan work days in high-coverage zones and travel days through low-coverage areas."
              delay={0.1}
            />
            <RVLifeCard
              icon={<Coffee className="w-6 h-6" />}
              headline="Co-Working Spaces"
              body="Discover co-working spaces, libraries, and remote-work-friendly cafes along your routes. Complete with WiFi speeds, operating hours, and parking suitability."
              delay={0.2}
            />
            <RVLifeCard
              icon={<MapPin className="w-6 h-6" />}
              headline="Quiet Work Locations"
              body="Filter for quiet campgrounds away from party crowds. Find rest areas with picnic tables and stunning views perfect for morning work sessions."
              delay={0.3}
            />
            <RVLifeCard
              icon={<Battery className="w-6 h-6" />}
              headline="Power Management"
              body="Find powered sites with reliable electricity. Reviews indicate which campgrounds have consistent power for laptops, monitors, and charging equipment."
              delay={0.4}
            />
            <RVLifeCard
              icon={<Users className="w-6 h-6" />}
              headline="Digital Nomad Community"
              body="Connect with other remote workers, share favourite work spots, coordinate co-working meetups, and build your professional network on the road."
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
                Make Van Life Professionally Sustainable
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Join thousands of digital nomads working remotely while exploring Australia
              </p>

              <div className="mb-8">
                <RVLifeAffiliateLink
                  campaign="digital-nomads-scenario"
                  buttonText="Start Free 14-Day Trial"
                  variant="default"
                  size="lg"
                  trackingLabel="Digital Nomads CTA"
                  className="bg-white text-[var(--rv-life-primary-blue)] hover:bg-gray-100 text-lg px-8 py-6"
                />
              </div>

              <div className="max-w-md mx-auto">
                <DiscountCodeBox
                  location="digital-nomads-bottom-cta"
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
              icon={<Calendar className="w-6 h-6" />}
              headline="Full-Time Freedom: Grey Nomads"
              body="Discover how Robert & Jennifer transitioned to full time RV living and have travelled 47,000km across Australia without a single navigation issue."
              cta={{
                text: 'Read Their Story',
                href: '/affiliate/rv-life-pro/scenarios/grey-nomads',
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

export default DigitalNomads;
