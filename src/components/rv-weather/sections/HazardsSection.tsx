
import React, { useState } from "react";
import { Wind } from "lucide-react";
import { TypographyH2 } from "@/components/ui/typography";
import WeatherHazards from "../WeatherHazards";

const HazardsSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      {/* Section heading with increased visibility */}
      <div className="flex items-center gap-2 mb-8">
        <Wind className="h-8 w-8 text-[#F59E0B]" />
        <TypographyH2 className="border-none text-white text-3xl">Weather Hazards for RV Travel</TypographyH2>
      </div>
      
      {/* Hero image with increased spacing from heading */}
      <div className="mb-8 relative mt-6">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#080F1F]/70 rounded-lg">
            <div className="w-10 h-10 border-4 border-[#5B9BD5] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src="/lovable-uploads/2de9d956-ab52-477e-98d5-7711828ab90c.png" 
          alt="RV driving through stormy weather with lightning" 
          className={`rounded-lg shadow-lg w-full object-cover max-h-[500px] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <WeatherHazards />
    </section>
  );
};

export default HazardsSection;
