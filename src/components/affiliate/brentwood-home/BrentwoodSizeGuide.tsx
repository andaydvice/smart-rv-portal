import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Ruler, Users, AlertCircle } from 'lucide-react';
import { BrentwoodButton } from './BrentwoodButton';
import '@/styles/affiliate/brentwood-home.css';

// Mattress size data with RV-specific information
const MATTRESS_SIZES = {
  'RV Twin': {
    dimensions: '38" x 75"',
    sleepers: 1,
    rvTypes: ['Class B', 'Truck Camper', 'Small Travel Trailer'],
    notes: 'Perfect for solo travelers in compact RVs',
  },
  'RV Full': {
    dimensions: '53" x 75"',
    sleepers: 2,
    rvTypes: ['Class C', 'Travel Trailer', 'Fifth Wheel'],
    notes: 'Most common RV mattress size, fits standard RV bedrooms',
  },
  'RV Queen': {
    dimensions: '60" x 75" or 60" x 80"',
    sleepers: 2,
    rvTypes: ['Class A', 'Class C', 'Fifth Wheel', 'Toy Hauler'],
    notes: 'Luxury RV size, note the shorter length than residential',
  },
  'RV King': {
    dimensions: '72" x 80"',
    sleepers: 2,
    rvTypes: ['High-end Class A', 'Luxury Fifth Wheel'],
    notes: 'Premium RV size, rare but offers maximum comfort',
  },
  'Custom/Short Queen': {
    dimensions: 'Various',
    sleepers: 2,
    rvTypes: ['Vintage RVs', 'Custom Builds'],
    notes: 'Requires custom measurements and potentially custom mattress',
  },
};

export interface BrentwoodSizeGuideProps {
  onSizeSelect?: (size: string) => void;
  showCTA?: boolean;
  className?: string;
}

/**
 * BrentwoodSizeGuide - Interactive RV mattress sizing tool
 *
 * Features:
 * - Visual size comparison
 * - RV type recommendations
 * - Sleeper count
 * - Interactive selection
 * - Measurement guidelines
 * - CTA for selected size
 */
