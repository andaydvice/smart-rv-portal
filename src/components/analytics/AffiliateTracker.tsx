import React, { useEffect } from 'react';
import { useContentAnalytics } from '@/hooks/useContentAnalytics';

interface AffiliateTrackerProps {
  contentId: string;
  affiliatePartner: string;
  children: React.ReactNode;
}

const AffiliateTracker: React.FC<AffiliateTrackerProps> = ({
  contentId,
  affiliatePartner,
  children
}) => {
  const { trackAffiliateClick } = useContentAnalytics();

  const handleClick = (e: React.MouseEvent) => {
    // Track the affiliate click
    trackAffiliateClick(contentId, affiliatePartner);
    
    // Add haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
};

export default AffiliateTracker;