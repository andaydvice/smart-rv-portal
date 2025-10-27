/**
 * Installation & Care Guide for RV Mattresses
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Wrench, Droplet, Sun, AlertCircle } from 'lucide-react';
import {
  BrentwoodHeroSection,
  BrentwoodCard,
  BrentwoodCardGrid,
  BrentwoodFeatureBlock,
  BrentwoodFAQAccordion,
} from '@/components/affiliate/brentwood-home';
import '@/styles/affiliate/brentwood-home.css';

const InstallationCareGuide: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>RV Mattress Installation & Care Guide | Brentwood Home</title>
        <meta
          name="description"
          content="Learn how to install, maintain, and care for your RV mattress to maximize comfort and lifespan."
        />
        <link rel="canonical" href="https://smartrvhub.com/rv-mattress-installation" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartrvhub.com/rv-mattress-installation" />
        <meta property="og:site_name" content="Smart RV Hub" />
      </Helmet>

      <main className="bg-[var(--brentwood-soft-bg)]">
        <BrentwoodHeroSection
          headline="RV Mattress Installation & Care Guide"
          subheadline="Maximize Comfort and Extend Your Mattress Lifespan"
          description="Proper installation and maintenance ensure your RV mattress provides years of comfortable sleep. Follow our expert guide."
          height="medium"
          alignment="center"
        />

        {/* Installation Steps */}
        <section className="brentwood-section bg-white">
          <div className="brentwood-container">
            <h2 className="brentwood-headline-primary text-center mb-12">
              Installation Steps
            </h2>

            <BrentwoodCardGrid columns={2}>
              <BrentwoodCard
                icon={<Wrench className="w-8 h-8" />}
                headline="Step 1: Prepare Your RV Bedroom"
                body="Remove the old mattress, clean the bed platform thoroughly, check for any damage or needed repairs, and ensure proper ventilation."
                delay={0.1}
              />
              <BrentwoodCard
                icon={<Droplet className="w-8 h-8" />}
                headline="Step 2: Unbox and Expand"
                body="Carefully unbox your new mattress in a well-ventilated area. Allow it to expand for 24-48 hours before use. Some off-gassing is normal."
                delay={0.2}
              />
              <BrentwoodCard
                icon={<Sun className="w-8 h-8" />}
                headline="Step 3: Position Correctly"
                body="Place the mattress on your RV bed platform. Ensure it fits properly and doesn't overlap edges. Use a mattress protector for added protection."
                delay={0.3}
              />
              <BrentwoodCard
                icon={<AlertCircle className="w-8 h-8" />}
                headline="Step 4: Check and Adjust"
                body="Test the mattress firmness and comfort. Make sure all corners fit properly. Add a mattress topper if desired for extra customization."
                delay={0.4}
              />
            </BrentwoodCardGrid>
          </div>
        </section>

        {/* Care Tips */}
        <section className="brentwood-section bg-[var(--brentwood-soft-bg)]">
          <div className="brentwood-container space-y-16">
            <BrentwoodFeatureBlock
              icon={<Droplet className="w-8 h-8" />}
              title="Protect from Moisture"
              description="RVs are prone to moisture issues. Protect your mattress investment with proper ventilation and moisture barriers."
              benefits={[
                'Use a waterproof mattress protector',
                'Ensure proper ventilation under mattress',
                'Run dehumidifier in humid climates',
                'Check for leaks and condensation regularly',
              ]}
              layout="right"
            />

            <BrentwoodFeatureBlock
              icon={<Sun className="w-8 h-8" />}
              title="Regular Maintenance"
              description="Simple maintenance extends your mattress lifespan and keeps it fresh and comfortable."
              benefits={[
                'Rotate mattress every 3-6 months',
                'Vacuum surface monthly to remove dust',
                'Spot clean stains immediately',
                'Air out mattress when possible',
              ]}
              layout="left"
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="brentwood-section bg-white">
          <div className="brentwood-container">
            <BrentwoodFAQAccordion
              title="Installation & Care FAQs"
              faqs={[
                {
                  question: 'How long before I can sleep on my new mattress?',
                  answer: 'Most mattresses can be used after 24 hours of expansion. For best results, wait 48 hours for full expansion and off-gassing.',
                  category: 'general',
                },
                {
                  question: 'Do I need a box spring for my RV mattress?',
                  answer: 'No, RV mattresses typically sit on a solid platform or slatted base. Box springs are not necessary and may not fit in RV spaces.',
                  category: 'general',
                },
                {
                  question: 'How do I clean my RV mattress?',
                  answer: 'Use a vacuum with upholstery attachment monthly. For stains, spot clean with mild soap and water. Never saturate the mattress. Use a waterproof protector for easy cleaning.',
                  category: 'care',
                },
              ]}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default InstallationCareGuide;
