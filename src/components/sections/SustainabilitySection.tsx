
import React from "react";
import { Sun, Leaf, Globe, BarChart } from "lucide-react";

const SustainabilityFeature = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center mb-16">
      <div className="mb-6 text-white">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/80 max-w-md">{description}</p>
    </div>
  );
};

export const SustainabilitySection = () => {
  return (
    <section className="py-20 bg-[#080F1F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Sustainable Innovation</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Leading the way in eco-friendly RV technology
          </p>
          <div className="h-1 w-16 bg-[#5B9BD5] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SustainabilityFeature
            icon={Sun}
            title="Solar Power"
            description="High-efficiency solar panels for sustainable energy"
          />
          
          <SustainabilityFeature
            icon={Leaf}
            title="Eco-Materials"
            description="Sustainable materials and manufacturing processes"
          />
          
          <SustainabilityFeature
            icon={Globe}
            title="Green Routes"
            description="Eco-friendly route planning and charging stations"
          />
          
          <SustainabilityFeature
            icon={BarChart}
            title="Carbon Neutral"
            description="Commitment to reducing environmental impact"
          />
        </div>
      </div>
    </section>
  );
};
