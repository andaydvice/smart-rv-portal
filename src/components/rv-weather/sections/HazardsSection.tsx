
import React from "react";
import { Wind } from "lucide-react";
import { TypographyH2 } from "@/components/ui/typography";
import WeatherHazards from "../WeatherHazards";

const HazardsSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Wind className="h-7 w-7 text-connectivity-accent" />
        <TypographyH2 className="border-none">Weather Hazards in the RVers</TypographyH2>
      </div>
      
      <WeatherHazards />
    </section>
  );
};

export default HazardsSection;
