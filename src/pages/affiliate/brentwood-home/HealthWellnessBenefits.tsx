/**
 * Health & Wellness Benefits of Quality RV Mattresses
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Brain, Zap, Shield } from 'lucide-react';
import {
  BrentwoodHeroSection,
  BrentwoodFeatureBlock,
  BrentwoodStatCard,
  BrentwoodCard,
  BrentwoodCardGrid,
  BrentwoodAffiliateLink,
} from '@/components/affiliate/brentwood-home';
import '@/styles/affiliate/brentwood-home.css';

const HealthWellnessBenefits: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Health Benefits of Premium RV Mattresses | Better Sleep, Better Life</title>
        <meta
          name="description"
          content="Discover how a quality RV mattress improves your health, energy, and overall well-being on the road."
        />
        <link rel="canonical" href="https://smartrvhub.com/rv-mattress-health-benefits" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartrvhub.com/rv-mattress-health-benefits" />
        <meta property="og:site_name" content="Smart RV Hub" />
      </Helmet>

      <main className="bg-[var(--brentwood-soft-bg)]">
        <BrentwoodHeroSection
          headline="The Health Benefits of Quality Sleep in Your RV"
          subheadline="Why Your Mattress is Your Most Important Health Investment"
          description="A premium mattress isn't just about comfort—it's about your long-term health, energy, and quality of life on the road."
          height="medium"
          alignment="center"
          backgroundImage="/images/affiliate/brentwood-home/healthy-sleeping.jpg"
        />

        {/* Statistics */}
        <section className="brentwood-section bg-white">
          <div className="brentwood-container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <BrentwoodStatCard
                stat="7-9"
                label="Hours of sleep needed nightly"
                icon={<Heart className="w-8 h-8" />}
                delay={0.1}
              />
              <BrentwoodStatCard
                stat="36%"
                label="Reduced chronic pain"
                icon={<Shield className="w-8 h-8" />}
                delay={0.2}
              />
              <BrentwoodStatCard
                stat="45%"
                label="Better cognitive function"
                icon={<Brain className="w-8 h-8" />}
                delay={0.3}
              />
              <BrentwoodStatCard
                stat="50%"
                label="Increased daily energy"
                icon={<Zap className="w-8 h-8" />}
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Feature Blocks */}
        <section className="brentwood-section bg-[var(--brentwood-soft-bg)]">
          <div className="brentwood-container space-y-16">
            <BrentwoodFeatureBlock
              icon={<Heart className="w-8 h-8" />}
              title="Reduced Back and Joint Pain"
              description="A quality mattress provides proper spinal alignment and pressure relief, dramatically reducing morning aches and chronic pain that plague many RV travelers."
              benefits={[
                'Proper lumbar support prevents lower back strain',
                'Pressure relief reduces hip and shoulder pain',
                'Better alignment minimizes neck stiffness',
                'Quality sleep promotes natural healing and recovery',
              ]}
              layout="right"
              delay={0.1}
            />

            <BrentwoodFeatureBlock
              icon={<Brain className="w-8 h-8" />}
              title="Enhanced Mental Clarity and Mood"
              description="Quality sleep directly impacts cognitive function, memory, and emotional well-being—critical for safe RV travel and enjoying your adventures."
              benefits={[
                'Improved decision-making and reaction times',
                'Better memory consolidation and learning',
                'Reduced anxiety and depression symptoms',
                'Enhanced creativity and problem-solving',
              ]}
              layout="left"
              delay={0.2}
            />

            <BrentwoodFeatureBlock
              icon={<Shield className="w-8 h-8" />}
              title="Strengthened Immune System"
              description="Your body repairs and regenerates during deep sleep. A comfortable mattress helps you achieve the restorative sleep needed for optimal immune function."
              benefits={[
                'Better resistance to colds and infections',
                'Faster recovery from illness',
                'Reduced inflammation throughout the body',
                'Enhanced cellular repair and regeneration',
              ]}
              layout="right"
              delay={0.3}
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="brentwood-section bg-gradient-to-br from-[var(--brentwood-primary-blue)] to-[var(--brentwood-secondary-purple)] text-white">
          <div className="brentwood-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="brentwood-headline-primary text-white mb-6">
                Invest in Your Health Today
              </h2>
              <p className="brentwood-body-large text-white/90 mb-8">
                A Brentwood Home mattress is more than a sleep surface—it's an investment in your
                long-term health and quality of life.
              </p>
              <BrentwoodAffiliateLink
                campaign="health-benefits-cta"
                buttonText="Shop Premium Mattresses"
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

export default HealthWellnessBenefits;
