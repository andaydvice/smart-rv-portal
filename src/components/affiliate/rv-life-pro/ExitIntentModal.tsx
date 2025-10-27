/**
 * Exit Intent Modal Component
 *
 * Detects when users are about to leave the page and displays
 * a compelling offer with an enhanced discount code.
 * Shows only once per session to avoid being intrusive.
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, Shield, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildAffiliateLink, trackExitIntentShown, trackAffiliateClick } from '@/utils/affiliate/rvLifeProTracking';
import { RV_LIFE_PRO_CONFIG } from '@/config/affiliate/rvLifePro';
import { DiscountCodeBox } from './DiscountCodeBox';

export interface ExitIntentModalProps {
  /**
   * Disable the exit intent detection
   * @default false
   */
  disabled?: boolean;

  /**
   * Delay before exit intent can trigger (ms)
   * @default 5000
   */
  initialDelay?: number;

  /**
   * Expiry date for the special offer (optional)
   */
  expiryDate?: Date;
}

/**
 * Exit Intent Modal with Enhanced Offer
 *
 * Detects mouse leaving viewport and shows special 30% discount
 * Only displays once per session
 *
 * @example
 * <ExitIntentModal
 *   disabled={false}
 *   initialDelay={5000}
 *   expiryDate={new Date('2024-12-31')}
 * />
 */
export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  disabled = false,
  initialDelay = 5000,
  expiryDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check session storage to see if already shown
  useEffect(() => {
    if (disabled) return;

    const shown = sessionStorage.getItem('rvLifeExitIntentShown');
    if (shown === 'true') {
      setHasShown(true);
      return;
    }

    // Wait for initial delay before activating exit intent detection
    const timer = setTimeout(() => {
      setIsReady(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [disabled, initialDelay]);

  // Exit intent detection
  useEffect(() => {
    if (!isReady || hasShown || disabled) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect if mouse is leaving from top of viewport
      if (e.clientY <= 0) {
        handleExitIntent();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReady, hasShown, disabled]);

  const handleExitIntent = () => {
    if (hasShown) return;

    // Show the modal
    setIsOpen(true);
    setHasShown(true);

    // Mark as shown in session storage
    sessionStorage.setItem('rvLifeExitIntentShown', 'true');

    // Track the exit intent event
    trackExitIntentShown('mouse-leave');

    // Log in development
    if (import.meta.env.DEV) {
      console.log('🚪 Exit intent triggered - showing enhanced offer');
    }
  };

  const handleClaim = () => {
    const affiliateUrl = buildAffiliateLink(RV_LIFE_PRO_CONFIG.campaigns.exitIntent);

    // Track the click
    trackAffiliateClick('Exit Intent CTA', 'exit-intent-modal');

    // Open the affiliate link
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');

    // Close the modal
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (disabled) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </button>

        {/* Header with dramatic styling */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-3xl md:text-4xl font-bold text-white mb-2">
              Wait! Don't Miss This
            </DialogTitle>
            <DialogDescription className="text-white/90 text-lg">
              We have an exclusive offer just for you
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Special offer badge */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-full font-bold text-lg mb-4">
              SPECIAL EXIT OFFER
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Get 30% OFF Instead of 20%!
            </h3>
            <p className="text-gray-300 text-lg">
              This exclusive discount is only available right now
            </p>
          </div>

          {/* Discount code box */}
          <DiscountCodeBox
            codeType="exit"
            expiryDate={expiryDate}
            showUrgency={true}
            location="exit-intent-modal"
            className="shadow-xl"
          />

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
              <MapPin className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-sm">
                  {RV_LIFE_PRO_CONFIG.features.campgroundCount.toLocaleString()}+ Campgrounds
                </p>
                <p className="text-gray-400 text-xs">Comprehensive database</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-sm">Live Updates</p>
                <p className="text-gray-400 text-xs">Real-time data sync</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
              <Shield className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-sm">
                  {RV_LIFE_PRO_CONFIG.features.moneyBackGuaranteeDays}-Day Guarantee
                </p>
                <p className="text-gray-400 text-xs">Risk-free trial</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
              <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-sm">Premium Features</p>
                <p className="text-gray-400 text-xs">Unlimited placemarks</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleClaim}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg py-6 shadow-xl transform transition-transform hover:scale-105"
          >
            Claim 30% Discount Now
          </Button>

          {/* Trust indicators */}
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-400">
              Join thousands of RVers who trust RV Life Pro
            </p>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-gray-300 ml-2">4.8/5 from 2,500+ reviews</span>
            </div>
          </div>

          {/* Small print */}
          <p className="text-xs text-gray-500 text-center">
            This offer expires when you leave this page. Don't miss out!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
