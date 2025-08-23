import React from 'react';
import { OptimizedAffiliateGrid } from './OptimizedAffiliateGrid';

const StorageAffiliateRecommendations = () => {
  const storageRecommendations = [
    {
      partner: 'goodsam' as const,
      title: "Storage Preparation Expertise",
      description: "Protect your RV investment with expert guidance on proper storage preparation, winterization, and facility selection.",
      features: [
        "Professional storage guidance",
        "Winterization expertise",
        "Facility recommendations",
        "Seasonal maintenance support"
      ],
      buttonText: "Get Storage Expertise"
    },
    {
      partner: 'rvwaterfilter' as const,
      title: "Storage Protection Systems",
      description: "Prevent costly damage during storage with quality winterization products and water system protection solutions.",
      features: [
        "Complete winterization kits",
        "Water system protection",
        "Freeze damage prevention",
        "Long-term storage solutions"
      ],
      buttonText: "Protect Your Investment"
    }
  ];

  const storageServices = [
    {
      partner: 'rvshare' as const,
      title: "Storage Alternative Rentals",
      description: "Skip storage costs and enjoy your RV year-round by renting when yours is stored or trying different models.",
      features: [
        "Year-round RV access",
        "No storage fees",
        "Try different models",
        "Seasonal rental options"
      ],
      buttonText: "Skip Storage Costs"
    },
    {
      partner: 'outdoorsy' as const,
      title: "Premium Storage Solutions",
      description: "Some premium hosts offer secure storage solutions and concierge services for fellow RV owners.",
      features: [
        "Host storage networks",
        "Concierge services",
        "Secure storage options",
        "Professional maintenance"
      ],
      buttonText: "Find Premium Storage"
    },
    {
      partner: 'rvlife' as const,
      title: "Storage Facility Finder",
      description: "Locate the best storage facilities and plan your seasonal RV lifestyle with comprehensive facility data.",
      features: [
        "Comprehensive facility database",
        "Seasonal planning tools",
        "Facility reviews & ratings",
        "Storage cost comparisons"
      ],
      buttonText: "Find Storage Facilities"
    },
    {
      partner: 'ecoflow' as const,
      title: "Portable Power for Storage",
      description: "Maintain your RV systems during storage with portable power solutions that protect batteries and equipment.",
      features: [
        "Portable power stations",
        "Battery maintenance charging",
        "System protection",
        "Easy storage setup"
      ],
      buttonText: "Get Portable Power"
    }
  ];

  return (
    <div className="space-y-8 mt-8">
      <OptimizedAffiliateGrid
        title="🏠 Protect Your RV Investment"
        subtitle="Ensure your RV stays in perfect condition during storage with expert preparation and protection:"
        partners={storageRecommendations}
        gridCols="2"
      />
      
      <OptimizedAffiliateGrid
        title="🚐 Smart Storage Solutions"
        subtitle="Maximize your RV lifestyle and investment protection with these innovative storage alternatives:"
        partners={storageServices}
        gridCols="4"
      />
    </div>
  );
};

export default StorageAffiliateRecommendations;
