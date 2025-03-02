
import React, { useEffect, useState } from 'react';

const ChecklistHeroImage: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imagePath = "/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png";

  useEffect(() => {
    // Force image preload
    const img = new Image();
    img.src = imagePath;
    img.onload = () => setImageLoaded(true);

    // Set a fallback in case the image doesn't load
    const timer = setTimeout(() => {
      if (!imageLoaded) setImageLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [imageLoaded]);

  return (
    <div className="w-full relative mb-8">
      {imageLoaded ? (
        <img 
          src={imagePath} 
          alt="Complete Guide to Indoor RV Vehicle Storage Preparation" 
          className="w-full h-auto object-cover"
          loading="eager"
          fetchPriority="high"
        />
      ) : (
        <div className="w-full h-64 bg-[#151A22] animate-pulse"></div>
      )}
    </div>
  );
};

export default ChecklistHeroImage;
