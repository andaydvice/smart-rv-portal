
import React from 'react';
import { OptimizedAffiliateGrid } from './OptimizedAffiliateGrid';

interface HighValueAffiliateRecommendationsProps {
  title?: string;
  subtitle?: string;
  focusCategory?: 'solar' | 'tech' | 'towing' | 'connectivity' | 'all';
}

const HighValueAffiliateRecommendations: React.FC<HighValueAffiliateRecommendationsProps> = ({
  title = "💡 Maximum Value Smart RV Solutions",
  subtitle = "Top-rated brands and solutions known for reliability, support, and real-world performance:",
  focusCategory = 'all'
}) => {
  const getHighValuePartners = () => {
    const solarPartners = [
      { partner: 'solardirect' as const, title: 'Solar Direct', description: 'Complete RV solar systems with industry-leading warranties and expert support' },
      { partner: 'overlandsolar' as const, title: 'Overland Solar', description: 'Complete off-grid solar solutions for adventure vehicles and serious off-grid living' },
      { partner: 'a1solarstore' as const, title: 'A1 Solar', description: 'Premium solar equipment and guidance to build efficient RV solar setups' }
    ];

    const techPartners = [
      { partner: 'rvlife' as const, title: 'RV Life Pro', description: 'RV-safe GPS, trip planning, and campground data trusted by full-time travelers' },
      { partner: 'ecoflow' as const, title: 'EcoFlow Power', description: 'High-value portable power stations and solar generators for RV living' },
      { partner: 'invertersrus' as const, title: 'Inverters R US', description: 'Premium power equipment retailer with Battle Born, Victron, and top brands' }
    ];

    const towingPartners = [
      { partner: 'starlinkinstallers' as const, title: 'Starlink Installation Techs', description: 'Professional Starlink installation services for reliable RV internet anywhere' },
      { partner: 'goodsam' as const, title: 'Good Sam Towing', description: 'Professional roadside assistance and towing services for RV travelers' }
    ];

    const connectivityPartners = [
      { partner: 'nomadinternet' as const, title: 'Nomad Internet', description: 'Unlimited 5G internet plans for full-time RV travelers and remote workers' },
      { partner: 'weboost' as const, title: 'WeBoost Signal Boosters', description: 'Professional cellular signal boosters for reliable connectivity anywhere' }
    ];

    const premiumPartners = [
      { partner: 'rvtcom' as const, title: 'RVT.com Marketplace', description: 'Premium RV marketplace connecting buyers with verified dealers' },
      { partner: 'heatso' as const, title: 'Heatso Conversions', description: 'High-quality conversion components and heating systems' },
      { partner: 'hotshotssecret' as const, title: 'Hot Shots Secret', description: 'Proven fuel additives with strong customer reviews' }
    ];

    switch (focusCategory) {
      case 'solar': return solarPartners;
      case 'tech': return techPartners;
      case 'towing': return towingPartners;
      case 'connectivity': return connectivityPartners;
      default: return [
        ...solarPartners.slice(0, 2),
        ...techPartners.slice(0, 2),
        ...premiumPartners.slice(0, 2)
      ];
    }
  };

  return (
    <div className="space-y-8 mt-8">
      <OptimizedAffiliateGrid
        title={title}
        subtitle={subtitle}
        partners={getHighValuePartners()}
        gridCols="3"
      />
      
      {focusCategory === 'all' && (
        <OptimizedAffiliateGrid
          title="🚀 Strategic Premium Solutions"
          subtitle="High-performance and specialty products chosen for quality, support, and user satisfaction:"
          partners={[
            { partner: 'rvtcom' as const, title: 'RVT Premium Marketplace', description: 'Marketplace with verified dealers and high customer satisfaction' },
            { partner: 'mobilehomeparts' as const, title: 'RV Parts & Accessories', description: 'Wide range of RV parts and accessories from trusted brands' },
            { partner: 'cruiseamerica' as const, title: 'Cruise America Rentals', description: 'America\'s largest RV rental company with professional maintenance' }
          ]}
          gridCols="3"
        />
      )}
    </div>
  );
};

export default HighValueAffiliateRecommendations;
