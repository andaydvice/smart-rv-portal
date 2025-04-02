
import React from "react";

interface CompareHeroProps {
  title: string;
  description: string;
  imageSrc: string;
}

const CompareHero = ({ title, description, imageSrc }: CompareHeroProps) => {
  return (
    <div className="relative w-full h-96">
      <img 
        src={imageSrc} 
        alt="RV models comparison" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full text-left px-4">
          <h1 className="text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompareHero;
