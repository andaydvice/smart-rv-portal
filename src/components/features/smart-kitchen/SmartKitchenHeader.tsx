
import React, { useEffect, useState } from 'react';
import { PreloadedHeaderImage } from '@/components/ui/PreloadedHeaderImage';

const SmartKitchenHeader = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const headerImageSrc = '/lovable-uploads/9b681f27-359c-4d90-8629-5b2b198abf0f.webp';
  
  // Preload image immediately when component mounts
  useEffect(() => {
    // Create and inject a preload link with high priority
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = headerImageSrc;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Callback function when image is loaded
  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <div className="relative w-full h-[50vh] overflow-hidden mb-12">
      <PreloadedHeaderImage 
        src={headerImageSrc}
        alt="Luxury RV Kitchen with Wood Cabinets and Panoramic Windows"
        className="w-full h-full object-cover"
        width={1920}
        height={800}
        onImageLoaded={handleImageLoaded}
      />
      
      {/* Only show content when image is loaded */}
      {imageLoaded && (
        <>
          {/* Enhanced gradient overlay with higher z-index */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/90 z-10" />
          
          {/* Main headline with increased z-index and better visibility */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-gray-900/50 px-8 py-6 rounded-lg backdrop-blur-sm max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center image-overlay-headline shadow-lg">
                The Future of RV Cooking Has Arrived
              </h1>
            </div>
          </div>
          
          {/* Bottom headline section with increased z-index */}
          <div className="absolute bottom-0 left-0 w-full p-8 z-15">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white image-overlay-headline">
                Smart Kitchen and Appliances
              </h1>
              <p className="text-xl text-gray-200 mt-2 max-w-2xl">
                Transform your RV kitchen into a connected hub of convenience with integrated smart technology
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SmartKitchenHeader;
