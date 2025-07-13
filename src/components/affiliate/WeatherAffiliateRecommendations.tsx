import React from 'react';
import { OptimizedAffiliateGrid } from './OptimizedAffiliateGrid';

const WeatherAffiliateRecommendations = () => {
  const weatherRecommendations = [
    {
      partner: 'rvlife' as const,
      title: "Weather-Smart Route Planning",
      description: "Avoid dangerous weather conditions with intelligent route planning that considers real-time weather data and forecasts.",
      features: [
        "Real-time weather integration",
        "Storm avoidance routing",
        "Weather-safe campgrounds",
        "Condition-based alerts"
      ],
      buttonText: "Plan Weather-Safe Routes"
    },
    {
      partner: 'goodsam' as const,
      title: "Weather Emergency Support",
      description: "Get immediate help when severe weather threatens your safety with 24/7 emergency assistance and storm support.",
      features: [
        "24/7 weather emergency help",
        "Storm damage assistance",
        "Safe shelter guidance",
        "Emergency towing in severe weather"
      ],
      buttonText: "Get Weather Protection"
    }
  ];

  const weatherServices = [
    {
      partner: 'rvshare' as const,
      title: "Weather-Appropriate RVs",
      description: "Rent RVs specifically equipped for your destination's weather conditions - from desert heat to mountain snow.",
      features: [
        "Climate-specific RV features",
        "Seasonal equipment included",
        "Weather-tested models",
        "Local weather expertise"
      ],
      buttonText: "Find Weather-Ready RV"
    },
    {
      partner: 'outdoorsy' as const,
      title: "All-Weather Luxury RVs",
      description: "Book premium RVs with advanced climate control and weather monitoring for comfortable travel in any conditions.",
      features: [
        "Advanced climate systems",
        "Weather monitoring included",
        "All-season capabilities",
        "Premium comfort features"
      ],
      buttonText: "Book Weather-Ready Luxury"
    },
    {
      partner: 'technorv' as const,
      title: "Smart Weather Monitoring",
      description: "Stay ahead of weather changes with intelligent sensors that monitor conditions around your RV and alert you to threats.",
      features: [
        "Environmental sensor systems",
        "Real-time weather alerts",
        "Automatic storm warnings",
        "Remote condition monitoring"
      ],
      buttonText: "Monitor Weather Conditions"
    }
  ];

  return (
    <div className="space-y-8 mt-8">
      <OptimizedAffiliateGrid
        title="🌤️ Stay Safe in Any Weather"
        subtitle="Protect yourself and your RV with weather-smart planning and emergency support that keeps you safe:"
        partners={weatherRecommendations}
        gridCols="2"
      />
      
      <OptimizedAffiliateGrid
        title="🚐 Weather-Ready RV Solutions"
        subtitle="Experience confident travel with RVs and technology designed for any weather condition:"
        partners={weatherServices}
        gridCols="3"
      />
    </div>
  );
};

export default WeatherAffiliateRecommendations;
