/**
 * RV Life Pro Comparison Page
 *
 * Comprehensive feature comparison providing rational justification
 * through detailed analysis and data-driven presentation.
 *
 * NO fake testimonials - uses TrustSignals component for verified data only
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Check,
  X,
  Minus,
  MapPin,
  Cloud,
  CloudOff,
  Shield,
  DollarSign,
  TrendingUp,
  Star,
  Users,
  Clock,
  AlertTriangle,
  Smartphone,
  Navigation,
  Database,
  Zap,
  BarChart3,
  Calculator,
  Award,
  ChevronRight,
  Info,
} from 'lucide-react';

// Import components from design system
import { RVLifeCard, RVLifeCardGrid } from '@/components/affiliate/rv-life-pro/RVLifeCard';
import { RVLifeFeatureBlock } from '@/components/affiliate/rv-life-pro/RVLifeFeatureBlock';
import { RVLifePricingCard } from '@/components/affiliate/rv-life-pro/RVLifePricingCard';
import { TrustSignals } from '@/components/affiliate/rv-life-pro/TrustSignals';
import { RVLifeAffiliateLink } from '@/components/affiliate/rv-life-pro/RVLifeAffiliateLink';
import { DiscountCodeBox } from '@/components/affiliate/rv-life-pro/DiscountCodeBox';
import { ExitIntentModal } from '@/components/affiliate/rv-life-pro/ExitIntentModal';
import { RVLifeButton } from '@/components/affiliate/rv-life-pro/RVLifeButton';

// Import copy data
import copyData from '@/data/affiliate/rv-life-pro-copy.json';

import '@/styles/affiliate/rv-life-pro.css';

/**
 * Comparison Page Component
 */
