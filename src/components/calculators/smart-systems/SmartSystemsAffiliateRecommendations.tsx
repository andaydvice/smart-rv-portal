import React from 'react';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';

const SmartSystemsAffiliateRecommendations = () => {
  const smartRecommendations = [
    {
      partner: 'technorv' as const,
      title: "Complete Smart RV Control",
      description: "Transform your RV into a smart home on wheels with automated systems that protect your investment and enhance comfort.",
      features: [
        "Smart automation systems",
        "Surge & electrical protection",
        "Remote monitoring & control",
        "Investment protection"
      ],
      buttonText: "Upgrade to Smart RV"
    },
    {
      partner: 'rvlife' as const,
      title: "Smart Trip Planning",
      description: "Plan smarter routes with GPS navigation that considers your RV's specific needs and real-time conditions.",
      features: [
        "RV-specific GPS navigation",
        "Smart route optimization",
        "Real-time traffic & weather",
        "Campground integration"
      ],
      buttonText: "Navigate Smarter"
    }
  ];

  const essentialServices = [
    {
      partner: 'rvshare' as const,
      title: "Experience Smart RVs",
      description: "Try the latest smart RV technology without the investment - rent tech-equipped RVs to test features firsthand.",
      features: [
        "Latest smart RV technology",
        "Pre-installed automation",
        "Test advanced features",
        "No upfront investment"
      ],
      buttonText: "Try Smart Features"
    },
    {
      partner: 'outdoorsy' as const,
      title: "Luxury Smart RV Rentals",
      description: "Experience cutting-edge RV automation and smart features in premium luxury RVs with full tech packages.",
      features: [
        "Cutting-edge automation",
        "Premium smart features",
        "Luxury tech packages",
        "Full system integration"
      ],
      buttonText: "Book Smart Luxury"
    },
    {
      partner: 'goodsam' as const,
      title: "Smart System Support",
      description: "Get expert technical support for smart RV system installations, troubleshooting, and optimization.",
      features: [
        "Expert technical support",
        "Installation assistance",
        "System troubleshooting",
        "Optimization guidance"
      ],
      buttonText: "Get Tech Support"
    },
    {
      partner: 'rvwaterfilter' as const,
      title: "Smart Water Management",
      description: "Monitor and manage your water quality automatically with intelligent filtration systems and quality alerts.",
      features: [
        "Smart water monitoring",
        "Automated quality alerts",
        "Intelligent filtration",
        "System health tracking"
      ],
      buttonText: "Smart Water Solutions"
    }
  ];

  return (
    <div className="space-y-8 mt-8">
      <OptimizedAffiliateGrid
        title="📱 Smart RV Technology"
        subtitle="Transform your RV into an intelligent home on wheels with automated systems and smart controls:"
        partners={smartRecommendations}
        gridCols="2"
      />
      
      <OptimizedAffiliateGrid
        title="🚐 Smart RV Experience"
        subtitle="Discover the future of RV living with smart technology and expert support services:"
        partners={essentialServices}
        gridCols="4"
      />
    </div>
  );
};

export default SmartSystemsAffiliateRecommendations;