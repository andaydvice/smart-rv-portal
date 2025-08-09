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

    // Always include RVShare
    partners.push({ 
      partner: 'rvshare', 
      title: 'Smart RV Rental Savings', 
      description: `Save money by renting smart RV equipped units for your ${days} day trip instead of buying` 
    });

    // Add Outdoorsy for luxury trips
    if (isLongTrip || isLargeRV) {
      partners.push({ 
        partner: 'outdoorsy', 
        title: 'Luxury Smart RV Rentals', 
        description: 'Premium smart RV rentals with advanced technology for longer, more comfortable trips' 
      });
    }

    // Add RV Life for trip planning
    if (isLongDistance) {
      partners.push({ 
        partner: 'rvlife', 
        title: 'Smart Trip Planning Tools', 
        description: 'Plan your route and find smart RV friendly stops for long distance travel' 
      });
    }

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
        videoId="rv-trip-planning"
        videoTitle="Smart RV Trip Planning Demo"
        priority="high"
      />
    </div>
  );
};

export default AffiliateRecommendations;