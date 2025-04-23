
import React from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "@/components/ui/LazyImage";
import { generateImagePlaceholder } from "@/utils/performance";

interface ModelCardProps {
  name: string;
  image: string;
  price: string;
  description: string;
}

const ModelCard = ({ name, image, price, description }: ModelCardProps) => {
  const placeholderSvg = generateImagePlaceholder(400, 250, '131a2a');
  
  return (
    <div className="bg-[#131a2a] rounded-xl overflow-hidden border border-gray-800 hover:border-[#5B9BD5] transition-all duration-300 text-left">
      <div className="h-48 relative">
        <LazyImage 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          blurDataURL={placeholderSvg}
          sizes="(max-width: 768px) 100vw, 33vw"
          fetchPriority="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131a2a] to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-[#5B9BD5] font-semibold mb-4">{price}</p>
        <p className="text-gray-300 mb-6">{description}</p>
        <Link 
          to={`/models/${name.split(' ')[0].toLowerCase()}`} 
          className="block text-center py-2 px-4 bg-[#5B9BD5] hover:bg-[#4B8FE3] rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ModelCard;
