
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  srcSetWebp?: string;
  srcSet?: string;
  sizes?: string;
  blurDataURL?: string; // For blur-up placeholder (base64 or small image url)
  fetchPriority?: 'high' | 'low' | 'auto';
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
  fetchPriority = 'auto',
  loading = 'lazy',
  ...props
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Decode image data in a separate thread when possible
  useEffect(() => {
    if (!src || error) return;
    
    const img = new Image();
    img.src = src;
    img.decode().catch(() => {
      // Silent catch - we'll handle errors in the onError handler
    });
  }, [src, error]);

  // Detect WebP support
  const [supportsWebP, setSupportsWebP] = useState(false);
  useEffect(() => {
    const checkWebP = async () => {
      const webPSupport = await testWebP();
      setSupportsWebP(webPSupport);
    };
    checkWebP();
  }, []);

  // Test WebP support
  const testWebP = () => {
    return new Promise<boolean>(resolve => {
      const webP = new Image();
      webP.onload = () => resolve(true);
      webP.onerror = () => resolve(false);
      webP.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    });
  };

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
        />
      )}
      {/* Skeleton fallback */}
      {isLoading && !blurDataURL && (
        <Skeleton className={cn('absolute inset-0', className)} />
      )}
      {/* Actual Image (with WebP support) */}
      {!error ? (
        <picture>
          {srcSetWebp && supportsWebP && (
            <source srcSet={srcSetWebp} type="image/webp" sizes={sizes} />
          )}
          {srcSet && (
            <source srcSet={srcSet} sizes={sizes} />
          )}
          <img
            src={src}
            alt={alt || ''}
            loading={loading}
            fetchPriority={fetchPriority}
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
            decoding="async"
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
