
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  srcSetWebp?: string;
  srcSet?: string;
  sizes?: string;
  blurDataURL?: string;
  priority?: boolean;
}

export const LazyImage = ({
  src,
  alt,
  className,
  fallbackText = 'Failed to load image',
  srcSetWebp,
  srcSet,
  sizes,
  blurDataURL,
  priority = false,
  width,
  height,
  ...props
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);
  
  // Check if this is a documentation image that should always be priority
  const isDocumentationImage = src && typeof src === 'string' && (
    src.includes('f72886c3-3677-4dfe-8d56-5a784197eda2') || 
    src.includes('846b5be5-043e-4645-a3d9-39614d63342c')
  );
  
  // Force priority for known critical images
  const shouldPrioritize = priority || isDocumentationImage;
  
  // Preload the image if it's marked as priority
  useEffect(() => {
    if (shouldPrioritize && src) {
      console.log(`LazyImage - Preloading priority image: ${src}`);
      
      // Immediately create and inject a preload link in the document head
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      // Use lowercase for HTML attributes in DOM API
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
      
      // Also preload using Image constructor for immediate loading
      const preloadImage = new Image();
      preloadImage.src = src;
      // Use setAttribute for fetchpriority to avoid TypeScript errors
      preloadImage.setAttribute('fetchpriority', 'high');
      if (width) preloadImage.width = Number(width);
      if (height) preloadImage.height = Number(height);
      
      // Once the image is preloaded, update the loading state
      preloadImage.onload = () => {
        setIsLoading(false);
      };
      
      preloadImage.onerror = () => {
        setError(true);
        setIsLoading(false);
      };
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [shouldPrioritize, src, width, height]);

  return (
    <div className="relative">
      {/* Blur placeholder */}
      {isLoading && blurDataURL && !error && (
        <img
          src={blurDataURL}
          alt={alt || ''}
          aria-hidden="true"
          className={cn(
            className,
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 blur-md scale-105 z-0"
          )}
          style={{ filter: 'blur(16px)' }}
          draggable={false}
          width={width}
          height={height}
        />
      )}
      {/* Skeleton fallback */}
      {isLoading && !blurDataURL && (
        <Skeleton className={cn('absolute inset-0', className)} />
      )}
      {/* Actual Image (with WebP support) */}
      {!error ? (
        <picture>
          {srcSetWebp && (
            <source srcSet={srcSetWebp} type="image/webp" sizes={sizes} />
          )}
          {srcSet && (
            <source srcSet={srcSet} sizes={sizes} />
          )}
          <img
            src={src}
            alt={alt || ''}
            loading={shouldPrioritize ? 'eager' : 'lazy'}
            // Use setAttribute for fetchpriority to avoid React warnings
            {...shouldPrioritize ? { 'fetchpriority': 'high' } : {}}
            className={cn(
              className,
              isLoading ? 'opacity-0' : 'opacity-100',
              'transition-opacity duration-300'
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError(true);
              setIsLoading(false);
            }}
            srcSet={srcSet}
            sizes={sizes}
            width={width}
            height={height}
            {...props}
          />
        </picture>
      ) : (
        <div className={cn(className, "bg-gray-800 flex items-center justify-center")}>
          <p className="text-gray-400 text-sm">{fallbackText}</p>
        </div>
      )}
    </div>
  );
};
