import React from 'react';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';

const PowerAffiliateRecommendations = () => {
  const powerRecommendations = [
    {
      partner: 'technorv' as const,
      title: "Smart Power Management",
      description: "Take control of your RV's power with intelligent monitoring that prevents dead batteries and optimizes energy usage.",
      features: [
        "Real-time battery monitoring",
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

  const essentialServices = [
    {
      partner: 'rvshare' as const,
      title: "Solar-Equipped RV Rentals",
      description: "Experience off-grid freedom by renting RVs with solar power systems already installed and optimized.",
      features: [
        "Pre-installed solar systems",
        "Off-grid capable RVs",
        "Battery backup included",
        "Learn before you invest"
      ],
      buttonText: "Try Solar Power"
    },
    {
      partner: 'outdoorsy' as const,
      title: "Premium Power-Ready RVs",
      description: "Book luxury RVs equipped with advanced lithium batteries and high-capacity solar systems for extended boondocking.",
      features: [
        "Lithium battery systems",
        "High-capacity solar arrays",
        "Advanced inverter systems",
        "Extended off-grid capability"
      ],
      buttonText: "Book Power-Ready RV"
    },
    {
      partner: 'rvlife' as const,
      title: "Off-Grid Trip Planning",
      description: "Find the best boondocking spots and plan solar-friendly routes that maximize your off-grid adventures.",
      features: [
        "Boondocking location finder",
        "Solar exposure mapping",
        "Off-grid trip planning",
        "Power requirement calculator"
      ],
      buttonText: "Plan Off-Grid Adventures"
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
        title="🚐 Power-Ready RV Solutions"
        subtitle="Experience the freedom of reliable off-grid power with these proven solutions:"
        partners={essentialServices}
        gridCols="3"
      />
    </div>
  );
};

export default PowerAffiliateRecommendations;