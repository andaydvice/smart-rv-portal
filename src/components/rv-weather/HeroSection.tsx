
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-[600px] md:h-[80vh] max-h-[800px] overflow-hidden">
      {/* Background fallback color */}
      <div className="absolute inset-0 bg-deeper-background" />
      
      {/* Main image with error handling */}
      {!imageError ? (
        <img
          src="/lovable-uploads/3efce4a3-d382-4b88-b33e-f96074fb7311.png"
          alt="Mountain road with sunset sky for SmartRV Weather Guide"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      ) : (
        /* Fallback image if main image fails to load */
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/lovable-uploads/4988c602-a652-4527-93a8-765921a6d09f.png')`,
          }}
        />
      )}
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      
      {/* Hero content */}
      <div className="absolute inset-0 z-30">
        <div className="flex flex-col h-full justify-end items-center pb-16">
          <div className="text-center">
            {/* Button positioned at bottom with good margin from any text in the image */}
            <a 
              href="#weather-matters" 
              className="inline-block bg-ocean-blue hover:bg-ocean-blue/90 text-white font-semibold px-8 py-3 rounded-md transition-all transform hover:-translate-y-1 shadow-lg mt-4"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-deeper-background/80 z-40">
          <div className="w-12 h-12 border-4 border-ocean-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
