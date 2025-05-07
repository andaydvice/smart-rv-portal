
import React, { useEffect } from 'react';
import { generateImagePlaceholder } from '@/utils/performance';

interface PreloadedHeaderImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const PreloadedHeaderImage = ({
  src,
  alt,
  className = '',
  width = 1920,
  height = 600
}: PreloadedHeaderImageProps) => {
  // Generate a simple color placeholder instead of a full image placeholder
  const placeholder = generateImagePlaceholder(width, height);
  
  // Immediately preload the image with high priority when component mounts
  useEffect(() => {
    console.log('Preloading header image:', src);
    
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
      console.log('Header image loaded:', src);
    };
    preloadImage.onerror = () => {
      console.error('Failed to load header image:', src);
    };
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [src]);

  return (
    <>
      {/* Background placeholder that shows immediately - darker to match loaded image */}
      <div 
        className="absolute inset-0 bg-[#080F1F] z-0" 
        aria-hidden="true"
        style={{ 
          backgroundImage: `url(${placeholder})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Placeholder overlay gradient to ensure text readability during loading */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/90 z-5" 
           aria-hidden="true" />
      
      {/* Actual image with z-index lowered to ensure text is visible above it */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300`}
        width={width}
        height={height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{ 
          position: 'relative', 
          zIndex: 1, // Keep z-index low so text can appear above
          opacity: 1 // Force visible with inline style
        }}
        onLoad={(e) => {
          console.log('Header image DOM loaded:', src);
          if (e.currentTarget) {
            // When image loads, make it fully visible
            e.currentTarget.style.opacity = '1';
          }
        }}
      />
    </>
  );
};
