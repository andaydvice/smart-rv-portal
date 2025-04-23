
import React from 'react';
import { LazyImage } from '@/components/ui/LazyImage';
import { generateImagePlaceholder } from '@/utils/performance';

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
  const placeholderSvg = generateImagePlaceholder(
    width || 100,
    height || Math.round((width || 100) * aspectRatio),
    '131a2a'
  );

  // Create responsive image sizes
  const sizes = width 
    ? `(max-width: 640px) 100vw, (max-width: 768px) 75vw, ${width}px` 
    : '(max-width: 640px) 100vw, (max-width: 768px) 75vw, 50vw';

  // Determine if this is a priority image (width > 0 means it's important enough to have dimensions specified)
  const isPriority = Boolean(width && width > 0);

  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      blurDataURL={placeholderSvg}
      sizes={sizes}
      width={width}
      height={height}
      loading={isPriority ? "eager" : "lazy"}
      fetchPriority={isPriority ? "high" : "auto"}
    />
  );
};
