
import React from "react";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

const CalculatorIntro = () => {
  return (
    <div className="text-center mb-8">
      <TypographyH1 className="text-3xl md:text-4xl font-bold text-[#60A5FA] mb-4 mt-8">
        RV Intelligence Center
      </TypographyH1>
      <div className="max-w-3xl mx-auto">
        <TypographyP className="text-lg text-gray-300 mb-4 block md:inline">
          Professional tools
        </TypographyP>
        <TypographyP className="text-lg text-gray-300 md:hidden">
          for smarter RV travel planning
        </TypographyP>
        <TypographyP className="text-lg text-gray-300 hidden md:inline ml-2">
          for smarter RV travel planning
        </TypographyP>
      </div>
    </div>
  );
};

export default CalculatorIntro;
