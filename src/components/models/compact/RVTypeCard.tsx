
import React from 'react';
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { LazyImage } from "@/components/ui/LazyImage";
import { generateImagePlaceholder } from "@/utils/performance";

interface RVTypeProps {
  title: string;
  icon: LucideIcon;
  size: string;
  features: string;
  pros: string;
  brands: {
    usa: string[];
    australia: string[];
  };
  image?: string;
  index: number;
}

const RVTypeCard: React.FC<RVTypeProps> = ({
  title,
  icon: Icon,
  size,
  features,
  pros,
  brands,
  image,
  index
}) => {
  const isEven = index % 2 === 0;
  const placeholderSvg = generateImagePlaceholder(800, 500, '1a1f2b');
  const isPriority = index < 2; // First two cards load with priority

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 * index }}
      className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8`}>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600/20 p-2 rounded-lg">
              <Icon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <p><span className="text-blue-400 font-medium">Size:</span> {size}</p>
            <p><span className="text-blue-400 font-medium">Features:</span> {features}</p>
            <p><span className="text-blue-400 font-medium">Pros:</span> {pros}</p>
            
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Popular Brands</h4>
              <div className="space-y-2">
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-1">USA Brands</h5>
                  <p className="text-gray-300 text-sm">{brands.usa.join(', ')}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-1">Australia Brands</h5>
                  <p className="text-gray-300 text-sm">{brands.australia.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {image && (
          <div className="w-full lg:w-1/2 h-64 rounded-lg overflow-hidden">
            <LazyImage
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              blurDataURL={placeholderSvg}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading={isPriority ? "eager" : "lazy"}
              fetchPriority={isPriority ? "high" : "auto"}
              onError={(e) => {
                console.error(`Failed to load image: ${image}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RVTypeCard;
