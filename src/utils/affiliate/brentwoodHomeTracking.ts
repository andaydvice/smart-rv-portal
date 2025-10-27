/**
 * Brentwood Home Affiliate Link Tracking Utilities
 *
 * Comprehensive tracking for Brentwood Home RV mattress affiliate program.
 * Optimized for 120-day cookie duration and high-ticket conversions.
 *
 * Commission: $75-299 per sale (15%)
 * Cookie Duration: 120 days (4 months)
 */

import { BRENTWOOD_HOME_CONFIG, type CampaignType, type ProductType } from '@/config/affiliate/brentwoodHome';
import { analytics } from '@/utils/analytics';

/**
 * Build a fully tracked affiliate link with UTM parameters
 *
 * @param campaignName - The campaign identifier from BRENTWOOD_HOME_CONFIG.campaigns
 * @param productKey - Optional specific product (e.g., 'cypress', 'oceano')
 * @param utmContent - Optional UTM content for additional context
 * @returns Complete affiliate URL with tracking parameters
 *
 * @example
 * buildAffiliateLink('hero-cta', 'cypress', 'short-queen-guide')
 * // Returns: "https://www.brentwoodhome.com/products/cypress-mattress?affid=PLACEHOLDER&utm_source=smart-rv-portal&utm_medium=affiliate&utm_campaign=hero-cta&utm_content=short-queen-guide"
 */
export function buildAffiliateLink(
  campaignName: string,
  productKey?: ProductType,
  utmContent?: string
): string {
  const { tracking } = BRENTWOOD_HOME_CONFIG;

  // Get base URL (product-specific or general)
  let baseUrl: string;
  if (productKey && BRENTWOOD_HOME_CONFIG.products[productKey]) {
    baseUrl = BRENTWOOD_HOME_CONFIG.products[productKey].url;
  } else {
    baseUrl = BRENTWOOD_HOME_CONFIG.baseAffiliateUrl;
  }

  // Parse the base URL to append parameters
  const url = new URL(baseUrl);

  // Add UTM parameters for tracking
  url.searchParams.set('utm_source', tracking.source);
  url.searchParams.set('utm_medium', tracking.medium);
  url.searchParams.set('utm_campaign', campaignName);

  // Add optional content parameter
  if (utmContent) {
    url.searchParams.set('utm_content', utmContent);
  }

  // Add timestamp for cache busting and visit tracking
  url.searchParams.set('visit_time', Date.now().toString());

  const finalUrl = url.toString();

  // Log in development mode
  if (import.meta.env.DEV) {
    console.log('🔗 Built Brentwood Home affiliate link:', {
      campaign: campaignName,
      product: productKey || 'general',
      content: utmContent,
      url: finalUrl,
    });
  }

  return finalUrl;
}

/**
 * Track affiliate link clicks with detailed analytics
 *
 * @param linkPlacement - Where the link was clicked (hero_cta, product_card, etc.)
 * @param pageContext - Current page context (short_queen_guide, comparison, etc.)
 * @param productClicked - Optional product that was clicked
 * @param timeOnPageBeforeClick - Optional time user spent on page before clicking
 *
 * @example
 * trackAffiliateClick('hero-cta', 'short-queen-guide', 'cypress', 45)
 */
export function trackAffiliateClick(
  linkPlacement: string,
  pageContext: string,
  productClicked?: string,
  timeOnPageBeforeClick?: number
): void {
  // Estimate commission based on product or use average
  let estimatedCommission = BRENTWOOD_HOME_CONFIG.commission.avgCommission;

  if (productClicked && BRENTWOOD_HOME_CONFIG.products[productClicked as ProductType]) {
    const product = BRENTWOOD_HOME_CONFIG.products[productClicked as ProductType];
    // Extract mid-range commission estimate
    estimatedCommission = BRENTWOOD_HOME_CONFIG.commission.avgCommission;
  }

  // Send to analytics system
  // Note: trackAffiliateClick expects (productName, productId, category, position)
  // Commission is tracked separately in trackUserEngagement below
  analytics.trackAffiliateClick(
    'Brentwood Home',
    productClicked || 'general-mattress',
    'rv-mattresses',
    0 // position - can be enhanced to track actual link position on page
  );

  // Also track as detailed user engagement
  analytics.trackUserEngagement('affiliate_link_click', undefined, {
    brand: 'Brentwood Home',
    linkPlacement,
    pageContext,
    productClicked: productClicked || 'general',
    timeOnPageBeforeClick: timeOnPageBeforeClick || 0,
    estimatedCommission,
    cookieDuration: BRENTWOOD_HOME_CONFIG.tracking.cookieDuration,
    timestamp: new Date().toISOString(),
  });

  // Console log in development
  if (import.meta.env.DEV) {
    console.log('🎯 Brentwood Home affiliate click tracked:', {
      placement: linkPlacement,
      context: pageContext,
      product: productClicked || 'general',
      estimatedCommission: `$${estimatedCommission}`,
      cookieDuration: '120 days',
    });
  }
}

