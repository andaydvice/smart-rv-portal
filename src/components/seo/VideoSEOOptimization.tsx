import React from 'react';
import { Helmet } from 'react-helmet';
import { Play, Clock, Eye, FileText } from 'lucide-react';

interface VideoSEOProps {
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploadDate: string;
  transcript?: string;
  chapters?: Array<{
    title: string;
    startTime: string;
    description: string;
  }>;
  tags?: string[];
}

const VideoSEOOptimization: React.FC<VideoSEOProps> = ({
  title,
  description,
  duration,
  thumbnailUrl,
  videoUrl,
  uploadDate,
  transcript,
  chapters = [],
  tags = []
}) => {
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "contentUrl": videoUrl,
    "embedUrl": videoUrl,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": 1000
    },
    "publisher": {
      "@type": "Organization",
      "name": "Smart RV Technology",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    }
  };

  if (chapters.length > 0) {
    videoSchema["hasPart"] = chapters.map((chapter, index) => ({
      "@type": "Clip",
      "name": chapter.title,
      "startOffset": chapter.startTime,
      "url": `${videoUrl}?t=${chapter.startTime}`
    }));
  }

  const formatDuration = (duration: string) => {
    const match = duration.match(/(\d+):(\d+)/);
    if (match) {
      return `${match[1]}m ${match[2]}s`;
    }
    return duration;
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(videoSchema)}
        </script>
        <meta name="video:duration" content={duration} />
        <meta name="video:tag" content={tags.join(', ')} />
      </Helmet>

      <div className="bg-[#151A22] rounded-lg border border-gray-700 overflow-hidden">
        {/* Video Header */}
        <div className="relative">
          <div className="aspect-video bg-[#091020] border-b border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-[#5B9BD5] mx-auto mb-4" />
              <p className="text-white font-medium">{title}</p>
              <p className="text-gray-400 text-sm mt-1">{formatDuration(duration)}</p>
            </div>
          </div>
          
          {/* Video Metadata */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-lg">{title}</h3>
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDuration(duration)}
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  1.2K views
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {description}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#5B9BD5]/10 text-[#5B9BD5] px-2 py-1 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Video Chapters */}
        {chapters.length > 0 && (
          <div className="border-t border-gray-700 p-4">
            <h4 className="text-white font-medium mb-3">Video Chapters</h4>
            <div className="space-y-2">
              {chapters.map((chapter, index) => (
                <div key={index} className="flex items-start p-3 bg-[#091020] rounded-lg border border-gray-600 hover:border-[#5B9BD5]/50 transition-colors cursor-pointer">
                  <div className="w-12 h-8 bg-[#5B9BD5]/20 rounded flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-[#5B9BD5] text-xs font-medium">{chapter.startTime}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{chapter.title}</div>
                    <div className="text-gray-400 text-xs mt-1">{chapter.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Transcript */}
        {transcript && (
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center mb-3">
              <FileText className="h-4 w-4 text-[#5B9BD5] mr-2" />
              <h4 className="text-white font-medium">Video Transcript</h4>
              <span className="ml-2 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                SEO Optimized
              </span>
            </div>
            
            <div className="bg-[#091020] rounded-lg p-4 border border-gray-600 max-h-48 overflow-y-auto">
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {transcript.substring(0, 500)}
                {transcript.length > 500 && (
                  <span className="text-[#5B9BD5] cursor-pointer hover:text-[#4B8FE3]">
                    ... Read more
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* SEO Benefits */}
        <div className="border-t border-gray-700 p-4 bg-[#091020]/50">
          <h4 className="text-white font-medium mb-2">SEO Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-green-400 text-xs">✓</span>
              </div>
              <div className="text-gray-300 text-xs">Rich Snippets</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-blue-400 text-xs">✓</span>
              </div>
              <div className="text-gray-300 text-xs">Video Schema</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-purple-400 text-xs">✓</span>
              </div>
              <div className="text-gray-300 text-xs">Searchable Content</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoSEOOptimization;