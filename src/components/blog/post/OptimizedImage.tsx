
import React from 'react';
import { LazyImage } from '@/components/ui/LazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '',
  width,
  height
}: OptimizedImageProps) => {
  // Generate a tiny SVG placeholder based on the image dimensions
  const aspectRatio = width && height ? (height / width) : 0.5625; // Default to 16:9
  const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 100} ${height || Math.round((width || 100) * aspectRatio)}'%3E%3Crect width='${width || 100}' height='${height || Math.round((width || 100) * aspectRatio)}' fill='%23131a2a'/%3E%3C/svg%3E`;

  // Create responsive image sizes
  const sizes = width 
    ? `(max-width: 640px) 100vw, (max-width: 768px) 75vw, ${width}px` 
    : '(max-width: 640px) 100vw, (max-width: 768px) 75vw, 50vw';

  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      blurDataURL={placeholderSvg}
      sizes={sizes}
      width={width}
      height={height}
    />
  );
};
