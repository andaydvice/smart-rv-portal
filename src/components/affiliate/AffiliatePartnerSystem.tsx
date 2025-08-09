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
  technorv: {
    name: "TechnoRV",
    baseUrl: "https://technorv.com",
    refCode: "smarttech",
    description: "Smart RV technology and monitoring systems for modern travelers",
    primaryBenefit: "Upgrade your Smart RV with professional-grade smart technology",
    commission: "5-7%",
    cookieDuration: "7 days",
    category: 'tech'
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

  // Phase 2 (High-Commission Specialists)
  dakotalithium: {
    name: "Dakota Lithium",
    baseUrl: "https://dakotalithium.com",
    refCode: "smartbattery",
    description: "Premium LiFePO4 batteries with 11-year warranty and superior performance",
    primaryBenefit: "Industry-leading battery technology with excellent commission rates",
    commission: "7%",
    cookieDuration: "30 days",
    category: 'tech'
  },
  blueox: {
    name: "Blue Ox",
    baseUrl: "https://blueox.us",
    refCode: "smarttowing",
    description: "Professional-grade towing systems and RV accessories",
    primaryBenefit: "Top-rated towing solutions with generous affiliate commissions",
    commission: "10%",
    cookieDuration: "30 days",
    category: 'towing'
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
  gutatpms: {
    name: "GUTA TPMS",
    baseUrl: "https://gutatpms.com",
    refCode: "smartmonitoring",
    description: "Affordable tire pressure monitoring systems for RV safety",
    primaryBenefit: "Budget-friendly TPMS solutions with solid commission rates",
    commission: "10%",
    cookieDuration: "30 days",
    category: 'tech'
  },

  // Phase 3 (Strategic Partners)
  renogy: {
    name: "Renogy",
    baseUrl: "https://renogy.com",
    refCode: "smartrenogy",
    description: "Leading solar panel manufacturer with complete RV solar kits",
    primaryBenefit: "Most recognized solar brand with proven conversion rates",
    commission: "6%",
    cookieDuration: "30 days",
    category: 'solar'
  },
  victron: {
    name: "Victron Energy",
    baseUrl: "https://victronenergy.com",
    refCode: "smartpower",
    description: "Professional power monitoring and inverter systems",
    primaryBenefit: "Premium power solutions trusted by professionals worldwide",
    commission: "Up to 5%",
    cookieDuration: "30 days",
    category: 'tech'
  },
  winegard: {
    name: "Winegard",
    baseUrl: "https://winegard.com",
    refCode: "smartconnect",
    description: "Internet connectivity solutions including Starlink mounts and boosters",
    primaryBenefit: "Stay connected anywhere with professional-grade internet solutions",
    commission: "4.5%",
    cookieDuration: "30 days",
    category: 'connectivity'
  },
  nomadinternet: {
    name: "Nomad Internet",
    baseUrl: "https://nomadinternet.com",
    refCode: "smartnomad",
    description: "5G hotspot plans designed specifically for RV travelers",
    primaryBenefit: "Unlimited high-speed internet for remote RV locations",
    commission: "$35 CPA",
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
  torklift: {
    name: "Torklift",
    baseUrl: "https://torklift.com",
    refCode: "smartlift",
    description: "Premium tie-downs, glow steps, and RV accessories",
    primaryBenefit: "Professional-grade RV accessories with strong brand reputation",
    commission: "8%",
    cookieDuration: "30 days",
    category: 'towing'
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
    <div className={`bg-[#131a2a] border border-gray-600 rounded-lg p-6 h-full flex flex-col ${className}`}>
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

// Helper function to get partners by category
export const getPartnersByCategory = (category: string) => {
  return Object.entries(AFFILIATE_PARTNERS)
    .filter(([_, partner]) => partner.category === category)
    .map(([key, _]) => key);
};

// Helper function to get top commission partners
export const getTopCommissionPartners = () => {
  return ['rvtcom', 'rvlife', 'solardirect', 'a1solarstore', 'blueox', 'heatso'];
};
