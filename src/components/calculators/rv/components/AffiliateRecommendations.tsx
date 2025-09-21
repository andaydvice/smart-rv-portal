import React from 'react';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';

interface AffiliateRecommendationsProps {
  rvType: string;
  tripDistance: number;
  days: number;
  totalCost: number;
}

const AffiliateRecommendations = ({ rvType, tripDistance, days, totalCost }: AffiliateRecommendationsProps) => {
  const getPartners = () => {
    const isLongTrip = days > 7;
    const isLargeRV = ['large', 'fifthWheel', 'superSize'].includes(rvType);
    const isLongDistance = tripDistance > 500;

    const partners = [];

    // Always include RV Life Pro (highest commission)
    partners.push({ 
      partner: 'rvlife', 
      title: 'Smart Trip Planning Tools', 
      description: `Plan your ${days} day smart RV route with GPS navigation designed for RVs` 
    });

    // Add Cruise America for rentals (high AOV)
    partners.push({ 
      partner: 'cruiseamerica', 
      title: 'Professional RV Rentals', 
      description: 'Experience smart RV features with America\'s largest rental company' 
    });

    // Add Good Sam for safety
    partners.push({ 
      partner: 'goodsam', 
      title: 'Smart RV Roadside Assistance', 
      description: '24/7 smart RV specific emergency assistance and peace of mind' 
    });

    return partners.slice(0, 3);
  };

  return (
    <div className="mt-8">
      <OptimizedAffiliateGrid
        title="💡 Recommended for Your Smart RV Trip"
        subtitle={`Based on your ${rvType} smart RV, ${days} day trip covering ${tripDistance} miles (estimated cost: $${totalCost}), here are our top recommendations:`}
        partners={getPartners()}
        gridCols="3"
        className="bg-[#091020] border-gray-700"
      />
    </div>
  );
};

export default AffiliateRecommendations;