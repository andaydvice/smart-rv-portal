/**
 * Mattress ROI Calculator Page
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrentwoodHeroSection, BrentwoodROICalculator } from '@/components/affiliate/brentwood-home';
import '@/styles/affiliate/brentwood-home.css';

const MattressROICalculator: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>RV Mattress ROI Calculator | Calculate Your Sleep Investment</title>
        <meta
          name="description"
          content="Calculate the return on investment for upgrading your RV mattress. See how better sleep pays for itself."
        />
        <link rel="canonical" href="https://smartrvhub.com/rv-mattress-roi-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartrvhub.com/rv-mattress-roi-calculator" />
        <meta property="og:site_name" content="Smart RV Hub" />
      </Helmet>

      <main className="bg-[var(--brentwood-soft-bg)]">
        <BrentwoodHeroSection
          headline="Calculate Your Mattress Investment ROI"
          subheadline="See How Better Sleep Pays for Itself"
          description="A quality mattress isn't an expense—it's an investment in your health, productivity, and quality of life. Use our calculator to see your potential returns."
          height="medium"
          alignment="center"
        />

        <section className="brentwood-section bg-white">
          <div className="brentwood-container">
            <BrentwoodROICalculator showCTA={true} />
          </div>
        </section>
      </main>
    </>
  );
};

export default MattressROICalculator;
