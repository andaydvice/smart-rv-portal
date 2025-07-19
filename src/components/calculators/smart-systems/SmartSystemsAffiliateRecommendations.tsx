
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
      title: "Industry Leader Navigation",
      description: "Plan smarter routes with the industry leading GPS navigation that considers your RV's specific needs and real time conditions.",
      features: [
        "RV specific GPS navigation",
        "Smart route optimization",
        "Real time traffic & weather",
        "Campground integration"
      ],
      buttonText: "Navigate Smarter"
    }
  ];

  const connectivitySolutions = [
    {
      partner: 'winegard' as const,
      title: "Connectivity Solutions",
      description: "Stay connected anywhere with professional grade internet solutions including Starlink mounts and signal boosters for reliable RV connectivity.",
      features: [
        "Professional grade equipment",
        "Starlink mount solutions",
        "Signal enhancement",
        "Reliable connectivity"
      ],
      buttonText: "Get Connected"
    },
    {
      partner: 'nomadinternet' as const,
      title: "Unlimited Data Plans",
      description: "Unlimited 5G internet plans designed specifically for full time RV travelers and remote workers who need reliable connectivity.",
      features: [
        "Unlimited 5G data",
        "RV traveler focused",
        "Remote work ready",
        "Nationwide coverage"
      ],
      buttonText: "Get Unlimited Data"
    }
  ];

  const essentialServices = [
    {
      partner: 'rvshare' as const,
      title: "Experience Smart RVs",
      description: "Try the latest smart RV technology without the investment - rent tech equipped RVs to test features firsthand.",
      features: [
        "Latest smart RV technology",
        "Pre installed automation",
        "Test advanced features",
        "No upfront investment"
      ],
      buttonText: "Try Smart Features"
    },
    {
      partner: 'outdoorsy' as const,
      title: "Luxury Smart RV Rentals",
      description: "Experience cutting edge RV automation and smart features in premium luxury RVs with full tech packages.",
      features: [
        "Cutting edge automation",
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
        title="📶 Connectivity Solutions"
        subtitle="Stay connected anywhere with professional grade internet and connectivity solutions for remote RV living:"
        partners={connectivitySolutions}
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
