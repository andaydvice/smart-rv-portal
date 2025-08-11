
import React, { useEffect, useState } from 'react';
import { generateImagePlaceholder } from '@/utils/performance';

interface PreloadedHeaderImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onImageLoaded?: () => void; // Add callback prop
}

export const PreloadedHeaderImage = ({
  src,
  alt,
  className = '',
  width = 1920,
  height = 600,
  onImageLoaded // Add callback prop
}: PreloadedHeaderImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  // Generate a simple color placeholder instead of a full image placeholder
  const placeholder = generateImagePlaceholder(width, height);
  
  // Immediately preload the image with high priority when component mounts
  useEffect(() => {
    if (import.meta.env.DEV) console.log('Preloading header image:', src);
    
    // Create and inject a preload link element in the document head
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    // Also preload using Image constructor for immediate loading
    const preloadImage = new Image();
    preloadImage.src = src;
    preloadImage.onload = () => {
      if (import.meta.env.DEV) console.log('Header image loaded:', src);
      setImageLoaded(true);
      if (onImageLoaded) {
        onImageLoaded();
      }
    };
    preloadImage.onerror = () => {
      if (import.meta.env.DEV) console.error('Failed to load header image:', src);
    };
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [src, onImageLoaded]);

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
        loading="eager"
        {...({ fetchpriority: 'high' } as any)}
        decoding="async"
        style={{ 
          position: 'relative', 
          zIndex: 1, // Keep z-index low so text can appear above
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
