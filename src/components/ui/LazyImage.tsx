
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className, 
  fallbackText = 'Failed to load image',
  ...props 
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton className={cn("absolute inset-0", className)} />
      )}
      {!error ? (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          className={cn(className, isLoading ? 'opacity-0' : 'opacity-100', 'transition-opacity duration-300')}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
          {...props}
        />
      ) : (
        <div className={cn(className, "bg-gray-800 flex items-center justify-center")}>
          <p className="text-gray-400 text-sm">{fallbackText}</p>
        </div>
      )}
    </div>
  );
};
