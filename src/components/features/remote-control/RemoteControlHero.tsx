
import React from 'react';
import { PreloadedHeaderImage } from "@/components/ui/PreloadedHeaderImage";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden -mt-16">
      <div className="absolute inset-0 w-full h-full bg-black/60 z-10"></div>
      <PreloadedHeaderImage 
        src="/lovable-uploads/cdb72cba-3fb1-44e9-8aea-bde00743141a.webp"
        alt="RV Remote Control Device"
        className="w-full h-full object-cover object-center"
        width={1920}
        height={600}
      />
      <div className="absolute inset-0 z-20">
        <div className="container h-full mx-auto px-6 relative">
          <div className="absolute top-[15%] left-0 right-0 mx-auto max-w-md text-center">
            <h1 className="text-5xl font-bold text-white mb-4 image-overlay-headline">
              Smart RV Remote Control
            </h1>
            <p className="text-xl text-white image-overlay-headline">
              Take command of your Smart RV Hub systems from anywhere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
