
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
      { partner: 'a1solarstore' as const, title: 'A1 Solar', description: 'Premium solar equipment and guidance to build efficient RV solar setups' },
      { partner: 'renogy' as const, title: 'Renogy Solar Kits', description: 'Trusted solar brand with complete RV kits and reliable performance' }
    ];

    const techPartners = [
      { partner: 'rvlife' as const, title: 'RV Life Pro', description: 'RV-safe GPS, trip planning, and campground data trusted by full-time travelers' },
      { partner: 'dakotalithium' as const, title: 'Dakota Lithium Batteries', description: 'Premium LiFePO4 batteries with long warranties and cold-weather performance' },
      { partner: 'guta' as const, title: 'GUTA TPMS Systems', description: 'Reliable tire monitoring systems for safer travel' }
    ];

    const towingPartners = [
      { partner: 'blueox' as const, title: 'Blue Ox Towing', description: 'Professional towing systems and accessories trusted by experts' },
      { partner: 'torklift' as const, title: 'Torklift Accessories', description: 'Premium RV accessories with strong reputation and support' }
    ];

    const connectivityPartners = [
      { partner: 'nomadinternet' as const, title: 'Nomad Internet', description: 'Reliable 5G internet plans and hardware for RVers' },
      { partner: 'winegard' as const, title: 'Winegard Connectivity', description: 'Starlink mounts and boosters for dependable internet' }
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
            { partner: 'victron' as const, title: 'Victron Power Systems', description: 'Professional-grade power monitoring and inverter systems' }
          ]}
          gridCols="3"
        />
      )}
    </div>
  );
};

export default HighValueAffiliateRecommendations;
