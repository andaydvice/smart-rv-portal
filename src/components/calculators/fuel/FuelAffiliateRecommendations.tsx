import React from 'react';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';

const FuelAffiliateRecommendations = () => {
  const fuelRecommendations = [
    {
      partner: 'rvlife' as const,
      title: "Smart Route Planning",
      description: "Save money on fuel with intelligent route planning that finds the cheapest gas stations and most fuel-efficient paths for your RV.",
      features: [
        "Real-time fuel price comparison",
        "RV-optimized fuel-efficient routes", 
        "Gas station finder with RV access",
        "Trip cost calculator"
      ],
      buttonText: "Start Saving on Fuel"
    },
    {
      partner: 'goodsam' as const,
      title: "Fuel Discounts & Emergency Help",
      description: "Get instant fuel savings at thousands of stations plus 24/7 roadside assistance when fuel-related problems strand you.",
      features: [
        "Up to 8¢/gallon fuel discounts",
        "Emergency fuel delivery service",
        "24/7 roadside assistance", 
        "Nationwide coverage"
      ],
      buttonText: "Save on Every Fill-Up"
    }
  ];

  const supportServices = [
    {
      partner: 'rvshare' as const,
      title: "Test Fuel-Efficient RVs",
      description: "Try different RV models to find the most fuel-efficient option for your travel style before making a purchase.",
      features: [
        "Compare fuel economy across models",
        "Real-world fuel consumption data",
        "Try before you buy",
        "Owner-reported efficiency ratings"
      ],
      buttonText: "Find Efficient RVs"
    },
    {
      partner: 'outdoorsy' as const,
      title: "Premium Efficient Rentals", 
      description: "Book newer, well-maintained RVs that offer better fuel efficiency and cost savings for your trips.",
      features: [
        "Newer, fuel-efficient models",
        "Professional maintenance records",
        "Fuel consumption estimates",
        "Premium RV selection"
      ],
      buttonText: "Book Efficient RV"
    },
    {
      partner: 'technorv' as const,
      title: "Smart Fuel Monitoring",
      description: "Track your RV's fuel consumption in real-time and optimize your driving habits to maximize every gallon.",
      features: [
        "Real-time fuel monitoring",
        "Driving efficiency coaching",
        "Consumption tracking & alerts",
        "Route optimization data"
      ],
      buttonText: "Monitor Fuel Usage"
    }
  ];

  return (
    <div className="space-y-8 mt-8">
      <OptimizedAffiliateGrid
        title="⛽ Save Money on RV Fuel"
        subtitle="Reduce your fuel costs with smart planning tools and member discounts that put money back in your pocket:"
        partners={fuelRecommendations}
        gridCols="2"
      />
      
      <OptimizedAffiliateGrid
        title="🚐 Smart RV Solutions" 
        subtitle="Maximize fuel efficiency with the right RV choice and smart monitoring technology:"
        partners={supportServices}
        gridCols="3"
      />
    </div>
  );
};

export default FuelAffiliateRecommendations;