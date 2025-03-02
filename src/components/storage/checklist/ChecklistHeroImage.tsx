
import React, { useEffect, useState } from 'react';

const ChecklistHeroImage: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imagePath = "/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png";

  useEffect(() => {
    // Force immediate image preload with highest priority
    const img = new Image();
    img.src = imagePath;
    
    // Set fetchPriority to high to ensure browser prioritizes this image
    img.fetchPriority = 'high';
    
    // If image is already in cache, this will fire immediately
    img.onload = () => {
      console.log("Hero image preloaded successfully");
      setImageLoaded(true);
    };

    // Set a fallback in case the image doesn't load within 1 second
    const timer = setTimeout(() => {
      if (!imageLoaded) {
        console.log("Using fallback for hero image load");
        setImageLoaded(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [imageLoaded]);

  // Force the image to be visible regardless of loading state
  return (
    <div className="w-full relative mb-8">
      <img 
        src={imagePath} 
        alt="Complete Guide to Indoor RV Vehicle Storage Preparation" 
        className={`w-full h-auto object-cover ${!imageLoaded ? 'hidden' : 'block'}`}
        loading="eager"
        fetchPriority="high"
        onLoad={() => setImageLoaded(true)}
        style={{visibility: 'visible', opacity: 1}}
      />
      
      {!imageLoaded && (
        <div className="w-full h-64 bg-[#151A22] animate-pulse rounded"></div>
      )}
    </div>
  );
};

export default ChecklistHeroImage;
