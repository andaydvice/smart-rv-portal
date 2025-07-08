import React, { useState, useRef, useEffect } from 'react';
import { generateImagePlaceholder } from '@/utils/performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width = 800,
  height = 600,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 60vw, 800px",
  quality = 85
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image URLs
  const generateSrcSet = (originalSrc: string) => {
    const breakpoints = [320, 640, 768, 1024, 1280, 1920];
    return breakpoints
      .map(bp => `${originalSrc}?width=${bp}&quality=${quality}&format=webp ${bp}w`)
      .join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const shouldLoad = priority || isInView;
  const placeholder = generateImagePlaceholder(width, height);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          style={{ 
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={shouldLoad ? src : undefined}
        srcSet={shouldLoad ? generateSrcSet(src) : undefined}
        sizes={shouldLoad ? sizes : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          aspectRatio: `${width}/${height}`,
        }}
      />
    </div>
  );
};