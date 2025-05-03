
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

  // Create responsive image sizes based on actual image dimensions
  const sizes = width 
    ? `(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) ${Math.min(width, 1024)}px, ${width}px` 
    : '(max-width: 640px) 100vw, (max-width: 768px) 75vw, 50vw';

  // Detect if image appears to be a header image (for proper default priority)
  const isLikelyHeaderImage = src.includes('header') || width > 1000 || className?.includes('header');
  
  // Default to high priority for header-like images
  const priority = isLikelyHeaderImage;

  // If it's a documentation image, explicitly set priority to true
  const isDocumentationImage = src.includes('f72886c3-3677-4dfe-8d56-5a784197eda2') || 
                              src.includes('846b5be5-043e-4645-a3d9-39614d63342c');

  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      blurDataURL={placeholderSvg}
      sizes={sizes}
      width={width}
      height={height}
      priority={isDocumentationImage || priority}
    />
  );
};
