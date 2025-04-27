
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  // Ensure the page scrolls to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[80vh] max-h-[800px] overflow-hidden">
      <img
        src="/lovable-uploads/3efce4a3-d382-4b88-b33e-f96074fb7311.png"
        alt="Mountain road with sunset sky for SmartRV Weather Guide"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
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
