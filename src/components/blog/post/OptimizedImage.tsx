
import React from 'react';
import { LazyImage } from '@/components/ui/LazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = "" 
}) => {
  return (
    <LazyImage 
      src={src} 
      alt={alt}
      className={className}
      loading="lazy"
      fetchpriority="high"
    />
  );
};
