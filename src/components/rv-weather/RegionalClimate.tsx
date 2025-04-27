
import React, { useEffect } from "react";

const RegionalClimate = () => {
  // Preload the background image with high priority
  useEffect(() => {
    const backgroundImageSrc = '/lovable-uploads/ad3dc693-42f4-4635-af2d-b2c4b1aafc43.png';
    
    // Method 1: Create high priority preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = backgroundImageSrc;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    // Method 2: Use Image constructor for immediate loading
    const preloadImage = new Image();
    preloadImage.src = backgroundImageSrc;
    preloadImage.fetchPriority = 'high';
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);
  
  return (
    <section className="relative w-full py-16 bg-cover bg-fixed" style={{ backgroundImage: "url('/lovable-uploads/ad3dc693-42f4-4635-af2d-b2c4b1aafc43.png')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
          Regional Climate Highlights
        </h2>
        <div className="w-24 h-1 bg-ocean-blue mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-dark-background/80 rounded-lg overflow-hidden shadow backdrop-blur-sm">
            <div className="bg-yellow-600 text-white px-3 py-1 text-sm font-semibold">
              Hot & Dry
            </div>
            <div className="p-6">
              <h3 className="font-bold text-white text-xl mb-3 text-left">Southwest</h3>
              <p className="text-light-blue text-left">
                Hot, dry summers with monsoon season (July-Sept). Mild winters in lower elevations, 
                snow at higher altitudes. Prepare for extreme temperature swings between day and night.
              </p>
            </div>
          </div>
          
          <div className="bg-dark-background/80 rounded-lg overflow-hidden shadow backdrop-blur-sm">
            <div className="bg-ocean-blue text-white px-3 py-1 text-sm font-semibold">
              Wet & Mild
            </div>
            <div className="p-6">
              <h3 className="font-bold text-white text-xl mb-3 text-left">Pacific Northwest</h3>
              <p className="text-light-blue text-left">
                Mild, wet winters and dry summers. Significant precipitation along the coast, less inland.
                Prepare for extended periods of rain and high humidity during winter months.
              </p>
            </div>
          </div>
          
          <div className="bg-dark-background/80 rounded-lg overflow-hidden shadow backdrop-blur-sm">
            <div className="bg-green-600 text-white px-3 py-1 text-sm font-semibold">
              Four Seasons
            </div>
            <div className="p-6">
              <h3 className="font-bold text-white text-xl mb-3 text-left">Northeast</h3>
              <p className="text-light-blue text-left">
                Four distinct seasons with cold, snowy winters and warm, humid summers. Fall foliage is spectacular.
                Winter travel requires careful planning and cold-weather preparation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalClimate;
