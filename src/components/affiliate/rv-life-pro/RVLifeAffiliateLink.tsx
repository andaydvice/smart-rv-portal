/**
 * RV Life Pro Affiliate Link Component
 *
 * A tracked affiliate link button component for RV Life Pro.
 * Automatically builds URLs with UTM parameters, tracks clicks,
 * and displays discount codes on hover.
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { buildAffiliateLink, trackAffiliateClick, getDiscountCode } from '@/utils/affiliate/rvLifeProTracking';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RVLifeAffiliateLinkProps {
  /**
   * Campaign identifier for tracking (e.g., 'home-hero', 'features-section')
   */
  campaign: string;

  /**
   * Text to display on the button
   * @default "Try RV Life Pro"
   */
  buttonText?: string;

  /**
   * Button style variant
   * @default "default"
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Label for analytics tracking
   */
  trackingLabel?: string;

  /**
   * Show discount code tooltip on hover
   * @default true
   */
  showDiscountTooltip?: boolean;

  /**
   * Button size
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';

  /**
   * Show external link icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Additional click handler
   */
  onClick?: () => void;
}

/**
 * RV Life Pro Affiliate Link Button
 *
 * @example
 * <RVLifeAffiliateLink
 *   campaign="home-hero"
 *   buttonText="Start Free Trial"
 *   variant="default"
 *   trackingLabel="Hero CTA"
 * />
 */
export const RVLifeAffiliateLink: React.FC<RVLifeAffiliateLinkProps> = ({
  campaign,
  buttonText = 'Try RV Life Pro',
  variant = 'default',
  className,
  trackingLabel,
  showDiscountTooltip = true,
  size = 'default',
  showIcon = true,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Build the affiliate URL with tracking parameters
  const affiliateUrl = buildAffiliateLink(campaign);

  // Get the discount code
  const discountCode = getDiscountCode();

  // Handle click events
  const handleClick = (e: React.MouseEvent) => {
    // Track the click
    trackAffiliateClick(
      trackingLabel || `${campaign}-link`,
      window.location.pathname
    );

    // Call additional click handler if provided
    if (onClick) {
      onClick();
    }

    // Log for debugging
    if (import.meta.env.DEV) {
      console.log('🚀 Affiliate link clicked:', {
        campaign,
        trackingLabel,
        url: affiliateUrl,
      });
    }
  };

  const buttonContent = (
    <Button
      variant={variant}
      size={size}
      className={cn('relative group', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      asChild
    >
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="flex items-center gap-2"
      >
        <span>{buttonText}</span>
        {showIcon && (
          <ExternalLink
            className={cn(
              'h-4 w-4 transition-transform',
              isHovered && 'translate-x-0.5 -translate-y-0.5'
            )}
          />
        )}
      </a>
    </Button>
  );

  // Wrap with tooltip if enabled
  if (showDiscountTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent className="bg-gray-900 text-white p-3 max-w-xs">
            <div className="space-y-1">
              <p className="font-semibold">Use code at checkout:</p>
              <p className="text-lg font-bold text-green-400">{discountCode}</p>
              <p className="text-xs text-gray-300">Save 20% on annual plan</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
};

export default RVLifeAffiliateLink;
