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
        src="/lovable-uploads/b1b0e81e-825c-4f31-aaab-5d7c50e67122.png"
        alt="Woman reading RV Weather Guide book with RV in background"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
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
