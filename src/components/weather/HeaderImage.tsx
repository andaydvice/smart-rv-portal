import React from 'react';

const HeaderImage: React.FC = () => {
  return (
    <div className="relative w-full h-48 mb-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
      <img
        src="/lovable-uploads/Luxury_RV_Living-min.jpg"
        alt="RV in scenic location"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HeaderImage;