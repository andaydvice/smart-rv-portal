
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  srcSetWebp?: string;
  srcSet?: string;
  sizes?: string;
  blurDataURL?: string; // For blur-up placeholder (base64 or small image url)
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
  ...props
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

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
          {srcSetWebp && (
            <source srcSet={srcSetWebp} type="image/webp" sizes={sizes} />
          )}
          {srcSet && (
            <source srcSet={srcSet} sizes={sizes} />
          )}
          <img
            src={src}
            alt={alt || ''}
            loading="lazy"
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
