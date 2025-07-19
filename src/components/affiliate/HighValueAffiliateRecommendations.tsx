
import React from 'react';
import { OptimizedAffiliateGrid } from './OptimizedAffiliateGrid';

interface HighValueAffiliateRecommendationsProps {
  title?: string;
  subtitle?: string;
  focusCategory?: 'solar' | 'tech' | 'towing' | 'connectivity' | 'all';
}

const HighValueAffiliateRecommendations: React.FC<HighValueAffiliateRecommendationsProps> = ({
  title = "💰 Maximum Value RV Solutions",
  subtitle = "Our highest-performing affiliate partners with the best commissions and longest cookie durations:",
  focusCategory = 'all'
}) => {
  const getHighValuePartners = () => {
    const solarPartners = [
      { partner: 'solardirect', title: 'Solar Direct - 365 Day Cookie', description: 'Industry-leading 365-day tracking with reliable 5% commissions on complete solar systems' },
      { partner: 'a1solarstore', title: 'A1 Solar - Up to $250/Sale', description: 'Premium solar equipment with up to $250 commission per sale and 180-day cookie' },
      { partner: 'renogy', title: 'Renogy Solar Kits', description: 'Most trusted solar brand with 6% commission and proven conversion rates' }
    ];

    const techPartners = [
      { partner: 'rvlife', title: 'RV Life Pro - 25% Commission', description: 'Highest percentage commission at 25% with 170-day cookie duration' },
      { partner: 'dakotalithium', title: 'Dakota Lithium Batteries', description: 'Premium LiFePO4 batteries with 7% commission and strong customer loyalty' },
      { partner: 'gutatpms', title: 'GUTA TPMS Systems', description: 'Affordable safety monitoring with solid 10% commission rates' }
    ];

    const towingPartners = [
      { partner: 'blueox', title: 'Blue Ox - 10% Commission', description: 'Professional towing systems with excellent 10% commission structure' },
      { partner: 'torklift', title: 'Torklift Accessories', description: 'Premium RV accessories with 8% commission and strong brand reputation' }
    ];

    const connectivityPartners = [
      { partner: 'nomadinternet', title: 'Nomad Internet - $35 CPA', description: 'Flat $35 commission per sale on 5G internet plans for RVers' },
      { partner: 'winegard', title: 'Winegard Connectivity', description: 'Starlink mounts and boosters with 4.5% commission structure' }
    ];

    const premiumPartners = [
      { partner: 'rvtcom', title: 'RVT.com - Up to $1,000 Bonus', description: 'Premium RV marketplace with 20-30% commission plus bonuses up to $1,000' },
      { partner: 'heatso', title: 'Heatso Conversions', description: 'RV conversion products with up to 10% commission on high-ticket items' },
      { partner: 'hotshotssecret', title: 'Hot Shots Secret', description: 'Fuel additives with 8% commission and high repeat purchase rates' }
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
          title="🚀 Strategic Premium Partners"
          subtitle="High-ticket and specialty products with excellent commission structures:"
          partners={[
            { partner: 'rvtcom', title: 'RVT Premium Marketplace', description: '20-30% commission on luxury RV sales with bonus opportunities' },
            { partner: 'mobilehomeparts', title: 'RV Parts & Accessories', description: '5% commission with 60-day cookie on wide product range' },
            { partner: 'victron', title: 'Victron Power Systems', description: 'Professional power monitoring with up to 5% commission' }
          ]}
          gridCols="3"
        />
      )}
    </div>
  );
};

export default HighValueAffiliateRecommendations;
