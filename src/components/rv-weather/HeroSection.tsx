
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  
  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setParallaxOffset(scrollPosition * 0.5);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Force image to be visible after a timeout as backup
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!imageLoaded) {
        console.log("Force showing hero image after timeout");
        setImageLoaded(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [imageLoaded]);
  
  return (
    <div className="relative w-full h-[500px] md:h-[70vh] max-h-[700px] mb-8 overflow-hidden">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080F1F]">
          <div className="w-10 h-10 border-4 border-[#5B9BD5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src="/lovable-uploads/Luxury_RV_Living-min.jpg"
        alt="RV in scenic location"
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translateY(${parallaxOffset}px)` }}
        onLoad={() => {
          console.log("Hero image loaded");
          setImageLoaded(true);
        }}
        onError={() => {
          console.error("Hero image failed to load, showing anyway");
          setImageLoaded(true);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 hero-text">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">SmartRV</h1>
        <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mt-2">The Ultimate RV Weather Guide</h2>
        <p className="text-xl text-white drop-shadow-lg mt-4">Plan your travels with confidence</p>
        <a href="#weather-matters" className="inline-flex items-center bg-[#5B9BD5] text-white px-6 py-3 rounded-md font-semibold mt-8 hover:bg-[#4B8FE3] transition-all transform hover:-translate-y-1">
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
