import React from 'react';
import { VideoWithFallback } from './VideoWithFallback';
import { getVideoConfig } from '@/components/sections/VideoConfiguration';
import { cn } from '@/lib/utils';

interface VideoSectionProps {
  videoId: string;
  className?: string;
  title?: string;
  description?: string;
  autoPlay?: boolean;
}

// Demo video sources mapping
const VIDEO_SOURCES: Record<string, any> = {
  'power-management-demo': [
    { type: 'youtube', src: 'dQw4w9WgXcQ', poster: '/lovable-uploads/power-management-thumb.jpg' },
    { type: 'direct', src: '/videos/power-demo.mp4', poster: '/lovable-uploads/power-management-thumb.jpg' }
  ],
  'solar-power-demo': [
    { type: 'youtube', src: 'dQw4w9WgXcQ', poster: '/lovable-uploads/solar-power-thumb.jpg' },
    { type: 'direct', src: '/videos/solar-demo.mp4', poster: '/lovable-uploads/solar-power-thumb.jpg' }
  ],
  'battery-comparison-demo': [
    { type: 'youtube', src: 'dQw4w9WgXcQ', poster: '/lovable-uploads/battery-comparison-thumb.jpg' },
    { type: 'direct', src: '/videos/battery-demo.mp4', poster: '/lovable-uploads/battery-comparison-thumb.jpg' }
  ],
  'towing-safety-demo': [
    { type: 'youtube', src: 'dQw4w9WgXcQ', poster: '/lovable-uploads/towing-safety-thumb.jpg' },
    { type: 'direct', src: '/videos/towing-demo.mp4', poster: '/lovable-uploads/towing-safety-thumb.jpg' }
  ],
  'rv-trip-planning': [
    { type: 'youtube', src: 'dQw4w9WgXcQ', poster: '/lovable-uploads/trip-planning-thumb.jpg' },
    { type: 'direct', src: '/videos/trip-planning-demo.mp4', poster: '/lovable-uploads/trip-planning-thumb.jpg' }
  ],
  'smart-systems-demo': [
    { type: 'youtube', src: 'dQw4w9WgXcQ', poster: '/lovable-uploads/smart-systems-thumb.jpg' },
    { type: 'direct', src: '/videos/smart-systems-demo.mp4', poster: '/lovable-uploads/smart-systems-thumb.jpg' }
  ],
  'connectivity-demo': [
    { type: 'youtube', src: 'dQw4w9WgXcQ', poster: '/lovable-uploads/connectivity-thumb.jpg' },
    { type: 'direct', src: '/videos/connectivity-demo.mp4', poster: '/lovable-uploads/connectivity-thumb.jpg' }
  ],
  'tire-monitoring-demo': [
    { type: 'youtube', src: 'dQw4w9WgXcQ', poster: '/lovable-uploads/tire-monitoring-thumb.jpg' },
    { type: 'direct', src: '/videos/tire-monitoring-demo.mp4', poster: '/lovable-uploads/tire-monitoring-thumb.jpg' }
  ]
};

export const VideoSection: React.FC<VideoSectionProps> = ({
  videoId,
  className,
  title,
  description,
  autoPlay = false
}) => {
  const config = getVideoConfig(videoId);
  const sources = VIDEO_SOURCES[videoId] || [];
  
  const videoTitle = title || config?.title || 'Demo Video';
  const videoDescription = description || config?.description;
  const fallbackImage = sources[0]?.poster;

  return (
    <div className={cn("space-y-4", className)}>
      <VideoWithFallback
        sources={sources}
        title={videoTitle}
        fallbackImage={fallbackImage}
        autoPlay={autoPlay}
        className="rounded-lg shadow-lg"
      />
      
      {(videoTitle || videoDescription) && (
        <div className="space-y-2">
          {videoTitle && (
            <h3 className="text-lg font-semibold text-white">
              {videoTitle}
            </h3>
          )}
          {videoDescription && (
            <p className="text-gray-300 text-sm leading-relaxed">
              {videoDescription}
            </p>
          )}
        </div>
      )}
    </div>
  );
};