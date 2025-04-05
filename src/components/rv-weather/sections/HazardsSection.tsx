
import React from "react";
import { Wind } from "lucide-react";
import { TypographyH2 } from "@/components/ui/typography";
import WeatherHazards from "../WeatherHazards";

const HazardsSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      {/* Hero image for weather hazards */}
      <div className="mb-6">
        <img 
          src="/lovable-uploads/3880c7ce-5d12-4df2-93b8-ea2582f1485b.png" 
          alt="RV driving through stormy weather with lightning" 
          className="rounded-lg shadow-lg w-full object-cover max-h-[500px]"
        />
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <Wind className="h-7 w-7 text-connectivity-accent" />
        <TypographyH2 className="border-none">Weather Hazards in the RVers</TypographyH2>
      </div>
      
      <WeatherHazards />
    </section>
  );
};

export default HazardsSection;
