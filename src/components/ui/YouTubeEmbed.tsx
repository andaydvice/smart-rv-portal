import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  privacyEnhanced?: boolean;
  thumbnail?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  className,
  autoPlay = false,
  showControls = true,
  privacyEnhanced = true,
  thumbnail
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const baseUrl = privacyEnhanced 
    ? 'https://www.youtube-nocookie.com/embed/'
    : 'https://www.youtube.com/embed/';
  
  const params = new URLSearchParams({
    autoplay: autoPlay ? '1' : '0',
    controls: showControls ? '1' : '0',
    modestbranding: '1',
    rel: '0',
    iv_load_policy: '3'
  });

  const embedUrl = `${baseUrl}${videoId}?${params.toString()}`;
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const loadVideo = () => {
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div className={cn("relative aspect-video bg-gray-900 flex items-center justify-center rounded-lg", className)}>
        <div className="text-center text-white">
          <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm opacity-75">Video unavailable</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div 
        className={cn("relative aspect-video bg-black rounded-lg overflow-hidden cursor-pointer group", className)}
        onClick={loadVideo}
      >
        <img
          src={thumbnailUrl}
          alt={title || "Video thumbnail"}
          className="w-full h-full object-cover"
          onError={handleError}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
        {title && (
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-sm bg-black/50 backdrop-blur-sm p-2 rounded">
              {title}
            </h3>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-video rounded-lg overflow-hidden", className)}>
      <iframe
        src={embedUrl}
        title={title || "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};