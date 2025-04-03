
import React, { useState } from "react";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="relative w-full h-[500px] md:h-[600px] mb-8 overflow-hidden">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080F1F]">
          <div className="w-10 h-10 border-4 border-[#5B9BD5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src="/lovable-uploads/Luxury_RV_Living-min.jpg"
        alt="RV in scenic location"
        className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">The Ultimate RV Weather Guide</h1>
        <p className="text-xl text-white drop-shadow-lg mt-2">Plan your travels with confidence</p>
      </div>
    </div>
  );
};

export default HeroSection;
