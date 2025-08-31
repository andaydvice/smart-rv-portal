import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface PartnerLink {
  name: string;
  baseUrl: string;
  refCode: string;
  description: string;
  primaryBenefit: string;
  commission: string;
  cookieDuration: string;
  category: 'rental' | 'tools' | 'tech' | 'solar' | 'towing' | 'accessories' | 'services' | 'connectivity';
}

export const AFFILIATE_PARTNERS: Record<string, PartnerLink> = {
  // Existing partners (updated with commission data)
  rvshare: {
    name: "RVShare",
    baseUrl: "https://rvshare.com",
    refCode: "smartroadportal",
    description: "America's largest RV rental marketplace with thousands of RVs nationwide",
    primaryBenefit: "Try before you buy - experience different RV types without the commitment",
    commission: "4-5% + $7 per listing",
    cookieDuration: "30 days",
    category: 'rental'
  },
  outdoorsy: {
    name: "Outdoorsy",
    baseUrl: "https://outdoorsy.com",
    refCode: "smartroad",
    description: "Premium RV rentals with luxury models and professional hosts",
    primaryBenefit: "Experience luxury RV features and high-end amenities",
    commission: "$60+ per booking",
    cookieDuration: "30 days",
    category: 'rental'
  },
  rvlife: {
    name: "RV Life Pro",
    baseUrl: "https://rvlife.com",
    refCode: "smartportal",
    description: "The most comprehensive RV trip planning and GPS navigation app",
    primaryBenefit: "Plan safer, smarter routes with RV-specific navigation and data",
    commission: "25%",
    cookieDuration: "170 days",
    category: 'tools'
  },
  goodsam: {
    name: "Good Sam",
    baseUrl: "https://goodsam.com",
    refCode: "smartrv",
    description: "America's leading RV membership organization with 2M+ members",
    primaryBenefit: "Save money and get peace of mind with roadside assistance and discounts",
    commission: "Up to 15% / $5-$15 per sale",
    cookieDuration: "10 days",
    category: 'services'
  },
  rvwaterfilter: {
    name: "RV Water Filter Store",
    baseUrl: "https://rvwaterfilterstore.com",
    refCode: "smartwater",
    description: "Premium water filtration systems designed specifically for RVs",
    primaryBenefit: "Enjoy clean, safe water anywhere with NSF-certified filtration",
    commission: "10-15%",
    cookieDuration: "10 days",
    category: 'accessories'
  },

  // NEW HIGH-VALUE PROGRAMS - Phase 1 (Top Tier)
  rvtcom: {
    name: "RVT.com",
    baseUrl: "https://rvt.com",
    refCode: "smartrvdeals",
    description: "Premium RV marketplace with professional dealers and high-ticket sales",
    primaryBenefit: "Earn top commissions on luxury RV sales with professional support",
    commission: "20-30% + up to $1,000 bonus",
    cookieDuration: "45 days",
    category: 'services'
  },
  solardirect: {
    name: "Solar Direct",
    baseUrl: "https://solardirect.com",
    refCode: "smartsolar365",
    description: "Complete solar power solutions with industry-leading warranties",
    primaryBenefit: "Longest cookie duration in solar industry with reliable payouts",
    commission: "5%",
    cookieDuration: "365 days",
    category: 'solar'
  },
  a1solarstore: {
    name: "A1 SolarStore",
    baseUrl: "https://a1solarstore.com",
    refCode: "smartsolar180",
    description: "High-capacity solar systems for serious off-grid RV living",
    primaryBenefit: "Earn up to $250 per sale on premium solar equipment",
    commission: "Up to $250/sale (~6%)",
    cookieDuration: "180 days",
    category: 'solar'
  },

  // Phase 2 (High-Commission Specialists) - VERIFIED PROGRAMS
  invertersrus: {
    name: "Inverters R US",
    baseUrl: "https://invertersrus.com",
    refCode: "smartrv",
    description: "Premium power equipment retailer specializing in inverters, batteries, and solar components",
    primaryBenefit: "Verified retailer affiliate for premium power equipment and components",
    commission: "5-8%",
    cookieDuration: "30 days",
    category: 'tech'
  },
  litime: {
    name: "LiTime (Ampere Time)",
    baseUrl: "https://www.litime.com",
    refCode: "smartrv",
    description: "Premium LiFePO4 battery systems with performance bonuses for high-volume affiliates",
    primaryBenefit: "Comprehensive lithium battery lines with verified active program",
    commission: "Up to 10%",
    cookieDuration: "30 days",
    category: 'tech'
  },
  technorv: {
    name: "TechnoRV TPMS Systems",
    baseUrl: "https://technorv.com",
    refCode: "smartrv",
    description: "Professional tire pressure monitoring systems through verified Affiliatly platform",
    primaryBenefit: "Verified affiliate program for RV safety equipment",
    commission: "5-7%",
    cookieDuration: "7 days",
    category: 'accessories'
  },
  starlinkinstallers: {
    name: "Starlink Installation Techs",
    baseUrl: "https://starlink-installers.com",
    refCode: "smartrv",
    description: "Professional Starlink installation services for RVs",
    primaryBenefit: "High-value installations with professional support",
    commission: "Up to $480 per installation",
    cookieDuration: "60 days",
    category: 'connectivity'
  },
  heatso: {
    name: "Heatso",
    baseUrl: "https://heatso.com",
    refCode: "smartconversion",
    description: "Premium RV conversion products and heating solutions",
    primaryBenefit: "High-margin conversion products with excellent profit potential",
    commission: "Up to 10%",
    cookieDuration: "30 days",
    category: 'accessories'
  },
  hotshotssecret: {
    name: "Hot Shot's Secret",
    baseUrl: "https://hotshotssecret.com",
    refCode: "smartadditives",
    description: "Premium fuel and oil additives for RV engines and generators",
    primaryBenefit: "Recurring customer purchases with strong brand loyalty",
    commission: "8%",
    cookieDuration: "30 days",
    category: 'accessories'
  },
  harvesthosts: {
    name: "Harvest Hosts",
    baseUrl: "https://harvesthosts.com",
    refCode: "smartrv",
    description: "Unique overnight stays at farms, wineries, and attractions",
    primaryBenefit: "Flat-rate commission with extended cookie duration",
    commission: "$50 flat rate",
    cookieDuration: "90 days",
    category: 'services'
  },
  // Phase 3 (Strategic Partners) - NEW TIER 1 PROGRAMS
  overlandsolar: {
    name: "Overland Solar",
    baseUrl: "https://overlandsolar.com",
    refCode: "smartrv",
    description: "Complete off-grid solar solutions for adventure vehicles",
    primaryBenefit: "Premium solar systems designed for serious off-grid living",
    commission: "10-15%",
    cookieDuration: "60 days",
    category: 'solar'
  },
  cruiseamerica: {
    name: "Cruise America",
    baseUrl: "https://cruiseamerica.com",
    refCode: "smartrv",
    description: "America's largest RV rental company with nationwide locations",
    primaryBenefit: "High-value rentals with $1,250+ average order value",
    commission: "10% net",
    cookieDuration: "30 days",
    category: 'rental'
  },
  ecoflow: {
    name: "EcoFlow",
    baseUrl: "https://ecoflow.com",
    refCode: "smartrv",
    description: "Portable power stations and solar generators for RV living",
    primaryBenefit: "High-value power solutions with $1000+ average orders",
    commission: "5%",
    cookieDuration: "30 days",
    category: 'tech'
  },
  nomadinternet: {
    name: "Nomad Internet",
    baseUrl: "https://nomadinternet.com",
    refCode: "smartrv",
    description: "Unlimited 5G internet plans for full-time RV travelers",
    primaryBenefit: "Flat $50 commission per sale with reliable payouts",
    commission: "$50 per sale",
    cookieDuration: "30 days",
    category: 'connectivity'
  },
  weboost: {
    name: "WeBoost",
    baseUrl: "https://weboost.com",
    refCode: "smartrv",
    description: "Professional cellular signal boosters for RVs and vehicles",
    primaryBenefit: "Verified cellular boosting technology with proven results",
    commission: "5-10%",
    cookieDuration: "30 days",
    category: 'connectivity'
  },
  mobilehomeparts: {
    name: "Mobile Home Parts Store",
    baseUrl: "https://mobilehomepartstore.com",
    refCode: "smartparts",
    description: "RV appliances, smart lighting, and replacement parts",
    primaryBenefit: "Wide selection of RV parts with extended cookie duration",
    commission: "5%",
    cookieDuration: "60 days",
    category: 'accessories'
  },
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
    sm: 'px-3 py-2 text-sm min-h-[40px] touch-manipulation',
    md: 'px-4 py-2 min-h-[44px] sm:min-h-[48px] touch-manipulation',
    lg: 'px-6 py-3 text-lg min-h-[48px] sm:min-h-[56px] touch-manipulation'
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
        rel="nofollow sponsored noopener noreferrer"
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
  showCommissionInfo?: boolean;
}

