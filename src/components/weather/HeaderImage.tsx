
import React from 'react';
import { LazyImage } from '@/components/ui/LazyImage';

const HeaderImage: React.FC = () => {
  return (
    <div className="relative w-full h-64 md:h-80 mb-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
      <LazyImage
        src="/lovable-uploads/Luxury_RV_Living-min.jpg"
        alt="RV in scenic location"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">RV Weather</h1>
        <p className="text-lg text-white drop-shadow-lg mt-2">Plan your travels with confidence</p>
      </div>
    </div>
  );
};

export default HeaderImage;
