/**
 * Discount Code Display Component
 *
 * Prominent display of discount codes with copy-to-clipboard functionality,
 * visual feedback, and optional expiry countdown.
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Clock, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackDiscountCodeCopy, calculateSavings } from '@/utils/affiliate/rvLifeProTracking';
import { RV_LIFE_PRO_CONFIG } from '@/config/affiliate/rvLifePro';

export interface DiscountCodeBoxProps {
  /**
   * Type of discount code to display
   * @default "standard"
   */
  codeType?: 'standard' | 'exit';

  /**
   * Expiry date for the discount (optional)
   */
  expiryDate?: Date;

  /**
   * Show urgency messaging
   * @default true
   */
  showUrgency?: boolean;

  /**
   * Location identifier for tracking
   */
  location?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Compact mode (smaller display)
   * @default false
   */
  compact?: boolean;
}

/**
 * Discount Code Display Box with Copy Functionality
 *
 * @example
 * <DiscountCodeBox
 *   codeType="standard"
 *   expiryDate={new Date('2024-12-31')}
 *   showUrgency={true}
 *   location="sidebar"
 * />
 */
export const DiscountCodeBox: React.FC<DiscountCodeBoxProps> = ({
  codeType = 'standard',
  expiryDate,
  showUrgency = true,
  location = 'unknown',
  className,
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Get the discount code
  const discountCode = RV_LIFE_PRO_CONFIG.discountCodes[codeType];

  // Calculate savings
  const { savings, percentage, finalPrice } = calculateSavings(codeType);

  // Calculate time remaining until expiry
  useEffect(() => {
    if (!expiryDate) return;

    const updateTimeRemaining = () => {
      const now = new Date();
      const diff = expiryDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Expired');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h remaining`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m remaining`);
      } else {
        setTimeRemaining(`${minutes}m remaining`);
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [expiryDate]);

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);

      // Track the copy event
      trackDiscountCodeCopy(codeType, location);

      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);

      // Log in development
      if (import.meta.env.DEV) {
        console.log('📋 Copied discount code:', discountCode);
      }
    } catch (err) {
      console.error('Failed to copy discount code:', err);
    }
  };

  if (compact) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600',
          'px-4 py-2 rounded-lg shadow-md',
          className
        )}
      >
        <Gift className="h-4 w-4 text-white" />
        <span className="text-white font-bold text-sm">{discountCode}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="h-6 w-6 p-0 hover:bg-white/20"
        >
          {copied ? (
            <Check className="h-3 w-3 text-white" />
          ) : (
            <Copy className="h-3 w-3 text-white" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500',
        'rounded-xl p-6 shadow-lg',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Gift className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-bold text-gray-900">
          Exclusive Discount Code
        </h3>
      </div>

      {/* Discount Code */}
      <div className="bg-white border-2 border-dashed border-green-500 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 mb-1">Your Code:</p>
            <p className="text-2xl md:text-3xl font-bold text-green-600 tracking-wider font-mono">
              {discountCode}
            </p>
          </div>
          <Button
            size="lg"
            onClick={handleCopy}
            className={cn(
              'transition-all',
              copied
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-900 hover:bg-gray-800'
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Savings Information */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700">Discount:</span>
          <span className="font-bold text-green-600">{percentage}% OFF</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700">You Save:</span>
          <span className="font-bold text-green-600">${savings.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700">Final Price:</span>
          <span className="font-bold text-gray-900">
            <span className="line-through text-gray-400 mr-2">
              ${RV_LIFE_PRO_CONFIG.pricing.annual}
            </span>
            ${finalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Expiry Timer */}
      {expiryDate && timeRemaining && (
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
          <Clock className="h-4 w-4 text-orange-500" />
          <span className="font-medium">{timeRemaining}</span>
        </div>
      )}

      {/* Urgency Message */}
      {showUrgency && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-xs text-orange-800 font-medium text-center">
            {codeType === 'exit' ? (
              <>Limited time offer! This exclusive {percentage}% discount won't last long.</>
            ) : (
              <>Act now and save {percentage}% on your RV Life Pro subscription!</>
            )}
          </p>
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          Valid for annual subscriptions only • {RV_LIFE_PRO_CONFIG.features.freeTrialDays}-day free trial •{' '}
          {RV_LIFE_PRO_CONFIG.features.moneyBackGuaranteeDays}-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default DiscountCodeBox;
