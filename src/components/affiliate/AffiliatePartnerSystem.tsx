import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface PartnerLink {
  name: string;
  baseUrl: string;
  refCode: string;
  description: string;
  primaryBenefit: string;
}

export const AFFILIATE_PARTNERS: Record<string, PartnerLink> = {
  rvshare: {
    name: "RVShare",
    baseUrl: "https://rvshare.com",
    refCode: "smartroadportal",
    description: "America's largest RV rental marketplace with thousands of RVs nationwide",
    primaryBenefit: "Try before you buy - experience different RV types without the commitment"
  },
  outdoorsy: {
    name: "Outdoorsy",
    baseUrl: "https://outdoorsy.com",
    refCode: "smartroad",
    description: "Premium RV rentals with luxury models and professional hosts",
    primaryBenefit: "Experience luxury RV features and high-end amenities"
  },
  rvlife: {
    name: "RV Life",
    baseUrl: "https://rvlife.com",
    refCode: "smartportal",
    description: "The most comprehensive RV trip planning and GPS navigation app",
    primaryBenefit: "Plan safer, smarter routes with RV-specific navigation and data"
  },
  goodsam: {
    name: "Good Sam",
    baseUrl: "https://goodsam.com",
    refCode: "smartrv",
    description: "America's leading RV membership organization with 2M+ members",
    primaryBenefit: "Save money and get peace of mind with roadside assistance and discounts"
  },
  technorv: {
    name: "TechnoRV",
    baseUrl: "https://technorv.com",
    refCode: "smarttech",
    description: "Smart RV technology and monitoring systems for modern travelers",
    primaryBenefit: "Upgrade your RV with professional-grade smart technology"
  },
  rvwaterfilter: {
    name: "RV Water Filter Store",
    baseUrl: "https://rvwaterfilterstore.com",
    refCode: "smartwater",
    description: "Premium water filtration systems designed specifically for RVs",
    primaryBenefit: "Enjoy clean, safe water anywhere with NSF-certified filtration"
  }
};

interface AffiliatePartnerButtonProps {
  partner: keyof typeof AFFILIATE_PARTNERS;
  path?: string;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

export const AffiliatePartnerButton: React.FC<AffiliatePartnerButtonProps> = ({
  partner,
  path = '',
  children,
  variant = 'default',
  size = 'md',
  className = '',
  showIcon = true
}) => {
  const partnerData = AFFILIATE_PARTNERS[partner];
  if (!partnerData) {
    console.warn(`Unknown affiliate partner: ${partner}`);
    return null;
  }

  const fullUrl = `${partnerData.baseUrl}${path}?ref=${partnerData.refCode}`;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <Button
      asChild
      variant={variant}
      className={`${sizeClasses[size]} ${className}`}
    >
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2"
      >
        {children}
        {showIcon && <ExternalLink className="h-4 w-4" />}
      </a>
    </Button>
  );
};

interface AffiliatePartnerCardProps {
  partner: keyof typeof AFFILIATE_PARTNERS;
  title?: string;
  customDescription?: string;
  features?: string[];
  path?: string;
  buttonText?: string;
  className?: string;
}

export const AffiliatePartnerCard: React.FC<AffiliatePartnerCardProps> = ({
  partner,
  title,
  customDescription,
  features = [],
  path = '',
  buttonText,
  className = ''
}) => {
  const partnerData = AFFILIATE_PARTNERS[partner];
  if (!partnerData) {
    console.warn(`Unknown affiliate partner: ${partner}`);
    return null;
  }

  const displayTitle = title || partnerData.name;
  const displayDescription = customDescription || partnerData.description;
  const displayButtonText = buttonText || `Visit ${partnerData.name}`;

  return (
    <div className={`bg-[#131a2a] border border-gray-600 rounded-lg p-6 h-full flex flex-col ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-3">{displayTitle}</h3>
      <p className="text-gray-300 text-sm mb-4 flex-grow">{displayDescription}</p>
      
      {features.length > 0 && (
        <ul className="text-sm text-gray-300 space-y-1 mb-4">
          {features.map((feature, idx) => (
            <li key={idx}>• {feature}</li>
          ))}
        </ul>
      )}
      
      <div className="mt-auto">
        <AffiliatePartnerButton
          partner={partner}
          path={path}
          className="w-full bg-[#60A5FA] hover:bg-[#4B8FE3] text-white"
        >
          {displayButtonText}
        </AffiliatePartnerButton>
      </div>
    </div>
  );
};