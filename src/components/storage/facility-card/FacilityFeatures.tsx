
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FacilityFeaturesProps {
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  };
}

export const FacilityFeatures: React.FC<FacilityFeaturesProps> = ({ features }) => {
  const featureLabels = {
    indoor: 'Indoor Storage',
    climate_controlled: 'Climate Controlled',
    "24h_access": '24/7 Access',
    security_system: 'Security System',
    vehicle_washing: 'Vehicle Washing'
  };

  const activeFeatures = Object.entries(features)
    .filter(([_, value]) => value)
    .map(([key, _]) => featureLabels[key as keyof typeof featureLabels]);

  if (activeFeatures.length === 0) return null;

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-2">
        {activeFeatures.map((feature, index) => (
          <span 
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-[#1a2235] text-[#60A5FA]"
          >
            <CheckCircle className="w-3 h-3" />
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};
