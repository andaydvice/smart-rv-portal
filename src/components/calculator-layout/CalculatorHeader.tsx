
import React from "react";
import { LazyImage } from '@/components/ui/LazyImage';

const CalculatorHeader = () => {
  return (
    <div className="relative w-full min-h-[400px] h-[400px] max-h-[400px] overflow-hidden">
      <LazyImage
        src="/lovable-uploads/53093373-3df3-49cc-b4cc-91b800c53fa9.png"
        alt="Smart RV under starry night sky with ambient lighting"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#131a2a]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white z-10">
          RV Tools Suite
        </h1>
      </div>
    </div>
  );
};

export default CalculatorHeader;