/**
 * Track when user scrolls to specific depth
 * Important for understanding engagement before affiliate clicks
 *
 * @param scrollPercentage - How far user scrolled (25, 50, 75, 100)
 * @param pageType - Type of page (product_guide, comparison, review, etc.)
 * @param timeOnPage - Seconds on page when scroll depth reached
 */
export function trackScrollDepth(
  scrollPercentage: number,
  pageType: string,
  timeOnPage: number
): void {
  analytics.trackUserEngagement('scroll_depth', scrollPercentage, {
    pageType,
    timeOnPage,
    brand: 'Brentwood Home',
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log(`📜 Scroll depth: ${scrollPercentage}% on ${pageType} after ${timeOnPage}s`);
  }
}

/**
 * Track email capture events
 * Critical for 120-day cookie optimization strategy
 *
 * @param leadMagnet - What lead magnet was used (size_guide, checklist, etc.)
 * @param captureLocation - Where capture occurred (exit_intent, sidebar, inline, etc.)
 * @param pageType - Type of page where capture occurred
 */
export function trackEmailCapture(
  leadMagnet: string,
  captureLocation: string,
  pageType: string
): void {
  analytics.trackUserEngagement('email_captured', undefined, {
    brand: 'Brentwood Home',
    leadMagnet,
    captureLocation,
    pageType,
    cookieStrategyEnabled: true,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('📧 Email captured:', {
      leadMagnet,
      location: captureLocation,
      page: pageType,
    });
  }
}

/**
 * Track exit intent modal display and interactions
 *
 * @param action - What happened (displayed, dismissed, cta_clicked, email_captured, bookmarked)
 * @param ctaClicked - If CTA was clicked, which one (primary, secondary, tertiary)
 * @param timeOnPageBeforeTrigger - Seconds on page before exit intent triggered
 */
export function trackExitIntent(
  action: 'displayed' | 'dismissed' | 'cta_clicked' | 'email_captured' | 'bookmarked',
  ctaClicked?: string,
  timeOnPageBeforeTrigger?: number
): void {
  analytics.trackUserEngagement('exit_intent', undefined, {
    brand: 'Brentwood Home',
    action,
    ctaClicked,
    timeOnPageBeforeTrigger,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('🚪 Exit intent:', {
      action,
      cta: ctaClicked || 'none',
      time: timeOnPageBeforeTrigger || 0,
    });
  }
}

/**
 * Track comparison table engagement
 * High-intent users - critical conversion point
 *
 * @param productsCompared - Array of product keys being compared
 * @param timeOnComparison - Seconds spent viewing comparison
 * @param filtersUsed - Array of filters applied (price, type, size, etc.)
 */
export function trackComparisonEngagement(
  productsCompared: string[],
  timeOnComparison: number,
  filtersUsed?: string[]
): void {
  analytics.trackUserEngagement('comparison_engagement', timeOnComparison, {
    brand: 'Brentwood Home',
    productsCompared: productsCompared.join(','),
    filterCount: filtersUsed ? filtersUsed.length : 0,
    filters: filtersUsed ? filtersUsed.join(',') : 'none',
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('📊 Comparison engagement:', {
      products: productsCompared,
      duration: `${timeOnComparison}s`,
      filters: filtersUsed || [],
    });
  }
}

/**
 * Track lead magnet downloads
 *
 * @param assetName - Name of downloaded asset (size_guide, checklist, etc.)
 * @param downloadLocation - Where download was triggered
 */
export function trackLeadMagnetDownload(
  assetName: string,
  downloadLocation: string
): void {
  analytics.trackUserEngagement('lead_magnet_download', undefined, {
    brand: 'Brentwood Home',
    assetName,
    downloadLocation,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('📥 Lead magnet downloaded:', {
      asset: assetName,
      location: downloadLocation,
    });
  }
}

/**
 * Track return visitors (critical for 120-day cookie strategy)
 *
 * @param daysSinceLastVisit - Days since user's last visit
 * @param totalVisits - Total number of visits
 * @param affiliateLinkClickedBefore - Whether user clicked affiliate link on previous visit
 */
export function trackReturnVisitor(
  daysSinceLastVisit: number,
  totalVisits: number,
  affiliateLinkClickedBefore: boolean
): void {
  const withinCookieWindow = daysSinceLastVisit <= BRENTWOOD_HOME_CONFIG.tracking.cookieDuration;

  analytics.trackUserEngagement('return_visitor', totalVisits, {
    brand: 'Brentwood Home',
    daysSinceLastVisit,
    totalVisits,
    affiliateLinkClickedBefore,
    withinCookieWindow,
    cookieDaysRemaining: affiliateLinkClickedBefore
      ? Math.max(0, BRENTWOOD_HOME_CONFIG.tracking.cookieDuration - daysSinceLastVisit)
      : null,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('🔁 Return visitor:', {
      lastVisit: `${daysSinceLastVisit} days ago`,
      visits: totalVisits,
      hasClickedBefore: affiliateLinkClickedBefore,
      withinCookie: withinCookieWindow,
    });
  }
}

/**
 * Track CTA button interactions (hover, click)
 *
 * @param ctaText - Text content of the CTA
 * @param ctaPlacement - Where CTA is located
 * @param ctaType - primary, secondary, or tertiary
 * @param interaction - Type of interaction (hover, click)
 */
export function trackCTAInteraction(
  ctaText: string,
  ctaPlacement: string,
  ctaType: 'primary' | 'secondary' | 'tertiary',
  interaction: 'hover' | 'click'
): void {
  // Only track hovers in development (too many events otherwise)
  if (interaction === 'hover' && !import.meta.env.DEV) {
    return;
  }

  analytics.trackUserEngagement('cta_interaction', undefined, {
    brand: 'Brentwood Home',
    ctaText,
    ctaPlacement,
    ctaType,
    interaction,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV && interaction === 'click') {
    console.log('👆 CTA clicked:', {
      text: ctaText,
      placement: ctaPlacement,
      type: ctaType,
    });
  }
}

/**
 * Track actual conversions (when available from Brentwood Home reporting)
 *
 * @param orderId - Brentwood Home order ID
 * @param orderValue - Total order value
 * @param productsPurchased - Array of products in order
 * @param commission - Actual commission earned
 */
export function trackConversion(
  orderId: string,
  orderValue: number,
  productsPurchased: string[],
  commission: number
): void {
  analytics.trackConversion('brentwood_home_affiliate', orderValue, 'USD');

  // Also track as detailed affiliate conversion event
  analytics.trackUserEngagement('affiliate_conversion', commission, {
    brand: 'Brentwood Home',
    orderId,
    orderValue,
    productsPurchased: productsPurchased.join(','),
    commission,
    commissionPercentage: BRENTWOOD_HOME_CONFIG.commission.percentage,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('💰 CONVERSION TRACKED:', {
      order: orderId,
      value: `$${orderValue}`,
      products: productsPurchased,
      commission: `$${commission}`,
    });
  }
}

/**
 * Track product card interactions
 *
 * @param productKey - Which product card was interacted with
 * @param interaction - Type of interaction (view, hover, click_image, click_cta, click_title)
 */
export function trackProductCardInteraction(
  productKey: ProductType,
  interaction: 'view' | 'hover' | 'click_image' | 'click_cta' | 'click_title'
): void {
  const product = BRENTWOOD_HOME_CONFIG.products[productKey];

  analytics.trackUserEngagement('product_card_interaction', undefined, {
    brand: 'Brentwood Home',
    productKey,
    productName: product.name,
    interaction,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV && interaction !== 'view' && interaction !== 'hover') {
    console.log('🃏 Product card interaction:', {
      product: product.name,
      action: interaction,
    });
  }
}

/**
 * Track sticky header CTA visibility and clicks
 *
 * @param action - appeared, disappeared, clicked
 * @param scrollPosition - Scroll position when action occurred
 */
export function trackStickyHeaderCTA(
  action: 'appeared' | 'disappeared' | 'clicked',
  scrollPosition: number
): void {
  analytics.trackUserEngagement('sticky_header_cta', scrollPosition, {
    brand: 'Brentwood Home',
    action,
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('📌 Sticky header:', {
      action,
      scrollPos: `${scrollPosition}px`,
    });
  }
}

/**
 * Track floating action button (mobile) interactions
 *
 * @param action - appeared, clicked, dismissed
 * @param timeBeforeAction - Seconds on page before action
 */
export function trackFloatingActionButton(
  action: 'appeared' | 'clicked' | 'dismissed',
  timeBeforeAction: number
): void {
  analytics.trackUserEngagement('floating_action_button', timeBeforeAction, {
    brand: 'Brentwood Home',
    action,
    device: 'mobile',
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('🎯 Floating action button:', {
      action,
      time: `${timeBeforeAction}s`,
    });
  }
}

/**
 * Track bundle interest and interactions
 *
 * @param bundleKey - Which bundle was viewed/clicked
 * @param action - viewed, expanded, cta_clicked
 */
export function trackBundleInteraction(
  bundleKey: string,
  action: 'viewed' | 'expanded' | 'cta_clicked'
): void {
  const bundle = BRENTWOOD_HOME_CONFIG.bundles[bundleKey as keyof typeof BRENTWOOD_HOME_CONFIG.bundles];

  analytics.trackUserEngagement('bundle_interaction', undefined, {
    brand: 'Brentwood Home',
    bundleKey,
    bundleName: bundle ? bundle.name : bundleKey,
    action,
    savings: bundle ? bundle.savings : 'unknown',
    timestamp: new Date().toISOString(),
  });

  if (import.meta.env.DEV) {
    console.log('📦 Bundle interaction:', {
      bundle: bundle ? bundle.name : bundleKey,
      action,
    });
  }
}

/**
 * Calculate estimated commission based on product
 *
 * @param productKey - Product key or 'general' for average
 * @returns Estimated commission amount
 */
export function getEstimatedCommission(productKey?: ProductType): number {
  if (!productKey) {
    return BRENTWOOD_HOME_CONFIG.commission.avgCommission;
  }

  const product = BRENTWOOD_HOME_CONFIG.products[productKey];
  if (!product) {
    return BRENTWOOD_HOME_CONFIG.commission.avgCommission;
  }

  // Extract mid-range price and calculate 15% commission
  // This is an estimate - actual commission depends on final purchase
  return BRENTWOOD_HOME_CONFIG.commission.avgCommission;
}

/**
 * Helper to check if user is within cookie window
 *
 * @param clickTimestamp - When user first clicked affiliate link
 * @returns Whether user is still within 120-day cookie window
 */
export function isWithinCookieWindow(clickTimestamp: number): boolean {
  const daysSinceClick = (Date.now() - clickTimestamp) / (1000 * 60 * 60 * 24);
  return daysSinceClick <= BRENTWOOD_HOME_CONFIG.tracking.cookieDuration;
}

/**
 * Calculate remaining cookie days
 *
 * @param clickTimestamp - When user first clicked affiliate link
 * @returns Days remaining in cookie window (0 if expired)
 */
export function getRemainingCookieDays(clickTimestamp: number): number {
  const daysSinceClick = (Date.now() - clickTimestamp) / (1000 * 60 * 60 * 24);
  const remaining = BRENTWOOD_HOME_CONFIG.tracking.cookieDuration - daysSinceClick;
  return Math.max(0, Math.floor(remaining));
}

/**
 * Format cookie advantage messaging for display
 *
 * @param clickTimestamp - Optional timestamp if user already clicked
 * @returns Formatted message about cookie duration
 */
export function getCookieAdvantageMessage(clickTimestamp?: number): string {
  if (!clickTimestamp) {
    return "You have 120 days (4 months) to decide. Click now, purchase when you're ready.";
  }

  const remaining = getRemainingCookieDays(clickTimestamp);

  if (remaining <= 0) {
    return "Your cookie window has expired. Click again to restart your 120-day decision period.";
  }

  if (remaining <= 7) {
    return `Reminder: You have ${remaining} days left in your decision window. Purchase soon to ensure we get credit for helping you!`;
  }

  if (remaining <= 30) {
    return `You have ${remaining} days remaining to make your purchase. Take your time - no rush!`;
  }

  return `You have ${remaining} days (${Math.floor(remaining / 30)} months) remaining. Plenty of time to research and decide!`;
}

/**
 * Store affiliate click timestamp in localStorage
 * Allows tracking return visitors within cookie window
 */
export function storeAffiliateClickTimestamp(): void {
  const timestamp = Date.now();
  try {
    localStorage.setItem('brentwood_home_affiliate_click', timestamp.toString());
    if (import.meta.env.DEV) {
      console.log('💾 Stored affiliate click timestamp:', new Date(timestamp));
    }
  } catch (e) {
    console.error('Failed to store affiliate click timestamp:', e);
  }
}

/**
 * Retrieve affiliate click timestamp from localStorage
 */
export function getAffiliateClickTimestamp(): number | null {
  try {
    const stored = localStorage.getItem('brentwood_home_affiliate_click');
    return stored ? parseInt(stored, 10) : null;
  } catch (e) {
    console.error('Failed to retrieve affiliate click timestamp:', e);
    return null;
  }
}

/**
 * Check if user has clicked affiliate link before
 */
export function hasClickedAffiliateLinkBefore(): boolean {
  const timestamp = getAffiliateClickTimestamp();
  return timestamp !== null && isWithinCookieWindow(timestamp);
}
