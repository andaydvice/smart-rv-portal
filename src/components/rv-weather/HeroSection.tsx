
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[80vh] max-h-[800px] overflow-hidden">
      {/* Hero image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('/lovable-uploads/7ef94cbe-bfc1-45b3-9297-55326f5c22fa.png')`,
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
        <h1 className="text-6xl md:text-8xl font-bold text-white font-playfair mb-2">SmartRV</h1>
        <h2 className="text-4xl md:text-6xl font-bold text-white font-playfair">THE ULTIMATE</h2>
        <h2 className="text-6xl md:text-8xl font-bold text-white font-playfair mb-8">Weather Guide</h2>
        
        <a 
          href="#weather-matters" 
          className="mt-8 bg-ocean-blue hover:bg-ocean-blue/90 text-white font-semibold px-8 py-3 rounded-md transition-all transform hover:-translate-y-1 shadow-lg"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
