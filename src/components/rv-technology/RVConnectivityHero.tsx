import React from 'react';
import { PreloadedHeaderImage } from '@/components/ui/PreloadedHeaderImage';
import rvConnectivityImage from '@/assets/rv-connectivity-technology-hero.jpg';

const RVConnectivityHero = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden my-12">
      <PreloadedHeaderImage 
        src={rvConnectivityImage}
        alt="Modern RV with advanced connectivity technology including satellite dishes and antennas in mountain landscape"
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
            Understanding RV Connectivity Technology
          </h2>
          <h3 className="text-2xl md:text-3xl text-white/90 mb-4 image-overlay-headline">
            Historical Development of Connectivity Solutions
          </h3>
          <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto image-overlay-headline">
            Understanding how connectivity technology has evolved can help buyers ask informed questions about current capabilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RVConnectivityHero;