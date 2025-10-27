import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DollarSign, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { BrentwoodButton } from './BrentwoodButton';
import '@/styles/affiliate/brentwood-home.css';

export interface BrentwoodROICalculatorProps {
  onCalculate?: (results: ROIResults) => void;
  showCTA?: boolean;
  className?: string;
}

interface ROIResults {
  mattressCost: number;
  currentMattressAge: number;
  sleepQualityImprovement: number;
  totalAnnualSavings: number;
  breakEvenMonths: number;
  fiveYearValue: number;
  healthBenefitsValue: number;
}

/**
 * BrentwoodROICalculator - Interactive ROI calculator for mattress investment
 *
 * Features:
 * - Slider-based inputs
 * - Real-time calculation
 * - Visual results display
 * - Health benefits quantification
 * - Break-even analysis
 * - 5-year value projection
 */
export const BrentwoodROICalculator: React.FC<BrentwoodROICalculatorProps> = ({
  onCalculate,
  showCTA = true,
  className,
}) => {
  // Input states
  const [mattressCost, setMattressCost] = useState(1500);
  const [currentMattressAge, setCurrentMattressAge] = useState(8);
  const [sleepQualityImprovement, setSleepQualityImprovement] = useState(30);

  // Results
  const [results, setResults] = useState<ROIResults | null>(null);

  // Calculate ROI whenever inputs change
  useEffect(() => {
    calculateROI();
  }, [mattressCost, currentMattressAge, sleepQualityImprovement]);

  const calculateROI = () => {
    // Health costs from poor sleep (conservative estimates)
    const annualHealthcareCost = 500; // Doctor visits, medications, etc.
    const productivityLossValue = 2000; // Missed work, reduced performance
    const chiropractorVisits = 600; // Back pain treatment
    const sleepAidsCost = 300; // OTC sleep aids, supplements

    // Calculate improvements based on sleep quality increase
    const improvementFactor = sleepQualityImprovement / 100;

    const healthSavings = annualHealthcareCost * improvementFactor;
    const productivityGains = productivityLossValue * improvementFactor;
    const chiropractorSavings = chiropractorVisits * improvementFactor;
    const sleepAidsSavings = sleepAidsCost * improvementFactor;

    const totalAnnualSavings =
      healthSavings + productivityGains + chiropractorSavings + sleepAidsSavings;

    const breakEvenMonths = Math.round((mattressCost / totalAnnualSavings) * 12);
    const fiveYearValue = totalAnnualSavings * 5 - mattressCost;
    const healthBenefitsValue = (healthSavings + chiropractorSavings) * 5;

    const calculatedResults: ROIResults = {
      mattressCost,
      currentMattressAge,
      sleepQualityImprovement,
      totalAnnualSavings: Math.round(totalAnnualSavings),
      breakEvenMonths,
      fiveYearValue: Math.round(fiveYearValue),
      healthBenefitsValue: Math.round(healthBenefitsValue),
    };

    setResults(calculatedResults);

    if (onCalculate) {
      onCalculate(calculatedResults);
    }
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="brentwood-headline-primary mb-4">
          Calculate Your Mattress Investment ROI
        </h2>
        <p className="brentwood-body-base text-[var(--brentwood-text-secondary)]">
          A quality mattress is an investment in your health, productivity, and quality of life.
          See your potential returns.
        </p>
      </div>

      {/* Calculator Card */}
      <div className="brentwood-card-base p-8 space-y-8">
        {/* Input: Mattress Cost */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-[var(--brentwood-text-primary)] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[var(--brentwood-primary-blue)]" />
              New Mattress Investment
            </label>
            <span className="text-2xl font-bold text-[var(--brentwood-primary-blue)]">
              ${mattressCost.toLocaleString()}
            </span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[mattressCost]}
            onValueChange={(value) => setMattressCost(value[0])}
            max={3000}
            min={500}
            step={100}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-gradient-to-r from-[var(--brentwood-primary-blue)] to-[var(--brentwood-accent-gold)] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-[var(--brentwood-primary-blue)] rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--brentwood-primary-blue)] focus:ring-offset-2 transition-all"
              aria-label="Mattress cost"
            />
          </Slider.Root>
          <div className="flex justify-between text-xs text-[var(--brentwood-text-muted)]">
            <span>$500</span>
            <span>$3,000</span>
          </div>
        </div>

        {/* Input: Current Mattress Age */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-[var(--brentwood-text-primary)] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--brentwood-secondary-purple)]" />
              Current Mattress Age
            </label>
            <span className="text-2xl font-bold text-[var(--brentwood-secondary-purple)]">
              {currentMattressAge} years
            </span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[currentMattressAge]}
            onValueChange={(value) => setCurrentMattressAge(value[0])}
            max={20}
            min={1}
            step={1}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-gradient-to-r from-[var(--brentwood-secondary-purple)] to-[var(--brentwood-accent-gold)] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-[var(--brentwood-secondary-purple)] rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--brentwood-secondary-purple)] focus:ring-offset-2 transition-all"
              aria-label="Mattress age"
            />
          </Slider.Root>
          <div className="flex justify-between text-xs text-[var(--brentwood-text-muted)]">
            <span>1 year</span>
            <span>20 years</span>
          </div>
          {currentMattressAge > 8 && (
            <p className="text-sm text-[var(--brentwood-warning-red)] italic">
              Mattresses over 8 years old significantly impact sleep quality and health.
            </p>
          )}
        </div>

        {/* Input: Sleep Quality Improvement */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-[var(--brentwood-text-primary)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--brentwood-accent-gold)]" />
              Expected Sleep Improvement
            </label>
            <span className="text-2xl font-bold text-[var(--brentwood-accent-gold)]">
              {sleepQualityImprovement}%
            </span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[sleepQualityImprovement]}
            onValueChange={(value) => setSleepQualityImprovement(value[0])}
            max={100}
            min={10}
            step={5}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-gradient-to-r from-[var(--brentwood-accent-gold)] to-[var(--brentwood-accent-gold-light)] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-[var(--brentwood-accent-gold)] rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--brentwood-accent-gold)] focus:ring-offset-2 transition-all"
              aria-label="Sleep improvement"
            />
          </Slider.Root>
          <div className="flex justify-between text-xs text-[var(--brentwood-text-muted)]">
            <span>10%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Results Display */}
      {results && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Annual Savings */}
            <motion.div
              className="brentwood-card-base p-6 text-center bg-gradient-to-br from-[var(--brentwood-success-green)]/5 to-white border-2 border-[var(--brentwood-success-green)]"
              whileHover={{ scale: 1.02 }}
            >
              <TrendingUp className="w-8 h-8 text-[var(--brentwood-success-green)] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[var(--brentwood-success-green)] mb-2">
                ${results.totalAnnualSavings.toLocaleString()}
              </div>
              <div className="text-sm text-[var(--brentwood-text-secondary)]">
                Annual Health & Productivity Value
              </div>
            </motion.div>

            {/* Break Even */}
            <motion.div
              className="brentwood-card-base p-6 text-center bg-gradient-to-br from-[var(--brentwood-primary-blue)]/5 to-white border-2 border-[var(--brentwood-primary-blue)]"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="w-8 h-8 text-[var(--brentwood-primary-blue)] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[var(--brentwood-primary-blue)] mb-2">
                {results.breakEvenMonths} months
              </div>
              <div className="text-sm text-[var(--brentwood-text-secondary)]">
                Break-Even Point
              </div>
            </motion.div>

            {/* 5-Year Value */}
            <motion.div
              className="brentwood-card-base p-6 text-center bg-gradient-to-br from-[var(--brentwood-accent-gold)]/5 to-white border-2 border-[var(--brentwood-accent-gold)]"
              whileHover={{ scale: 1.02 }}
            >
              <DollarSign className="w-8 h-8 text-[var(--brentwood-accent-gold)] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[var(--brentwood-accent-gold)] mb-2">
                ${results.fiveYearValue.toLocaleString()}
              </div>
              <div className="text-sm text-[var(--brentwood-text-secondary)]">
                5-Year Net Value
              </div>
            </motion.div>
          </div>

          {/* Detailed Breakdown */}
          <div className="brentwood-card-base p-8 space-y-4">
            <h3 className="brentwood-headline-tertiary mb-4">Your Investment Breakdown</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-[var(--brentwood-text-secondary)]">
                  Health Benefits (Reduced medical costs, less pain)
                </span>
                <span className="font-semibold text-[var(--brentwood-success-green)]">
                  ${results.healthBenefitsValue.toLocaleString()} over 5 years
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-[var(--brentwood-text-secondary)]">
                  Better Sleep Quality & Recovery
                </span>
                <span className="font-semibold text-[var(--brentwood-primary-blue)]">
                  Priceless
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-[var(--brentwood-text-secondary)]">
                  Increased Daily Energy & Focus
                </span>
                <span className="font-semibold text-[var(--brentwood-primary-blue)]">
                  Priceless
                </span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-[var(--brentwood-text-secondary)]">
                  120-Night Sleep Trial (Risk-Free)
                </span>
                <span className="font-semibold text-[var(--brentwood-accent-gold)]">
                  Included
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          {showCTA && (
            <div className="brentwood-card-base p-8 text-center bg-gradient-to-br from-[var(--brentwood-primary-blue)]/5 to-[var(--brentwood-secondary-purple)]/5">
              <h3 className="brentwood-headline-tertiary mb-4">
                Ready to Invest in Better Sleep?
              </h3>
              <p className="brentwood-body-base text-[var(--brentwood-text-secondary)] mb-6 max-w-2xl mx-auto">
                With a {results.breakEvenMonths}-month break-even and $
                {results.fiveYearValue.toLocaleString()} in 5-year value, upgrading your RV
                mattress is one of the smartest investments you can make.
              </p>
              <BrentwoodButton variant="luxury" size="large">
                Shop Premium RV Mattresses
              </BrentwoodButton>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BrentwoodROICalculator;
