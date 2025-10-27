/**
 * RV Sleep Crisis - Problem-Solution Story Page
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { AlertTriangle, Heart, Zap } from 'lucide-react';
import {
  BrentwoodHeroSection,
  BrentwoodCard,
  BrentwoodCardGrid,
  BrentwoodStatCard,
  BrentwoodAffiliateLink,
} from '@/components/affiliate/brentwood-home';
import '@/styles/affiliate/brentwood-home.css';

const RVSleepCrisis: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>The RV Sleep Crisis: Why 75% of RV Owners Sleep Poorly</title>
        <meta
          name="description"
          content="Discover why most RV owners suffer from poor sleep and how upgrading your mattress can transform your RV lifestyle."
        />
        <link rel="canonical" href="https://smartrvhub.com/rv-sleep-crisis" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartrvhub.com/rv-sleep-crisis" />
        <meta property="og:site_name" content="Smart RV Hub" />
      </Helmet>

      <main className="bg-[var(--brentwood-soft-bg)]">
        <BrentwoodHeroSection
          headline="The Hidden RV Sleep Crisis"
          subheadline="Why 75% of RV Owners Wake Up Tired—And How to Fix It"
          description="Your RV adventure shouldn't end with sleepless nights and aching backs. Discover the shocking truth about RV mattresses and the simple solution."
          height="large"
          alignment="center"
          backgroundImage="/images/affiliate/brentwood-home/tired-rv-owner.jpg"
          cta={{
            primary: {
              text: 'Discover the Solution',
              href: '#solution',
            },
          }}
        />

        {/* Problem Section */}
        <section className="brentwood-section bg-white">
          <div className="brentwood-container">
            <motion.div
              className="max-w-4xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brentwood-warning-red)]/10 border-2 border-[var(--brentwood-warning-red)] rounded-full mb-6">
                <AlertTriangle className="w-5 h-5 text-[var(--brentwood-warning-red)]" />
                <span className="font-bold text-[var(--brentwood-warning-red)]">
                  The Uncomfortable Truth
                </span>
              </div>
              <h2 className="brentwood-headline-primary mb-6">
                The High Cost of Cheap RV Mattresses
              </h2>
              <p className="brentwood-body-large text-[var(--brentwood-text-secondary)]">
                Most RVs come with builder-grade mattresses that cost manufacturers less than $150.
                These aren't designed for comfort—they're designed for profit margins.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BrentwoodStatCard
                stat="$2,000+"
                label="Annual health costs from poor sleep"
                icon={<Heart className="w-8 h-8" />}
                description="Back pain, fatigue, medical visits"
                variant="highlighted"
                delay={0.1}
              />
              <BrentwoodStatCard
                stat="3-5 years"
                label="Typical RV mattress lifespan"
                icon={<AlertTriangle className="w-8 h-8" />}
                description="vs. 8-10 years for quality mattresses"
                delay={0.2}
              />
              <BrentwoodStatCard
                stat="75%"
                label="Of RV owners report poor sleep"
                icon={<Zap className="w-8 h-8" />}
                description="Affecting their RV lifestyle enjoyment"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="brentwood-section bg-[var(--brentwood-soft-bg)]">
          <div className="brentwood-container">
            <motion.div
              className="max-w-4xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="brentwood-headline-primary mb-6">
                The Solution: Premium Sleep for Your Mobile Life
              </h2>
              <p className="brentwood-body-large text-[var(--brentwood-text-secondary)]">
                Brentwood Home mattresses transform your RV bedroom into a luxury sleep sanctuary
                with premium materials, expert craftsmanship, and a 120-night guarantee.
              </p>
            </motion.div>

            <BrentwoodCardGrid columns={3}>
              <BrentwoodCard
                headline="Premium Materials"
                body="Natural latex, gel memory foam, and organic cotton—materials designed for comfort and durability."
                delay={0.1}
              />
              <BrentwoodCard
                headline="Custom Sizing"
                body="Perfect fit for your RV with custom cuts, radius corners, and exact dimensions."
                delay={0.2}
              />
              <BrentwoodCard
                headline="Risk-Free Trial"
                body="120 nights to ensure it's perfect. Free returns if it's not the right fit."
                delay={0.3}
              />
            </BrentwoodCardGrid>

            <div className="text-center mt-12">
              <BrentwoodAffiliateLink
                campaign="sleep-crisis-solution"
                buttonText="Transform Your RV Sleep"
                variant="luxury"
                size="large"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RVSleepCrisis;
