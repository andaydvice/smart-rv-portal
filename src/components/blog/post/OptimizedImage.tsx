
import React from 'react';
import { LazyImage } from '@/components/ui/LazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage = ({ src, alt, className = '' }: OptimizedImageProps) => {
  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
    />
  );
};
