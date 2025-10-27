/**
 * Brentwood Home Affiliate Component Library
 *
 * A comprehensive collection of React components for creating high-converting
 * RV mattress affiliate landing pages with elegant, sleep-focused design.
 *
 * Color Palette:
 * - Primary Blue: #4A90E2 (trust, calm, sleep)
 * - Secondary Purple: #7B68EE (luxury, comfort)
 * - Accent Gold: #D4AF37 (premium, investment)
 * - Success Green: #27AE60 (health, positive outcomes)
 *
 * @author Smart RV Portal
 * @version 1.0.0
 */

// Core Components
export {
  BrentwoodButton,
  BrentwoodPrimaryCTA,
  BrentwoodSecondaryCTA,
  BrentwoodLuxuryCTA,
  BrentwoodTextLink,
  type BrentwoodButtonProps,
  type BrentwoodButtonVariant,
  type BrentwoodButtonSize,
} from './BrentwoodButton';

export {
  BrentwoodCard,
  BrentwoodCardGrid,
  BrentwoodIconCard,
  type BrentwoodCardProps,
  type BrentwoodCardGridProps,
  type BrentwoodIconCardProps,
} from './BrentwoodCard';

export {
  BrentwoodHeroSection,
  type BrentwoodHeroSectionProps,
} from './BrentwoodHeroSection';

// Product Components
export {
  BrentwoodProductCard,
  type BrentwoodProductCardProps,
} from './BrentwoodProductCard';

export {
  BrentwoodTestimonialCard,
  type BrentwoodTestimonialCardProps,
} from './BrentwoodTestimonialCard';

export {
  BrentwoodComparisonTable,
  type BrentwoodComparisonTableProps,
  type ComparisonColumn,
  type ComparisonRow,
} from './BrentwoodComparisonTable';

export {
  BrentwoodPricingCard,
  type BrentwoodPricingCardProps,
} from './BrentwoodPricingCard';

// Content Components
export {
  BrentwoodStatCard,
  type BrentwoodStatCardProps,
} from './BrentwoodStatCard';

export {
  BrentwoodFAQAccordion,
  type BrentwoodFAQAccordionProps,
  type BrentwoodFAQItem,
} from './BrentwoodFAQAccordion';

export {
  BrentwoodFeatureBlock,
  type BrentwoodFeatureBlockProps,
} from './BrentwoodFeatureBlock';

// Trust & Conversion Components
export {
  TrustBadges,
  TrustBadge,
  type TrustBadgeProps,
} from './TrustBadges';

export {
  BrentwoodAffiliateLink,
  BrentwoodAffiliateTextLink,
  type BrentwoodAffiliateLinkProps,
} from './BrentwoodAffiliateLink';

// Interactive Tools
export {
  BrentwoodSizeGuide,
  type BrentwoodSizeGuideProps,
} from './BrentwoodSizeGuide';

export {
  BrentwoodROICalculator,
  type BrentwoodROICalculatorProps,
} from './BrentwoodROICalculator';

// Default export for convenience (using named imports)
import { BrentwoodButton as Button } from './BrentwoodButton';
import { BrentwoodCard as Card } from './BrentwoodCard';
import { BrentwoodHeroSection as Hero } from './BrentwoodHeroSection';
import { BrentwoodProductCard as ProductCard } from './BrentwoodProductCard';
import { BrentwoodTestimonialCard as TestimonialCard } from './BrentwoodTestimonialCard';
import { BrentwoodComparisonTable as ComparisonTable } from './BrentwoodComparisonTable';
import { BrentwoodPricingCard as PricingCard } from './BrentwoodPricingCard';
import { BrentwoodStatCard as StatCard } from './BrentwoodStatCard';
import { BrentwoodFAQAccordion as FAQAccordion } from './BrentwoodFAQAccordion';
import { BrentwoodFeatureBlock as FeatureBlock } from './BrentwoodFeatureBlock';
import { TrustBadges } from './TrustBadges';
import { BrentwoodAffiliateLink as AffiliateLink } from './BrentwoodAffiliateLink';
import { BrentwoodSizeGuide as SizeGuide } from './BrentwoodSizeGuide';
import { BrentwoodROICalculator as ROICalculator } from './BrentwoodROICalculator';

export default {
  Button,
  Card,
  Hero,
  ProductCard,
  TestimonialCard,
  ComparisonTable,
  PricingCard,
  StatCard,
  FAQAccordion,
  FeatureBlock,
  TrustBadges,
  AffiliateLink,
  SizeGuide,
  ROICalculator,
};
