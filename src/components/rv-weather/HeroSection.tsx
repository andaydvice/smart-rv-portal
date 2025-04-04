
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  
  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setParallaxOffset(scrollPosition * 0.4);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative w-full h-[500px] md:h-[70vh] max-h-[700px] overflow-hidden">
      {/* Hero image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('/lovable-uploads/2d11a827-1f68-4742-ab75-4abaf4e35750.png')`,
          transform: `translateY(${parallaxOffset}px)` 
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white font-playfair mb-2">SmartRV</h1>
        <h2 className="text-3xl md:text-5xl font-bold text-white font-playfair">The Ultimate Weather Guide</h2>
        <p className="text-xl text-white mt-4 max-w-2xl font-montserrat">
          Plan your travels with confidence using our comprehensive weather resources
        </p>
        
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
