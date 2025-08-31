import React, { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { YouTubeEmbed } from './YouTubeEmbed';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoSource {
  type: 'direct' | 'youtube';
  src: string; // For direct: video URL, for YouTube: video ID
  poster?: string;
}

interface VideoWithFallbackProps {
  sources: VideoSource[];
  title?: string;
  className?: string;
  fallbackImage?: string;
  autoPlay?: boolean;
  muted?: boolean;
}

export const VideoWithFallback: React.FC<VideoWithFallbackProps> = ({
  sources,
  title,
  className,
  fallbackImage,
  autoPlay = false,
  muted = true
}) => {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (currentSourceIndex < sources.length - 1) {
      setCurrentSourceIndex(currentSourceIndex + 1);
    } else {
      setHasError(true);
    }
  };

  // If all sources failed, show fallback
  if (hasError || sources.length === 0) {
    return (
      <div className={cn("relative aspect-video bg-gray-900 rounded-lg overflow-hidden", className)}>
        {fallbackImage ? (
          <div className="relative w-full h-full">
            <img
              src={fallbackImage}
              alt={title || "Video preview"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm font-medium">{title || "Watch Video"}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <div className="text-center">
              <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm opacity-75">Video unavailable</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentSource = sources[currentSourceIndex];

  if (currentSource.type === 'youtube') {
    return (
      <YouTubeEmbed
        videoId={currentSource.src}
        title={title}
        className={className}
        autoPlay={autoPlay}
        thumbnail={currentSource.poster}
      />
    );
  }

  return (
    <VideoPlayer
      src={currentSource.src}
      poster={currentSource.poster}
      title={title}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      onError={handleError}
    />
  );
};