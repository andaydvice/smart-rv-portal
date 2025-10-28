
import React, { useState } from 'react';
import { generateImagePlaceholder } from '@/utils/performance';

interface PreloadedHeaderImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: 'high' | 'auto' | 'low';
  onImageLoaded?: () => void; // Add callback prop
}

export const PreloadedHeaderImage = ({
  src,
  alt,
  className = '',
  width = 1920,
  height = 600,
  sizes,
  priority = 'auto',
  onImageLoaded // Add callback prop
}: PreloadedHeaderImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  // Generate a simple color placeholder instead of a full image placeholder
  const placeholder = generateImagePlaceholder(width, height);
  
  // Streamlined: avoid duplicate preloads; rely on img attributes and browser scheduling


  return (
    <>
      {/* Dark background that shows during loading */}
      <div 
        className="absolute inset-0 bg-[#080F1F] z-0" 
        aria-hidden="true"
        style={{ 
          backgroundImage: `url(${placeholder})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Actual image with z-index lowered to ensure text is visible above it */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300`}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority === 'high' ? 'eager' : 'lazy'}
        {...({ fetchpriority: priority } as any)}
        decoding="async"
        style={{ 
          opacity: imageLoaded ? 1 : 0 // Show only when loaded
        }}
        onLoad={(e) => {
          if (import.meta.env.DEV) console.log('Header image DOM loaded:', src);
          if (e.currentTarget) {
            // When image loads, make it fully visible
            e.currentTarget.style.opacity = '1';
            setImageLoaded(true);
            if (onImageLoaded) {
              onImageLoaded();
            }
          }
        }}
      />
    </>
  );
};
