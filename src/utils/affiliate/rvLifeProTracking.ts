/**
 * RV Life Pro Affiliate Link Tracking Utilities
 *
 * Helper functions for building tracked affiliate links, logging clicks,
 * and managing discount codes for the RV Life Pro affiliate program.
 */

import { RV_LIFE_PRO_CONFIG } from '@/config/affiliate/rvLifePro';
import { analytics } from '@/utils/analytics';

/**
 * Build a fully tracked affiliate link with UTM parameters
 *
 * @param campaignName - The campaign identifier (e.g., 'home-hero', 'features-section')
 * @param source - Optional source override (defaults to config)
 * @returns Complete affiliate URL with tracking parameters
 *
 * @example
 * buildAffiliateLink('home-hero')
 * // Returns: "https://rvlife.com/pro?ref=PLACEHOLDER&utm_source=smart-rv-hub&utm_medium=affiliate&utm_campaign=home-hero"
 */
export function buildAffiliateLink(
  campaignName: string,
  source?: string
): string {
  const { baseAffiliateUrl, tracking } = RV_LIFE_PRO_CONFIG;

  // Parse the base URL to append parameters
  const url = new URL(baseAffiliateUrl);

  // Add UTM parameters for tracking
  url.searchParams.set('utm_source', source || tracking.source);
  url.searchParams.set('utm_medium', tracking.medium);
  url.searchParams.set('utm_campaign', campaignName);

  // Add timestamp for cache busting and analytics
  url.searchParams.set('utm_content', Date.now().toString());

  const finalUrl = url.toString();

  // Log in development mode
  if (import.meta.env.DEV) {
    console.log('🔗 Built affiliate link:', {
      campaign: campaignName,
      url: finalUrl,
    });
  }

  return finalUrl;
}

/**
 * Track affiliate link clicks with analytics
 *
 * @param linkName - Descriptive name for the link (e.g., 'Primary CTA Button')
 * @param pageLocation - Current page location (e.g., 'homepage', 'features-page')
 *
 * @example
 * trackAffiliateClick('Primary CTA', 'homepage')
 */
export function trackAffiliateClick(
  linkName: string,
  pageLocation: string
): void {
  // Send to analytics system
  analytics.trackAffiliateClick(
    'RV Life Pro',
    'rv-life-pro-subscription',
    'rv-tools',
    0
  );

  // Also track as user engagement
  analytics.trackUserEngagement('affiliate_click', undefined, {
    linkName,
    pageLocation,
    product: 'RV Life Pro',
    timestamp: new Date().toISOString(),
  });

  // Console log in development
  if (import.meta.env.DEV) {
    console.log('🎯 Affiliate click tracked:', {
      linkName,
      pageLocation,
      product: 'RV Life Pro',
      commission: RV_LIFE_PRO_CONFIG.commission.amount,
    });
  }
}

/**
 * Get the current discount code (standard 20% off)
 *
 * @returns The discount code string
 *
 * @example
 * const code = getDiscountCode();
 * // Returns: "SMARTRV20"
 */
export function getDiscountCode(): string {
  return RV_LIFE_PRO_CONFIG.discountCodes.standard;
}

/**
 * Get the exit intent discount code (30% off)
 *
 * @returns The exit discount code string
 *
 * @example
 * const code = getExitDiscountCode();
 * // Returns: "SMARTRV30"
 */
export function getExitDiscountCode(): string {
  return RV_LIFE_PRO_CONFIG.discountCodes.exit;
}

/**
 * Track affiliate conversion (for thank you/confirmation pages)
 *
 * @param orderId - Optional order ID for tracking
 * @param value - Optional order value (defaults to commission amount)
 *
 * @example
 * trackConversion('ORD-12345', 65)
 */
export function trackConversion(orderId?: string, value?: number): void {
  const conversionValue = value || RV_LIFE_PRO_CONFIG.commission.amount;

  analytics.trackConversion('rv_life_pro_affiliate', conversionValue, 'USD');

  // Also track as a separate event for affiliate reporting
  analytics.trackUserEngagement('affiliate_conversion', conversionValue, {
    product: 'RV Life Pro',
    orderId,
    commission: RV_LIFE_PRO_CONFIG.commission.amount,
    timestamp: new Date().toISOString(),
  });

  // Console log in development
  if (import.meta.env.DEV) {
    console.log('💰 Affiliate conversion tracked:', {
      orderId,
      value: conversionValue,
      commission: RV_LIFE_PRO_CONFIG.commission.amount,
    });
  }
}

/**
 * Track when exit intent popup is displayed
 *
 * @param triggeredBy - What triggered the exit intent (e.g., 'mouse-leave', 'scroll-intent')
 */
export function trackExitIntentShown(triggeredBy: string): void {
  analytics.trackUserEngagement('exit_intent_shown', undefined, {
    product: 'RV Life Pro',
    triggeredBy,
    discountCode: RV_LIFE_PRO_CONFIG.discountCodes.exit,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('🚪 Exit intent shown:', {
      triggeredBy,
      discountCode: RV_LIFE_PRO_CONFIG.discountCodes.exit,
    });
  }
}

/**
 * Track when discount code is copied to clipboard
 *
 * @param codeType - Type of code copied ('standard' or 'exit')
 * @param location - Where the copy action occurred
 */
export function trackDiscountCodeCopy(
  codeType: 'standard' | 'exit',
  location: string
): void {
  const code = RV_LIFE_PRO_CONFIG.discountCodes[codeType];

  analytics.trackUserEngagement('discount_code_copied', undefined, {
    product: 'RV Life Pro',
    discountCode: code,
    codeType,
    location,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('📋 Discount code copied:', {
      code,
      type: codeType,
      location,
    });
  }
}

/**
 * Calculate savings based on discount code
 *
 * @param codeType - Type of discount code
 * @returns Object with savings amount and percentage
 */
export function calculateSavings(codeType: 'standard' | 'exit'): {
  savings: number;
  percentage: number;
  finalPrice: number;
} {
  const { pricing } = RV_LIFE_PRO_CONFIG;
  const percentage = codeType === 'exit' ? 30 : 20;
  const savings = pricing.annual * (percentage / 100);
  const finalPrice = pricing.annual - savings;

  return {
    savings: parseFloat(savings.toFixed(2)),
    percentage,
    finalPrice: parseFloat(finalPrice.toFixed(2)),
  };
}
