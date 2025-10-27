/**
 * Brentwood Home Affiliate Configuration
 *
 * Centralized configuration for Brentwood Home RV mattress affiliate marketing
 * including URLs, tracking parameters, product data, and commission structure.
 *
 * Commission: $75-299 per sale (15% of $500-$1,995 products)
 * Cookie Duration: 120 days (4 months) - CRITICAL ADVANTAGE
 */

export const BRENTWOOD_HOME_CONFIG = {
  /**
   * Base affiliate URL - Replace PLACEHOLDER with actual affiliate ID
   */
  baseAffiliateUrl: 'https://www.brentwoodhome.com?affid=PLACEHOLDER',

  /**
   * Product-specific URLs
   */
  products: {
    cypress: {
      name: 'Cypress Mattress',
      url: 'https://www.brentwoodhome.com/products/cypress-mattress?affid=PLACEHOLDER',
      type: 'Gel Memory Foam',
      priceRange: '$599-799',
      commission: '$89-119',
      description: 'Budget-friendly gel memory foam with cooling technology',
    },
    oceano: {
      name: 'Oceano Hybrid',
      url: 'https://www.brentwoodhome.com/products/oceano-mattress?affid=PLACEHOLDER',
      type: 'Latex Hybrid',
      priceRange: '$899-1,299',
      commission: '$134-194',
      description: 'Natural latex with pocketed coils for support',
    },
    crystalCove: {
      name: 'Crystal Cove',
      url: 'https://www.brentwoodhome.com/products/crystal-cove-mattress?affid=PLACEHOLDER',
      type: 'Luxury Hybrid',
      priceRange: '$1,199-1,695',
      commission: '$179-254',
      description: 'Premium hybrid with advanced cooling and support',
    },
  },

  /**
   * RV-specific mattress sizes
   */
  rvSizes: {
    shortQueen: {
      name: 'Short Queen',
      dimensions: '60" x 75"',
      common: 'Most travel trailers and fifth wheels',
      notes: '5 inches shorter than standard queen',
    },
    rvKing: {
      name: 'RV King',
      dimensions: '72" x 80"',
      common: 'Luxury fifth wheels and Class A motorhomes',
      notes: '4 inches narrower than standard king',
    },
    rvQueen: {
      name: 'RV Queen',
      dimensions: '60" x 80"',
      common: 'Some Class C and Class A motorhomes',
      notes: 'Standard queen length, same width',
    },
    threeFourth: {
      name: 'Three-Quarter',
      dimensions: '48" x 75"',
      common: 'Smaller RVs and bunk areas',
      notes: 'Smaller than standard double',
    },
  },

  /**
   * Bundle opportunities
   */
  bundles: {
    mattressPlusPillows: {
      name: 'Sleep Upgrade Bundle',
      includes: ['Mattress', '2 Premium Pillows'],
      savings: '$50',
      targetAOV: '$700-1,000',
    },
    mattressPlusSheets: {
      name: 'Complete Bed Bundle',
      includes: ['Mattress', 'RV-sized Sheet Set'],
      savings: '$40',
      targetAOV: '$800-1,100',
    },
    masterSuite: {
      name: 'RV Master Suite',
      includes: ['Mattress', '2 Pillows', 'Sheet Set', 'Mattress Protector'],
      savings: '$200-300',
      targetAOV: '$999-1,499',
    },
  },

  /**
   * Key selling points
   */
  features: {
    trialPeriod: 120, // nights
    warranty: 25, // years
    freeShipping: true,
    freeReturns: true,
    madeInUSA: true,
    certifications: ['CertiPUR-US', 'GREENGUARD Gold'],
  },

  /**
   * Affiliate commission details
   */
  commission: {
    percentage: 15,
    minCommission: 75, // $500 product
    maxCommission: 299, // $1,995 product
    avgCommission: 187, // estimated average
    currency: 'USD',
    type: 'per_sale',
  },

  /**
   * Cookie and tracking settings - CRITICAL ADVANTAGE
   */
  tracking: {
    source: 'smart-rv-portal',
    medium: 'affiliate',
    cookieDuration: 120, // days (4 months!)
    cookieDurationMonths: 4,
  },

  /**
   * Campaign naming conventions
   */
  campaigns: {
    // Hero sections
    hero: 'hero-cta',
    heroSecondary: 'hero-secondary',

    // Product interactions
    productCard: 'product-card',
    productCardViewDetails: 'product-card-view-details',
    productImage: 'product-image',

    // Comparisons and tables
    comparisonTable: 'comparison-table',
    comparisonTableCompare: 'comparison-table-compare',

    // Content links
    inlineContent: 'inline-content',
    imageGallery: 'image-gallery',

    // Navigation and sticky elements
    stickyHeader: 'sticky-header',
    floatingAction: 'floating-action',

    // Conversion-focused
    exitIntent: 'exit-intent',
    footerCTA: 'footer-cta',

    // Email and lead generation
    emailCaptureInline: 'email-capture-inline',
    emailCaptureSidebar: 'email-capture-sidebar',
    emailCaptureExitIntent: 'email-capture-exit-intent',
  },

  /**
   * Color scheme for Brentwood Home brand
   */
  brandColors: {
    primary: '#2C5F2D', // Forest green (eco-friendly)
    primaryHover: '#234D24',
    secondary: '#8B7355', // Warm brown
    accent: '#D97706', // Warm orange
    neutral: '#F8F9FA',
    text: '#1F2937',
    textLight: '#6B7280',
  },

  /**
   * Trust signals
   */
  trustSignals: {
    certifications: [
      {
        name: 'CertiPUR-US',
        description: 'Certified safe foams without harmful chemicals',
        logo: 'certipur-us-badge.svg',
        link: 'https://certipur.us/',
      },
      {
        name: 'GREENGUARD Gold',
        description: 'Low VOC emissions for air quality',
        logo: 'greenguard-gold-badge.svg',
        link: 'https://www.ul.com/resources/greenguard-certification-program',
      },
    ],
    guarantees: [
      '120-Night Trial Period',
      '25-Year Limited Warranty',
      'Free Shipping & Returns',
      'Made in California, USA',
    ],
  },

  /**
   * Content optimization for 120-day cookie
   */
  contentStrategy: {
    multiVisitDesign: true,
    emailNurtureSequence: true,
    bookmarkEncouragement: true,
    returnVisitIncentives: true,
    seasonalUpdates: true,
  },

  /**
   * A/B testing priorities
   */
  abTestPriorities: [
    'hero-headline',
    'primary-cta-color',
    'primary-cta-copy',
    'pricing-display',
    'trust-badge-placement',
    'product-image-style',
  ],
} as const;

