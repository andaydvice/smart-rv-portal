import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface AffiliateCTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  affiliateLink: string;
  backgroundColor?: string;
  className?: string;
}

const AffiliateCTABanner = ({
  title,
  description,
  buttonText,
  affiliateLink,
  backgroundColor = "bg-gradient-to-r from-[#5B9BD5] to-[#4B8FE3]",
  className = ""
}: AffiliateCTABannerProps) => {
  return (
    <div className={`${backgroundColor} rounded-lg p-6 text-white ${className}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/90 text-sm md:text-base">{description}</p>
        </div>
        
        <Button 
          asChild
          size="lg"
          className="bg-white hover:bg-gray-100 text-[#5B9BD5] font-semibold px-6 py-3 rounded-lg transition-colors min-h-[44px] touch-manipulation shrink-0"
        >
          <a 
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
      
      <div className="flex items-center gap-1 mt-3 text-xs text-white/70">
        <ExternalLink className="h-3 w-3" />
        <span>Affiliate link - supports our content at no cost to you</span>
      </div>
    </div>
  );
};

export default AffiliateCTABanner;