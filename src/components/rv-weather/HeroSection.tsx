
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] mb-8 overflow-hidden">
      <img
        src="/lovable-uploads/Luxury_RV_Living-min.jpg"
        alt="RV in scenic location"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">The Ultimate RV Weather Guide</h1>
        <p className="text-xl text-white drop-shadow-lg mt-2">Plan your travels with confidence</p>
      </div>
    </div>
  );
};

export default HeroSection;
