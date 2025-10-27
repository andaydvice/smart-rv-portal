/**
 * Brentwood Home Product Showcase
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrentwoodHeroSection, BrentwoodProductCard, BrentwoodComparisonTable } from '@/components/affiliate/brentwood-home';
import '@/styles/affiliate/brentwood-home.css';

const BrentwoodHomeShowcase: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Brentwood Home RV Mattresses | Premium Sleep Solutions</title>
        <meta
          name="description"
          content="Explore Brentwood Home's premium RV mattress collection. Natural materials, custom sizing, and 120-night trials."
        />
        <link rel="canonical" href="https://smartrvhub.com/brentwood-home-rv-mattresses" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartrvhub.com/brentwood-home-rv-mattresses" />
        <meta property="og:site_name" content="Smart RV Hub" />
      </Helmet>

      <main className="bg-[var(--brentwood-soft-bg)]">
        <BrentwoodHeroSection
          headline="Premium RV Mattresses by Brentwood Home"
          subheadline="Natural Materials, Expert Craftsmanship, Better Sleep"
          description="Discover our collection of luxury RV mattresses designed for comfort, durability, and the perfect night's sleep on the road."
          height="medium"
          alignment="center"
        />

        {/* Product Grid */}
        <section className="brentwood-section bg-white">
          <div className="brentwood-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BrentwoodProductCard
                name="Cypress Mattress"
                tagline="Cooling Gel Memory Foam"
                image={{
                  src: '/images/affiliate/brentwood-home/cypress-mattress.jpg',
                  alt: 'Cypress RV Mattress',
                }}
                rating={{ stars: 5, count: 2347 }}
                price={{ current: 1299 }}
                features={[
                  'Cooling gel memory foam',
                  'Natural latex comfort layer',
                  'Organic cotton cover',
                  '120-night trial',
                  'Made in USA',
                ]}
                cta={{
                  text: 'Shop Cypress',
                  href: '#',
                }}
                badge="Best Seller"
                variant="featured"
                delay={0.1}
              />

              <BrentwoodProductCard
                name="Oceano Mattress"
                tagline="Luxury Hybrid Comfort"
                image={{
                  src: '/images/affiliate/brentwood-home/oceano-mattress.jpg',
                  alt: 'Oceano RV Mattress',
                }}
                rating={{ stars: 5, count: 1823 }}
                price={{ current: 1599 }}
                features={[
                  'Natural Talalay latex',
                  'Pocketed coil support',
                  'Organic wool & cotton',
                  'Premium edge support',
                  '25-year warranty',
                ]}
                cta={{
                  text: 'Shop Oceano',
                  href: '#',
                }}
                delay={0.2}
              />

              <BrentwoodProductCard
                name="Crystal Cove"
                tagline="Budget-Friendly Luxury"
                image={{
                  src: '/images/affiliate/brentwood-home/crystal-cove-mattress.jpg',
                  alt: 'Crystal Cove RV Mattress',
                }}
                rating={{ stars: 4, count: 1245 }}
                price={{ original: 999, current: 799 }}
                features={[
                  'Gel-infused memory foam',
                  'High-density base foam',
                  'Breathable bamboo cover',
                  'CertiPUR-US certified',
                  'Free shipping',
                ]}
                cta={{
                  text: 'Shop Crystal Cove',
                  href: '#',
                }}
                badge="Best Value"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="brentwood-section bg-[var(--brentwood-soft-bg)]">
          <div className="brentwood-container">
            <BrentwoodComparisonTable
              title="Compare Brentwood Home Mattresses"
              description="Find the perfect mattress for your RV and budget"
              columns={[
                {
                  name: 'Crystal Cove',
                  price: { amount: 799, period: 'mattress' },
                  cta: { text: 'Shop Now', href: '#' },
                },
                {
                  name: 'Cypress',
                  featured: true,
                  price: { amount: 1299, period: 'mattress' },
                  cta: { text: 'Shop Now', href: '#' },
                },
                {
                  name: 'Oceano',
                  price: { amount: 1599, period: 'mattress' },
                  cta: { text: 'Shop Now', href: '#' },
                },
              ]}
              rows={[
                { feature: 'Memory Foam', values: [true, true, true] },
                { feature: 'Natural Latex', values: [false, true, true] },
                { feature: 'Pocketed Coils', values: [false, false, true] },
                { feature: 'Organic Materials', values: [false, true, true], highlight: true },
                { feature: '120-Night Trial', values: [true, true, true] },
                { feature: 'Warranty', values: ['10 years', '25 years', '25 years'] },
              ]}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default BrentwoodHomeShowcase;
