/**
 * RV Life Pro Affiliate Configuration
 *
 * Centralized configuration for RV Life Pro affiliate marketing
 * including URLs, discount codes, pricing, and tracking parameters.
 *
 * Commission: $16.25 per sale
 * Cookie Duration: 180 days
 */

export const RV_LIFE_PRO_CONFIG = {
  /**
   * Base affiliate URL - Replace PLACEHOLDER with actual affiliate ID
   */
  baseAffiliateUrl: 'https://rvlife.com/pro?ref=PLACEHOLDER',

  /**
   * Discount codes for different scenarios
   */
  discountCodes: {
    standard: 'SMARTRV20', // 20% off for regular visitors
    exit: 'SMARTRV30', // 30% off for exit intent popup
  },

  /**
   * Pricing information
   */
  pricing: {
    annual: 65, // Regular annual price
    discountedAnnual: 52, // Price with 20% discount code
    exitDiscountAnnual: 45.50, // Price with 30% exit discount
  },

  /**
   * Product features and selling points
   */
  features: {
    freeTrialDays: 7,
    moneyBackGuaranteeDays: 30,
    campgroundCount: 14000,
    placemarkLimit: 'unlimited',
    offlineAccess: true,
    liveUpdates: true,
  },

  /**
   * Affiliate commission details
   */
  commission: {
    amount: 16.25,
    currency: 'USD',
    type: 'per_sale',
  },

  /**
   * Cookie and tracking settings
   */
  tracking: {
    source: 'smart-rv-hub',
    medium: 'affiliate',
    cookieDuration: 180, // days
  },

  /**
   * Campaign-specific settings
   */
  campaigns: {
    hero: 'home-hero',
    features: 'features-section',
    comparison: 'comparison-table',
    testimonials: 'testimonials',
    footer: 'footer-cta',
    exitIntent: 'exit-intent-popup',
    sidebar: 'sidebar-widget',
  },
} as const;

/**
 * Type definitions for better type safety
 */
export type DiscountCodeType = keyof typeof RV_LIFE_PRO_CONFIG.discountCodes;
export type CampaignType = keyof typeof RV_LIFE_PRO_CONFIG.campaigns;
