import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { LazyImage } from '@/components/ui/LazyImage';
import { getOptimizedImageProps } from '@/utils/imageOptimization';

interface ToolPreviewCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  toolPath: string;
  icon?: LucideIcon;
}

export const ToolPreviewCard: React.FC<ToolPreviewCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  toolPath,
  icon: Icon
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-[#091020] to-[#151A22] rounded-2xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300 overflow-hidden group">
      <div className="mb-6">
        <LazyImage
          {...getOptimizedImageProps(
            imageSrc,
            imageAlt,
            "card",
            false
          )}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="px-8 pb-8">
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className="p-2 bg-[#5B9BD5]/20 rounded-lg">
              <Icon className="h-6 w-6 text-[#5B9BD5]" />
            </div>
          )}
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        
        <p className="text-[#E2E8FF] text-lg mb-6 leading-relaxed">
          {description}
        </p>
        
        <Button
          onClick={() => navigate(toolPath)}
          className="w-full bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] text-white font-semibold group/btn"
        >
          Use This Tool
          <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};
