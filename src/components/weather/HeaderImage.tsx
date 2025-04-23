
import React, { useEffect } from 'react';
import { LazyImage } from '@/components/ui/LazyImage';
import { preloadCriticalImages } from '@/utils/performance';

const HeaderImage: React.FC = () => {
  useEffect(() => {
    preloadCriticalImages(["/lovable-uploads/Luxury_RV_Living-min.jpg"]);
  }, []);

  return (
    <div className="relative w-full h-64 md:h-80 mb-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
      <LazyImage
        src="/lovable-uploads/Luxury_RV_Living-min.jpg"
        alt="RV in scenic location"
        className="w-full h-full object-cover"
        fetchPriority="high"
        loading="eager"
        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23131a2a'/%3E%3C/svg%3E"
      />
      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">RV Weather</h1>
        <p className="text-lg text-white drop-shadow-lg mt-2">Plan your travels with confidence</p>
      </div>
    </div>
  );
};

export default HeaderImage;
