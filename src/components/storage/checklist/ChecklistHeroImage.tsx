
import React, { useEffect, useState } from 'react';

const ChecklistHeroImage: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imagePath = "/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png";

  useEffect(() => {
    // Force immediate image preload with highest priority
    const img = new Image();
    img.src = imagePath;
    img.fetchPriority = 'high';
    
    // Enable immediate visibility regardless of load state
    setImageLoaded(true);
    
    // If image is already in cache, this will fire immediately
    img.onload = () => {
      console.log("Hero image preloaded successfully");
      setImageLoaded(true);
    };

    // No timeout needed - we're showing immediately
  }, []);

  // Always render the image, regardless of load state
  return (
    <div className="w-full relative mb-8">
      {/* Primary image - always visible */}
      <img 
        src={imagePath} 
        alt="Complete Guide to Indoor RV Vehicle Storage Preparation" 
        className="w-full h-auto object-cover"
        loading="eager"
        fetchPriority="high"
        style={{
          visibility: 'visible', 
          opacity: 1,
          display: 'block',
          width: '100%',
          maxWidth: '100%'
        }}
      />
      
      {/* Fallback in case the image doesn't load */}
      {!imageLoaded && (
        <div 
          className="w-full h-64 bg-[#151A22] rounded absolute top-0 left-0 z-0"
          style={{
            visibility: imageLoaded ? 'hidden' : 'visible',
            opacity: imageLoaded ? 0 : 1
          }}
        ></div>
      )}
    </div>
  );
};

export default ChecklistHeroImage;
