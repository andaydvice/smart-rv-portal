import React from 'react';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';

const TowingAffiliateRecommendations = () => {
  const towingRecommendations = [
    {
      partner: 'technorv' as const,
      title: "Smart Towing Safety",
      description: "Prevent costly tire blowouts and towing disasters with real-time monitoring that alerts you to problems before they happen.",
      features: [
        "Tire pressure monitoring system",
        "Real-time safety alerts",
        "Blowout prevention technology",
        "Extended tire life"
      ],
      buttonText: "Protect Your Journey"
    },
    {
      partner: 'goodsam' as const,
      title: "Emergency Towing Support",
      description: "Never get stranded with professional emergency towing assistance available 24/7 for RV and towing emergencies.",
      features: [
        "24/7 emergency towing service",
        "Professional heavy-duty assistance",
        "Nationwide coverage",
        "Specialized RV towing"
      ],
      buttonText: "Get Towing Protection"
    }
  ];

  const essentialServices = [
    {
      partner: 'rvshare' as const,
      title: "Practice Towing Safely",
      description: "Master towing skills by renting different RV and trailer combinations before committing to your own setup.",
      features: [
        "Various towing configurations",
        "Practice different setups",
        "Learn optimal combinations",
        "Build towing confidence"
      ],
      buttonText: "Practice Towing"
    },
    {
      partner: 'outdoorsy' as const,
      title: "Professional Towing Setups",
      description: "Experience professionally configured towing setups with premium equipment and expert guidance included.",
      features: [
        "Professional configurations",
        "Premium towing equipment",
        "Expert setup guidance",
        "Safety-tested combinations"
      ],
      buttonText: "Book Professional Setup"
    },
    {
      partner: 'rvlife' as const,
      title: "Safe Towing Routes",
      description: "Plan towing-safe routes that avoid low bridges, weight restrictions, and challenging roads that could damage your RV.",
      features: [
        "Towing-safe route planning",
        "Bridge height clearance data",
        "Weight restriction alerts",
        "RV-friendly road conditions"
      ],
      buttonText: "Plan Safe Routes"
    },
    {
      partner: 'rvwaterfilter' as const,
      title: "System Protection",
      description: "Protect your RV's water and waste systems during transport with quality filters and maintenance products.",
      features: [
        "Transport-safe filtration",
        "System protection products",
        "Travel preparation kits",
        "Quality maintenance supplies"
      ],
      buttonText: "Protect Your Systems"
    }
  ];

  return (
    <div className="space-y-8 mt-8">
      <OptimizedAffiliateGrid
        title="🚛 Tow Safely & Confidently"
        subtitle="Prevent costly breakdowns and dangerous situations with professional towing safety solutions:"
        partners={towingRecommendations}
        gridCols="2"
      />
      
      <OptimizedAffiliateGrid
        title="🚐 Complete Towing Solutions"
        subtitle="Master every aspect of RV towing with these essential services and protection:"
        partners={essentialServices}
        gridCols="4"
      />
    </div>
  );
};

export default TowingAffiliateRecommendations;