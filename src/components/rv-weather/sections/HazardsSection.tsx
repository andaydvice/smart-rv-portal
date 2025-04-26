
import React, { useState } from "react";
import { Wind } from "lucide-react";
import { TypographyH2 } from "@/components/ui/typography";
import WeatherHazards from "../WeatherHazards";
import { LazyImage } from "@/components/ui/LazyImage";

const HazardsSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      {/* Section heading */}
      <div className="flex items-center gap-2 mb-8">
        <Wind className="h-8 w-8 text-[#F59E0B]" />
        <TypographyH2 className="border-none text-white text-3xl">Weather Hazards for RV Travel</TypographyH2>
      </div>
      
      {/* Hero image with reduced spacing */}
      <div className="mb-8 relative mt-12">
        <LazyImage
          src="/lovable-uploads/cf3a586f-ae68-4a54-953f-b83505056d0e.png"
          alt="RV in stormy weather with lightning strikes"
          className="rounded-lg shadow-lg w-full object-cover max-h-[500px]"
          blurDataURL="/lovable-uploads/cf3a586f-ae68-4a54-953f-b83505056d0e.png"
        />
      </div>
      
      <WeatherHazards />
    </section>
  );
};

export default HazardsSection;