export const AffiliatePartnerCard: React.FC<AffiliatePartnerCardProps> = ({
  partner,
  title,
  customDescription,
  features = [],
  path = '',
  buttonText,
  className = '',
  showCommissionInfo = false
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
    <div className={`bg-[#131a2a] border border-gray-600 rounded-lg p-6 pb-8 h-full flex flex-col ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-3">{displayTitle}</h3>
      <p className="text-gray-300 text-sm mb-4 flex-grow">{displayDescription}</p>
      
      {showCommissionInfo && (
        <div className="bg-green-900/20 border border-green-500/30 rounded p-3 mb-4">
          <div className="text-xs text-green-400 space-y-1">
            <div><strong>Commission:</strong> {partnerData.commission}</div>
            <div><strong>Cookie:</strong> {partnerData.cookieDuration}</div>
          </div>
        </div>
      )}
      
      {features.length > 0 && (
        <ul className="text-sm text-gray-300 space-y-1 mb-4">
          {features.map((feature, idx) => (
            <li key={idx}>• {feature}</li>
          ))}
        </ul>
      )}
      
      <div className="mt-auto pt-2">
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

// Helper function to get partners by category
export const getPartnersByCategory = (category: string) => {
  return Object.entries(AFFILIATE_PARTNERS)
    .filter(([_, partner]) => partner.category === category)
    .map(([key, _]) => key);
};

// Helper function to get top commission partners - VERIFIED ONLY
export const getTopCommissionPartners = () => {
  return ['rvlife', 'rvtcom', 'solardirect', 'a1solarstore', 'starlinkinstallers', 'overlandsolar', 'cruiseamerica', 'ecoflow', 'nomadinternet'];
};
