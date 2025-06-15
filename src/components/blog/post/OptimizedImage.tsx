
import React from 'react';
import { LazyImage } from '@/components/ui/LazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = "",
  width,
  height
}) => {
  return (
    <LazyImage 
      src={src} 
      alt={alt}
      className={className}
      loading="lazy"
      fetchPriority="high"
      width={width}
      height={height}
    />
  );
};
