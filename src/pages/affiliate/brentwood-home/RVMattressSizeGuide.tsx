/**
 * RV Mattress Size Guide
 * Interactive sizing guide with measurement tools
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrentwoodHeroSection, BrentwoodSizeGuide, BrentwoodFAQAccordion } from '@/components/affiliate/brentwood-home';
import '@/styles/affiliate/brentwood-home.css';

const RVMattressSizeGuide: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>RV Mattress Size Guide 2025 | Find Your Perfect Fit</title>
        <meta
          name="description"
          content="Complete RV mattress sizing guide. Learn how to measure, find standard sizes, and choose the right mattress for your RV type."
        />
        <link rel="canonical" href="https://smartrvhub.com/rv-mattress-sizes" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartrvhub.com/rv-mattress-sizes" />
        <meta property="og:site_name" content="Smart RV Hub" />
      </Helmet>

      <main className="bg-[var(--brentwood-soft-bg)]">
        <BrentwoodHeroSection
          headline="RV Mattress Size Guide"
          subheadline="Find the Perfect Fit for Your Mobile Bedroom"
          description="RV mattresses aren't one-size-fits-all. Use our interactive guide to find your exact size and shop with confidence."
          height="medium"
          alignment="center"
          backgroundImage="/images/affiliate/brentwood-home/rv-bedroom-measurement.jpg"
        />

        <section className="brentwood-section bg-white">
          <div className="brentwood-container">
            <BrentwoodSizeGuide showCTA={true} />
          </div>
        </section>

        <section className="brentwood-section bg-[var(--brentwood-soft-bg)]">
          <div className="brentwood-container">
            <BrentwoodFAQAccordion
              title="Sizing Questions Answered"
              faqs={[
                {
                  question: 'What if my RV mattress has rounded corners?',
                  answer: 'Many RV mattresses have radius corners. Measure the longest and widest points, then note the corner radius. Most manufacturers can accommodate standard radius corners, or you can order custom cuts.',
                  category: 'general',
                },
                {
                  question: 'How do I measure for a custom RV mattress?',
                  answer: 'Measure the length, width, and note any corner cuts or notches. Take photos from multiple angles. Contact the mattress company with these measurements for a custom quote.',
                  category: 'general',
                },
              ]}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default RVMattressSizeGuide;
