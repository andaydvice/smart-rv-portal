
import React, { useEffect, useState } from 'react';

const ChecklistHeroImage: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Force image preload
    const img = new Image();
    img.src = "/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="w-full relative mb-8">
      <img 
        src="/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png" 
        alt="Complete Guide to Indoor RV Vehicle Storage Preparation" 
        className="w-full h-auto object-cover"
        loading="eager"
        fetchpriority="high"
      />
    </div>
  );
};

export default ChecklistHeroImage;
