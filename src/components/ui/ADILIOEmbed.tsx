import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ADILIOEmbedProps {
  embedUrl: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  fallbackImage?: string;
}

export const ADILIOEmbed: React.FC<ADILIOEmbedProps> = ({
  embedUrl,
  title,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  fallbackImage
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  // Construct ADILIO iframe URL with proper parameters
  const params = new URLSearchParams({
    autoplay: autoPlay ? '1' : '0',
    muted: muted ? '1' : '0',
    loop: loop ? '1' : '0',
    controls: '0', // Hide controls for background video
    modestbranding: '1'
  });

  const finalEmbedUrl = embedUrl.includes('?') 
    ? `${embedUrl}&${params.toString()}`
    : `${embedUrl}?${params.toString()}`;

  if (hasError && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt={title || "Video fallback"}
        className={cn("w-full h-full object-cover", className)}
        loading="eager"
      />
    );
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <iframe
        src={finalEmbedUrl}
        title={title || "ADILIO video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
        onError={handleError}
        style={{ 
          border: 'none',
          background: 'transparent'
        }}
      />
    </div>
  );
};