/**
 * Type definitions for better type safety
 */
export type ProductType = keyof typeof BRENTWOOD_HOME_CONFIG.products;
export type RVSizeType = keyof typeof BRENTWOOD_HOME_CONFIG.rvSizes;
export type BundleType = keyof typeof BRENTWOOD_HOME_CONFIG.bundles;
export type CampaignType = keyof typeof BRENTWOOD_HOME_CONFIG.campaigns;

/**
 * Helper function to get product info
 */
export function getProductInfo(productKey: ProductType) {
  return BRENTWOOD_HOME_CONFIG.products[productKey];
}

/**
 * Helper function to get RV size info
 */
export function getRVSizeInfo(sizeKey: RVSizeType) {
  return BRENTWOOD_HOME_CONFIG.rvSizes[sizeKey];
}

/**
 * Helper function to get bundle info
 */
export function getBundleInfo(bundleKey: BundleType) {
  return BRENTWOOD_HOME_CONFIG.bundles[bundleKey];
}

/**
 * Cookie duration advantage messaging
 */
export const COOKIE_ADVANTAGE_MESSAGING = {
  short: "You have 120 days to decide - bookmark this page and return when you're ready.",
  medium: "Our partnership with Brentwood Home gives you 4 full months to research and decide. Click any link now, purchase when ready, and we still earn a small commission at no cost to you.",
  long: "Take your time - you have 120 days (4 months!) to research, measure, and make your decision. This extended window means you can bookmark this page, sign up for our email tips, and come back whenever you're ready to purchase. Our affiliate partnership remains active throughout your entire consideration period.",
  emailVersion: "Reminder: You clicked through from our site, which means you have 120 days from that click to make your purchase and we'll still get credit for helping you. No rush - research thoroughly and buy when you're ready!",
} as const;

/**
 * Seasonal promotion framework
 */
export const SEASONAL_PROMOTIONS = {
  presidentsDay: {
    month: 'February',
    timing: 'Mid-February',
    typicalDiscount: '20% site-wide',
    messaging: 'Presidents Day Sale: Save 20% on all Brentwood Home mattresses',
  },
  memorialDay: {
    month: 'May',
    timing: 'Late May',
    typicalDiscount: '25% + free pillows',
    messaging: 'Memorial Day Weekend: 25% off + 2 free pillows',
  },
  laborDay: {
    month: 'September',
    timing: 'Early September',
    typicalDiscount: '20% + free sheets',
    messaging: 'Labor Day Savings: 20% off + free luxury sheets',
  },
  blackFriday: {
    month: 'November',
    timing: 'Late November',
    typicalDiscount: '30% site-wide',
    messaging: 'Black Friday Sale: Save 30% - biggest sale of the year',
  },
} as const;

/**
 * FTC-compliant affiliate disclosure
 */
export const AFFILIATE_DISCLOSURE = {
  full: "We earn a commission if you make a purchase through our links, at no additional cost to you. This helps us provide free RV mattress guides and reviews. We only recommend products we genuinely believe will improve your RV experience.",
  short: "Affiliate Disclosure: We may earn a commission from links on this page at no cost to you. This supports our free content.",
  footer: "As an affiliate partner, we earn from qualifying purchases at no cost to you.",
} as const;

// Export default config
export default BRENTWOOD_HOME_CONFIG;
