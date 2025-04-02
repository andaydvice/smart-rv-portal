
import React, { useState } from 'react';

const HeaderImage: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-64 md:h-80 mb-8">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
      <img
        src="/lovable-uploads/Luxury_RV_Living-min.jpg"
        alt="RV in scenic location"
        className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">RV Weather</h1>
        <p className="text-lg text-white drop-shadow-lg mt-2">Plan your travels with confidence</p>
      </div>
    </div>
  );
};

export default HeaderImage;
