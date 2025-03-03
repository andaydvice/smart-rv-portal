
import React from 'react';

const ChecklistHeroImage: React.FC = () => {
  const imagePath = "/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png";

  return (
    <div 
      className="w-full relative mb-8" 
      style={{ 
        visibility: 'visible', 
        display: 'block',
        opacity: 1
      }}
    >
      {/* Primary image - always visible */}
      <img 
        src={imagePath} 
        alt="Complete Guide to Indoor RV Vehicle Storage Preparation" 
        className="w-full h-auto object-cover"
        fetchPriority="high"
        style={{
          visibility: 'visible', 
          opacity: 1,
          display: 'block',
          width: '100%',
          maxWidth: '100%'
        }}
      />
      
      {/* Fallback image in case the primary fails */}
      <noscript>
        <img 
          src={imagePath} 
          alt="Complete Guide to Indoor RV Vehicle Storage Preparation" 
          className="w-full h-auto object-cover"
          style={{
            visibility: 'visible', 
            opacity: 1,
            display: 'block',
            width: '100%'
          }}
        />
      </noscript>
    </div>
  );
};

export default ChecklistHeroImage;
