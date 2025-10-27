/**
 * Ultimate RV Mattress Buying Guide
 *
 * Comprehensive guide covering everything RV owners need to know about
 * choosing, buying, and maintaining the perfect RV mattress.
 *
 * @author Smart RV Portal
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Bed,
  Ruler,
  DollarSign,
  Heart,
  Shield,
  Star,
  CheckCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

import {
  BrentwoodHeroSection,
  BrentwoodCard,
  BrentwoodCardGrid,
  BrentwoodButton,
  BrentwoodFeatureBlock,
  BrentwoodComparisonTable,
  BrentwoodFAQAccordion,
  BrentwoodAffiliateLink,
  BrentwoodStatCard,
  TrustBadges,
} from '@/components/affiliate/brentwood-home';

import '@/styles/affiliate/brentwood-home.css';

const UltimateRVMattressBuyingGuide: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Ultimate RV Mattress Buying Guide 2025 | Brentwood Home</title>
        <meta
          name="description"
          content="Complete guide to choosing the perfect RV mattress. Learn about sizes, materials, comfort levels, and get expert recommendations from RV sleep specialists."
        />
        <meta
          name="keywords"
          content="RV mattress guide, RV mattress buying, best RV mattress, RV mattress sizes, Brentwood Home RV"
        />
        <link rel="canonical" href="https://smartrvhub.com/rv-mattress-buying-guide" />

        {/* Open Graph */}
        <meta property="og:title" content="Ultimate RV Mattress Buying Guide 2025" />
        <meta
          property="og:description"
          content="Everything you need to know about buying the perfect RV mattress. Expert tips, size guides, and recommendations."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://smartrvhub.com/rv-mattress-buying-guide" />
        <meta property="og:site_name" content="Smart RV Hub" />

        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Ultimate RV Mattress Buying Guide 2025',
            description:
              'Comprehensive guide to choosing and buying the perfect RV mattress for better sleep on the road.',
            author: {
              '@type': 'Organization',
              name: 'Smart RV Portal',
            },
          })}
        </script>
      </Helmet>

      {/* Main Content */}
      <main className="bg-[var(--brentwood-soft-bg)]">
        {/* Hero Section */}
        <BrentwoodHeroSection
          headline="The Ultimate RV Mattress Buying Guide"
          subheadline="Everything You Need to Know for Better Sleep on the Road"
          description="From sizing to materials, comfort to durability—your complete guide to choosing the perfect RV mattress that transforms your mobile bedroom into a luxury sleep sanctuary."
          height="medium"
          alignment="center"
          showScrollIndicator={true}
          backgroundImage="/images/affiliate/brentwood-home/rv-bedroom-hero.jpg"
          trustIndicators={[
            { text: 'Expert Advice', variant: 'certification' },
            { text: 'Unbiased Reviews', variant: 'award' },
            { text: '10+ Years Experience', variant: 'time' },
          ]}
        />

        {/* Table of Contents */}
        <section className="brentwood-section bg-white">
          <div className="brentwood-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="brentwood-headline-secondary text-center mb-8">
                Quick Navigation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Why RV Mattresses Are Different', href: '#why-different' },
                  { title: 'Understanding RV Mattress Sizes', href: '#sizes' },
                  { title: 'Material Types & Pros/Cons', href: '#materials' },
                  { title: 'Comfort Levels Explained', href: '#comfort' },
                  { title: 'Budget & Value Considerations', href: '#budget' },
                  { title: 'Top Brands Compared', href: '#brands' },
                  { title: 'Installation & Setup', href: '#installation' },
                  { title: 'Frequently Asked Questions', href: '#faq' },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="brentwood-card-base p-4 hover:shadow-lg transition-shadow flex items-center gap-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CheckCircle className="w-5 h-5 text-[var(--brentwood-success-green)] flex-shrink-0" />
                    <span className="text-[var(--brentwood-text-primary)] group-hover:text-[var(--brentwood-primary-blue)] transition-colors">
                      {item.title}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Why RV Mattresses Are Different */}
        <section id="why-different" className="brentwood-section bg-[var(--brentwood-soft-bg)]">
          <div className="brentwood-container">
            <motion.div
              className="max-w-4xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="brentwood-headline-primary mb-4">
                Why RV Mattresses Are Different from Home Mattresses
              </h2>
              <p className="brentwood-body-large text-[var(--brentwood-text-secondary)]">
                You can't just buy a standard home mattress for your RV. Here's why:
              </p>
            </motion.div>

            <BrentwoodCardGrid columns={2} gap="large">
              <BrentwoodCard
                icon={<Ruler className="w-8 h-8" />}
                iconBgColor="var(--brentwood-primary-blue)"
                headline="Non-Standard Sizes"
                body="RV mattresses are typically 2-5 inches shorter than residential mattresses. A 'Queen' in an RV is usually 60x75 or 60x80 inches, not the standard 60x80 inches."
                delay={0.1}
              />
              <BrentwoodCard
                icon={<Bed className="w-8 h-8" />}
                iconBgColor="var(--brentwood-secondary-purple)"
                headline="Custom Shapes"
                body="Many RV mattresses have radius corners, notches, or cut-outs to fit around furniture, cabinets, or walls. You'll need precise measurements."
                delay={0.2}
              />
              <BrentwoodCard
                icon={<DollarSign className="w-8 h-8" />}
                iconBgColor="var(--brentwood-accent-gold)"
                headline="Weight Matters"
                body="RVs have weight limits. A lighter mattress (6-8 inches vs. 10-14 inches) can save 50-100 pounds, which matters when you're hauling."
                delay={0.3}
              />
              <BrentwoodCard
                icon={<AlertTriangle className="w-8 h-8" />}
                iconBgColor="var(--brentwood-warning-red)"
                headline="Access Challenges"
                body="Getting a mattress into an RV bedroom requires tight turns and narrow doorways. Flexible, compressible mattresses work best."
                delay={0.4}
              />
            </BrentwoodCardGrid>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="brentwood-section bg-white">
          <div className="brentwood-container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <BrentwoodStatCard
                stat="75%"
                label="Of RV owners sleep poorly"
                icon={<Bed className="w-8 h-8" />}
                description="Due to uncomfortable mattresses"
                delay={0.1}
              />
              <BrentwoodStatCard
                stat="8-10"
                label="Years mattress lifespan"
                icon={<Sparkles className="w-8 h-8" />}
                description="With proper care and quality"
                delay={0.2}
              />
              <BrentwoodStatCard
                stat="$800-2500"
                label="Quality RV mattress range"
                icon={<DollarSign className="w-8 h-8" />}
                description="Investment in better sleep"
                delay={0.3}
              />
              <BrentwoodStatCard
                stat="120"
                label="Night trial periods"
                icon={<Shield className="w-8 h-8" />}
                description="Common for premium brands"
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="brentwood-section bg-gradient-to-br from-[var(--brentwood-primary-blue)] to-[var(--brentwood-secondary-purple)] text-white">
          <div className="brentwood-container">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="brentwood-headline-primary text-white mb-6">
                Ready to Upgrade Your RV Sleep?
              </h2>
              <p className="brentwood-body-large text-white/90 mb-8">
                Brentwood Home offers premium RV mattresses with 120-night trials, free shipping,
                and lifetime warranties.
              </p>
              <BrentwoodAffiliateLink
                campaign="buying-guide-cta"
                buttonText="Shop Brentwood Home Mattresses"
                variant="luxury"
                size="large"
              />
              <div className="mt-8">
                <TrustBadges
                  badges={[
                    { text: '120-Night Trial', variant: 'guarantee' },
                    { text: 'Free Shipping', variant: 'certification' },
                    { text: '4.8★ Rating', variant: 'rating' },
                  ]}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="brentwood-section bg-white">
          <div className="brentwood-container">
            <BrentwoodFAQAccordion
              title="Frequently Asked Questions"
              description="Get answers to the most common RV mattress questions"
              faqs={[
                {
                  question: 'Can I use a regular home mattress in my RV?',
                  answer:
                    "While technically possible, it's not recommended. RV mattresses are designed for RV-specific dimensions, weight restrictions, and access challenges. Standard home mattresses are typically too large, too heavy, and difficult to maneuver into RV bedrooms.",
                  category: 'general',
                },
                {
                  question: 'How often should I replace my RV mattress?',
                  answer:
                    'The general recommendation is every 8-10 years, but this can vary based on usage. If you notice sagging, discomfort, or wake up with aches, it may be time to replace it sooner. Full-time RVers may need to replace their mattress more frequently than weekend users.',
                  category: 'general',
                },
                {
                  question: 'What thickness is best for an RV mattress?',
                  answer:
                    'Most RV mattresses range from 6-10 inches thick. 8 inches is the sweet spot for most RVers, offering good comfort without excessive weight. Consider your RV bed frame depth and weight capacity when choosing thickness.',
                  category: 'product',
                },
                {
                  question: 'Do I need special sheets for an RV mattress?',
                  answer:
                    "Yes, typically. Since RV mattresses are often shorter and may have custom shapes, standard residential sheets may not fit properly. Look for RV-specific sheets or deep-pocket sheets that can accommodate your mattress's exact dimensions.",
                  category: 'care',
                },
              ]}
              showSearch={true}
              showCategories={true}
              allowMultiple={false}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default UltimateRVMattressBuyingGuide;
