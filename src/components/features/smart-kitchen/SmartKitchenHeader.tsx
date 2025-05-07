
import React, { useEffect } from 'react';
import { PreloadedHeaderImage } from '@/components/ui/PreloadedHeaderImage';

const SmartKitchenHeader = () => {
  // Preload image immediately when component mounts
  useEffect(() => {
    const headerImageSrc = '/lovable-uploads/28815e7c-77df-4758-b609-d84355448eea.png';
    
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

  return (
    <div className="relative w-full h-[50vh] overflow-hidden mb-12">
      <PreloadedHeaderImage 
        src="/lovable-uploads/28815e7c-77df-4758-b609-d84355448eea.png"
        alt="Modern Smart Kitchen with Connected Appliances"
        className="w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
      <div className="absolute bottom-0 left-0 w-full p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white image-overlay-headline">
            Smart Kitchen and Appliances
          </h1>
          <p className="text-xl text-gray-200 mt-2 max-w-2xl">
            Transform your RV kitchen into a connected hub of convenience with integrated smart technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartKitchenHeader;