export const BrentwoodSizeGuide: React.FC<BrentwoodSizeGuideProps> = ({
  onSizeSelect,
  showCTA = true,
  className,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showMeasurementTips, setShowMeasurementTips] = useState(false);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    if (onSizeSelect) {
      onSizeSelect(size);
    }
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="brentwood-headline-primary mb-4">
          Find Your Perfect RV Mattress Size
        </h2>
        <p className="brentwood-body-base text-[var(--brentwood-text-secondary)] mb-6">
          RV mattresses are not the same as residential mattresses. Use this guide to find the
          right size for your RV.
        </p>

        {/* Measurement Tips Toggle */}
        <button
          onClick={() => setShowMeasurementTips(!showMeasurementTips)}
          className="inline-flex items-center gap-2 text-[var(--brentwood-primary-blue)] hover:text-[var(--brentwood-primary-blue-dark)] font-semibold transition-colors"
        >
          <Ruler className="w-5 h-5" />
          {showMeasurementTips ? 'Hide' : 'Show'} Measurement Tips
        </button>
      </div>

      {/* Measurement Tips */}
      {showMeasurementTips && (
        <motion.div
          className="brentwood-card-base p-6 bg-[var(--brentwood-primary-blue)]/5 border-2 border-[var(--brentwood-primary-blue)]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-[var(--brentwood-primary-blue)] flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="font-bold text-[var(--brentwood-text-primary)]">
                How to Measure Your RV Mattress:
              </h3>
              <ol className="space-y-2 text-sm text-[var(--brentwood-text-secondary)] list-decimal list-inside">
                <li>Remove all bedding and measure the existing mattress (not the bed frame)</li>
                <li>Measure WIDTH: Side to side across the shortest dimension</li>
                <li>Measure LENGTH: Top to bottom along the longest dimension</li>
                <li>
                  Check for corner cuts: Many RV mattresses have rounded or cut corners to fit
                  around furniture
                </li>
                <li>
                  Measure DEPTH: Important for fitted sheets (RV mattresses are typically 6-8"
                  thick)
                </li>
                <li>
                  Note any unusual shapes: Some RVs have radius corners, notches, or custom shapes
                </li>
              </ol>
              <p className="text-sm text-[var(--brentwood-text-muted)] italic mt-3">
                Pro Tip: Take photos of your mattress from multiple angles before shopping. This
                helps identify any custom cuts or shapes.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Size Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(MATTRESS_SIZES).map(([size, details], index) => {
          const isSelected = selectedSize === size;
          return (
            <motion.button
              key={size}
              onClick={() => handleSizeSelect(size)}
              className={cn(
                'brentwood-card-base p-6 text-left transition-all duration-300',
                'hover:shadow-xl hover:-translate-y-1',
                isSelected &&
                  'border-2 border-[var(--brentwood-accent-gold)] ring-4 ring-[var(--brentwood-accent-gold)] ring-opacity-20 bg-gradient-to-br from-white to-[var(--brentwood-accent-gold)]/5'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Size Name */}
              <h3 className="brentwood-headline-tertiary mb-3">{size}</h3>

              {/* Dimensions */}
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-4 h-4 text-[var(--brentwood-primary-blue)]" />
                <span className="text-lg font-semibold text-[var(--brentwood-text-primary)]">
                  {details.dimensions}
                </span>
              </div>

              {/* Sleepers */}
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-[var(--brentwood-secondary-purple)]" />
                <span className="text-sm text-[var(--brentwood-text-secondary)]">
                  {details.sleepers} {details.sleepers === 1 ? 'sleeper' : 'sleepers'}
                </span>
              </div>

              {/* RV Types */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[var(--brentwood-text-muted)] mb-2">
                  COMMON IN:
                </p>
                <div className="flex flex-wrap gap-2">
                  {details.rvTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 text-xs bg-[var(--brentwood-soft-bg)] text-[var(--brentwood-text-secondary)] rounded"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <p className="text-sm text-[var(--brentwood-text-muted)] italic">{details.notes}</p>

              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  className="mt-4 pt-4 border-t border-[var(--brentwood-accent-gold)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm font-semibold text-[var(--brentwood-accent-gold)]">
                    ✓ Selected
                  </span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* CTA Section */}
      {showCTA && selectedSize && (
        <motion.div
          className="brentwood-card-base p-8 text-center bg-gradient-to-br from-[var(--brentwood-primary-blue)]/5 to-[var(--brentwood-secondary-purple)]/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="brentwood-headline-tertiary mb-4">
            Great Choice! Ready to Find Your {selectedSize} Mattress?
          </h3>
          <p className="brentwood-body-base text-[var(--brentwood-text-secondary)] mb-6 max-w-2xl mx-auto">
            Brentwood Home offers premium mattresses in {selectedSize} size with FREE shipping and
            a 120-night sleep trial.
          </p>
          <BrentwoodButton variant="luxury" size="large">
            View {selectedSize} Mattresses
          </BrentwoodButton>
        </motion.div>
      )}

      {/* Additional Help */}
      <div className="brentwood-card-base p-6 bg-[var(--brentwood-soft-bg)]">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-[var(--brentwood-primary-blue)] flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-[var(--brentwood-text-primary)] mb-2">
              Need a Custom Size?
            </h4>
            <p className="text-sm text-[var(--brentwood-text-secondary)] mb-3">
              Many RVs have non-standard mattress sizes or shapes with corner cuts. If your
              measurements don't match standard sizes, Brentwood Home offers custom mattress
              options.
            </p>
            <BrentwoodButton variant="tertiary" size="small">
              Contact for Custom Sizing
            </BrentwoodButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrentwoodSizeGuide;
