import React, { useState } from 'react';
import { Star, Clock, TrendingUp, Users, BookOpen, Video } from 'lucide-react';

interface ContentFrameworkProps {
  title: string;
  category: 'pillar' | 'cluster' | 'supporting';
  depthScore?: number;
  wordCount?: number;
  lastUpdated?: string;
  relatedContent?: Array<{
    title: string;
    url: string;
    type: 'internal' | 'external';
  }>;
  contentGaps?: string[];
  videoContent?: {
    title: string;
    duration: string;
    transcript?: string;
  };
}

const ContentFramework: React.FC<ContentFrameworkProps> = ({
  title,
  category,
  depthScore = 0,
  wordCount = 0,
  lastUpdated,
  relatedContent = [],
  contentGaps = [],
  videoContent
}) => {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const getCategoryColor = () => {
    switch (category) {
      case 'pillar': return 'from-[#5B9BD5] to-[#4B8FE3]';
      case 'cluster': return 'from-green-500 to-emerald-500';
      case 'supporting': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDepthScoreColor = () => {
    if (depthScore >= 80) return 'text-green-400';
    if (depthScore >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-[#151A22] rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getCategoryColor()} p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white/80 text-sm font-medium uppercase tracking-wide">
              {category} Content
            </span>
            <h3 className="text-white font-bold text-lg">{title}</h3>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getDepthScoreColor()}`}>
              {depthScore}
            </div>
            <div className="text-white/80 text-xs">Depth Score</div>
          </div>
        </div>
      </div>

      {/* Content Metrics */}
      <div className="p-4 border-b border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <BookOpen className="h-5 w-5 text-[#5B9BD5] mx-auto mb-1" />
            <div className="text-white font-semibold">{wordCount.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">Words</div>
          </div>
          
          <div className="text-center">
            <Users className="h-5 w-5 text-green-400 mx-auto mb-1" />
            <div className="text-white font-semibold">{relatedContent.length}</div>
            <div className="text-gray-400 text-xs">Links</div>
          </div>
          
          <div className="text-center">
            <TrendingUp className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
            <div className="text-white font-semibold">{contentGaps.length}</div>
            <div className="text-gray-400 text-xs">Gaps</div>
          </div>
          
          <div className="text-center">
            <Clock className="h-5 w-5 text-blue-400 mx-auto mb-1" />
            <div className="text-white font-semibold">
              {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'N/A'}
            </div>
            <div className="text-gray-400 text-xs">Updated</div>
          </div>
        </div>
      </div>

      {/* Video Content */}
      {videoContent && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center mb-2">
            <Video className="h-4 w-4 text-[#5B9BD5] mr-2" />
            <span className="text-white font-medium">Video Content</span>
          </div>
          <div className="bg-[#091020] rounded-lg p-3 border border-gray-600">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">{videoContent.title}</span>
              <span className="text-[#5B9BD5] text-sm font-medium">{videoContent.duration}</span>
            </div>
            {videoContent.transcript && (
              <div className="mt-2 text-gray-400 text-xs">
                Transcript available for SEO
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Gaps */}
      {contentGaps.length > 0 && (
        <div className="p-4 border-b border-gray-700">
          <h4 className="text-white font-medium mb-2">Content Opportunities</h4>
          <div className="space-y-1">
            {contentGaps.slice(0, 3).map((gap, index) => (
              <div key={index} className="text-gray-400 text-sm">
                • {gap}
              </div>
            ))}
            {contentGaps.length > 3 && (
              <div className="text-[#5B9BD5] text-sm cursor-pointer hover:text-[#4B8FE3]">
                +{contentGaps.length - 3} more opportunities
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <div className="p-4">
          <h4 className="text-white font-medium mb-2">Related Content</h4>
          <div className="space-y-2">
            {relatedContent.slice(0, 3).map((content, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm truncate">{content.title}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  content.type === 'internal' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {content.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Toggle */}
      <div className="px-4 pb-4">
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="w-full text-[#5B9BD5] hover:text-[#4B8FE3] text-sm font-medium transition-colors"
        >
          {showAnalytics ? 'Hide' : 'Show'} Analytics
        </button>
        
        {showAnalytics && (
          <div className="mt-3 bg-[#091020] rounded-lg p-3 border border-gray-600">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-white font-semibold">85%</div>
                <div className="text-gray-400 text-xs">Readability</div>
              </div>
              <div>
                <div className="text-white font-semibold">92%</div>
                <div className="text-gray-400 text-xs">SEO Score</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentFramework;