import React from 'react';
import { PreloadedHeaderImage } from '@/components/ui/PreloadedHeaderImage';
import rvTechHeaderImage from '@/assets/rv-technology-tradeoffs-header.jpg';

const RVTechnologyHeader = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[70vh] max-h-[700px] overflow-hidden">
      <PreloadedHeaderImage 
        src={rvTechHeaderImage}
        alt="Modern RV cockpit with advanced technology dashboard overlooking scenic mountain landscape, representing technology tradeoffs in RV decision-making"
        className="w-full h-full object-cover"
        width={1920}
        height={800}
        priority="high"
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" />
      
      {/* Header content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 image-overlay-headline">
            RV Technology Buyer's Education Guide
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto image-overlay-headline">
            Understanding Modern RV Technology Options and What Questions to Ask
          </p>
        </div>
      </div>
    </div>
  );
};

export default RVTechnologyHeader;