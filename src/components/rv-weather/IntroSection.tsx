
import React from "react";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { Cloud } from "lucide-react";

const IntroSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="h-7 w-7 text-connectivity-accent" />
        <TypographyH2 className="border-none">Why Weather Matters for RV Travel</TypographyH2>
      </div>
      <TypographyP className="text-light-blue">
        Weather impacts every aspect of RV travel - from road conditions and driving safety to comfort 
        at your campsite and the longevity of your vehicle. Understanding how to track, plan for, 
        and respond to weather conditions is essential for every RV owner.
      </TypographyP>
    </section>
  );
};

export default IntroSection;
