import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Brand {
  usa: string[];
  australia: string[];
}

interface RVTypeProps {
  title: string;
  icon: LucideIcon;
  size: string;
  features: string;
  pros: string;
  brands: Brand;
  image?: string;
  index: number;
}

const RVTypeCard = ({ title, icon: Icon, size, features, pros, brands, image, index }: RVTypeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 hover:bg-gray-800/60 transition-colors"
    >
      {image && (
        <div className="mb-8 rounded-lg overflow-hidden bg-gray-900">
          <div className="w-full h-[400px] bg-gray-900">
            <img 
              src={image} 
              alt={`${title} example`}
              className="w-full h-full object-cover"
              loading="lazy"
              style={{ backgroundColor: '#111827' }} // Matching bg-gray-900
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-4 mb-6">
        <Icon className="w-8 h-8 text-blue-400" />
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Size</h3>
            <p className="text-gray-300">{size}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Features</h3>
            <p className="text-gray-300">{features}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Pros</h3>
            <p className="text-gray-300">{pros}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">Popular Brands</h3>
            <div className="grid gap-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">USA</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {brands.usa.map((brand, idx) => (
                    <li key={idx}>{brand}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Australia</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {brands.australia.map((brand, idx) => (
                    <li key={idx}>{brand}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RVTypeCard;