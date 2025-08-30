
import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button"; // Button component is not used directly in this file for the image
import { cn } from "@/lib/utils"; // cn is not used but kept to avoid unrelated changes
import { PreloadedHeaderImage } from "@/components/ui/PreloadedHeaderImage"; // MODIFIED: Import PreloadedHeaderImage

const HeroSection = () => {
  // Note: Scroll behavior is handled by useRouteOptimization hook

  return (
    <div className="relative w-full h-[600px] md:h-[80vh] max-h-[800px] overflow-hidden">
      {/* MODIFIED: Replaced img tag with PreloadedHeaderImage component */}
      <PreloadedHeaderImage
        src="/lovable-uploads/b1b0e81e-825c-4f31-aaab-5d7c50e67122.png"
        alt="Woman reading Smart RV Weather Guide book with Smart RV in background"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920} // Representative width for preloading and placeholder
        height={800}  // Representative max height for preloading and placeholder
      />
      
      {/* Button positioned at the bottom */}
      <div className="absolute bottom-8 z-30 w-full flex justify-center">
        <a 
          href="#weather-matters" 
          className="inline-block bg-ocean-blue hover:bg-ocean-blue/90 text-white font-semibold px-8 py-3 rounded-md transition-all transform hover:-translate-y-1 shadow-lg"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default HeroSection;

