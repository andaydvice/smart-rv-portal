/**
 * RV Life Pro Affiliate Components
 *
 * Barrel export for all RV Life Pro affiliate marketing components
 */

// Existing affiliate tracking components
export { RVLifeAffiliateLink } from './RVLifeAffiliateLink';
export type { RVLifeAffiliateLinkProps } from './RVLifeAffiliateLink';

export { DiscountCodeBox } from './DiscountCodeBox';
export type { DiscountCodeBoxProps } from './DiscountCodeBox';

export { ExitIntentModal } from './ExitIntentModal';
export type { ExitIntentModalProps } from './ExitIntentModal';

// Design System Components

// Button Components
export {
  RVLifeButton,
  RVLifePrimaryCTA,
  RVLifeSecondaryCTA,
  RVLifeTextLink,
} from './RVLifeButton';
export type {
  RVLifeButtonProps,
  RVLifeButtonVariant,
  RVLifeButtonSize,
} from './RVLifeButton';

// Card Components
export {
  RVLifeCard,
  RVLifeCardGrid,
  RVLifeIconCard,
  RVLifeStatCard,
} from './RVLifeCard';
export type {
  RVLifeCardProps,
  RVLifeCardGridProps,
  RVLifeIconCardProps,
  RVLifeStatCardProps,
} from './RVLifeCard';

// Testimonial Components (Legacy - for displaying existing testimonials)
export {
  RVLifeTestimonial,
  RVLifeTestimonialGrid,
  RVLifeTestimonialCarousel,
} from './RVLifeTestimonial';
export type {
  RVLifeTestimonialProps,
  RVLifeTestimonialData,
  RVLifeTestimonialGridProps,
  RVLifeTestimonialCarouselProps,
} from './RVLifeTestimonial';

// Ethical Testimonial System Components (NEW - Use these for real customer testimonials)
export { TestimonialSubmission } from './TestimonialSubmission';
export type {
  TestimonialSubmissionProps,
  TestimonialFormData,
} from './TestimonialSubmission';

export { TestimonialManager } from './TestimonialManager';
export type {
  TestimonialManagerProps,
  TestimonialSubmission as TestimonialSubmissionData,
} from './TestimonialManager';

export { SafeTestimonialDisplay } from './SafeTestimonialDisplay';
export type {
  SafeTestimonialDisplayProps,
  VerifiedTestimonial,
} from './SafeTestimonialDisplay';

export { TrustSignals, TRUST_SIGNAL_PRESETS } from './TrustSignals';
export type {
  TrustSignalsProps,
  TrustSignal,
} from './TrustSignals';

// Trust Badge Components
export {
  RVLifeTrustBadge,
  RVLifeTrustBadgeGroup,
  RVLifeSimpleBadge,
  RVLifeRatingBadge,
  RVLifeVerifiedBadge,
} from './RVLifeTrustBadge';
export type {
  RVLifeTrustBadgeProps,
  TrustBadgeType,
  RVLifeTrustBadgeGroupProps,
  RVLifeSimpleBadgeProps,
  RVLifeRatingBadgeProps,
  RVLifeVerifiedBadgeProps,
} from './RVLifeTrustBadge';

// Feature Block Components
export {
  RVLifeFeatureBlock,
  RVLifeFeatureComparison,
  RVLifeBenefitsList,
} from './RVLifeFeatureBlock';
export type {
  RVLifeFeatureBlockProps,
  RVLifeFeatureComparisonProps,
  ComparisonFeature,
  RVLifeBenefitsListProps,
} from './RVLifeFeatureBlock';

// Hero Section Components
export {
  RVLifeHeroSection,
  RVLifeHeroSplit,
  RVLifeHeroMinimal,
} from './RVLifeHeroSection';
export type {
  RVLifeHeroSectionProps,
  RVLifeHeroSplitProps,
  RVLifeHeroMinimalProps,
} from './RVLifeHeroSection';

// Pricing Components
export {
  RVLifePricingCard,
  RVLifePricingGrid,
  RVLifePricingComparison,
} from './RVLifePricingCard';
export type {
  RVLifePricingCardProps,
  RVLifePricingGridProps,
  RVLifePricingComparisonProps,
  PricingComparisonFeature,
} from './RVLifePricingCard';

// FAQ Components
export {
  RVLifeFAQAccordion,
  RVLifeFAQSection,
  RVLifeSimpleFAQ,
} from './RVLifeFAQAccordion';
export type {
  RVLifeFAQAccordionProps,
  FAQItem,
  FAQCategory,
  RVLifeFAQSectionProps,
  RVLifeSimpleFAQProps,
} from './RVLifeFAQAccordion';
