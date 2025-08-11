
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
  
  // Check if this is a feature image for Remote Control page
  const isFeatureImage = src && typeof src === 'string' && (
    src.includes('1052608d-e42b-4079-9281-20406179ce4d') || 
    src.includes('af7df254-2b02-454a-a483-7e1e230dc571') ||
    src.includes('58df06da-2491-453e-9f4d-11154ddb1104')
  );
  
  // Force priority for known critical images
  const shouldPrioritize = priority || isDocumentationImage || isFeatureImage;
  
  // Add safety timeout to make images visible even if onLoad doesn't fire
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Failsafe: Make image visible after 2 seconds regardless
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  useEffect(() => {
    // no-op: rely on native fetchPriority and browser scheduling
  }, [shouldPrioritize, src]);

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
            {...({ fetchpriority: shouldPrioritize ? 'high' : 'auto' } as any)}
            className={cn(
              className,
              shouldPrioritize ? 'opacity-100' : (isLoading ? 'opacity-0' : 'opacity-100'),
              'transition-opacity duration-300'
            )}
            style={{
              // Add inline style to ensure opacity works even if class isn't applied
              opacity: shouldPrioritize || !isLoading ? 1 : 0,
              ...props.style
            }}
            onLoad={(e) => {
              if (import.meta.env.DEV) console.log('Image loaded:', src);
              setIsLoading(false);
              if (props.onLoad) props.onLoad(e);
            }}
            onError={(e) => {
              if (import.meta.env.DEV) console.error('Image failed to load:', src);
              setError(true);
              setIsLoading(false);
              if (props.onError) props.onError(e);
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
