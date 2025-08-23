
import React from 'react';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';

const PowerAffiliateRecommendations = () => {
  const powerRecommendations = [
    {
      partner: 'rvlife' as const,
      title: "Smart Power Management",
      description: "Take control of your RV's power with intelligent monitoring that prevents dead batteries and optimizes energy usage.",
      features: [
        "Real time battery monitoring",
        "Solar output optimization",
        "Power consumption alerts",
        "Remote system control"
      ],
      buttonText: "Upgrade Your Power System"
    },
    {
      partner: 'goodsam' as const,
      title: "Power System Support",
      description: "Get expert help with solar installations, battery upgrades, and power system troubleshooting from certified technicians.",
      features: [
        "Certified installation support",
        "Power system consultations",
        "Emergency electrical help",
        "System upgrade guidance"
      ],
      buttonText: "Get Expert Help"
    }
  ];

  const premiumPowerSolutions = [
    {
      partner: 'a1solarstore' as const,
      title: "Complete Solar Systems",
      description: "High capacity solar systems for serious off grid RV living with professional installation support and premium equipment.",
      features: [
        "Complete system packages",
        "Professional installation",
        "Premium solar panels",
        "Extended warranties"
      ],
      buttonText: "Get Complete Solar Solution"
    },
    {
      partner: 'solardirect' as const,
      title: "Extended Support Solar",
      description: "Complete solar power solutions with industry leading warranties and year round technical support for your RV.",
      features: [
        "Industry leading warranties",
        "Year round support",
        "Professional consultation",
        "Quality components"
      ],
      buttonText: "Get Extended Support"
    },
    {
      partner: 'overlandsolar' as const,
      title: "Complete Off-Grid Solar",
      description: "Complete off-grid solar solutions for adventure vehicles with premium quality and serious off-grid living focus.",
      features: [
        "Proven reliability",
        "Complete RV solar kits",
        "Trusted brand reputation",
        "Comprehensive warranties"
      ],
      buttonText: "Choose Trusted Brand"
    }
  ];

  const batteryAndPowerSystems = [
    {
      partner: 'ecoflow' as const,
      title: "High-Value Power Stations",
      description: "High-value portable power stations and solar generators designed for RV living with $1000+ average orders.",
      features: [
        "11 year warranty",
        "Superior cold weather performance",
        "Lightweight design",
        "Fast charging capability"
      ],
      buttonText: "Get Premium Batteries"
    },
    {
      partner: 'invertersrus' as const,
      title: "Professional Power Equipment",
      description: "Premium power equipment retailer with Battle Born, Victron, and top brands for professional RV installations.",
      features: [
        "Professional grade systems",
        "Advanced monitoring",
        "Reliable inverters",
        "Worldwide support"
      ],
      buttonText: "Get Professional Power"
    }
  ];

  const essentialServices = [
    {
      partner: 'rvshare' as const,
      title: "Solar Equipped RV Rentals",
      description: "Experience off grid freedom by renting RVs with solar power systems already installed and optimized.",
      features: [
        "Pre installed solar systems",
        "Off grid capable RVs",
        "Battery backup included",
        "Learn before you invest"
      ],
      buttonText: "Try Solar Power"
    },
    {
      partner: 'outdoorsy' as const,
      title: "Premium Power Ready RVs",
      description: "Book luxury RVs equipped with advanced lithium batteries and high capacity solar systems for extended boondocking.",
      features: [
        "Lithium battery systems",
        "High capacity solar arrays",
        "Advanced inverter systems",
        "Extended off grid capability"
      ],
      buttonText: "Book Power Ready RV"
    },
    {
      partner: 'rvlife' as const,
      title: "Off Grid Trip Planning",
      description: "Find the best boondocking spots and plan solar friendly routes that maximize your off grid adventures.",
      features: [
        "Boondocking location finder",
        "Solar exposure mapping",
        "Off grid trip planning",
        "Power requirement calculator"
      ],
      buttonText: "Plan Off Grid Adventures"
    }
  ];

  return (
    <div className="space-y-8 mt-8">
      <OptimizedAffiliateGrid
        title="⚡ Master Your RV's Power"
        subtitle="Gain complete control over your power systems and never worry about dead batteries again:"
        partners={powerRecommendations}
        gridCols="2"
      />

      <OptimizedAffiliateGrid
        title="☀️ Premium Solar Solutions"  
        subtitle="Upgrade to professional grade solar systems with extended warranties and expert support:"
        partners={premiumPowerSolutions}
        gridCols="3"
      />

      <OptimizedAffiliateGrid
        title="🔋 Advanced Battery & Power Systems"
        subtitle="Invest in premium batteries and professional monitoring systems for reliable off grid power:"
        partners={batteryAndPowerSystems}
        gridCols="2"
      />
      
      <OptimizedAffiliateGrid
        title="🚐 Power Ready RV Solutions"
        subtitle="Experience the freedom of reliable off grid power with these proven solutions:"
        partners={essentialServices}
        gridCols="3"
      />
    </div>
  );
};

export default PowerAffiliateRecommendations;