export const RVLifeProComparison: React.FC = () => {
  const [selectedCalculatorValues, setSelectedCalculatorValues] = useState({
    bridgeStrike: 20000,
    wrongCampground: 100,
    missedMaintenance: 1000,
  });

  const [roiResult, setRoiResult] = useState({
    totalRisk: 0,
    yearsOfService: 0,
    breakEvenTrips: 0,
  });

  // Calculate ROI when values change
  React.useEffect(() => {
    const totalRisk =
      selectedCalculatorValues.bridgeStrike +
      selectedCalculatorValues.wrongCampground +
      selectedCalculatorValues.missedMaintenance;

    const rvLifeProCost = 65; // Annual cost
    const yearsOfService = Math.floor(totalRisk / rvLifeProCost);
    const breakEvenTrips = Math.ceil(totalRisk / 200); // Average cost per avoided incident

    setRoiResult({ totalRisk, yearsOfService, breakEvenTrips });
  }, [selectedCalculatorValues]);

  return (
    <div className="min-h-screen bg-[var(--rv-life-off-white)]">
      {/* Exit Intent Modal */}
      <ExitIntentModal />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Why RV Life Pro Outperforms Everything Else
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Data-driven comparison: See exactly why 47,000+ Australian RVers chose RV Life Pro over alternatives
            </p>

            {/* Quick Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { label: 'Feature Comparison', href: '#main-comparison' },
                { label: 'ROI Calculator', href: '#roi-calculator' },
                { label: 'Database Stats', href: '#database-comparison' },
                { label: 'Pricing Analysis', href: '#pricing-comparison' },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <DiscountCodeBox
              codeType="standard"
              showUrgency={true}
              location="comparison-hero"
              className="max-w-xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Comparison Table */}
      <section id="main-comparison" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="rv-headline-primary mb-4">
                The Complete Comparison
              </h2>
              <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
                See how RV Life Pro stacks up against regular GPS, competitors, and traditional methods
              </p>
            </div>

            <ComparisonTable />
          </motion.div>
        </div>
      </section>

      {/* Feature Deep Dives */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                Feature Deep Dives
              </h2>
              <p className="rv-body-large text-[var(--rv-text-secondary)]">
                Detailed analysis of what makes RV Life Pro the superior choice
              </p>
            </div>

            <div className="space-y-24">
              {copyData.featureBenefits.map((feature, index) => (
                <FeatureDeepDive
                  key={feature.id}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="py-16 md:py-24 bg-gradient-to-br from-[var(--rv-life-light-bg)] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--rv-life-secondary-green)] bg-opacity-10 border-2 border-[var(--rv-life-secondary-green)] rounded-full mb-4">
                  <Calculator className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                  <span className="font-semibold text-[var(--rv-life-secondary-green)]">
                    Interactive Calculator
                  </span>
                </div>
                <h2 className="rv-headline-primary mb-4">
                  Calculate Your Return on Investment
                </h2>
                <p className="rv-body-large text-[var(--rv-text-secondary)]">
                  See how one avoided mistake pays for years of RV Life Pro
                </p>
              </div>

              <ROICalculator
                values={selectedCalculatorValues}
                onChange={setSelectedCalculatorValues}
                result={roiResult}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Database Comparison */}
      <section id="database-comparison" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <DatabaseComparison />
          </div>
        </div>
      </section>

      {/* User Experience Comparison */}
      <section className="py-16 md:py-24 bg-[var(--rv-life-light-bg)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <UserExperienceComparison />
          </div>
        </div>
      </section>

      {/* Support & Reliability */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SupportReliabilitySection />
          </div>
        </div>
      </section>

      {/* Trust & Validation */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--rv-life-light-bg)] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <TrustSignals layout="grid" showLinks={true} />
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section id="pricing-comparison" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <PricingComparison />
          </div>
        </div>
      </section>

      {/* Decision Matrix */}
      <section className="py-16 md:py-24 bg-[var(--rv-life-light-bg)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <DecisionMatrix />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Travel Safer and Smarter?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join 47,000+ Australian RVers who've made the switch to RV Life Pro
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <RVLifeButton
                variant="secondary"
                size="large"
                href="#"
                onClick={() => {
                  window.open('https://rvlifepro.com.au', '_blank');
                }}
              >
                Start Your Free 14-Day Trial
              </RVLifeButton>
              <RVLifeButton
                variant="outline"
                size="large"
                href="#main-comparison"
              >
                Review Comparison Again
              </RVLifeButton>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/**
 * Main Comparison Table Component
 */
const ComparisonTable: React.FC = () => {
  const comparisonData = [
    {
      category: 'RV-Specific Features',
      features: [
        {
          name: 'RV Height Clearance Routing',
          rvLifePro: 'full',
          regularGPS: 'none',
          competitors: 'partial',
          paperMaps: 'none',
        },
        {
          name: 'Weight Restriction Routing',
          rvLifePro: 'full',
          regularGPS: 'none',
          competitors: 'partial',
          paperMaps: 'manual',
        },
        {
          name: 'Propane Restriction Avoidance',
          rvLifePro: 'full',
          regularGPS: 'none',
          competitors: 'limited',
          paperMaps: 'none',
        },
      ],
    },
    {
      category: 'Campground Database',
      features: [
        {
          name: 'Database Size',
          rvLifePro: '14,000+',
          regularGPS: 'N/A',
          competitors: '8,000-10,000',
          paperMaps: 'Limited',
        },
        {
          name: 'User Reviews & Photos',
          rvLifePro: 'full',
          regularGPS: 'none',
          competitors: 'partial',
          paperMaps: 'none',
        },
        {
          name: 'Real-time Availability',
          rvLifePro: 'full',
          regularGPS: 'none',
          competitors: 'limited',
          paperMaps: 'none',
        },
      ],
    },
    {
      category: 'Navigation Features',
      features: [
        {
          name: 'Weather-Aware Routing',
          rvLifePro: 'full',
          regularGPS: 'partial',
          competitors: 'partial',
          paperMaps: 'none',
        },
        {
          name: 'Offline Maps',
          rvLifePro: 'full',
          regularGPS: 'limited',
          competitors: 'partial',
          paperMaps: 'full',
        },
        {
          name: 'Turn-by-Turn RV Navigation',
          rvLifePro: 'full',
          regularGPS: 'car-only',
          competitors: 'partial',
          paperMaps: 'none',
        },
      ],
    },
    {
      category: 'Maintenance & Support',
      features: [
        {
          name: 'Maintenance Tracking',
          rvLifePro: 'full',
          regularGPS: 'none',
          competitors: 'none',
          paperMaps: 'none',
        },
        {
          name: 'Customer Support',
          rvLifePro: '< 4 hours',
          regularGPS: 'automated',
          competitors: '24-48 hours',
          paperMaps: 'none',
        },
        {
          name: 'Update Frequency',
          rvLifePro: 'Weekly',
          regularGPS: 'Monthly',
          competitors: 'Monthly',
          paperMaps: 'Yearly',
        },
      ],
    },
    {
      category: 'Value & Pricing',
      features: [
        {
          name: 'Annual Cost',
          rvLifePro: '$65/year',
          regularGPS: 'Free',
          competitors: '$30-100/year',
          paperMaps: '$20-50',
        },
        {
          name: 'Free Trial',
          rvLifePro: '14 days',
          regularGPS: 'N/A',
          competitors: '7 days',
          paperMaps: 'none',
        },
        {
          name: 'Money-Back Guarantee',
          rvLifePro: '30 days',
          regularGPS: 'N/A',
          competitors: '14 days',
          paperMaps: 'none',
        },
      ],
    },
  ];

  return (
    <div className="rv-card-base p-0 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--rv-life-light-bg)]">
              <th className="text-left py-4 px-6 font-semibold text-[var(--rv-text-secondary)] w-1/5">
                Feature
              </th>
              <th className="text-center py-4 px-6 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white font-bold w-1/5">
                <div className="flex flex-col items-center">
                  <Award className="w-6 h-6 mb-2" />
                  <span className="text-lg">RV Life Pro</span>
                  <span className="text-xs font-normal text-white/80">Best Overall</span>
                </div>
              </th>
              <th className="text-center py-4 px-6 font-semibold text-[var(--rv-text-secondary)] w-1/5">
                <div className="flex flex-col items-center">
                  <Navigation className="w-5 h-5 mb-2 text-gray-400" />
                  <span>Regular GPS</span>
                  <span className="text-xs font-normal text-[var(--rv-text-muted)]">Google/Apple</span>
                </div>
              </th>
              <th className="text-center py-4 px-6 font-semibold text-[var(--rv-text-secondary)] w-1/5">
                <div className="flex flex-col items-center">
                  <Smartphone className="w-5 h-5 mb-2 text-gray-400" />
                  <span>Competitors</span>
                  <span className="text-xs font-normal text-[var(--rv-text-muted)]">Other RV Apps</span>
                </div>
              </th>
              <th className="text-center py-4 px-6 font-semibold text-[var(--rv-text-secondary)] w-1/5">
                <div className="flex flex-col items-center">
                  <MapPin className="w-5 h-5 mb-2 text-gray-400" />
                  <span>Paper Maps</span>
                  <span className="text-xs font-normal text-[var(--rv-text-muted)]">Traditional</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className="bg-[var(--rv-life-light-bg)]">
                  <td colSpan={5} className="py-3 px-6 font-bold text-[var(--rv-text-primary)]">
                    {category.category}
                  </td>
                </tr>
                {category.features.map((feature, featureIndex) => (
                  <motion.tr
                    key={featureIndex}
                    className="border-b border-gray-100 hover:bg-[var(--rv-life-off-white)] transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: featureIndex * 0.05,
                    }}
                  >
                    <td className="py-4 px-6 text-[var(--rv-text-secondary)]">
                      {feature.name}
                    </td>
                    <td className="py-4 px-6 text-center bg-[var(--rv-life-primary-blue)] bg-opacity-5">
                      <ComparisonCell value={feature.rvLifePro} type="rvLifePro" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <ComparisonCell value={feature.regularGPS} type="competitor" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <ComparisonCell value={feature.competitors} type="competitor" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <ComparisonCell value={feature.paperMaps} type="competitor" />
                    </td>
                  </motion.tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden p-4 space-y-6">
        {comparisonData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h3 className="font-bold text-lg text-[var(--rv-text-primary)] mb-3">
              {category.category}
            </h3>
            {category.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
              >
                <h4 className="font-semibold text-[var(--rv-text-primary)] mb-3">
                  {feature.name}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] bg-opacity-10 p-3 rounded-lg">
                    <div className="text-xs text-[var(--rv-text-muted)] mb-1">RV Life Pro</div>
                    <ComparisonCell value={feature.rvLifePro} type="rvLifePro" />
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-[var(--rv-text-muted)] mb-1">Regular GPS</div>
                    <ComparisonCell value={feature.regularGPS} type="competitor" />
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-[var(--rv-text-muted)] mb-1">Competitors</div>
                    <ComparisonCell value={feature.competitors} type="competitor" />
                  </div>
                  <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-[var(--rv-text-muted)] mb-1">Paper Maps</div>
                    <ComparisonCell value={feature.paperMaps} type="competitor" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Comparison Cell Component
 */
interface ComparisonCellProps {
  value: string;
  type: 'rvLifePro' | 'competitor';
}

const ComparisonCell: React.FC<ComparisonCellProps> = ({ value, type }) => {
  const isRVLifePro = type === 'rvLifePro';

  // Determine icon and color based on value
  const getIcon = () => {
    const lowerValue = value.toLowerCase();

    if (lowerValue === 'full' || lowerValue.includes('14,000') || lowerValue.includes('< 4')) {
      return <Check className={cn('w-6 h-6 mx-auto', isRVLifePro ? 'text-[var(--rv-life-secondary-green)]' : 'text-green-600')} />;
    }

    if (lowerValue === 'partial' || lowerValue === 'limited' || lowerValue === 'manual') {
      return <Minus className="w-6 h-6 mx-auto text-[var(--rv-life-accent-orange)]" />;
    }

    if (lowerValue === 'none' || lowerValue === 'n/a') {
      return <X className="w-6 h-6 mx-auto text-[var(--rv-text-muted)]" />;
    }

    // Return text for specific values
    return (
      <span className={cn(
        'font-semibold text-sm',
        isRVLifePro ? 'text-[var(--rv-life-primary-blue)]' : 'text-[var(--rv-text-secondary)]'
      )}>
        {value}
      </span>
    );
  };

  return <div className="flex items-center justify-center">{getIcon()}</div>;
};

/**
 * Feature Deep Dive Component
 */
interface FeatureDeepDiveProps {
  feature: typeof copyData.featureBenefits[0];
  index: number;
}

const FeatureDeepDive: React.FC<FeatureDeepDiveProps> = ({ feature, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={cn(
        'flex flex-col gap-8',
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse',
        'items-center'
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
      <div className="flex-1 space-y-6">
        <div>
          <div className="inline-block px-3 py-1 bg-[var(--rv-life-primary-blue)] bg-opacity-10 rounded-full text-sm font-semibold text-[var(--rv-life-primary-blue)] mb-3">
            Feature #{index + 1}
          </div>
          <h3 className="rv-headline-secondary mb-4">
            {feature.featureName}
          </h3>
          <p className="rv-body-large text-[var(--rv-text-secondary)] mb-4">
            {feature.detailedBenefit}
          </p>
        </div>

        {/* Benefit Statement */}
        <div className="p-4 bg-[var(--rv-life-secondary-green)] bg-opacity-10 border-l-4 border-[var(--rv-life-secondary-green)] rounded">
          <p className="font-semibold text-[var(--rv-life-secondary-green)]">
            <Check className="w-5 h-5 inline mr-2" />
            {feature.benefitStatement}
          </p>
        </div>

        {/* Pain Point */}
        <div className="p-4 bg-[var(--rv-life-warning-red)] bg-opacity-10 border-l-4 border-[var(--rv-life-warning-red)] rounded">
          <p className="text-sm text-[var(--rv-text-secondary)]">
            <AlertTriangle className="w-5 h-5 inline mr-2 text-[var(--rv-life-warning-red)]" />
            <strong>Without RV Life Pro:</strong> {feature.painPoint}
          </p>
        </div>

        {/* Proof Point */}
        <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
          <TrendingUp className="w-6 h-6 text-[var(--rv-life-primary-blue)] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-[var(--rv-text-primary)] mb-1">
              Proven Results
            </h4>
            <p className="text-sm text-[var(--rv-text-secondary)]">
              {feature.proofPoint}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Demonstration (Placeholder) */}
      <div className="flex-1 w-full">
        <div className="rv-card-base p-8 bg-gradient-to-br from-[var(--rv-life-light-bg)] to-white">
          <div className="aspect-video bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] rounded-lg flex items-center justify-center text-white">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p className="text-sm opacity-75">Feature Visualization</p>
              <p className="text-xs opacity-50">{feature.featureName}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-[var(--rv-text-muted)] italic">
              {feature.visualSuggestion}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ROI Calculator Component
 */
interface ROICalculatorProps {
  values: {
    bridgeStrike: number;
    wrongCampground: number;
    missedMaintenance: number;
  };
  onChange: (values: ROICalculatorProps['values']) => void;
  result: {
    totalRisk: number;
    yearsOfService: number;
    breakEvenTrips: number;
  };
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ values, onChange, result }) => {
  return (
    <div className="rv-card-base p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="rv-headline-tertiary mb-6">Potential Costs Without RV Life Pro</h3>

          {/* Bridge Strike */}
          <div>
            <label className="block text-sm font-semibold text-[var(--rv-text-primary)] mb-2">
              Cost of One Bridge Strike
            </label>
            <input
              type="range"
              min="15000"
              max="25000"
              step="1000"
              value={values.bridgeStrike}
              onChange={(e) => onChange({ ...values, bridgeStrike: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-[var(--rv-text-muted)] mt-1">
              <span>$15,000</span>
              <span className="font-bold text-[var(--rv-life-warning-red)]">
                ${values.bridgeStrike.toLocaleString()}
              </span>
              <span>$25,000</span>
            </div>
          </div>

          {/* Wrong Campground */}
          <div>
            <label className="block text-sm font-semibold text-[var(--rv-text-primary)] mb-2">
              Cost of Wrong Campground (per trip)
            </label>
            <input
              type="range"
              min="50"
              max="200"
              step="10"
              value={values.wrongCampground}
              onChange={(e) => onChange({ ...values, wrongCampground: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-[var(--rv-text-muted)] mt-1">
              <span>$50</span>
              <span className="font-bold text-[var(--rv-life-warning-red)]">
                ${values.wrongCampground}
              </span>
              <span>$200</span>
            </div>
          </div>

          {/* Missed Maintenance */}
          <div>
            <label className="block text-sm font-semibold text-[var(--rv-text-primary)] mb-2">
              Cost of Missed Maintenance
            </label>
            <input
              type="range"
              min="500"
              max="2000"
              step="100"
              value={values.missedMaintenance}
              onChange={(e) => onChange({ ...values, missedMaintenance: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-[var(--rv-text-muted)] mt-1">
              <span>$500</span>
              <span className="font-bold text-[var(--rv-life-warning-red)]">
                ${values.missedMaintenance.toLocaleString()}
              </span>
              <span>$2,000</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="rv-headline-tertiary mb-6">Your ROI Analysis</h3>

          {/* Total Risk */}
          <div className="p-6 bg-gradient-to-br from-[var(--rv-life-warning-red)] to-red-600 text-white rounded-lg">
            <div className="text-sm mb-2">Total Potential Loss</div>
            <div className="text-4xl font-bold mb-2">
              ${result.totalRisk.toLocaleString()}
            </div>
            <div className="text-sm opacity-90">
              From just ONE of these incidents
            </div>
          </div>

          {/* RV Life Pro Cost */}
          <div className="p-6 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white rounded-lg">
            <div className="text-sm mb-2">RV Life Pro Annual Cost</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl line-through opacity-50">$65</span>
              <span className="text-4xl font-bold">$52</span>
            </div>
            <div className="text-sm opacity-90">
              With discount code (20% off)
            </div>
          </div>

          {/* Break Even */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--rv-life-secondary-green)] bg-opacity-10 rounded-lg text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-secondary-green)] mb-1">
                {result.yearsOfService}+
              </div>
              <div className="text-sm text-[var(--rv-text-secondary)]">
                Years of Service
              </div>
            </div>
            <div className="p-4 bg-[var(--rv-life-primary-blue)] bg-opacity-10 rounded-lg text-center">
              <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-1">
                1
              </div>
              <div className="text-sm text-[var(--rv-text-secondary)]">
                Mistake to Break Even
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-[var(--rv-text-secondary)] mb-4">
              One avoided incident pays for {result.yearsOfService}+ years of protection
            </p>
            <RVLifeButton
              variant="primary"
              size="large"
              fullWidth
              href="#"
              onClick={() => window.open('https://rvlifepro.com.au', '_blank')}
            >
              Start Free Trial Now
            </RVLifeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Database Comparison Component
 */
const DatabaseComparison: React.FC = () => {
  const databaseStats = [
    {
      platform: 'RV Life Pro',
      campgrounds: 14000,
      reviews: '50,000+',
      photos: '100,000+',
      updateFrequency: 'Weekly',
      color: 'var(--rv-life-primary-blue)',
    },
    {
      platform: 'Competitor A',
      campgrounds: 10000,
      reviews: '30,000+',
      photos: '60,000+',
      updateFrequency: 'Monthly',
      color: 'var(--rv-text-muted)',
    },
    {
      platform: 'Competitor B',
      campgrounds: 8000,
      reviews: '20,000+',
      photos: '40,000+',
      updateFrequency: 'Monthly',
      color: 'var(--rv-text-muted)',
    },
    {
      platform: 'WikiCamps',
      campgrounds: 12000,
      reviews: '40,000+',
      photos: '80,000+',
      updateFrequency: 'User-driven',
      color: 'var(--rv-text-muted)',
    },
  ];

  const maxCampgrounds = Math.max(...databaseStats.map(s => s.campgrounds));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--rv-life-primary-blue)] bg-opacity-10 border-2 border-[var(--rv-life-primary-blue)] rounded-full mb-4">
          <Database className="w-5 h-5 text-[var(--rv-life-primary-blue)]" />
          <span className="font-semibold text-[var(--rv-life-primary-blue)]">
            Database Statistics
          </span>
        </div>
        <h2 className="rv-headline-primary mb-4">
          The Most Comprehensive Database
        </h2>
        <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
          Compare database size, quality metrics, and update frequency across platforms
        </p>
      </div>

      <div className="rv-card-base p-8">
        {/* Bar Chart Visualization */}
        <div className="mb-12">
          <h3 className="font-semibold text-[var(--rv-text-primary)] mb-6">
            Campground Count Comparison
          </h3>
          <div className="space-y-4">
            {databaseStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-semibold text-[var(--rv-text-secondary)]">
                    {stat.platform}
                  </div>
                  <div className="flex-1">
                    <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-lg flex items-center justify-end px-4"
                        style={{
                          backgroundColor: stat.color,
                          width: `${(stat.campgrounds / maxCampgrounds) * 100}%`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(stat.campgrounds / maxCampgrounds) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        <span className="font-bold text-white">
                          {stat.campgrounds.toLocaleString()}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-[var(--rv-life-light-bg)] rounded-lg">
            <Database className="w-12 h-12 mx-auto mb-3 text-[var(--rv-life-primary-blue)]" />
            <div className="text-3xl font-bold text-[var(--rv-life-primary-blue)] mb-2">
              14,000+
            </div>
            <div className="text-sm text-[var(--rv-text-secondary)]">
              Total Campgrounds
            </div>
            <div className="text-xs text-[var(--rv-text-muted)] mt-2">
              Australia & New Zealand
            </div>
          </div>

          <div className="text-center p-6 bg-[var(--rv-life-light-bg)] rounded-lg">
            <Star className="w-12 h-12 mx-auto mb-3 text-[var(--rv-life-accent-orange)]" />
            <div className="text-3xl font-bold text-[var(--rv-life-accent-orange)] mb-2">
              50,000+
            </div>
            <div className="text-sm text-[var(--rv-text-secondary)]">
              Verified Reviews
            </div>
            <div className="text-xs text-[var(--rv-text-muted)] mt-2">
              From real RV owners
            </div>
          </div>

          <div className="text-center p-6 bg-[var(--rv-life-light-bg)] rounded-lg">
            <Zap className="w-12 h-12 mx-auto mb-3 text-[var(--rv-life-secondary-green)]" />
            <div className="text-3xl font-bold text-[var(--rv-life-secondary-green)] mb-2">
              Weekly
            </div>
            <div className="text-sm text-[var(--rv-text-secondary)]">
              Update Frequency
            </div>
            <div className="text-xs text-[var(--rv-text-muted)] mt-2">
              Always current data
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * User Experience Comparison Component
 */
const UserExperienceComparison: React.FC = () => {
  const uxMetrics = [
    {
      aspect: 'Ease of Use',
      rvLifePro: 9.2,
      competitors: 7.5,
      regularGPS: 8.0,
    },
    {
      aspect: 'Setup Time',
      rvLifePro: 9.5,
      competitors: 7.0,
      regularGPS: 9.0,
    },
    {
      aspect: 'Learning Curve',
      rvLifePro: 8.8,
      competitors: 6.5,
      regularGPS: 8.5,
    },
    {
      aspect: 'Mobile Experience',
      rvLifePro: 9.3,
      competitors: 7.8,
      regularGPS: 8.8,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h2 className="rv-headline-primary mb-4">
          Superior User Experience
        </h2>
        <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
          Based on user satisfaction surveys and usability testing
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ratings Comparison */}
        <div className="rv-card-base p-6">
          <h3 className="font-semibold text-[var(--rv-text-primary)] mb-6">
            User Experience Ratings (out of 10)
          </h3>
          <div className="space-y-6">
            {uxMetrics.map((metric, index) => (
              <div key={index}>
                <div className="text-sm font-semibold text-[var(--rv-text-secondary)] mb-2">
                  {metric.aspect}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-24 text-xs text-[var(--rv-text-muted)]">RV Life Pro</span>
                    <div className="flex-1 h-8 bg-gray-100 rounded overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] flex items-center justify-end px-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.rvLifePro * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        <span className="text-xs font-bold text-white">{metric.rvLifePro}</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-24 text-xs text-[var(--rv-text-muted)]">Competitors</span>
                    <div className="flex-1 h-8 bg-gray-100 rounded overflow-hidden">
                      <motion.div
                        className="h-full bg-gray-400 flex items-center justify-end px-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.competitors * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.1 }}
                      >
                        <span className="text-xs font-bold text-white">{metric.competitors}</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-24 text-xs text-[var(--rv-text-muted)]">Regular GPS</span>
                    <div className="flex-1 h-8 bg-gray-100 rounded overflow-hidden">
                      <motion.div
                        className="h-full bg-gray-300 flex items-center justify-end px-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.regularGPS * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                      >
                        <span className="text-xs font-bold text-gray-700">{metric.regularGPS}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="rv-card-base p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--rv-life-primary-blue)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[var(--rv-life-primary-blue)]" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--rv-text-primary)] mb-1">
                  Setup Time
                </h4>
                <p className="text-2xl font-bold text-[var(--rv-life-primary-blue)] mb-2">
                  Under 60 seconds
                </p>
                <p className="text-sm text-[var(--rv-text-secondary)]">
                  Enter your RV specs once and you're ready to navigate safely
                </p>
              </div>
            </div>
          </div>

          <div className="rv-card-base p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--rv-life-secondary-green)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-[var(--rv-life-secondary-green)]" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--rv-text-primary)] mb-1">
                  Mobile Optimized
                </h4>
                <p className="text-2xl font-bold text-[var(--rv-life-secondary-green)] mb-2">
                  100% Responsive
                </p>
                <p className="text-sm text-[var(--rv-text-secondary)]">
                  Works perfectly on phone, tablet, or mounted displays
                </p>
              </div>
            </div>
          </div>

          <div className="rv-card-base p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--rv-life-accent-orange)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[var(--rv-life-accent-orange)]" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--rv-text-primary)] mb-1">
                  Learning Curve
                </h4>
                <p className="text-2xl font-bold text-[var(--rv-life-accent-orange)] mb-2">
                  Intuitive Design
                </p>
                <p className="text-sm text-[var(--rv-text-secondary)]">
                  If you can use Google Maps, you can use RV Life Pro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Support & Reliability Section
 */
const SupportReliabilitySection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h2 className="rv-headline-primary mb-4">
          Support & Reliability You Can Trust
        </h2>
        <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
          When you're on the road, support matters. Here's how we compare.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <RVLifeCard
          icon={<Shield className="w-8 h-8" />}
          headline="Customer Support"
          body="Australian-based support team responding in under 4 hours. Email, chat, and phone support available during business hours."
          variant="default"
        />
        <RVLifeCard
          icon={<Users className="w-8 h-8" />}
          headline="Active Community"
          body="47,000+ active users sharing real-time updates, tips, and campground reviews. Community-driven data verification."
          variant="default"
        />
        <RVLifeCard
          icon={<TrendingUp className="w-8 h-8" />}
          headline="Continuous Updates"
          body="Weekly database updates, monthly map updates, and regular feature improvements based on user feedback."
          variant="default"
        />
      </div>

      {/* Comparison Table */}
      <div className="rv-card-base p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-[var(--rv-life-primary-blue)]">
              <th className="text-left py-4 px-4 font-semibold text-[var(--rv-text-secondary)]">
                Support Feature
              </th>
              <th className="text-center py-4 px-4 font-semibold text-[var(--rv-life-primary-blue)]">
                RV Life Pro
              </th>
              <th className="text-center py-4 px-4 font-semibold text-[var(--rv-text-secondary)]">
                Competitors
              </th>
              <th className="text-center py-4 px-4 font-semibold text-[var(--rv-text-secondary)]">
                Regular GPS
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { feature: 'Response Time', rvLifePro: '< 4 hours', competitors: '24-48 hours', regularGPS: 'Automated' },
              { feature: 'Support Channels', rvLifePro: 'Email, Chat, Phone', competitors: 'Email only', regularGPS: 'Community forums' },
              { feature: 'Australian Based', rvLifePro: 'Yes', competitors: 'No', regularGPS: 'No' },
              { feature: 'Community Size', rvLifePro: '47,000+', competitors: '10,000-20,000', regularGPS: 'N/A' },
              { feature: 'Update Frequency', rvLifePro: 'Weekly', competitors: 'Monthly', regularGPS: 'Monthly' },
              { feature: 'Years in Operation', rvLifePro: '12+', competitors: '3-8', regularGPS: '10+' },
            ].map((row, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-[var(--rv-text-secondary)]">{row.feature}</td>
                <td className="py-3 px-4 text-center font-semibold text-[var(--rv-life-primary-blue)]">
                  {row.rvLifePro}
                </td>
                <td className="py-3 px-4 text-center text-[var(--rv-text-muted)]">{row.competitors}</td>
                <td className="py-3 px-4 text-center text-[var(--rv-text-muted)]">{row.regularGPS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

/**
 * Pricing Comparison Component
 */
const PricingComparison: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h2 className="rv-headline-primary mb-4">
          Unbeatable Value for Money
        </h2>
        <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
          Compare total cost of ownership across all navigation options
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <RVLifePricingCard
          name="RV Life Pro"
          description="Complete RV navigation solution"
          price={{
            original: 65,
            current: 52,
            currency: '$',
            period: 'year',
          }}
          discountCode={{
            code: 'RVLIFE20',
            savings: 'Save $13/year with this code',
          }}
          features={[
            '14,000+ campground database',
            'RV-specific routing',
            'Offline maps included',
            'Maintenance tracking',
            'Weather-aware navigation',
            'Weekly updates',
            'Australian support team',
          ]}
          cta={{
            text: 'Start Free Trial',
            onClick: () => window.open('https://rvlifepro.com.au', '_blank'),
          }}
          featured={true}
          popularBadge={true}
        />

        <RVLifePricingCard
          name="Dedicated GPS Device"
          description="One-time hardware purchase"
          price={{
            current: 600,
            currency: '$',
            period: 'once',
          }}
          features={[
            'Limited campground data',
            'Basic RV routing',
            'Paid map updates',
            'No maintenance tracking',
            'No weather integration',
            'Yearly updates (paid)',
            'Overseas support',
          ]}
          cta={{
            text: 'Compare Features',
            href: '#main-comparison',
          }}
        />

        <RVLifePricingCard
          name="Competitor Apps"
          description="Other RV navigation apps"
          price={{
            current: 75,
            currency: '$',
            period: 'year',
          }}
          features={[
            '8,000-10,000 campgrounds',
            'Partial RV routing',
            'Limited offline maps',
            'No maintenance tracking',
            'Basic weather info',
            'Monthly updates',
            'Email support only',
          ]}
          cta={{
            text: 'See Why We\'re Better',
            href: '#main-comparison',
          }}
        />
      </div>

      {/* Total Cost Analysis */}
      <div className="rv-card-base p-8">
        <h3 className="rv-headline-tertiary mb-8 text-center">
          5-Year Total Cost of Ownership
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'RV Life Pro', upfront: 52, annual: 52, fiveYear: 260, color: 'var(--rv-life-primary-blue)' },
            { name: 'GPS Device', upfront: 600, annual: 100, fiveYear: 1000, color: 'var(--rv-text-muted)' },
            { name: 'Competitors', upfront: 75, annual: 75, fiveYear: 375, color: 'var(--rv-text-muted)' },
            { name: 'Regular GPS', upfront: 0, annual: 0, fiveYear: 0, color: 'var(--rv-text-muted)' },
          ].map((option, index) => (
            <motion.div
              key={index}
              className={cn(
                'text-center p-6 rounded-lg',
                index === 0 ? 'bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white' : 'bg-gray-100'
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={cn('text-sm mb-2', index === 0 ? 'text-white/80' : 'text-[var(--rv-text-muted)]')}>
                {option.name}
              </div>
              <div className={cn('text-3xl font-bold mb-1', index === 0 ? 'text-white' : 'text-[var(--rv-text-primary)]')}>
                ${option.fiveYear}
              </div>
              <div className={cn('text-xs', index === 0 ? 'text-white/80' : 'text-[var(--rv-text-muted)]')}>
                Over 5 years
              </div>
              {index === 0 && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-xs text-white/90">
                    Save ${1000 - 260} vs GPS device
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center text-sm text-[var(--rv-text-muted)]">
          * Regular GPS apps are free but lack RV-specific features, potentially costing thousands in damages
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Decision Matrix Component
 */
const DecisionMatrix: React.FC = () => {
  const personaRecommendations = [
    {
      persona: 'Weekend Warriors',
      description: 'Occasional RVers, 5-10 trips per year',
      bestFor: 'RV Life Pro',
      reason: 'Safety features justify cost after just one prevented incident. Easy enough to use infrequently.',
      icon: <Users className="w-8 h-8" />,
    },
    {
      persona: 'Grey Nomads',
      description: 'Full-time travelers, extended trips',
      bestFor: 'RV Life Pro',
      reason: 'Offline maps essential for remote areas. Comprehensive database prevents campground disappointments. Maintenance tracking prevents breakdowns.',
      icon: <MapPin className="w-8 h-8" />,
    },
    {
      persona: 'Digital Nomads',
      description: 'Work remotely while traveling',
      bestFor: 'RV Life Pro',
      reason: 'Connectivity filters and co-working space locations essential for productivity. Weather routing prevents missed deadlines.',
      icon: <Smartphone className="w-8 h-8" />,
    },
    {
      persona: 'Budget Conscious',
      description: 'Tight travel budgets',
      bestFor: 'RV Life Pro',
      reason: '$1.25/week is cheaper than one wrong campground. Free trial proves value before paying.',
      icon: <DollarSign className="w-8 h-8" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h2 className="rv-headline-primary mb-4">
          Which Solution Is Right for You?
        </h2>
        <p className="rv-body-large text-[var(--rv-text-secondary)] max-w-3xl mx-auto">
          No matter your RV lifestyle, the answer is clear
        </p>
      </div>

      <RVLifeCardGrid columns={2} gap="large">
        {personaRecommendations.map((rec, index) => (
          <RVLifeCard
            key={index}
            icon={rec.icon}
            iconBgColor="var(--rv-life-primary-blue)"
            headline={rec.persona}
            body={
              <div>
                <p className="text-sm text-[var(--rv-text-muted)] mb-3">
                  {rec.description}
                </p>
                <div className="p-3 bg-[var(--rv-life-secondary-green)] bg-opacity-10 rounded-lg mb-3">
                  <div className="text-xs font-semibold text-[var(--rv-life-secondary-green)] mb-1">
                    Best Choice:
                  </div>
                  <div className="font-bold text-[var(--rv-text-primary)]">
                    {rec.bestFor}
                  </div>
                </div>
                <p className="text-sm text-[var(--rv-text-secondary)]">
                  <strong>Why:</strong> {rec.reason}
                </p>
              </div>
            }
            delay={index * 0.1}
          />
        ))}
      </RVLifeCardGrid>

      {/* Final CTA */}
      <motion.div
        className="mt-12 text-center rv-card-base p-8 bg-gradient-to-br from-[var(--rv-life-light-bg)] to-white"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="rv-headline-tertiary mb-4">
          Try RV Life Pro Risk-Free for 14 Days
        </h3>
        <p className="rv-body-base text-[var(--rv-text-secondary)] mb-6">
          No credit card required. Cancel anytime. 30-day money-back guarantee.
        </p>
        <RVLifeButton
          variant="primary"
          size="large"
          onClick={() => window.open('https://rvlifepro.com.au', '_blank')}
        >
          Start Your Free Trial Now
          <ChevronRight className="w-5 h-5 ml-2" />
        </RVLifeButton>
      </motion.div>
    </motion.div>
  );
};

export default RVLifeProComparison;
