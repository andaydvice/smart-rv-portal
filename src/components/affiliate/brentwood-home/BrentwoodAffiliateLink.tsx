/**
 * Brentwood Home Affiliate Link Component
 *
 * A tracked affiliate link component for Brentwood Home mattress products.
 * Automatically builds URLs with tracking parameters and handles click tracking.
 */

import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BrentwoodButton, BrentwoodButtonProps } from './BrentwoodButton';

export interface BrentwoodAffiliateLinkProps {
  /**
   * Campaign identifier for tracking (e.g., 'home-hero', 'product-card')
   */
  campaign: string;

  /**
   * Product identifier (e.g., 'cypress', 'oceano', 'crystal-cove')
   */
  product?: string;

  /**
   * Text to display on the button
   * @default "Shop Brentwood Home"
   */
  buttonText?: string;

  /**
   * Button style variant
   * @default "primary"
   */
  variant?: BrentwoodButtonProps['variant'];

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Label for analytics tracking
   */
  trackingLabel?: string;

  /**
   * Button size
   * @default "medium"
   */
  size?: BrentwoodButtonProps['size'];

  /**
   * Show external link icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Additional click handler
   */
  onClick?: () => void;
}

// Base affiliate URL - Replace with your actual affiliate link
const BRENTWOOD_BASE_URL = 'https://brentwoodhome.com';

// Build tracking URL with UTM parameters
const buildAffiliateLink = (campaign: string, product?: string): string => {
  const baseUrl = product ? `${BRENTWOOD_BASE_URL}/products/${product}` : BRENTWOOD_BASE_URL;

  const params = new URLSearchParams({
    utm_source: 'smart-rv-portal',
    utm_medium: 'affiliate',
    utm_campaign: campaign,
    ref: 'smartrv', // Affiliate reference code
  });

  return `${baseUrl}?${params.toString()}`;
};

// Track affiliate click
const trackAffiliateClick = (label: string, pathname: string) => {
  // GA4 tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'affiliate_click', {
      event_category: 'Affiliate',
      event_label: label,
      affiliate_partner: 'brentwood-home',
      page_path: pathname,
    });
  }

  // Console log for development
  if (import.meta.env.DEV) {
    console.log('🛏️ Brentwood Home affiliate link clicked:', {
      label,
      pathname,
    });
  }
};

/**
 * Brentwood Home Affiliate Link Component
 *
 * @example
 * <BrentwoodAffiliateLink
 *   campaign="home-hero"
 *   product="cypress"
 *   buttonText="Shop Cypress Mattress"
 *   variant="luxury"
 *   trackingLabel="Hero CTA"
 * />
 */
export const BrentwoodAffiliateLink: React.FC<BrentwoodAffiliateLinkProps> = ({
  campaign,
  product,
  buttonText = 'Shop Brentwood Home',
  variant = 'primary',
  className,
  trackingLabel,
  size = 'medium',
  showIcon = true,
  fullWidth = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Build the affiliate URL with tracking parameters
  const affiliateUrl = buildAffiliateLink(campaign, product);

  // Handle click events
  const handleClick = () => {
    // Track the click
    trackAffiliateClick(
      trackingLabel || `${campaign}${product ? `-${product}` : ''}-link`,
      window.location.pathname
    );

    // Call additional click handler if provided
    if (onClick) {
      onClick();
    }

    // Log for debugging
    if (import.meta.env.DEV) {
      console.log('🛏️ Brentwood Home affiliate link clicked:', {
        campaign,
        product,
        trackingLabel,
        url: affiliateUrl,
      });
    }
  };

  return (
    <BrentwoodButton
      variant={variant}
      size={size}
      href={affiliateUrl}
      className={cn('relative group', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      fullWidth={fullWidth}
      icon={
        showIcon ? (
          <ExternalLink
            className={cn(
              'h-4 w-4 transition-transform',
              isHovered && 'translate-x-0.5 -translate-y-0.5'
            )}
          />
        ) : undefined
      }
      iconPosition="right"
    >
      {buttonText}
    </BrentwoodButton>
  );
};

/**
 * Simple text link variant
 */
export const BrentwoodAffiliateTextLink: React.FC<
  Omit<BrentwoodAffiliateLinkProps, 'variant'>
> = (props) => <BrentwoodAffiliateLink variant="tertiary" {...props} />;

export default BrentwoodAffiliateLink;
