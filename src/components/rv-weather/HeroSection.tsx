
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
        setImageLoaded(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [imageLoaded]);
  
  return (
    <div className="relative w-full h-[500px] md:h-[70vh] max-h-[700px] mb-8 overflow-hidden">
      {/* Loading spinner */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080F1F]">
          <div className="w-10 h-10 border-4 border-[#5B9BD5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Hero image with parallax effect */}
      <img
        src="/lovable-uploads/ef520b9c-5686-45a7-8a0e-8f4fdd0d6718.png"
        alt="RV in scenic location at sunset"
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translateY(${parallaxOffset}px)` }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
      
      {/* Hero text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-10 z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg font-playfair">SmartRV</h1>
        <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mt-2 font-playfair">The Ultimate Weather Guide</h2>
        <p className="text-xl text-white drop-shadow-lg mt-4 max-w-2xl">Plan your travels with confidence using our comprehensive weather resources for RV enthusiasts</p>
        
        <a 
          href="#weather-matters" 
          className="inline-flex items-center bg-[#5B9BD5] text-white px-6 py-3 rounded-md font-semibold mt-8 hover:bg-[#4B8FE3] transition-all transform hover:-translate-y-1 hover:shadow-lg"
        >
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
