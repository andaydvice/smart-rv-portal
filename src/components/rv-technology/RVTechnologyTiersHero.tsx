import React from 'react';
import { PreloadedHeaderImage } from '@/components/ui/PreloadedHeaderImage';
import rvTechTiersImage from '@/assets/rv-technology-tiers-hero.webp';

const RVTechnologyTiersHero = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden my-12">
      <PreloadedHeaderImage 
        src={rvTechTiersImage}
        alt="RV technology tiers comparison showing different levels of technology from basic to advanced luxury systems"
        className="w-full h-full object-cover"
        width={1920}
        height={600}
        priority="high"
      />
      
      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center max-w-5xl px-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 image-overlay-headline">
            Technology Tiers and Research Guidance
          </h2>
          <h3 className="text-2xl md:text-3xl text-white/90 mb-4 image-overlay-headline">
            Understanding Technology Levels by Usage Type
          </h3>
          <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto image-overlay-headline">
            Different RV usage patterns require different technology investments - learn how to match features to your actual needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RVTechnologyTiersHero;