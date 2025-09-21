
import React from 'react';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';

const SmartSystemsAffiliateRecommendations = () => {
  const smartRecommendations = [
    {
      partner: 'rvlife' as const,
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
      partner: 'nomadinternet' as const,
      title: "Unlimited 5G Internet",
      description: "Unlimited 5G internet plans designed specifically for full time RV travelers and remote workers who need reliable connectivity.",
      features: [
        "Unlimited 5G data",
        "RV traveler focused",
        "Remote work ready",
        "Nationwide coverage"
      ],
      buttonText: "Get Unlimited Data"
    },
    {
      partner: 'starlinkinstallers' as const,
      title: "Professional Starlink Installation",
      description: "Professional Starlink installation services with high-value installations and expert technical support.",
      features: [
        "Professional grade installation",
        "Starlink mount solutions",
        "Expert technical support",
        "High-value service"
      ],
      buttonText: "Get Professional Install"
    }
  ];

  const essentialServices = [
    {
      partner: 'ecoflow' as const,
      title: "Portable Power Solutions",
      description: "High-value portable power stations and solar generators designed for smart RV living and off-grid adventures.",
      features: [
        "High-capacity power stations",
        "Solar generator solutions",
        "Smart RV integration",
        "Off-grid ready systems"
      ],
      buttonText: "Get Portable Power"
    },
    {
      partner: 'cruiseamerica' as const,
      title: "Professional RV Rentals",
      description: "Experience smart RV features in professionally maintained vehicles from America's largest RV rental company.",
      features: [
        "Professional maintenance",
        "Smart RV features",
        "Nationwide locations",
        "High-value rentals"
      ],
      buttonText: "Book Professional RV"
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
        subtitle="Discover the future of smart RV living with smart technology and expert support services:"
        partners={essentialServices}
        gridCols="4"
      />
    </div>
  );
};

export default SmartSystemsAffiliateRecommendations;
